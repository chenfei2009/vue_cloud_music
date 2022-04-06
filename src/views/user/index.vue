<template>
  <div class="user-container container">
    <UserInfo :user="user"/>
    <!-- tab选项卡 -->
    <TabBar>
      <TabBarItem v-for="item in tabs"
        :key="item.id"
        :id="item.id"
        :currentIndex="currentIndex"
        @tabClick="handleTabClick"
        ><div slot="item-text">{{item.text}}</div></TabBarItem>
    </TabBar>
    <!-- /tab选项卡 -->
    <section v-if="currentIndex===1">
      暂无数据
      <ul>
        <li v-for="item in createdPlaylists" :key="item.id" class="list-item">
          <Cover :picUrl="item.picUrl" :fixWidth="80" />
          <el-image :src="item.picUrl"></el-image>
          <div class="name">{{item.name}}</div>
          <div class="alias" v-if="item.alias">{{item.alias}}</div>
        </li>
      </ul>
    </section>
    <section v-else-if="currentIndex===2">
      暂无数据
    </section>
    <section v-else-if="currentIndex===3">
      暂无数据
    </section>
    <section v-else>
      暂无数据
    </section>
  </div>
</template>

<script>
import TabBar from '@/components/common/TabBar.vue'
import TabBarItem from '@/components/common/TabBarItem.vue'
import Cover from '@/components/content/Cover.vue'
import UserInfo from './childComps/UserInfo.vue'

import {
  _getUserDetail,
  _getUserDetailByName,
  _getUserDj
} from '@/network/user.js'

export default {
  name: 'UserIndex',
  components: { UserInfo, TabBar, TabBarItem, Cover },
  data () {
    return {
      uid: null,
      user: {},
      activeName: 0,
      createdPlaylists: [],
      subsdPlaylists: [],
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
    this.uid = this.$route.query.uid || null
    if (this.uid) {
      this.getUserDetail(this.uid)
      this.getUserDj(this.uid)
      return
    }
    const nickname = this.$route.query.nickname || null
    this.getUserDetailByName(nickname)
    // this.getSuggest(this.searchWord)
  },

  methods: {
    /**
     * 获取用户详情
     */
    async getUserDetail (uid) {
      const { data: res } = await _getUserDetail(uid)
      this.user = res
      console.log(this.user)
    },
    async getUserDetailByName (nickname) {
      const { data: res } = await _getUserDetailByName(nickname)
      this.user = res
      console.log(this.user)
    },
    async getUserDj (uid) {
      const { data: res } = await _getUserDj(uid)
      console.log(res)
    },
    // async getAlbums (keywords) {
    //   const { data: res } = await _getCloudSearch(keywords, 10)
    //   this.albums = res.result.albums
    // },
    // async getPlaylists (keywords) {
    //   const { data: res } = await _getCloudSearch(keywords, 1000)
    //   this.playlists = res.result.playlists
    // },

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
          this.getUserDetail(this.uid)
          break
        // case 2:
        //   this.getArtists(this.searchWord)
        //   break
        // case 3:
        //   this.getAlbums(this.searchWord)
        //   break
        // case 5:
        //   this.getPlaylists(this.searchWord)
        //   break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
// .user-container {
//   padding: 20px;
// }
.list-item {
  display: flex;
  align-items: center;
  background-color: #eee;
}
</style>
