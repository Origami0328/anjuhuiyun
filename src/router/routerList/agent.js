import Layout from '@/layout'
const Agent = [
  {
    path: '/agent',
    component: Layout,
    redirect: '/agent/agentList',
    // alwaysShow: true,
    meta: {
      title: '代理商管理',
      icon: 'home-gear-line',
    },
    children: [
      {
        path: 'agentList',
        name: 'AgentList',
        component: () => import('@/views/agent/agentList/index'),
        meta: {
          title: '代理商列表',
          icon: 'community-fill',
        },
      },
      {
        path: 'adCharts',
        name: 'AdCharts',
        component: () => import('@/views/agent/adCharts/index'),
        meta: {
          title: '广告数据报表',
          icon: 'community-fill',
        },
      },
    ],
  },
]
export default Agent
