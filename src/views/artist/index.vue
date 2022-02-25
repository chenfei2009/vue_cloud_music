<template>
  <div class="artist-container">
    <Header>
      <CoverItem slot="left" :picUrl="artist.picUrl" :width="200"/>
      <div class="info-wrap" slot="center">
        <h1 class="name">{{artist.name}}</h1>
        <div class="alias" v-if="artist.alias">{{artist.alias[0]}}</div>
        <div class="btn-wrap">
          <button class="btn btn-round">
            <i class="iconfont icon-add"></i>收藏
          </button>
        </div>
        <div class="info-item">
          <span>歌曲数：</span>
          <span>{{artist.musicSize}}</span>
          <span>专辑数：</span>
          <span>{{artist.albumSize}}</span>
          <span>MV数：</span>
          <span>{{artist.mvSize}}</span>
        </div>
      </div>
    </Header>
    <!-- <div>{{artist}}</div> -->
    <!-- tab选项卡 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="歌曲列表" name="0">
        <!-- 歌单列表模块 -->
        <SongsTable :songs="hotSongs"
          :activeId="activeId"
          @rowDbClick="handleRowDbClick"/>
        <!-- 歌单列表模块/ -->
      </el-tab-pane>
      <el-tab-pane label="MV" name="1">
        <div>MV列表</div>
      </el-tab-pane>
      <el-tab-pane label="歌手详情" name="2">
        <div>{{artist.briefDesc}}</div>
      </el-tab-pane>
      <el-tab-pane label="相似歌手" name="3">
        <div>相似歌手</div>
      </el-tab-pane>
    </el-tabs>
    <!-- tab选项卡/ -->
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import SongsTable from '@/components/content/SongsTable/SongsTable.vue'
import CoverItem from '@/components/content/Cover/CoverItem.vue'

import { _getArtistInfo } from '@/network/artist.js'

export default {
  name: 'ArtistIndex',
  components: { Header, CoverItem, SongsTable },
  data () {
    return {
      artist: {},
      hotSongs: [],
      activeId: 0,
      activeName: '0' // 当前tab选项卡
    }
  },
  created () {
    const { id } = this.$route.query
    this.getArtistInfo(id)
  },
  methods: {
    async getArtistInfo (id) {
      const { data: res } = await _getArtistInfo(id)
      this.artist = res.artist
      this.hotSongs = res.hotSongs
    },
    handleRowDbClick () {
      console.log('rowDbClick')
    }
  }
}
</script>

<style lang="less">

</style>
