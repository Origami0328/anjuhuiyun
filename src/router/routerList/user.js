import Layout from '@/layout'
const User = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/masterAccount',
    alwaysShow: true,
    meta: {
      title: '用户管理',
      icon: 'user-3-line',
    },
    children: [
      {
        path: 'masterAccount',
        name: 'MasterAccount',
        component: () => import('@/views/user/masterAccount'),
        meta: {
          title: '主账户管理',
          icon: 'account-box-line',
        },
      },
      {
        path: 'userCard',
        name: 'UserCard',
        component: () => import('@/views/user/userCard'),
        meta: {
          title: '用户卡号管理',
          icon: 'refund-line',
        },
      },
      {
        path: 'userCar',
        name: 'UserCar',
        component: () => import('@/views/user/userCar'),
        meta: {
          title: '用户车辆管理',
          icon: 'car-fill',
        },
      },
      {
        path: 'myhome',
        name: 'Myhome',
        component: () => import('@/views/user/myHome'),
        meta: {
          title: '我的一家管理',
          icon: 'home-4-line',
        },
      },
      {
        path: 'openPush',
        name: 'OpenPushUser',
        component: () => import('@/views/user/openPush'),
        meta: {
          title: '开门推送管理',
          icon: 'logout-box-r-line',
        },
      },
      {
        path: 'followUser',
        name: 'FollowUser',
        component: () => import('@/views/user/followUser'),
        meta: {
          title: '关注人员管理',
          icon: 'user-follow-line',
        },
      },
      {
        path: 'userWhiteList',
        name: 'UserWhiteList',
        component: () => import('@/views/user/userWhiteList'),
        meta: {
          title: '用户白名单',
          icon: 'user-follow-line',
        },
      },
      {
        path: 'cardBlackList',
        name: 'CardBlackList',
        component: () => import('@/views/user/cardBlackList'),
        meta: {
          title: '卡号黑名单',
          icon: 'file-list-fill',
        },
      },
      {
        path: 'cardWhiteList',
        name: 'CardWhiteList',
        component: () => import('@/views/user/cardWhiteList'),
        meta: {
          title: '卡号白名单',
          icon: 'file-list-line',
        },
      },
    ],
  },
]

export default User
