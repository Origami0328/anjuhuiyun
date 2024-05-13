import router from '@/router'
import path from 'path'
import { rolesControl } from '@/config'
import { isExternal } from '@/utils/validate'
import { hasRole } from '@/utils/hasRole'
//设置不同菜单对应的不同路由
function setComponent(secMennuName) {
  switch (secMennuName) {
    case 'projectList':
      return 'projectList'
    case 'alipay':
      return 'alipay'
    case 'payout':
      return 'payout'
    case 'agentList':
      return 'agentList'
    case 'adCharts':
      return 'adCharts'
    case 'information':
      return 'information'
    case 'capability':
      return 'capability'
    case 'build':
      return 'build'
    case 'unit':
      return 'unit'
    case 'house':
      return 'house'
    case 'accessCardAd':
      return 'accessCardAd'
    case 'accessCardOper':
      return 'accessCardOper'
    case 'cloudBoxAd':
      return 'cloudBoxAd'
    case 'cloudBox':
      return 'cloudBox'
    case 'creditCard':
      return 'creditCard'
    case 'monitorEquip':
      return 'monitorEquip'
    case 'cloudScreenEquip':
      return 'cloudScreenEquip'
    case 'cloudScreenAds':
      return 'cloudScreenAds'
    case 'faceMachineA':
      return 'faceMachineA'
    case 'smokeDetector':
      return 'smokeDetector'
    case 'elderCloudBox':
      return 'elderCloudBox'
    case 'faceCamera':
      return 'faceCamera'
    case 'faceMachineH':
      return 'faceMachineH'
    case 'faceMachineH2':
      return 'faceMachineH2'
    case 'faceMachineEH':
      return 'faceMachineEH'
    case 'superBrain':
      return 'superBrain'
    case 'dineck':
      return 'dineck'
    case 'haikang':
      return 'haikang'
    case 'doorMagnet':
      return 'doorMagnet'
    case 'openDoor':
      return 'openDoor'
    case 'dataPush':
      return 'dataPush'
    case 'dataPushInfo':
      return 'dataPushInfo'
    case 'MonitorEquip':
      return 'MonitorEquip'
    case 'locationEquip':
      return 'locationEquip'
    case 'combinationLock':
      return 'combinationLock'
    case 'openInfoEx':
      return 'openInfoEx'
    case 'tempInfo':
      return 'tempInfo'
    case 'Information':
      return 'Information'
    case 'client':
      return 'client'
    case 'rabbitClose':
      return 'rabbitClose'
    case 'rabbitCloseInfo':
      return 'rabbitCloseInfo'
    case 'feedbackList':
      return 'feedbackList'
    case 'payment':
      return 'payment'
    case 'houseRent':
      return 'houseRent'
    case 'maintain':
      return 'maintain'
    case 'maintainPe':
      return 'maintainPe'
    case 'complainAndPraise':
      return 'complainAndPraise'
    case 'rentInfo':
      return 'rentInfo'
    case 'role':
      return 'role'
    case 'platformUser':
      return 'platformUser'
    case 'systemUser':
      return 'systemUser'
    case 'menuManager':
      return 'menuManager'
    case 'apiManager':
      return 'apiManager'
    case 'testAccount':
      return 'testAccount'
    case 'type':
      return 'type'
    case 'openPush':
      return 'openPush'
    case 'closePush':
      return 'closePush'
    case 'policeDistrict':
      return 'policeDistrict'
    case 'whiteList':
      return 'whiteList'
    case 'masterAccount':
      return 'masterAccount'
    case 'userCard':
      return 'userCard'
    case 'userCar':
      return 'userCar'
    case 'myHome':
      return 'myHome'
    case 'openPushUser':
      return 'openPushUser'
    case 'followUser':
      return 'followUser'
    case 'userWhiteList':
      return 'userWhiteList'
    case 'cardBlackList':
      return 'cardBlackList'
    case 'cardWhiteList':
      return 'cardWhiteList'
    case 'downList':
      return 'downList'
  }
}
const constantRouterComponents = {
  projectList: () => import('@/views/project/projectList/index.vue'),
  rabbitCloseInfo: () => import('@/views/operation/rabbitCloseInfo/index.vue'),
  feedbackList: () => import('@/views/operation/feedbackList/index.vue'),
  rabbitClose: () => import('@/views/operation/rabbitClose/index.vue'),
  client: () => import('@/views/operation/client/index.vue'),
  Information: () => import('@/views/operation/information/index.vue'),

  agentList: () => import('@/views/agent/agentList/index.vue'),
  adCharts: () => import('@/views/agent/adCharts/index.vue'),

  alipay: () => import('@/views/account/alipay/index.vue'),
  payout: () => import('@/views/account/payout/index.vue'),

  rentInfo: () => import('@/views/property/rentInfo/index.vue'),
  complainAndPraise: () =>
    import('@/views/property/complaintAndPraise/index.vue'),
  maintainPe: () => import('@/views/property/maintainPe/index.vue'),
  maintain: () => import('@/views/property/maintain/index.vue'),
  houseRent: () => import('@/views/property/houseRent/index.vue'),
  payment: () => import('@/views/property/payment/index.vue'),

  information: () => import('@/views/community/information/index.vue'),
  accessCardOper: () => import('@/views/community/accessCardOper/index.vue'),
  accessCardAd: () => import('@/views/community/accessCardAd/index.vue'),
  house: () => import('@/views/community/house/index.vue'),
  unit: () => import('@/views/community/unit/index.vue'),
  capability: () => import('@/views/community/capability/index.vue'),
  build: () => import('@/views/community/build/index.vue'),

  cardWhiteList: () => import('@/views/user/cardWhiteList/index.vue'),
  cardBlackList: () => import('@/views/user/cardBlackList/index.vue'),
  userWhiteList: () => import('@/views/user/userWhiteList/index.vue'),
  followUser: () => import('@/views/user/followUser/index.vue'),
  openPushUser: () => import('@/views/user/openPush/index.vue'),
  myHome: () => import('@/views/user/myHome/index.vue'),
  userCar: () => import('@/views/user/userCar/index.vue'),
  userCard: () => import('@/views/user/userCard/index.vue'),
  masterAccount: () => import('@/views/user/masterAccount'),

  tempInfo: () => import('@/views/equipmentUse/tempInfo/index.vue'),
  openInfoEx: () => import('@/views/equipmentUse/openInfoEx/index.vue'),
  combinationLock: () =>
    import('@/views/equipmentUse/combinationLock/index.vue'),
  locationEquip: () => import('@/views/equipmentUse/loactionEquip/index.vue'),
  MonitorEquip: () => import('@/views/equipmentUse/monitorEquip/index.vue'),
  dataPushInfo: () => import('@/views/equipmentUse/dataPushInfo/index.vue'),
  dataPush: () => import('@/views/equipmentUse/dataPush/index.vue'),
  openDoor: () => import('@/views/equipmentUse/openDoor'),

  doorMagnet: () => import('@/views/equipment/doorMagnet'),
  haikang: () => import('@/views/equipment/HaiKang'),
  dineck: () => import('@/views/equipment/Dineck'),
  superBrain: () => import('@/views/equipment/superBrain'),
  faceMachineEH: () => import('@/views/equipment/faceMachineEH'),
  faceMachineH2: () => import('@/views/equipment/faceMachineH2'),
  faceMachineH: () => import('@/views/equipment/faceMachineH'),
  faceCamera: () => import('@/views/equipment/faceCamera'),
  elderCloudBox: () => import('@/views/equipment/elderCloudBox'),
  smokeDetector: () => import('@/views/equipment/SmokeDetector'),
  faceMachineA: () => import('@/views/equipment/faceMachineA'),
  cloudScreenAds: () => import('@/views/equipment/cloudScreenAds'),
  cloudScreenEquip: () => import('@/views/equipment/cloudScreenEquip'),
  monitorEquip: () => import('@/views/equipment/monitorEquip'),
  creditCard: () => import('@/views/equipment/creditCard'),
  cloudBox: () => import('@/views/equipment/cloudBox'),
  cloudBoxAd: () => import('@/views/equipment/cloudBoxAd'),

  whiteList: () => import('@/views/System/whiteList'),
  policeDistrict: () => import('@/views/System/policeDistrict'),
  closePush: () => import('@/views/System/closePush'),
  openPush: () => import('@/views/System/openPush'),
  type: () => import('@/views/System/type'),
  testAccount: () => import('@/views/System/testAccount'),
  apiManager: () => import('@/views/System/apiManager'),
  menuManager: () => import('@/views/System/menuManager'),
  systemUser: () => import('@/views/System/systemUser'),
  platformUser: () => import('@/views/System/platformUser'),
  role: () => import('@/views/System/role'),

  downList: () => import('@/views/downLoad/downList'),
  Layout: () => import('@/layout'),
}
// 设置菜单的图标
function setIcon(rootMenuName) {
  switch (rootMenuName) {
    case 'system':
      return 'settings-3-line'
    case 'user':
      return 'user-3-line'
    case 'agent':
      return 'home-gear-line'
    case 'operation':
      return 'folder-info-line'
    case 'project':
      return 'book-line'
    case 'property':
      return 'apps-line'
    case 'community':
      return 'home-gear-line'
    case 'equipment':
      return 'code-box-line'
    case 'equipmentUse':
      return 'terminal-box-line'
    case 'account':
      return 'account-box-line'
    case 'downLoad':
      return 'book-line'
  }
}
/**
 * @description all模式渲染后端返回路由
 * @param constantRoutes
 * @returns {*}
 */
export function convertRouter(constantRoutes) {
  // return constantRoutes.map((route) => {
  //   if (route.component) {
  //     if (route.component === 'Layout') {
  //       const path = 'layouts'
  //       route.component = (resolve) => require([`@/${path}`], resolve)
  //     } else {
  //       let path = 'views/' + route.component
  //       if (
  //         new RegExp('^/views/.*$').test(route.component) ||
  //         new RegExp('^views/.*$').test(route.component)
  //       ) {
  //         path = route.component
  //       } else if (new RegExp('^/.*$').test(route.component)) {
  //         path = 'views' + route.component
  //       } else if (new RegExp('^@views/.*$').test(route.component)) {
  //         path = route.component.slice(1)
  //       } else {
  //         path = 'views/' + route.component
  //       }
  //       route.component = (resolve) => require([`@/${path}`], resolve)
  //     }
  //   }
  //   if (route.children && route.children.length)
  //     route.children = convertRouter(route.children)
  //
  //   if (route.children && route.children.length === 0) delete route.children
  //
  //   return route
  // })
  return new Promise((resolve) => {
    let result = constantRoutes
    /**
     * 将后台返回的菜单格式，处理成想要的格式
     */
    const secMenuArr = [] //所有的次级菜单的数组
    let secMenuId = result.length //次级菜单的id

    result.forEach((item, index) => {
      item.parentId = 0
      item.id = index + 1
      item.component = 'Layout'
      item.meta = {}
      item.meta.icon = setIcon(item.code)
      item.meta.title = item.name
      item.meta.show = true
      item.name = item.code
      delete item.code
      let redirectMenu = ''
      item.children.forEach((item2, index2) => {
        secMenuId++
        item2.parentId = index + 1
        item2.id = secMenuId

        item2.meta = {}
        item2.meta.show = true
        item2.meta.title = item2.name
        item2.meta.permissionCode = item2.rightType //每个路由的只读、读写属性

        item2.name = item2.code
        item2.component = setComponent(item2.code)
        // delete item2.code

        if (index2 == 0) {
          redirectMenu = item2.name
        }
        if (item2.meta.title === '项目列表') {
          item2.meta.icon = 'home-gear-line'
        }

        secMenuArr.push(item2)
      })

      item.redirect = '/' + item.name + '/' + redirectMenu

      delete item.children
    })
    result = [...result, ...secMenuArr]
    console.log('后台返回的菜单经过处理为', result)
    //  const menuNav = []
    const childrenNav = []
    //  后端数据, 根级树数组,  根级 PID
    listToTree(result, childrenNav, 0)
    // rootRouter.children = childrenNav
    //  menuNav.push(rootRouter)
    // console.log('menuNav', menuNav)
    const routers = generator(childrenNav)
    // routers.forEach((item) => {
    //   item.children?.forEach((item1) => {
    //     routers.push(item1)
    //   })
    // })
    routers.push({
      path: '/*',
      redirect: '/404',
      hidden: true,
    })
    resolve(routers)
  })
}

/**
 * @description 根据roles数组拦截路由
 * @param routes
 * @param baseUrl
 * @returns {[]}
 */
export function filterRoutes(routes, baseUrl = '/') {
  return routes
    .filter((route) => {
      if (route.meta && route.meta.roles)
        //rolesControl: 是否开启roles字段进行角色权限控制（如果是all模式后端完全处理角色并进行json组装，可设置false不处理路由中的roles字段）
        return !rolesControl || hasRole(route.meta.roles)
      else return true
    })
    .map((route) => {
      if (route.path !== '*' && !isExternal(route.path))
        route.path = path.resolve(baseUrl, route.path)
      route.fullPath = route.path
      if (route.children) {
        route.children = filterRoutes(route.children, route.fullPath)
      }

      return route
    })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  list.forEach((item) => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: [],
        hidden: false,
      }

      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}
/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map((item) => {
    const {
      title,
      show,
      hideChildren,
      hiddenHeaderContent,
      target,
      icon,
      permissionCode,
    } = item.meta || {}
    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${(parent && parent.path) || ''}/${item.key}`,
      hidden: false,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      component:
        constantRouterComponents[item.component || item.key] ||
        (() => import(`@/views/${item.component}`)),

      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target,
        permission: item.name,
        permissionCode: permissionCode,
      },
    }
    // 是否设置了隐藏菜单
    if (show === false) {
      currentRouter.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }

    return currentRouter
  })
}
/**
 * 根据当前页面firstMenu
 * @returns {string}
 */
export function handleFirstMenu() {
  const firstMenu = router.currentRoute.matched[0].path
  if (firstMenu === '') return '/'
  return firstMenu
}
