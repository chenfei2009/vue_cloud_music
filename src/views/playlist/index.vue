<template>
  <div class="playlist-container">
    <!-- 歌单详情模块 -->
    <PlaylistInfo v-if="playlist.coverImgUrl"
      :playlist="playlist"
      :songsLength="songs.length"
      @playAll="handlePlayAll"
      @addToPlaylist="handleAddToPlaylist"/>
    <!-- 歌单详情模块/ -->
    <!-- tab选项卡 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="歌曲列表" name="0">
        <!-- 歌单列表模块 -->
        <SongsTable :songs="songs"
          :activeId="activeId"
          :showHeader="true"
          :showIndex="true"
          :showAlbum="true"
          @rowDbClick="handleRowDbClick"/>
        <!-- 歌单列表模块/ -->
      </el-tab-pane>
      <el-tab-pane :label="commentLabel" name="1">
        <!-- 评论表单模块 -->
        <form action="#">
          <textarea v-model="inputText" rows="5" style="width: 100%"></textarea>
          <div class="action-wrap">
            <div class="left-wrap">
              <i class="iconfont icon-at" @click="handleShare"></i>
              <i class="iconfont icon-jinghao" @click="handleAddTopic"></i>
            </div>
            <!-- <input type="button" value="评论"> -->
            <button class="btn-round" @click="handleSubmit">评论</button>
          </div>
        </form>
        <!-- 评论表单模块/ -->
        <!-- 精彩评论模块 -->
        <Comment title="精彩评论" :comments="hotComments" />
        <!-- 精彩评论模块/ -->
        <!-- 全部评论模块 -->
        <Comment title="全部评论"
          :comments="comments"
          :isShowCount="true"
          :pagination="true"/>
        <!-- 全部评论模块/ -->
      </el-tab-pane>
      <el-tab-pane label="收藏者" name="2">
        <ul class="user-wrap">
          <li v-for="item in playlist.subscribers" :key="item.userId" class="user-item">
            <div class="avatar-wrap"><el-image :src="item.avatarUrl"></el-image></div>
            <span class="user-name">{{item.nickname}}</span>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
    <!-- tab选项卡/ -->
    <!-- 对话框 -->
    <el-dialog
      title="替换播放列表"
      :visible.sync="dialogVisible"
      width="500px"
      center
      :before-close="handleClose">
      <span>{{dialogContent}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">继 续</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 对话框/ -->
  </div>
</template>

<script>
import SongsTable from '@/components/content/SongsTable.vue'
import Comment from '@/components/content/Comment/Comment.vue'
import PlaylistInfo from './childComps/PlaylistInfo.vue'

import { _getSongsByListId, _getDetailByListId } from '@/network/playlist.js'
import { _getSongUrlById } from '@/network/song.js'
import { _getCommentByListId } from '@/network/comment.js'

import { SongsDbClickMixin } from '@/utils/mixin.js'

export default {
  name: 'PlaylistIndex',
  computed: {
    commentLabel () {
      return `评论(${this.comments.length})`
    }
  },
  components: { SongsTable, PlaylistInfo, Comment },
  mixins: [SongsDbClickMixin],
  data () {
    return {
      id: 0, // 歌单id
      playlist: {}, // 歌单详情
      songs: [], // 歌单对应的歌曲列表
      activeName: '0', // 当前tab选项卡
      inputText: '',
      hotComments: [],
      comments: []
    }
  },
  created () {
    this.getDatas()
  },
  activated () {
    this.getDatas()
  },
  mounted () {},
  methods: {
    // 网络请求相关方法
    /**
     * 请求本页所有数据
     */
    getDatas () {
      this.id = this.$route.query.id
      this.getDetailByListId(this.id)
      this.getSongsByListId(this.id)
      this.getCommentByListId(this.id)
    },

    /**
     * 请求歌单对应的歌曲数据
     * @param { integer } id 歌单编号
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
     * 请求歌单详情数据
     * @param { integer } id 歌单编号
     */
    async getDetailByListId (id) {
      const { data: res } = await _getDetailByListId(id)
      this.playlist = res.playlist
    },

    /**
     * 请求歌单评论数据
     * @param { integer } id 歌单编号
     */
    async getCommentByListId (id) {
      const { data: res } = await _getCommentByListId(id)
      this.comments = res.comments
      this.hotComments = res.hotComments.slice(0, 5)
    },

    // 事件监听相关方法
    /**
     * 播放全部按钮点击事件
     */
    handlePlayAll () {
      this.dialogContent = '"播放全部"将会替换当前的播放列表，是否继续?'
      this.dialogVisible = true
    },

    /**
     * 对话框关闭按钮点击事件
     */
    handleAddToPlaylist () {
      // 判断是否为同一个播放列表
      this.$store.commit('addToPlayList', this.songs)
    },

    /**
     * 表单提交事件
     */
    handleSubmit (e) {
      // e.preventDefault()
      // 表单预验证
      if (!this.inputText) return console.log('请输入文字')
      console.log(this.inputText)
    },

    handleShare () {
      console.log('handleShare')
    },

    handleAddTopic () {
      console.log('handleAddTopic')
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

.action-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  .icon-at {
    color: #ccc;
    margin-right: 10px;
  }
}

.user-wrap {
  display: flex;
  min-width: 300px;
  // justify-content: space-between;
  flex-wrap: wrap;
  .user-item {
    display: flex;
    align-items: center;
    width: 400px;
    margin: 10px 0;
    .avatar-wrap {
      width: 90px;
      height: 90px;
      margin-right: 10px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}
</style>
