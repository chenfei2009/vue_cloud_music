<template>
  <div class="search-container container" ref="searchRef">
    <h1 class="title">搜索 {{searchWord}}</h1>
    <!-- 搜索推荐 -->
    <div class="multi-match">
      <div class="match-title">你可能感兴趣</div>
      <!-- 头像 歌手 粉丝 歌曲 -->
      <div class="match-item br5" v-if="multiMatch.artist">
        <el-image class="ar-avator"
          fit="cover"
          :src="multiMatch.artist[0].picUrl"/>
        <div class="ar-right">
          <div class="ar-name">
            <span>歌手：{{multiMatch.artist[0].name}}</span>
            <span class="text-small"> ({{multiMatch.artist[0].alias[0]}})</span>
          </div>
          <span class="text-small">粉丝：{{multiMatch.artist[0].fansSize}}</span>
          <span class="text-small">歌曲：{{multiMatch.artist[0].musicSize}}</span>
        </div>
      </div>
    </div>
    <!-- /搜索推荐 -->
    <!-- tab选项卡 -->
    <tab-bar>
      <tab-bar-item v-for="item in tabs"
        :key="item.id"
        :id="item.id"
        :currentIndex="currentIndex"
        @tabClick="handleTabClick"
        ><div slot="item-text">{{item.text}}</div></tab-bar-item>
    </tab-bar>
    <!-- tab选项卡/ -->
    <!-- 单曲 选项卡 -->
    <section v-if="currentIndex === 1" v-loading="loading">
      <songs-table :songs="songs"
        name="热门50首"
        :showHeader="true"
        :showIndex="true"
        :showAction="true"
        :showArtist="true"
        :showAlbum="true"
        :showPop="true"
        :search="searchWord"
        @rowDbClick="handleRowDbClick"/>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="100"
        :total="songCount"
        @current-change="curChange">
      </el-pagination>
    </section>
    <!-- /单曲 选项卡 -->
    <!-- 歌手 选项卡 -->
    <section v-else-if="currentIndex===2" v-loading="loading">
      <ul>
        <li v-for="item in artists"
          :key="item.id"
          class="list-item"
          @click="handleItemClick(item.id)">
          <cover class="item-avator"
            :picUrl="item.picUrl"
            :fixWidth="80"/>
          <div class="name">{{item.name}}</div>
          <div class="alias text-small" v-if="item.alias.length>0"> ({{item.alias[0]}})</div>
        </li>
      </ul>
    </section>
    <!-- /歌手 选项卡 -->
    <!-- 专辑 选项卡 -->
    <section v-else-if="currentIndex===3" v-loading="loading">
      <ul>
        <li v-for="item in albums"
          :key="item.id"
          class="list-item"
          @click="handleItemClick(item.id)">
          <cover class="item-avator"
            :picUrl="item.blurPicUrl"
            :fixWidth="80"/>
          <div class="item-album">
            <span class="name">{{item.name}}</span>
            <span class="alias text-small" v-if="item.alias.length>0"> ({{item.alias[0]}})</span>
          </div>
          <div class="item-artist">
            <span class="name">{{item.artist.name}}</span>
            <span class="alias text-small"
              v-if="item.artist.alias.length>0"
              > ({{item.artist.alias[0]}})</span>
          </div>
        </li>
      </ul>
    </section>
    <!-- /专辑 选项卡 -->
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue'
import TabBarItem from '@/components/common/TabBarItem.vue'
import SongsTable from '@/components/content/SongsTable.vue'
import Cover from '@/components/content/Cover.vue'

import {
  _getCloudSearch,
  _getSearch,
  _getMultiMatch
} from '@/network/search.js'
import { _getSongUrlById } from '@/network/song.js'

export default {
  name: 'SearchIndex',

  components: {
    TabBar,
    TabBarItem,
    SongsTable,
    Cover
  },

  computed: {
    // songTotal () {
    //   return this.songs.length / 100
    // }
  },

  data () {
    return {
      searchWord: '',
      activeName: 0,
      multiMatch: {}, // 搜索建议
      songs: [], // 歌曲列表
      songCount: 0,
      artists: [], // 歌手列表
      albums: [], // 专辑列表
      activeId: 0,
      loading: false,
      currentIndex: 1,
      tabs: [
        { id: 1, text: '单曲' },
        { id: 2, text: '歌手' },
        { id: 3, text: '专辑' }
        // { id: 4, text: '视频' },
        // { id: 5, text: '歌单' },
        // { id: 6, text: '歌词' },
        // { id: 7, text: '播客' },
        // { id: 8, text: '声音' },
        // { id: 9, text: '用户' }
      ]
    }
  },

  created () {},

  activated () {
    this.searchWord = this.$route.query.s
  },

  watch: {
    $route () { // 监听 query 参数的变化
      this.searchWord = this.$route.query.s
    },
    searchWord () { // searchWord 变化，重新加载数据
      this.getMultiMatch(this.searchWord)
      this.getSongs(this.searchWord)
      this.getArtists(this.searchWord)
    },
    currentIndex () {
      switch (this.currentIndex) {
        case 1:
          this.getSongs(this.searchWord)
          break
        case 2:
          this.getArtists(this.searchWord)
          break
        case 3:
          this.getAlbums(this.searchWord)
          break
        case 5:
          this.getPlaylists(this.searchWord)
          break
        default:
          break
      }
    }
  },

  methods: {
    /**
     * 网络请求相关方法
     */
    // 关键词搜索
    async getSongs (keywords, offset = 100) {
      this.loading = true
      const { data: res } = await _getCloudSearch(keywords, 1, 100, offset)
      this.songs = res.result.songs
      console.log(this.songs[0])
      this.songCount = res.result.songCount
      this.loading = false
    },

    async getArtists (keywords) {
      this.loading = true
      const { data: res } = await _getSearch(keywords, 100)
      this.artists = res.result.artists
      this.loading = false
    },

    async getAlbums (keywords) {
      this.loading = true
      const { data: res } = await _getCloudSearch(keywords, 10)
      this.albums = res.result.albums
      this.loading = false
    },

    async getPlaylists (keywords) {
      const { data: res } = await _getCloudSearch(keywords, 1000)
      this.playlists = res.result.playlists
    },

    // 获取歌曲url
    async getSongUrlById (id) {
      const { data: res } = await _getSongUrlById(id)
      return res.data[0]
    },

    // 获取搜索建议
    async getMultiMatch (keywords) {
      const { data: res } = await _getMultiMatch(keywords)
      console.log('搜索建议', res)
      this.multiMatch = res.result
    },

    handleTabClick (id) {
      this.currentIndex = id
    },

    /**
     * 事件监听相关方法
     */
    // 双击歌曲表行事件
    async handleRowDbClick (id) {
      // console.log('rowDbClick')
      this.activeId = id
      const song = this.songs.find(v => v.id === id)
      const data = await this.getSongUrlById(id)
      song.url = data.url
      this.$store.commit('setContent', song)
      this.$store.commit('addToPlaylist', song)
    },

    handleItemClick (id) {
      this.$router.push({
        path: '/artist',
        query: { id }
      })
    },

    // 改变页码
    curChange (val) {
      // console.log(val)
      this.songs = []
      this.getSongs(this.searchWord, val)
      // console.dir(this.$refs.searchRef)
      // console.log(document.body.scrollTop)
      // this.$refs.searchRef.scroll(0, 0)
    }
  }
}
</script>

<style lang="less" scoped>
.match-title {
  margin: 15px 0 10px 0;
}
.match-item {
  display: flex;
  align-items: center;
  width: 300px;
  padding: 10px;
  height: 70px;
  background-color: #eee;
  .ar-avator {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
}

.list-item {
  display: flex;
  align-items: center;
  margin: 0 -25px;
  padding: 0 25px;
  cursor: pointer;
  &:nth-child(2n) {
    background-color: #eee;
  }
  &:hover {
    background-color: #ccc;
  }
  .item-avator {
    margin: 0 10px 0 0;
    padding-top: 10px;
  }
  .item-album {
    width: 50%;
  }
}
</style>
