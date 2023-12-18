import Layout from '@/layout'
const Community = [
  {
    path: '/community',
    component: Layout,
    redirect: '/community/information',
    alwaysShow: true,
    meta: {
      title: '小区管理',
      icon: 'home-gear-line',
    },
    children: [
      {
        path: 'information',
        name: 'CommunityInformation',
        component: () => import('@/views/community/information'),
        meta: {
          title: '小区信息管理',
          icon: 'community-fill',
        },
      },
      {
        path: 'capability',
        name: 'Capability',
        component: () => import('@/views/community/capability'),
        meta: {
          title: '小区功能管理',
          icon: 'community-line',
        },
      },
      {
        path: 'build',
        name: 'Build',
        component: () => import('@/views/community/build'),
        meta: {
          title: '楼栋管理',
          icon: 'building-line',
        },
      },
      {
        path: 'unit',
        name: 'unit',
        component: () => import('@/views/community/unit'),
        meta: {
          title: '单元管理',
          icon: 'home-smile-line',
        },
      },
      {
        path: 'house',
        name: 'House',
        component: () => import('@/views/community/house'),
        meta: {
          title: '房屋管理',
          icon: 'home-gear-line',
        },
      },
      {
        path: 'accessCardAd',
        name: 'AccessCardAd',
        component: () => import('@/views/community/accessCardAd'),
        meta: {
          title: '门禁卡管理',
          icon: 'bank-card-line',
        },
      },
      {
        path: 'accessCardOper',
        name: 'AccessCardOper',
        component: () => import('@/views/community/accessCardOper'),
        meta: {
          title: '门禁卡操作记录',
          icon: 'bank-card-2-line',
        },
      },
    ],
  },
]
export default Community
