import Layout from '@/layout'
const Property = [
  {
    path: '/property',
    component: Layout,
    redirect: '/property/payment',
    alwaysShow: true,
    meta: {
      title: '物业服务',
      icon: 'apps-line',
    },
    children: [
      {
        path: 'payment',
        name: 'Payment',
        component: () => import('@/views/property/payment'),
        meta: {
          title: '物业缴费',
          icon: 'money-cny-box-line',
        },
      },
      {
        path: 'houseRent',
        name: 'HouseRent',
        component: () => import('@/views/property/houseRent'),
        meta: {
          title: '房屋出租',
          icon: 'home-heart-line',
        },
      },
      {
        path: 'maintain',
        name: 'Maintain',
        component: () => import('@/views/property/maintain'),
        meta: {
          title: '维修管理',
          icon: 'tools-line',
        },
      },
      {
        path: 'maintainPe',
        name: 'MaintainPe',
        component: () => import('@/views/property/maintainPe'),
        meta: {
          title: '维修人员管理',
          icon: 'user-settings-line',
        },
      },
      {
        path: 'complainAndPraise',
        name: 'ComplainAndPraise',
        component: () => import('@/views/property/complaintAndPraise'),
        meta: {
          title: '投诉表扬',
          icon: 'feedback-fill',
        },
      },
      {
        path: 'rentInfo',
        name: 'RentInfo',
        component: () => import('@/views/property/rentInfo'),
        meta: {
          title: '出租信息',
          icon: 'folder-info-line',
        },
      },
    ],
  },
]
export default Property
