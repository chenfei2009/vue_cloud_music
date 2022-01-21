import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import(/* webpackChunkName: "home" */ '@/views/layout/index.vue'),
    redirect: 'home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
      },
      {
        path: '/vlog',
        name: 'Vlog',
        component: () => import(/* webpackChunkName: "home" */ '@/views/vlog/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
