<template>
  <div class="event-container container">
    <h1>{{nickname}}的动态</h1>
    <div class="event-list">
      <EventItem v-for="(item, index) in events"
        :key="index"
        :item="item"
        @refClick="handleRefClick">
        <PicList slot="picList" :pics="item.pics" />
        <Comment slot="comment" :comments="item.info.comments"/>
      </EventItem>
    </div>
  </div>
</template>

<script>
import EventItem from './childComps/EventItem.vue'
import PicList from '@/components/content/PicList.vue'
import Comment from '@/components/content/Comment/Comment.vue'

import { _getSongUrlById } from '@/network/song.js'
import { _getSongsByListId } from '@/network/playlist.js'
import {
  _getUserDetail,
  _getUserEvent
} from '@/network/user.js'

export default {
  name: 'UserEvent',
  components: { EventItem, PicList, Comment },
  data () {
    return {
      uid: null,
      nickname: '',
      events: [],
      lasttime: -1,
      more: false
    }
  },
  created () {},
  activated () {
    this.uid = this.$route.query.uid
    this.getUserDetail(this.uid)
    this.getUserEvent(this.uid)
  },
  methods: {
    // 网络请求相关方法
    /**
     * 获取用户详情
     */
    async getUserDetail (uid) {
      const { data: res } = await _getUserDetail(uid)
      this.nickname = res.profile.nickname
    },
    /**
     * 获取用户动态
     */
    async getUserEvent (uid, limit, lasttime) {
      const { data: res } = await _getUserEvent(uid, limit, lasttime)
      this.events = res.events
      this.lasttime = res.lasttime
      this.more = res.more
      console.log(this.events[2])
    },
    /**
     * 获取歌单对应的歌曲
     */
    async getSongsByListId (id) {
      const { data: res } = await _getSongsByListId(id)
      const songs = res.songs
      songs.forEach(async v => {
        const { data: res } = await _getSongUrlById(v.id)
        v.url = res.data[0].url
      })
      this.$store.commit('resetPlayList', { songs })
    },

    // 事件监听相关方法
    /**
     * 子组件引用资源点击事件
     */
    async handleRefClick (...params) {
      const type = params[1]
      const json = params[0]
      // 判断引用数据类型 歌曲 歌单
      if (type === 18) {
        const song = json.song
        // 根据id获取歌曲url
        const { data: res } = await _getSongUrlById(song.id)
        const content = {
          id: song.id,
          url: res.data[0].url,
          name: song.name,
          ar: song.artists,
          al: song.album,
          dt: song.duration
        }
        this.$store.commit('setContent', content)
      } else if (type === 13) {
        // const playlist = json.playlist
        // console.log('歌单', playlist)
        this.getSongsByListId(json.playlist.id)
      } else if (type === 17) {
        const program = json.program
        console.log('电台', program)
      } else {
        console.log('其他类型', type, json)
      }
    }
  }
}
</script>

<style lang="less" scoped>
h1 {
  margin-bottom: 20px;
}
</style>
