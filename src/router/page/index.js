import Store from '@/store/'
import Layout from '@/page/index/index.vue'

export default [
  {
    path: '/login',
    name: '登录页',
    component: () => import('@/page/login/index.vue'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false,
    },
  },
  // {
  //   path: '/lock',
  //   name: '锁屏页',
  //   component: () => import('@/page/lock/index.vue'),
  //   meta: {
  //     keepAlive: true,
  //     isTab: false,
  //     isAuth: false,
  //   },
  // },
  {
    path: '/404',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/components/ErrorPage/404.vue'),
    name: '404',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: '/403',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/components/ErrorPage/403.vue'),
    name: '403',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: '/500',
    component: () => import( /* webpackChunkName: "page" */ '@/components/ErrorPage/500.vue'),
    name: '500',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/custom/customer/index',
    children: [
      {
        path: '/custom/customer/index',
        name: '客户列表',
        component: () => import( /* webpackChunkName: "views" */ '@/views/custom/customer/index.vue'),
      },
    ],
  },
  // {
  //   path: '/iframe',
  //   component: Layout,
  //   redirect: '/iframe',
  //   children: [
  //     {
  //       path: '',
  //       name: '',
  //       component: () =>
  //         import( /* webpackChunkName: "views" */ '@/components/Iframe/main.vue'),
  //     }],
  // },
  {
    path: '/info',
    component: Layout,
    redirect: '/info/index',
    children: [
      {
        path: 'index',
        name: '个人信息',
        component: () =>
          import ( /* webpackChunkName: "views" */ '@/views/admin/user/info.vue'),
      }],
  },
]
