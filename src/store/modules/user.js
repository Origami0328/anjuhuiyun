/**

 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */
import { getUserInfo, tempLogin } from '@/api/user'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/accessToken'
import { message } from 'ant-design-vue'
const state = () => ({
  accessToken: getAccessToken(),
  username: '',
  avatar: '',
  menu: [],
  roleId: '',
})
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  roleId: (state) => state.roleId,
}
const mutations = {
  /**

   * @description 设置accessToken
   * @param {*} state
   * @param {*} accessToken
   */
  setAccessToken(state, accessToken) {
    console.log(accessToken)
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  /**
   * @author chuzhixin 1204505056@qq.com
   * @description 设置用户名
   * @param {*} state
   * @param {*} username
   */
  setUsername(state, username) {
    state.username = username
  },
  /**
   * @description 设置头像
   * @param {*} state
   * @param {*} avatar
   */
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setMenu(state, menu) {
    state.menu = menu
  },
  setRoleId(state, roleId) {
    state.roleId = roleId
  },
}
const actions = {
  /**
   * @description 登录拦截放行时，设置虚拟角色
   * @param {*} { commit, dispatch }
   */
  setVirtualRoles({ commit, dispatch }) {
    dispatch('acl/setFull', true, { root: true })
    commit('setAvatar', 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif')
    commit('setUsername', 'admin(未开启登录拦截)')
  },
  /**
   * @description 登录
   * @param {*} { commit }
   * @param {*} userInfo
   */
  // async login({ commit }, userInfo) {
  //   const { data } = await login(userInfo)
  //   const accessToken = data[tokenName]
  //   if (accessToken) {
  //     commit('setAccessToken', accessToken)
  //   } else {
  //     message.error(`登录接口异常，未正确返回${tokenName}...`)
  //   }
  // },
  async login({ commit }, userInfo) {
    const data = await tempLogin(userInfo)
    const accessToken = data.result?.token.id
    if (accessToken) {
      commit('setAccessToken', accessToken)
      // commit('setUsername', data.result.token.username)
      // 临时处理
      // dispatch('acl/setFull', true, { root: true })
      // commit(
      //   'setAvatar',
      //   'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
      // )
      // commit('setUsername', data.result.token.username)
    } else if (data.code == '409') {
      message.error(data.desc)
    }
  },
  /**
   * @description 获取用户信息接口 这个接口非常非常重要，如果没有明确底层前逻辑禁止修改此方法，错误的修改可能造成整个框架无法正常使用
   * @param {*} { commit, dispatch, state }
   * @returns
   */
  async getUserInfo({ dispatch, commit }) {
    const data = await getUserInfo(state.accessToken)
    if (!data.result) {
      message.error(`验证失败，请重新登录...`)
      return false
    }
    let { systemUserPd, menu } = data.result
    console.log(menu, systemUserPd)
    // if (username && roles && Array.isArray(roles)) {
    //   dispatch('acl/setRole', roles, { root: true })
    //   if (ability && ability.length > 0)
    //     dispatch('acl/setAbility', ability, { root: true })
    //   commit('setUsername', username)
    //   commit('setAvatar', avatar)
    // } else {
    //   message.error('用户信息接口异常')
    // }

    dispatch('acl/setFull', true, { root: true })
    commit('setAvatar', 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif')
    commit('setUsername', systemUserPd.username)
    commit('setRoleId', systemUserPd.roleId)
  },

  /**
   * @description 退出登录
   * @param {*} { dispatch }
   */
  async logout({ dispatch }) {
    // await logout(state.accessToken)
    await dispatch('resetAll')
  },
  /**
   * @description 重置accessToken、roles、ability、router等
   * @param {*} { commit, dispatch }
   */
  async resetAll({ dispatch }) {
    await dispatch('setAccessToken', '')
    await dispatch('acl/setFull', false, { root: true })
    await dispatch('acl/setRole', [], { root: true })
    await dispatch('acl/setAbility', [], { root: true })
    removeAccessToken()
  },
  /**
   *
   * @description 设置token
   */
  setAccessToken({ commit }, accessToken) {
    commit('setAccessToken', accessToken)
  },
}
export default { state, getters, mutations, actions }
