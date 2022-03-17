<template>
  <div class="user-container">
    <div class="title">搜索 {{searchWord}}</div>
    <div class="rec">
      <div>你可能感兴趣</div>
      <!-- 头像 歌手 粉丝 歌曲 -->
    </div>
    <!-- tab选项卡 -->
    <TabBar>
      <TabBarItem v-for="item in tabs"
        :key="item.id"
        :id="item.id"
        :currentIndex="currentIndex"
        @tabClick="handleTabClick"
        ><div slot="item-text">{{item.text}}</div></TabBarItem>
    </TabBar>
    <!-- tab选项卡/ -->
    <section v-if="currentIndex===1">
      <ul>
        <li v-for="item in createdPlaylists" :key="item.id" class="list-item">
          <Cover :picUrl="item.picUrl" :fixWidth="80" />
          <!-- <el-image :src="item.picUrl"></el-image> -->
          <div class="name">{{item.name}}</div>
          <div class="alias" v-if="item.alias">{{item.alias}}</div>
        </li>
      </ul>
    </section>
    <section v-else-if="currentIndex===2">
      歌单
    </section>
    <section v-else-if="currentIndex===3">
      播客
    </section>
    <section v-else>
      专栏
    </section>
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue'
import TabBarItem from '@/components/common/TabBarItem.vue'
import Cover from '@/components/content/Cover.vue'

import { _getCloudSearch, _getSearch, _getMultiMatch } from '@/network/search.js'
import { _getSongUrlById } from '@/network/song.js'

export default {
  name: 'UserIndex',
  components: { TabBar, TabBarItem, Cover },
  data () {
    return {
      activeName: 0,
      createdPlaylists: [],
      collectedPlaylists: [],
      createdVlogs: [],
      collectedVlogs: [],
      currentIndex: 1,
      tabs: [
        { id: 1, text: '创建的歌单' },
        { id: 2, text: '收藏的歌单' },
        { id: 3, text: '创建的播客' },
        { id: 4, text: '创建的音乐专栏' }
      ]
    }
  },

  created () {},

  activated () {
    this.searchWord = this.$route.query.s
    // this.getSongs(this.searchWord)
    // this.getSuggest(this.searchWord)
  },

  methods: {
    /**
     * 关键词搜索
     */
    async getSongs (keywords) {
      const { data: res } = await _getCloudSearch(keywords)
      this.songs = res.result.songs
    },
    async getArtists (keywords) {
      const { data: res } = await _getSearch(keywords, 100)
      this.artists = res.result.artists
    },
    async getAlbums (keywords) {
      const { data: res } = await _getCloudSearch(keywords, 10)
      this.albums = res.result.albums
    },
    async getPlaylists (keywords) {
      const { data: res } = await _getCloudSearch(keywords, 1000)
      this.playlists = res.result.playlists
    },

    /**
     * 获取歌曲url
     */
    async getSongUrlById (id) {
      const { data: res } = await _getSongUrlById(id)
      return res.data[0]
    },

    /**
     * 获取搜索建议
     */
    async getMultiMatch (keywords) {
      const { data: res } = await _getMultiMatch(keywords)
      console.log('搜索建议', res)
    },

    handleTabClick (id) {
      this.currentIndex = id
    },

    /**
     * 双击歌曲表行事件
     */
    handleRowDbClick (id) {
      // console.log('rowDbClick')
      this.activeId = id
      const song = this.songs.find(v => v.id === id)
      const data = this.getSongUrlById(id)
      song.url = data.url
      this.$store.commit('setContent', song)
    }
  },

  watch: {
    $route () { // 监听 query 参数的变化
      this.searchWord = this.$route.query.s
    },
    searchWord () { // searchWord 变化，重新加载数据
      this.getMultiMatch(this.searchWord)
      this.getSongs(this.searchWord)
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
  }
}
</script>

<style lang="less" scoped>
.list-item {
  display: flex;
  align-items: center;
  background-color: #eee;
}
</style>
