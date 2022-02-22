<template>
  <div class="rec-container container">
    <!-- 轮播图模块 -->
    <el-carousel :interval="5000" type="card" height="175px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div @click="handleItemClick(item)"><el-image :src="item.imageUrl" fit="cover" class="item-img"></el-image></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播图模块/ -->
    <!-- 推荐歌单模块 -->
    <Title title="推荐歌单" path="/playlist" />
    <ul class="list-wrap" v-if="personalizedList.length > 1">
      <CoverItem v-for="item in personalizedList"
        :key="item.id"
        :item="item"
        :column="5"
        showBtn="hover"
        @btnClick="handleBtnClick"
        @itemClick="handleCoverClick"/>
    </ul>
    <!-- 推荐歌单模块/ -->
    <!-- 热门播客单模块 -->
    <SongGroup title="热门播客" :list="newSongs" :column="2" />
    <!-- 热门播客单模块/ -->
    <!-- 独家放送模块 -->
    <Title title="独家放送" />
    <ul class="list-wrap" v-if="privateContent.length > 0">
      <CoverItem v-for="item in privateContent"
        :key="item.id"
        :item="item"
        :column="3"
        showBtn="fixed"
        @btnClick="handleBtnClick"
        @itemClick="handleCoverClick"/>
    </ul>
    <!-- 独家放送模块/ -->
    <!-- 最新音乐模块 -->
    <SongGroup title="最新音乐" :list="newSongs" :column="3" />
    <Title title="推荐MV" />
    <ul class="list-wrap" v-if="personalizedMv.length > 0">
      <CoverItem v-for="item in personalizedMv"
        :key="item.id"
        :item="item"
        :column="4"
        @itemClick="handleCoverClick"/>
    </ul>
    <!-- 最新音乐模块/ -->
    <Title title="听听" />
    <Title title="看看" />
  </div>
</template>

<script>
import Title from '@/components/content/Title/Title.vue'
import CoverItem from '@/components/content/Cover/CoverItem.vue'
import SongGroup from '@/components/content/SongGroup/SongGroup.vue'

import {
  _getBanner,
  _getPersonalized,
  _getPrivateContent,
  _getNewSong,
  _getDaySongs,
  _getPersonalizedMv
} from '@/network/discover.js'

import { _getSongsByListId } from '@/network/playlist.js'

import {
  _getSongsByIds,
  _getSongUrlById
} from '@/network/song.js'

export default {
  name: 'Discover',
  components: { Title, CoverItem, SongGroup },
  data () {
    return {
      banners: [], // 轮播图数据
      personalizedList: [
        {
          name: '每日歌曲推荐',
          id: 123,
          picUrl: '/image/default.png'
        }
      ], // 推荐歌单
      privateContent: [],
      newSongs: [], // 推荐最新音乐
      // personalizedDj: [] // 推荐播客
      daySongs: [],
      topSongs: [],
      personalizedMv: []
    }
  },
  computed: {},
  created () {
    this.getBanner()
    this.getPersonalized('')
    this.getPrivateContent()
    this.getNewSong()
    // this.getTopSongs()
    // this.getDaySongs() // 需要登录
    this.getPersonalizedMv()
  },
  mounted () {},
  methods: {
    /**
     * 获取轮播图数据
     */
    async getBanner () {
      const { data: res } = await _getBanner()
      this.banners = res.banners
    },

    /**
     * 获取推荐歌单数据
     */
    async getPersonalized (config) {
      const { data: res } = await _getPersonalized(config)
      this.personalizedList.push(...res.result.slice(0, 9))
    },

    /**
     * 获取独家放送数据
     */
    async getPrivateContent () {
      const { data: res } = await _getPrivateContent()
      this.privateContent = res.result
    },

    /**
     * 获取推荐新音乐
     */
    async getNewSong () {
      const { data: res } = await _getNewSong()
      // console.log(res)
      this.newSongs = res.result
    },

    async getSongsByListId (id) {
      const { data: res } = await _getSongsByListId(id)
      const songs = res.songs
      songs.forEach(async v => {
        const { data: res } = await _getSongUrlById(v.id)
        v.url = res.data[0].url
      })
      this.$store.commit('resetPlayList', songs)
    },

    async getDaySongs () {
      const { data: res } = await _getDaySongs()
      // console.log(res)
      this.daySongs = res.result
    },

    async getPersonalizedMv () {
      const { data: res } = await _getPersonalizedMv()
      // console.log(res)
      this.personalizedMv = res.result
    },

    onBtnClick () {
      console.log('BtnClick')
    },

    /** 点击轮播图 */
    async handleItemClick (item) {
      console.log(item)
      if (item.targetType === 1) {
        if (this.$store.state.playList.findIndex(v => v.id === item.id) >= 0) return console.log('已存在')
        const { data: res } = await _getSongsByIds(item.targetId)
        const song = res.songs[0]
        const { data: res2 } = await _getSongUrlById(song.id)
        song.url = res2.data[0].url
        this.$store.commit('setContent', song)
      } else if (item.targetType === 10) {
        // https://music.163.com/#/album?id=90049201
        return console.log('获取专辑信息，跳转到专辑页面', item.targetType)
      } else {
        // 1004
        return console.log('跳转页面', item.targetType, item.url)
      }
    },

    /**
     * 歌单播放按钮点击事件
     */
    handleBtnClick (item) {
      // console.log('播放歌单',item)
      this.$store.commit('setPlayListInfo', item)
      this.getSongsByListId(item.id)
    },

    /**
     * 歌单封面点击事件
     */
    handleCoverClick (id) {
      console.log('跳转到歌单详情页')
      this.$router.push({
        path: '/playlist',
        params: { id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.item-img {
  border-radius: 5px;
  overflow: hidden;
}

/deep/ .el-carousel__button {
  width: 6px;
  height: 6px;
  border-radius: 3px;
}

.list-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
