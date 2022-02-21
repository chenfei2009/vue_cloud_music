<template>
  <div class="playlist-container">
    <PlaylistInfo v-if="playlist.coverImgUrl"
      :playlist="playlist"
      :songs="songs"
      @playAll="handlePlayAll"
      @addToPlaylist="handleAddToPlaylist"/>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="歌曲列表" name="0">
        <SongsTable :songs="songs"
          :activeId="activeId"
          @rowDbClick="handleRowDbClick"/>
      </el-tab-pane>
      <el-tab-pane label="评论" name="1">评论</el-tab-pane>
      <el-tab-pane label="收藏者" name="2">收藏者</el-tab-pane>
    </el-tabs>
    <!-- 对话框 -->
    <el-dialog
      title="替换播放列表"
      :visible.sync="dialogVisible"
      width="500px"
      center
      :before-close="handleClose">
      <span>播放全部将会替换当前的播放列表，是否继续？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">继 续</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SongsTable from '@/components/content/SongsTable/SongsTable.vue'
import PlaylistInfo from './childComps/PlaylistInfo.vue'

import { _getSongsByListId, _getDetailByListId } from '@/network/playlist.js'
import { _getSongUrlById } from '@/network/song.js'

export default {
  name: 'PlaylistIndex',
  computed: {},
  components: { SongsTable, PlaylistInfo },
  data () {
    return {
      id: 0, // 播放列表 id
      playlist: {},
      songs: [],
      activeId: null,
      rowId: null,
      activeName: '0',
      dialogVisible: false,
      dialogContent: ''
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getDetailByListId(this.id)
    this.getSongsByListId(this.id)
  },
  mounted () {},
  methods: {
    // 网络请求相关方法
    /**
     * 请求播放列表歌曲数据
     * @param { integer } id 播放列表编号
     */
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

    /**
     * 请求播放列表详情数据
     * @param { integer } id 播放列表编号
     */
    async getDetailByListId (id) {
      const { data: res } = await _getDetailByListId(id)
      this.playlist = res.playlist
    },

    // 事件监听相关方法
    handleClick (tab, event) {
      console.log(tab, event)
    },

    /**
     * 播放全部按钮点击事件
     */
    handlePlayAll () {
      this.dialogContent = '"播放全部"将会替换当前的播放列表，是否继续?'
      this.dialogVisible = true
    },

    /**
     * 对话框确认按钮点击事件
     */
    handleConfirm () {
      if (!this.rowId) {
        this.$store.commit('resetPlayList', { songs: this.songs })
      } else {
        this.$store.commit('resetPlayList', { songs: this.songs, id: this.rowId })
        this.activeId = this.rowId
        this.rowId = null
      }
      this.dialogVisible = false
    },

    /**
     * 对话框关闭按钮点击事件
     */
    handleClose (done) {
      this.dialogVisible = false
    },

    /**
     * 对话框关闭按钮点击事件
     */
    handleAddToPlaylist () {
      // 判断是否为同一个播放列表
      this.$store.commit('addToPlayList', this.songs)
    },

    /**
     * 歌曲行双击事件
     */
    handleRowDbClick (id) {
      this.rowId = id
      this.dialogContent = '"双击播放"会用当前列表的音乐替换播放列表，是否继续?'
      this.dialogVisible = true
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
</style>
