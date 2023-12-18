import Layout from '@/layout'
const Project = [
  {
    path: '/project',
    component: Layout,
    redirect: '/project/projectList',
    alwaysShow: true,
    meta: {
      title: '项目管理',
      icon: 'book-line',
    },
    children: [
      {
        path: 'projectList',
        name: 'ProjectList',
        component: () => import('@/views/project/projectList'),
        meta: {
          title: '项目列表',
          icon: 'book-mark-line',
        },
      },
    ],
  },
]
export default Project
