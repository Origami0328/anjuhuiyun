import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'
//import System from './routerList/system.js'
//import Equipment from './routerList/equipment.js'
//import Community from './routerList/community.js'
//import User from './routerList/user.js'
// import Property from './routerList/property.js'
// import Account from './routerList/account.js'
//import EquipmentUse from './routerList/equipmentUse.js'
// import Operation from './routerList/operation.js'
// import Project from './routerList/project.js'
// import Agent from './routerList/agent.js'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home-4-line',
      affix: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true,
        },
      },
    ],
  },
]
export const asyncRoutes = [
  // ...System,
  // ...Agent,
  // ...Community,
  // ...User,
  // ...Property,
  // ...Account,
  //...EquipmentUse,
  //...Equipment,
  //
  // ...Operation,
  // ...Project,
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
