import Layout from '@/layout'
const Account = [
  {
    path: '/account',
    component: Layout,
    redirect: '/account/alipay',
    alwaysShow: true,
    meta: {
      title: '账户管理',
      icon: 'account-box-line',
    },
    children: [
      {
        path: 'alipay',
        name: 'Alipay',
        component: () => import('@/views/account/alipay'),
        meta: {
          title: '支付宝绑定管理',
          icon: 'alipay-line',
        },
      },
      {
        path: 'payout',
        name: 'Payout',
        component: () => import('@/views/account/payout'),
        meta: {
          title: '提现管理',
          icon: 'money-cny-circle-line',
        },
      },
    ],
  },
]
export default Account
