/**

 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { asyncRoutes, constantRoutes } from '@/router'
// import { getUserInfo } from '@/api/user'
import { convertRouter, filterRoutes } from '@/utils/routes'
import { getUserInfo } from '@/api/user'
// import store from '@/store'

const state = () => ({
  routes: [],
  partialRoutes: [],
  menu: [],
})
const getters = {
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes,
  menu: (state) => state.menu,
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = routes
  },
  // setMenu(state, menu) {
  //   state.menu = menu
  // },
  setPartialRoutes(state, routes) {
    state.partialRoutes = routes
  },
}
const actions = {
  /**
   * @description intelligence模式设置路由
   * @param {*} { commit }
   * @returns
   */
  async setRoutes({ commit }) {
    const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes])
    commit('setRoutes', finallyRoutes)

    return [...finallyRoutes]
  },
  /**
   * @description all模式设置路由
   * @param {*} { commit }
   * @returns
   */
  async setAllRoutes({ commit }) {
    let res = await getUserInfo()
    const data = res.result.menu || []
    // if (data[data.length - 1].path !== '*')
    //   data.push({ path: '*', redirect: '/404', hidden: true })
    let newAsyncRoutes = await convertRouter(data)
    const finallyRoutes = filterRoutes([
      ...constantRoutes,
      ...asyncRoutes,
      ...newAsyncRoutes,
    ])
    // const finallyRoutes = filterRoutes([...constantRoutes, ...data])
    commit('setRoutes', finallyRoutes)
    console.log(finallyRoutes)
    return [...finallyRoutes]
  },
  /**
   * @description 画廊布局、综合布局设置路由
   * @param {*} { commit }
   * @param accessedRoutes 画廊布局、综合布局设置路由
   */
  setPartialRoutes({ commit }, accessedRoutes) {
    commit('setPartialRoutes', accessedRoutes)
  },
}
export default { state, getters, mutations, actions }
