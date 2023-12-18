import Layout from '@/layout'
const Operation = [
  {
    path: '/operation',
    component: Layout,
    redirect: '/operation/information',
    alwaysShow: true,
    meta: {
      title: '运营管理',
      icon: 'folder-info-line',
    },
    children: [
      {
        path: 'information',
        name: 'Information',
        component: () => import('@/views/operation/information'),
        meta: {
          title: '资讯管理',
          icon: 'folder-info-fill',
        },
      },
      {
        path: 'client',
        name: 'Client',
        component: () => import('@/views/operation/client'),
        meta: {
          title: '客户端管理',
          icon: 'computer-line',
        },
      },
      {
        path: 'rabbitClose',
        name: 'RabbitClose',
        component: () => import('@/views/operation/rabbitClose'),
        meta: {
          title: '小兔关门管理',
          icon: 'door-closed-line',
        },
      },
      {
        path: 'rabbitCloseInfo',
        name: 'RabbitCloseInfo',
        component: () => import('@/views/operation/rabbitCloseInfo'),
        meta: {
          title: '小兔关门资讯管理',
          icon: 'door-closed-fill',
        },
      },
      {
        path: 'feedbackList',
        name: 'FeedbackList',
        component: () => import('@/views/operation/feedbackList'),
        meta: {
          title: '反馈列表',
          icon: 'feedback-line',
        },
      },
    ],
  },
]
export default Operation
