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
            path: 'djradio',
            name: 'DjRadio',
            component: () => import(/* webpackChunkName: "home" */ '@/views/discover/djradio.vue')
          },
          { // 歌单
            path: 'playlist',
            name: 'Playlist',
            component: () => import(/* webpackChunkName: "home" */ '@/views/discover/playlist.vue')
          },
          { // 排行榜
            path: 'toplist',
            name: 'Toplist',
            component: () => import(/* webpackChunkName: "home" */ '@/views/discover/toplist.vue')
          },
          { // 歌手
            path: 'artists',
            name: 'Artists',
            component: () => import(/* webpackChunkName: "home" */ '@/views/discover/artists.vue')
          },
          { // 新歌
            path: 'newest',
            name: 'Newest',
            component: () => import(/* webpackChunkName: "home" */ '@/views/discover/newest.vue')
          }
        ]
      },
      {
        path: '/vlog',
        name: 'Vlog',
        component: () => import(/* webpackChunkName: "home" */ '@/views/vlog/index.vue')
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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
