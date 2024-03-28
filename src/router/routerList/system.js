import Layout from '@/layout'
const System = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/role',
    alwaysShow: true,
    meta: {
      title: '系统管理',
      icon: 'settings-3-line',
    },
    children: [
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/System/role'),
        meta: {
          title: '角色管理',
          icon: 'user-3-line',
        },
      },
      {
        path: 'platformUser',
        name: '平台用户',
        component: () => import('@/views/System/platformUser'),
        meta: {
          title: '平台用户',
          icon: 'artboard-line',
        },
      },
      {
        path: 'systemUser',
        name: '系统用户',
        component: () => import('@/views/System/systemUser'),
        meta: {
          title: '系统用户',
          icon: 'function-line',
        },
      },
      {
        path: 'menuManager',
        name: '菜单管理',
        component: () => import('@/views/System/menuManager'),
        meta: {
          title: '菜单管理',
          icon: 'function-line',
        },
      },
      {
        path: 'apiManager',
        name: 'api管理',
        component: () => import('@/views/System/apiManager'),
        meta: {
          title: 'api管理',
          icon: 'function-line',
        },
      },
      {
        path: 'testAccount',
        name: '测试账号管理',
        component: () => import('@/views/System/testAccount'),
        meta: {
          title: '测试账号管理',
          icon: 'user-5-line',
        },
      },
      {
        path: 'type',
        name: '类型管理',
        component: () => import('@/views/System/type'),
        meta: {
          title: '类型管理',
          icon: 'list-unordered',
        },
      },
      {
        path: 'openPush',
        name: '小兔开门推送',
        component: () => import('@/views/System/openPush'),
        meta: {
          title: '小兔开门推送',
          icon: 'logout-box-r-line',
        },
      },
      {
        path: 'closePush',
        name: '小兔关门推送',
        component: () => import('@/views/System/closePush'),
        meta: {
          title: '小兔关门推送',
          icon: 'logout-box-r-line',
        },
      },
      {
        path: 'policeDistrict',
        name: '警区编码',
        component: () => import('@/views/System/policeDistrict'),
        meta: {
          title: '警区编码',
          icon: 'alarm-warning-line',
        },
      },
      {
        path: 'whiteList',
        name: '白名单',
        component: () => import('@/views/System/whiteList'),
        meta: {
          title: '白名单',
          icon: 'user-follow-line',
        },
      },
    ],
  },
]
export default System
