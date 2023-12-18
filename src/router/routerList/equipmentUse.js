import Layout from '@/layout'
const EquipmentUse = [
  {
    path: '/equipmentUse',
    component: Layout,
    redirect: '/equipmentUse/openDoor',
    alwaysShow: true,
    meta: {
      title: '设备使用管理',
      icon: 'terminal-box-line',
    },
    children: [
      {
        path: 'openDoor',
        name: 'OpenDoor',
        component: () => import('@/views/equipmentUse/openDoor'),
        meta: {
          title: '开门记录',
          icon: 'door-open-line',
        },
      },
      {
        path: 'dataPush',
        name: 'DataPush',
        component: () => import('@/views/equipmentUse/dataPush'),
        meta: {
          title: '数据推送管理',
          icon: 'pushpin-line',
        },
      },
      {
        path: 'dataPushInfo',
        name: 'DataPushInfo',
        component: () => import('@/views/equipmentUse/dataPushInfo'),
        meta: {
          title: '数据推送情况查看',
          icon: 'pushpin-2-line',
        },
      },
      {
        path: 'monitorEquip',
        name: 'Monitor',
        component: () => import('@/views/equipmentUse/monitorEquip'),
        meta: {
          title: '监控设备使用管理',
          icon: 'mac-line',
        },
      },
      {
        path: 'locationEquip',
        name: 'LocationEquip',
        component: () => import('@/views/equipmentUse/loactionEquip'),
        meta: {
          title: '定位设备使用管理',
          icon: 'map-pin-line',
        },
      },
      {
        path: 'combinationLock',
        name: 'CombinationLock',
        component: () => import('@/views/equipmentUse/combinationLock'),
        meta: {
          title: '密码锁使用管理',
          icon: 'git-repository-private-line',
        },
      },
      {
        path: 'openInfoEx',
        name: 'OpenInfoEx',
        component: () => import('@/views/equipmentUse/openInfoEx'),
        meta: {
          title: '开门数据导出',
          icon: 'folder-open-line',
        },
      },
      {
        path: 'tempInfo',
        name: 'TempInfo',
        component: () => import('@/views/equipmentUse/tempInfo'),
        meta: {
          title: '温度记录',
          icon: 'test-tube-line',
        },
      },
    ],
  },
]
export default EquipmentUse
