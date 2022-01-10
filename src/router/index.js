import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Layout.vue'),
    redirect: 'home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
