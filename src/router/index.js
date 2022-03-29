import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import(/* webpackChunkName: "home" */ '@/views/layout/index.vue'),
    redirect: 'discover',
    children: [
      {
        path: '/discover',
        name: 'DiscoverIndex',
        component: () => import(/* webpackChunkName: "home" */ '@/views/discover/index.vue'),
        children: [
          {
            path: '/',
            name: 'Discover',
            component: () => import(/* webpackChunkName: "home" */ '@/views/discover/discover.vue')
          },
          { // 专属定制
            path: 'djradios',
            name: 'DjRadios',
            component: () => import(/* webpackChunkName: "home" */ '@/views/discover/djradios.vue')
          },
          { // 歌单
            path: 'playlists',
            name: 'Playlists',
            component: () => import(/* webpackChunkName: "home" */ '@/views/discover/playlists.vue')
          },
          { // 排行榜
            path: 'toplists',
            name: 'Toplists',
            component: () => import(/* webpackChunkName: "home" */ '@/views/discover/toplists.vue')
          },
          { // 歌手
            path: 'artists',
            name: 'Artists',
            component: () => import(/* webpackChunkName: "home" */ '@/views/discover/artists.vue')
          },
          { // 新歌
            path: 'newests',
            name: 'Newests',
            component: () => import(/* webpackChunkName: "home" */ '@/views/discover/newests.vue')
          }
        ]
      },
      {
        path: '/vlog',
        name: 'Vlog',
        component: () => import(/* webpackChunkName: "home" */ '@/views/vlog/index.vue')
      },
      {
        path: '/video',
        name: 'Video',
        component: () => import(/* webpackChunkName: "home" */ '@/views/video/index.vue'),
        // redirect: 'list',
        children: [
          {
            path: '/',
            name: 'VideoList',
            component: () => import(/* webpackChunkName: "home" */ '@/views/video/VideoList.vue')
          },
          {
            path: 'mv',
            name: 'MVList',
            component: () => import(/* webpackChunkName: "home" */ '@/views/video/MVList.vue')
          }
        ]
      },
      {
        path: '/playlist',
        name: 'Playlist',
        component: () => import(/* webpackChunkName: "home" */ '@/views/playlist/index.vue')
      },
      {
        path: '/artist',
        name: 'Artist',
        component: () => import(/* webpackChunkName: "home" */ '@/views/artist/index.vue')
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import(/* webpackChunkName: "home" */ '@/views/search/index.vue')
      },
      {
        path: '/user/home',
        name: 'UserIndex',
        component: () => import(/* webpackChunkName: "home" */ '@/views/user/index.vue')
      },
      {
        path: '/dujia',
        name: 'DujiaIndex',
        component: () => import(/* webpackChunkName: "home" */ '@/views/dujia/index.vue')
      }
      // {
      //   path: '/user/events', // 动态
      //   name: 'UserEvents',
      //   component: () => import(/* webpackChunkName: "home" */ '@/views/user/event.vue')
      // }
      // {
      //   path: '/user/follows', // 关注
      //   name: 'UserFollows',
      //   component: () => import(/* webpackChunkName: "home" */ '@/views/user/event.vue')
      // }
      // {
      //   path: '/user/fans', // 粉丝
      //   name: 'UserFans',
      //   component: () => import(/* webpackChunkName: "home" */ '@/views/user/event.vue')
      // }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "home" */ '@/views/login/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
