import axios from 'axios'
import {
  baseURL,
  contentType,
  debounce,
  requestTimeout,
  successCode,
  tokenName,
} from '@/config'

import qs from 'qs'
import { isArray } from '@/utils/validate'
import { messageContent } from '@/utils/message'
import router from '@/router'
import store from '@/store'
let loadingInstance
/**
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = async (code, msg) => {
  switch (code) {
    case 401:
      messageContent('error', msg || '登录失效')
      //只有token过期才清除token
      // store.dispatch('user/resetAll').catch(() => {})
      break
    case 403:
      router.push({ path: '/401' }).catch(() => {})
      break
    case 501:
      await store.dispatch('user/logout').catch(() => {})
      await router.push('/login')
      messageContent('error', 'token过期了，请重新登录')
      break
    default:
      messageContent('error', msg || `后端接口${code}异常`)
      break
  }
}

/**
 * @description axios初始化
 */
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
})

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    if (store.getters['user/accessToken'])
      config.headers[tokenName] = store.getters['user/accessToken']
    if (
      config.data &&
      config.headers['Content-Type'] ===
        'application/x-www-form-urlencoded;charset=UTF-8'
    )
      config.data = qs.stringify(config.data)

    if (config.method == 'post') {
      if (config.method === 'post' && config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data'
      } else if (store.getters['user/accessToken']) {
        config.data = {
          clientId: '111',
          os: 'pc',
          userId: '1',
          ...config.data,
        }
      }
    }
    if (debounce.some((item) => config.url.includes(item))) {
      //这里写加载动画
    }
    console.log(config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response) => {
    if (loadingInstance) loadingInstance.close()

    const { data, config } = response
    const { code, desc } = data
    // 操作正常Code数组
    const codeVerificationArray = isArray(successCode)
      ? [...successCode]
      : [...[successCode]]
    // 是否操作正常
    if (codeVerificationArray.includes(Number(code))) {
      return data
    } else {
      handleCode(Number(code), desc).then(() => {})
      return Promise.reject(
        '请求异常拦截:' + JSON.stringify({ url: config.url, code, desc }) ||
          'Error'
      )
    }
  },
  (error) => {
    if (loadingInstance) loadingInstance.close()
    const { response, message } = error
    if (error.response && error.response.data) {
      const { status, data } = response
      handleCode(status, data.msg || message)
      return Promise.reject(error)
    } else {
      let { message } = error
      if (message === 'Network Error') {
        message = '后端接口连接异常'
      }
      if (message.includes('timeout')) {
        message = '后端接口请求超时'
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3)
        message = '后端接口' + code + '异常'
      }
      messageContent('error', message || `后端接口未知异常`)
      return Promise.reject(error)
    }
  }
)

export default instance
