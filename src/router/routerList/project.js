import Layout from '@/layout'
const Project = [
  {
    path: '/project',
    component: Layout,
    redirect: '/project/projectList',
    meta: {
      title: '项目管理',
      icon: 'book-line',
    },
    children: [
      // {
      //   path: 'projectList',
      //   name: 'ProjectList',
      //   component: () => import('@/views/project/projectList'),
      //   meta: {
      //     title: '项目列表',
      //     icon: 'book-mark-line',
      //   },
      // },
      {
        path: 'alipay',
        name: 'Alipay',
        component: () => import('@/views/account/alipay'),
        meta: {
          title: '支付宝绑定管理',
          icon: 'alipay-line',
        },
      },
    ],
  },
]
export default Project
