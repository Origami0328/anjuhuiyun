import Layout from '@/layout'
const Equipment = [
  {
    path: '/equipment',
    component: Layout,
    redirect: '/equipment/openDoor',
    alwaysShow: true,
    meta: {
      title: '设备管理',
      icon: 'code-box-line',
    },
    children: [
      {
        path: 'cloudBoxAd',
        name: 'CloudBoxAd',
        component: () => import('@/views/equipment/cloudBoxAd'),
        meta: {
          title: '云盒管理',
          icon: 'checkbox-multiple-blank-line',
        },
      },
      {
        path: 'cloudBox',
        name: 'CloudBox',
        component: () => import('@/views/equipment/cloudBox'),
        meta: {
          title: '云盒3.0',
          icon: 'checkbox-multiple-line',
        },
      },
      {
        path: 'creditCard',
        name: 'CreditCard',
        component: () => import('@/views/equipment/creditCard'),
        meta: {
          title: '刷卡一体机',
          icon: 'refund-line',
        },
      },
      {
        path: 'monitorEquip',
        name: 'MonitorEquip',
        component: () => import('@/views/equipment/monitorEquip'),
        meta: {
          title: '监控设备管理',
          icon: 'mac-line',
        },
      },
      {
        path: 'cloudScreenEquip',
        name: 'CloudScreenEquip',
        component: () => import('@/views/equipment/cloudScreenEquip'),
        meta: {
          title: '云屏设备管理',
          icon: 'computer-line',
        },
      },
      {
        path: 'cloudScreenAds',
        name: 'CloudScreenAds',
        component: () => import('@/views/equipment/cloudScreenAds'),
        meta: {
          title: '云屏广告管理',
          icon: 'computer-fill',
        },
      },
      {
        path: 'faceMachineA',
        name: 'faceMachineA',
        component: () => import('@/views/equipment/faceMachineA'),
        meta: {
          title: '人脸一体机(1403-A)',
          icon: 'shield-user-line',
        },
      },
      {
        path: 'smokeDetector',
        name: 'SmokeDetector',
        component: () => import('@/views/equipment/SmokeDetector'),
        meta: {
          title: '烟感管理',
          icon: 'remote-control-line',
        },
      },
      {
        path: 'elderCloudBox',
        name: 'ElderCloudBox',
        component: () => import('@/views/equipment/elderCloudBox'),
        meta: {
          title: '长者云盒',
          icon: 'user-5-line',
        },
      },
      {
        path: 'faceCamera',
        name: 'FaceCamera',
        component: () => import('@/views/equipment/faceCamera'),
        meta: {
          title: '人脸摄像机管理',
          icon: 'vidicon-2-line',
        },
      },
      {
        path: 'faceMachineH',
        name: 'FaceMachineH',
        component: () => import('@/views/equipment/faceMachineH'),
        meta: {
          title: '人脸一体机(1403-H)',
          icon: 'shield-user-line',
        },
      },
      {
        path: 'faceMachineH2',
        name: 'FaceMachineH2',
        component: () => import('@/views/equipment/faceMachineH2'),
        meta: {
          title: '人脸一体机(1403-H-2)',
          icon: 'shield-user-line',
        },
      },
      {
        path: 'faceMachineEH',
        name: 'FaceMachineEH',
        component: () => import('@/views/equipment/faceMachineEH'),
        meta: {
          title: '人脸一体机(E-Home)',
          icon: 'shield-user-line',
        },
      },
      {
        path: 'superBrain',
        name: 'SuperBrain',
        component: () => import('@/views/equipment/superBrain'),
        meta: {
          title: '超脑设备',
          icon: 'brain-fill',
        },
      },
      {
        path: 'dineck',
        name: 'Dineck',
        component: () => import('@/views/equipment/Dineck'),
        meta: {
          title: '狄耐克设备',
          icon: 'code-box-line',
        },
      },
      {
        path: 'haikang',
        name: 'Haikang',
        component: () => import('@/views/equipment/HaiKang'),
        meta: {
          title: '保障房海康门口机',
          icon: 'home-7-line',
        },
      },
      {
        path: 'doorMagnet',
        name: 'DoorMagnet',
        component: () => import('@/views/equipment/doorMagnet'),
        meta: {
          title: '门磁管理',
          icon: 'door-lock-box-line',
        },
      },
    ],
  },
]
export default Equipment
