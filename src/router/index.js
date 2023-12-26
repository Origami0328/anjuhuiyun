import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'
import System from './routerList/system.js'
import Equipment from './routerList/equipment.js'
import Community from './routerList/community.js'
import User from './routerList/user.js'
import Property from './routerList/property.js'
import Account from './routerList/account.js'
import EquipmentUse from './routerList/equipmentUse.js'
import Operation from './routerList/operation.js'
import Project from './routerList/project.js'
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
]
export const asyncRoutes = [
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
  ...System,
  // {
  //   path: '/community',
  //   component: Layout,
  //   redirect: '/community/information',
  //   alwaysShow: true,
  //   meta: {
  //     title: '小区管理',
  //     icon: 'home-gear-line',
  //   },
  //   children: [
  //     {
  //       path: 'information',
  //       name: 'Information',
  //       component: () => import('@/views/community/information'),
  //       meta: {
  //         title: '小区信息管理',
  //         icon: 'community-fill',
  //       },
  //     },
  //     {
  //       path: 'capability',
  //       name: 'Capability',
  //       component: () => import('@/views/community/capability'),
  //       meta: {
  //         title: '小区功能管理',
  //         icon: 'community-line',
  //       },
  //     },
  //     {
  //       path: 'build',
  //       name: 'Build',
  //       component: () => import('@/views/community/build'),
  //       meta: {
  //         title: '楼栋管理',
  //         icon: 'building-line',
  //       },
  //     },
  //     {
  //       path: 'unit',
  //       name: 'unit',
  //       component: () => import('@/views/community/unit'),
  //       meta: {
  //         title: '单元管理',
  //         icon: 'home-smile-line',
  //       },
  //     },
  //     {
  //       path: 'house',
  //       name: 'House',
  //       component: () => import('@/views/community/house'),
  //       meta: {
  //         title: '房屋管理',
  //         icon: 'home-gear-line',
  //       },
  //     },
  //     {
  //       path: 'accessCardAd',
  //       name: 'AccessCardAd',
  //       component: () => import('@/views/community/accessCardAd'),
  //       meta: {
  //         title: '门禁卡管理',
  //         icon: 'bank-card-line',
  //       },
  //     },
  //     {
  //       path: 'accessCardOper',
  //       name: 'AccessCardOper',
  //       component: () => import('@/views/community/accessCardOper'),
  //       meta: {
  //         title: '门禁卡操作记录',
  //         icon: 'bank-card-2-line',
  //       },
  //     },
  //   ],
  // },
  ...Community,
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user/masterAccount',
  //   alwaysShow: true,
  //   meta: {
  //     title: '用户管理',
  //     icon: 'user-3-line',
  //   },
  //   children: [
  //     {
  //       path: 'masterAccount',
  //       name: 'MasterAccount',
  //       component: () => import('@/views/user/masterAccount'),
  //       meta: {
  //         title: '主账户管理',
  //         icon: 'account-box-line',
  //       },
  //     },
  //     {
  //       path: 'userCard',
  //       name: 'UserCard',
  //       component: () => import('@/views/user/userCard'),
  //       meta: {
  //         title: '用户卡号管理',
  //         icon: 'refund-line',
  //       },
  //     },
  //     {
  //       path: 'userCar',
  //       name: 'UserCar',
  //       component: () => import('@/views/user/userCar'),
  //       meta: {
  //         title: '用户车辆管理',
  //         icon: 'car-fill',
  //       },
  //     },
  //     {
  //       path: 'myhome',
  //       name: 'Myhome',
  //       component: () => import('@/views/user/myHome'),
  //       meta: {
  //         title: '我的一家管理',
  //         icon: 'home-4-line',
  //       },
  //     },
  //     {
  //       path: 'openPush',
  //       name: 'OpenPush',
  //       component: () => import('@/views/user/openPush'),
  //       meta: {
  //         title: '开门推送管理',
  //         icon: 'logout-box-r-line',
  //       },
  //     },
  //     {
  //       path: 'followUser',
  //       name: 'FollowUser',
  //       component: () => import('@/views/user/followUser'),
  //       meta: {
  //         title: '关注人员管理',
  //         icon: 'user-follow-line',
  //       },
  //     },
  //     {
  //       path: 'userWhiteList',
  //       name: 'UserWhiteList',
  //       component: () => import('@/views/user/userWhiteList'),
  //       meta: {
  //         title: '用户白名单',
  //         icon: 'user-follow-line',
  //       },
  //     },
  //     {
  //       path: 'cardBlackList',
  //       name: 'CardBlackList',
  //       component: () => import('@/views/user/cardBlackList'),
  //       meta: {
  //         title: '卡号黑名单',
  //         icon: 'file-list-fill',
  //       },
  //     },
  //     {
  //       path: 'cardWhiteList',
  //       name: 'CardWhiteList',
  //       component: () => import('@/views/user/cardWhiteList'),
  //       meta: {
  //         title: '卡号白名单',
  //         icon: 'file-list-line',
  //       },
  //     },
  //   ],
  // },
  ...User,
  // {
  //   path: '/property',
  //   component: Layout,
  //   redirect: '/property/payment',
  //   alwaysShow: true,
  //   meta: {
  //     title: '物业服务',
  //     icon: 'apps-line',
  //   },
  //   children: [
  //     {
  //       path: 'payment',
  //       name: 'Payment',
  //       component: () => import('@/views/property/payment'),
  //       meta: {
  //         title: '物业缴费',
  //         icon: 'money-cny-box-line',
  //       },
  //     },
  //     {
  //       path: 'houseRent',
  //       name: 'HouseRent',
  //       component: () => import('@/views/property/houseRent'),
  //       meta: {
  //         title: '房屋出租',
  //         icon: 'home-heart-line',
  //       },
  //     },
  //     {
  //       path: 'maintain',
  //       name: 'Maintain',
  //       component: () => import('@/views/property/maintain'),
  //       meta: {
  //         title: '维修管理',
  //         icon: 'tools-line',
  //       },
  //     },
  //     {
  //       path: 'maintainPe',
  //       name: 'MaintainPe',
  //       component: () => import('@/views/property/maintainPe'),
  //       meta: {
  //         title: '维修人员管理',
  //         icon: 'user-settings-line',
  //       },
  //     },
  //     {
  //       path: 'complainAndPraise',
  //       name: 'ComplainAndPraise',
  //       component: () => import('@/views/property/complaintAndPraise'),
  //       meta: {
  //         title: '投诉表扬',
  //         icon: 'feedback-fill',
  //       },
  //     },
  //     {
  //       path: 'rentInfo',
  //       name: 'RentInfo',
  //       component: () => import('@/views/property/rentInfo'),
  //       meta: {
  //         title: '出租信息',
  //         icon: 'folder-info-line',
  //       },
  //     },
  //   ],
  // },
  ...Property,
  // {
  //   path: '/account',
  //   component: Layout,
  //   redirect: '/account/alipay',
  //   alwaysShow: true,
  //   meta: {
  //     title: '账户管理',
  //     icon: 'account-box-line',
  //   },
  //   children: [
  //     {
  //       path: 'alipay',
  //       name: 'Alipay',
  //       component: () => import('@/views/account/alipay'),
  //       meta: {
  //         title: '支付宝绑定管理',
  //         icon: 'alipay-line',
  //       },
  //     },
  //     {
  //       path: 'payout',
  //       name: 'Payout',
  //       component: () => import('@/views/account/payout'),
  //       meta: {
  //         title: '提现管理',
  //         icon: 'money-cny-circle-line',
  //       },
  //     },
  //   ],
  // },
  ...Account,
  // {
  //   path: '/equipmentUse',
  //   component: Layout,
  //   redirect: '/equipmentUse/openDoor',
  //   alwaysShow: true,
  //   meta: {
  //     title: '设备使用管理',
  //     icon: 'terminal-box-line',
  //   },
  //   children: [
  //     {
  //       path: 'openDoor',
  //       name: 'OpenDoor',
  //       component: () => import('@/views/equipmentUse/openDoor'),
  //       meta: {
  //         title: '开门记录',
  //         icon: 'door-open-line',
  //       },
  //     },
  //     {
  //       path: 'dataPush',
  //       name: 'DataPush',
  //       component: () => import('@/views/equipmentUse/dataPush'),
  //       meta: {
  //         title: '数据推送管理',
  //         icon: 'pushpin-line',
  //       },
  //     },
  //     {
  //       path: 'dataPushInfo',
  //       name: 'DataPushInfo',
  //       component: () => import('@/views/equipmentUse/dataPushInfo'),
  //       meta: {
  //         title: '数据推送情况查看',
  //         icon: 'pushpin-2-line',
  //       },
  //     },
  //     {
  //       path: 'monitorEquip',
  //       name: 'MonitorEquip',
  //       component: () => import('@/views/equipmentUse/monitorEquip'),
  //       meta: {
  //         title: '监控设备使用管理',
  //         icon: 'mac-line',
  //       },
  //     },
  //     {
  //       path: 'locationEquip',
  //       name: 'LocationEquip',
  //       component: () => import('@/views/equipmentUse/loactionEquip'),
  //       meta: {
  //         title: '定位设备使用管理',
  //         icon: 'map-pin-line',
  //       },
  //     },
  //     {
  //       path: 'combinationLock',
  //       name: 'CombinationLock',
  //       component: () => import('@/views/equipmentUse/combinationLock'),
  //       meta: {
  //         title: '密码锁使用管理',
  //         icon: 'git-repository-private-line',
  //       },
  //     },
  //     {
  //       path: 'openInfoEx',
  //       name: 'OpenInfoEx',
  //       component: () => import('@/views/equipmentUse/openInfoEx'),
  //       meta: {
  //         title: '开门数据导出',
  //         icon: 'folder-open-line',
  //       },
  //     },
  //     {
  //       path: 'tempInfo',
  //       name: 'TempInfo',
  //       component: () => import('@/views/equipmentUse/tempInfo'),
  //       meta: {
  //         title: '温度记录',
  //         icon: 'test-tube-line',
  //       },
  //     },
  //   ],
  // },
  ...EquipmentUse,
  // {
  //   path: '/equipment',
  //   component: Layout,
  //   redirect: '/equipment/openDoor',
  //   alwaysShow: true,
  //   meta: {
  //     title: '设备管理',
  //     icon: 'code-box-line',
  //   },
  //   children: [
  //     {
  //       path: 'cloudBoxAd',
  //       name: 'CloudBoxAd',
  //       component: () => import('@/views/equipment/cloudBoxAd'),
  //       meta: {
  //         title: '云盒管理',
  //         icon: 'checkbox-multiple-blank-line',
  //       },
  //     },
  //     {
  //       path: 'cloudBox',
  //       name: 'CloudBox',
  //       component: () => import('@/views/equipment/cloudBox'),
  //       meta: {
  //         title: '云盒3.0',
  //         icon: 'checkbox-multiple-line',
  //       },
  //     },
  //     {
  //       path: 'creditCard',
  //       name: 'CreditCard',
  //       component: () => import('@/views/equipment/creditCard'),
  //       meta: {
  //         title: '刷卡一体机',
  //         icon: 'refund-line',
  //       },
  //     },
  //     {
  //       path: 'monitorEquip',
  //       name: 'MonitorEquip',
  //       component: () => import('@/views/equipment/monitorEquip'),
  //       meta: {
  //         title: '监控设备管理',
  //         icon: 'mac-line',
  //       },
  //     },
  //     {
  //       path: 'cloudScreenEquip',
  //       name: 'CloudScreenEquip',
  //       component: () => import('@/views/equipment/cloudScreenEquip'),
  //       meta: {
  //         title: '云屏设备管理',
  //         icon: 'computer-line',
  //       },
  //     },
  //     {
  //       path: 'cloudScreenAds',
  //       name: 'CloudScreenAds',
  //       component: () => import('@/views/equipment/cloudScreenAds'),
  //       meta: {
  //         title: '云屏广告管理',
  //         icon: 'computer-fill',
  //       },
  //     },
  //     {
  //       path: 'faceMachineA',
  //       name: 'faceMachineA',
  //       component: () => import('@/views/equipment/faceMachineA'),
  //       meta: {
  //         title: '人脸一体机(1403-A)',
  //         icon: 'shield-user-line',
  //       },
  //     },
  //     {
  //       path: 'smokeDetector',
  //       name: 'SmokeDetector',
  //       component: () => import('@/views/equipment/SmokeDetector'),
  //       meta: {
  //         title: '烟感管理',
  //         icon: 'remote-control-line',
  //       },
  //     },
  //     {
  //       path: 'elderCloudBox',
  //       name: 'ElderCloudBox',
  //       component: () => import('@/views/equipment/elderCloudBox'),
  //       meta: {
  //         title: '长者云盒',
  //         icon: 'user-5-line',
  //       },
  //     },
  //     {
  //       path: 'faceCamera',
  //       name: 'FaceCamera',
  //       component: () => import('@/views/equipment/faceCamera'),
  //       meta: {
  //         title: '人脸摄像机管理',
  //         icon: 'vidicon-2-line',
  //       },
  //     },
  //     {
  //       path: 'faceMachineH',
  //       name: 'FaceMachineH',
  //       component: () => import('@/views/equipment/faceMachineH'),
  //       meta: {
  //         title: '人脸一体机(1403-H)',
  //         icon: 'shield-user-line',
  //       },
  //     },
  //     {
  //       path: 'faceMachineH2',
  //       name: 'FaceMachineH2',
  //       component: () => import('@/views/equipment/faceMachineH2'),
  //       meta: {
  //         title: '人脸一体机(1403-H-2)',
  //         icon: 'shield-user-line',
  //       },
  //     },
  //     {
  //       path: 'faceMachineEH',
  //       name: 'FaceMachineEH',
  //       component: () => import('@/views/equipment/faceMachineEH'),
  //       meta: {
  //         title: '人脸一体机(E-Home)',
  //         icon: 'shield-user-line',
  //       },
  //     },
  //     {
  //       path: 'superBrain',
  //       name: 'SuperBrain',
  //       component: () => import('@/views/equipment/superBrain'),
  //       meta: {
  //         title: '超脑设备',
  //         icon: 'brain-fill',
  //       },
  //     },
  //     {
  //       path: 'dineck',
  //       name: 'Dineck',
  //       component: () => import('@/views/equipment/Dineck'),
  //       meta: {
  //         title: '狄耐克设备',
  //         icon: 'code-box-line',
  //       },
  //     },
  //     {
  //       path: 'haikang',
  //       name: 'Haikang',
  //       component: () => import('@/views/equipment/HaiKang'),
  //       meta: {
  //         title: '保障房海康门口机',
  //         icon: 'home-7-line',
  //       },
  //     },
  //     {
  //       path: 'doorMagnet',
  //       name: 'DoorMagnet',
  //       component: () => import('@/views/equipment/doorMagnet'),
  //       meta: {
  //         title: '门磁管理',
  //         icon: 'door-lock-box-line',
  //       },
  //     },
  //   ],
  // },
  ...Equipment,
  // {
  //   path: '/operation',
  //   component: Layout,
  //   redirect: '/operation/information',
  //   alwaysShow: true,
  //   meta: {
  //     title: '运营管理',
  //     icon: 'folder-info-line',
  //   },
  //   children: [
  //     {
  //       path: 'information',
  //       name: 'Information',
  //       component: () => import('@/views/operation/information'),
  //       meta: {
  //         title: '资讯管理',
  //         icon: 'folder-info-fill',
  //       },
  //     },
  //     {
  //       path: 'client',
  //       name: 'Client',
  //       component: () => import('@/views/operation/client'),
  //       meta: {
  //         title: '客户端管理',
  //         icon: 'computer-line',
  //       },
  //     },
  //     {
  //       path: 'rabbitClose',
  //       name: 'RabbitClose',
  //       component: () => import('@/views/operation/rabbitClose'),
  //       meta: {
  //         title: '小兔关门管理',
  //         icon: 'door-closed-line',
  //       },
  //     },
  //     {
  //       path: 'rabbitCloseInfo',
  //       name: 'RabbitCloseInfo',
  //       component: () => import('@/views/operation/rabbitCloseInfo'),
  //       meta: {
  //         title: '小兔关门资讯管理',
  //         icon: 'door-closed-fill',
  //       },
  //     },
  //     {
  //       path: 'feedbackList',
  //       name: 'FeedbackList',
  //       component: () => import('@/views/operation/feedbackList'),
  //       meta: {
  //         title: '反馈列表',
  //         icon: 'feedback-line',
  //       },
  //     },
  //   ],
  // },
  ...Operation,
  // {
  //   path: '/project',
  //   component: Layout,
  //   redirect: '/project/projectList',
  //   alwaysShow: true,
  //   meta: {
  //     title: '项目管理',
  //     icon: 'book-line',
  //   },
  //   children: [
  //     {
  //       path: 'projectList',
  //       name: 'ProjectList',
  //       component: () => import('@/views/project/projectList'),
  //       meta: {
  //         title: '项目列表',
  //         icon: 'book-mark-line',
  //       },
  //     },
  //   ],
  // },
  ...Project,
  // {
  //   path: '/error',
  //   name: 'Error',
  //   component: Layout,
  //   redirect: '/error/403',
  //   meta: {
  //     title: '错误页',
  //     icon: 'error-warning-line',
  //   },
  //   children: [
  //     {
  //       path: '403',
  //       name: 'Error403',
  //       component: () => import('@/views/403'),
  //       meta: {
  //         title: '403',
  //         icon: 'error-warning-line',
  //       },
  //     },
  //     {
  //       path: '404',
  //       name: 'Error404',
  //       component: () => import('@/views/404'),
  //       meta: {
  //         title: '404',
  //         icon: 'error-warning-line',
  //       },
  //     },
  //   ],
  // },
  {
    path: '/*',
    redirect: '/404',
    hidden: true,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
