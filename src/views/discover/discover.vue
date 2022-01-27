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
    <VlogGroup title="热门播客" :list="newSongs" :column="2" />
    <!-- 热门播客单模块/ -->
    <!-- 独家放送模块 -->
    <PlaylistGroup title="独家放送" />
    <!-- 独家放送模块/ -->
    <!-- 最新音乐模块 -->
    <VlogGroup title="最新音乐" :list="newSongs" :column="3" />
    <!-- 最新音乐模块/ -->
    <PlaylistGroup title="推荐MV" />
    <PlaylistGroup title="听听" />
    <PlaylistGroup title="看看" />
  </div>
</template>

<script>
import PlaylistGroup from '@/components/content/PlaylistGroup/PlaylistGroup.vue'
import VlogGroup from '@/components/content/VlogGroup/VlogGroup.vue'

import {
  _getBanner,
  _getPersonalized,
  _getPrivateContent,
  _getNewSong,
  _getTopSongs
} from '@/network/discover.js'

export default {
  name: 'Discover',
  components: { PlaylistGroup, VlogGroup },
  data () {
    return {
      banners: [], // 轮播图数据
      personalizedList: [
        {
          name: '每日歌曲推荐',
          imageUrl: '#'
        }
      ], // 推荐歌单
      vlogListData: [],
      newSongs: [] // 推荐最新音乐
    }
  },
  computed: {},
  created () {
    this.getBanner()
    this.getPersonalized('')
    this.getPrivateContent()
    this.getNewSong()
    this.getTopSongs(1)
  },
  mounted () {},
  methods: {
    /** 获取轮播图数据 */
    async getBanner () {
      const { data: res } = await _getBanner()
      this.banners = res.banners
      // console.log(this.banners)
    },

    /** 获取推荐歌单数据 */
    async getPersonalized (config) {
      const { data: res } = await _getPersonalized(config)
      this.personalizedList.push(...res.result.slice(0, 9))
    },

    /** 获取独家放送数据 */
    async getPrivateContent () {
      const { data: res } = await _getPrivateContent()
      console.log(res)
    },

    /** 获取推荐新音乐 */
    async getNewSong () {
      const { data: res } = await _getNewSong()
      // console.log(res)
      this.newSongs = res.result
    },

    /** 获取最新歌曲 */
    async getTopSongs (type) {
      const { data: res } = await _getTopSongs(type)
      console.log(res)
    },

    onBtnClick () {
      console.log('BtnClick')
    },

    handleItemClick (item) {
      console.log(item)
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

// .title a {
//   display: flex;
//   align-items: center;
//   h3 {
//     margin: 5px;
//   }
// }
</style>
