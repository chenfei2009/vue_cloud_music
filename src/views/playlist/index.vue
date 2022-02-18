<template>
  <div class="playlist-container">
    <div class="playlist-header">
      <div class="cover-wrap"><el-image :src="playlist.coverImgUrl"></el-image></div>
      <div class="info-wrap">
        <h1 class="name">{{playlist.name}}</h1>
        <div class="user-wrap">
          <div class="avatar-wrap"><el-image :src="playlist.creator.avatarUrl"></el-image></div>
          <span class="user-name">{{playlist.creator.nickname}}</span>
          <span class="create-time">{{playlist.createTime | dateFilter}}创建</span>
        </div>
        <div class="btn-wrap">
          <el-button type="primary" size="medium" round>播放全部</el-button>
          <el-button size="medium" round>收藏({{playlist.subscribedCount | numFilter}})</el-button>
          <el-button size="medium" round>分享({{playlist.shareCount | numFilter}})</el-button>
          <el-button size="medium" round>下载全部</el-button>
        </div>
        <div class="info-item">
          <span>标签：</span>
          <ul class="tags-wrap">
            <li v-for="(item, index) in playlist.tags" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="info-item">
          <span>歌曲：</span>
          <span>{{songs.length}}</span>
          <span>播放：</span>
          <span>{{playlist.playCount  | numFilter}}</span>
        </div>
        <div class="info-item">
          <span>简介：</span>
          <span>{{playlist.description}}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="歌曲列表" name="0">
        <SongsTable :songs="songs" />
      </el-tab-pane>
      <el-tab-pane label="评论" name="1">评论</el-tab-pane>
      <el-tab-pane label="收藏者" name="2">收藏者</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SongsTable from '@/components/content/SongsTable/SongsTable.vue'

import { _getSongsByListId, _getDetailByListId } from '@/network/playlist.js'
import { _getSongUrlById } from '@/network/song.js'
import formatDate from '@/utils/formatDate.js'

export default {
  name: 'PlaylistIndex',
  computed: {},
  components: { SongsTable },
  data () {
    return {
      id: 0,
      playlist: {},
      songs: [],
      activeName: '0'
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getDetailByListId(this.id)
    this.getSongsByListId(this.id)
  },
  mounted () {},
  methods: {
    async getSongsByListId (id) {
      const { data: res } = await _getSongsByListId(id)
      // console.log(res)
      const songs = res.songs
      songs.forEach(async v => {
        const { data: res } = await _getSongUrlById(v.id)
        v.url = res.data[0].url
      })
      this.songs = songs
    },
    async getDetailByListId (id) {
      const { data: res } = await _getDetailByListId(id)
      this.playlist = res.playlist
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  filters: {
    numFilter (num) {
      return num > 10000 ? `${parseInt(num / 10000)}万` : num
    },
    dateFilter (date) {
      return formatDate(new Date(date), 'yyyy-MM-dd')
    }
  }
}
</script>

<style lang="less" scoped>
.playlist-container /deep/ .el-tabs {
  .el-tabs__nav-wrap::after {
    height: 0;
  }
  .el-tabs__active-bar {
    background-color: var(--themeColor);
  }
  .is-active {
    // border-bottom: 2px solid var(--themeColor);
    color: #000;
    font-size: 18px;
    font-weight: 800;
  }
}

.playlist-header {
  display: flex;
  margin-bottom: 20px;
}
.cover-wrap {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  overflow: hidden;
}
.info-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
  .name {
    font-size: 20px;
  }
  .user-wrap  {
    display: flex;
    align-items: center;
    .avatar-wrap {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .info-item {
    display: flex;
    .tags-wrap {
      display: flex;
    }
  }
}
</style>
