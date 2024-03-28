/**

 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import router from '@/router'
import store from '@/store'
import getPageTitle from '@/utils/pageTitle'
import {
  //intelligence（前端导出路由）和all（后端导出路由）两种方式
  authentication,
  //是否开启登录拦截,默认开启
  loginInterception,
  //token失效回退到登录页时是否记录本次的路由
  recordRoute,
  //不经过token校验的路由
  routesWhiteList,
} from '@/config'

router.beforeEach(async (to, from, next) => {
  let hasToken = store.getters['user/accessToken']
  if (!loginInterception) hasToken = true
  console.log(hasToken)
  if (hasToken) {
    // 有token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasRoles =
        store.getters['acl/admin'] ||
        store.getters['acl/role'].length > 0 ||
        store.getters['acl/ability'].length > 0
      if (hasRoles) {
        // console.log(router.getRoutes())
        store.commit('keepComponent/addKeepALiveList', to.name)
        next()
      } else {
        try {
          if (loginInterception) {
            await store.dispatch('user/getUserInfo') // 设置用户信息
            // await store.dispatch('user/setVirtualRoles')
            // await store.dispatch('user/login')
          } else {
            //loginInterception为false（关闭登录拦截时）时，创建虚拟角色
            await store.dispatch('user/setVirtualRoles')
          }

          let accessRoutes = []
          if (authentication === 'intelligence') {
            accessRoutes = await store.dispatch('routes/setRoutes')
          } else if (authentication === 'all') {
            accessRoutes = await store.dispatch('user/setAllRoutes')
          }
          accessRoutes.forEach((item) => {
            router.addRoute(item)
          })
          next({ ...to, replace: true })
        } catch (err) {
          console.log(err)
          await store.dispatch('user/resetAll')
          if (recordRoute)
            next({
              path: '/login',
              query: { redirect: to.path },
              replace: true,
            })
          else next({ path: '/login', replace: true })
        }
      }
    }
  } else {
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (recordRoute)
        next({ path: '/login', query: { redirect: to.path }, replace: true })
      else next({ path: '/login', replace: true })
    }
  }
})
router.afterEach(() => {
  document.title = getPageTitle()
})
