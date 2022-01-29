<template>
  <div class="rec-container container">
    <!-- 轮播图模块 -->
    <el-carousel :interval="5000" type="card" height="175px">
      <el-carousel-item v-for="item in banners" :key="item.targetId">
        <div @click="handleItemClick(item)"><el-image :src="item.imageUrl" fit="cover" class="item-img"></el-image></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播图模块/ -->
    <!-- 推荐歌单模块 -->
    <PlaylistGroup title="推荐歌单" :list="personalizedList" />
    <!-- 推荐歌单模块/ -->
    <!-- 热门播客单模块 -->
    <SongGroup title="热门播客" :list="newSongs" :column="2" />
    <!-- 热门播客单模块/ -->
    <!-- 独家放送模块 -->
    <PlaylistGroup title="独家放送" :list="privateContent" :column="3" />
    <!-- 独家放送模块/ -->
    <!-- 最新音乐模块 -->
    <SongGroup title="最新音乐" :list="newSongs" :column="3" />
    <!-- 最新音乐模块/ -->
    <PlaylistGroup title="推荐MV" :list="personalizedMv" :column="4" />
    <PlaylistGroup title="听听" />
    <PlaylistGroup title="看看" />
  </div>
</template>

<script>
import PlaylistGroup from '@/components/content/PlaylistGroup/PlaylistGroup.vue'
import SongGroup from '@/components/content/SongGroup/SongGroup.vue'

import {
  _getBanner,
  _getPersonalized,
  _getPrivateContent,
  _getNewSong,
  _getDaySongs,
  _getPersonalizedMv
} from '@/network/discover.js'

import {
  _getSongsByIds,
  _getSongUrlById
} from '@/network/song.js'

export default {
  name: 'Discover',
  components: { PlaylistGroup, SongGroup },
  data () {
    return {
      banners: [], // 轮播图数据
      personalizedList: [
        {
          name: '每日歌曲推荐',
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
    /** 获取轮播图数据 */
    async getBanner () {
      const { data: res } = await _getBanner()
      this.banners = res.banners
    },

    /** 获取推荐歌单数据 */
    async getPersonalized (config) {
      const { data: res } = await _getPersonalized(config)
      this.personalizedList.push(...res.result.slice(0, 9))
    },

    /** 获取独家放送数据 */
    async getPrivateContent () {
      const { data: res } = await _getPrivateContent()
      this.privateContent = res.result
    },

    /** 获取推荐新音乐 */
    async getNewSong () {
      const { data: res } = await _getNewSong()
      // console.log(res)
      this.newSongs = res.result
    },

    /** 获取最新歌曲 */
    // async getTopSongs (type) {
    //   const { data: res } = await _getTopSongs(type)
    //   console.log(res)
    //   this.topSongs = res.result
    // },

    /** 获取推荐播客 */
    // async getPersonalizedDj () {
    //   const { data: res } = await _getPersonalizedDj()
    //   this.personalizedDj = res.result
    //   console.log(this.personalizedDj)
    // },

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
</style>
