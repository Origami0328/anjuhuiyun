const state = () => ({
  keepAliveList: [],
})
const getters = {
  returnList: (state) => state.keepAliveList,
}
const mutations = {
  addKeepALiveList(state, pageName) {
    console.log(pageName, state.keepAliveList)
    if (!state.keepAliveList.includes(pageName)) {
      state.keepAliveList.push(pageName)
    }
  },
  removeKeepAliveList(state, pageName) {
    console.log(pageName, state.keepAliveList)
    const index = state.keepAliveList.findIndex((item) => item === pageName)
    state.keepAliveList.splice(index, 1)
  },
  removeOtherKeepAliveList(state, route) {
    state.keepAliveList = [route.name]
  },
  removeAllKeepAliveList(state) {
    state.keepAliveList = []
  },
}
export default { state, getters, mutations }
