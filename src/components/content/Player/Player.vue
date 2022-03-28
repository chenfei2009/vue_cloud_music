<template>
  <div class="player-container">
    <!-- 底部栏模块 -->
    <PlayBar @showDetail="handleShowPlayDetail"
      @showList="isShowPlayList=!isShowPlayList" />
    <!-- 抽屉模块 -->
    <Drawer :drawer="isShowPlayDetail"
      height="calc(100% - 70px)"
      :mask=false>
      <Header bgColor="#eee">
        <div class="left-wrap" slot="left">
          <i class="btn iconfont icon-arrow"
            @click="isShowPlayDetail=false"></i>
        </div>
        <SearchBar slot="center"/>
      </Header>
      <!-- 滚动区域 -->
      <Scroll ref="scroll"
        class="scroll-wrap"
        :probeType="3"
        :listenScroll="true"
        :bounce="false"
        :mouseWheel="true"
        @scroll="contentScroll">
        <!-- 歌曲详情模块 -->
        <PlayDetail :lyric="lyric"
          :simiPlaylists="simiPlaylists"
          :simiSongs="simiSongs" />
        <!-- 歌曲评论模块 -->
        <Comment :hotComments="hotComments"
          :comments="comments" />
      </Scroll>
      <div class="scroll-bg"></div>
      <!-- 底部悬浮按钮组 -->
      <div :style="btnStyle" class="add-comment-b">
        <el-button type="info" size="medium" round>发表我的音乐评论</el-button>
        </div>
      <div :style="btnStyle" class="back-top">
        <el-button type="info" size="medium" round>返回顶部</el-button>
      </div>
      <div :style="btnStyle2" class="back-top">
        <el-button type="info" size="medium" round>写评论</el-button>
      </div>
    </Drawer>
    <!-- 播放列表侧边栏 -->
    <SideBar v-show="isShowPlayList">
      <SongsTable slot="table"
        :songs="playList"
        :activeId="activeId"
        :artistsWidth="100"
        :dtWidth="80"
        :showPlayTag="true"
        :showOrigin="true"
        @rowDbClick="handleRowDbClick"/>
    </SideBar>
  </div>
</template>

<script>
import Drawer from '@/components/common/Drawer.vue'
import Scroll from '@/components/common/Scroll.vue'
import Header from '@/components/common/Header.vue'
import SearchBar from '@/components/content/SearchBar.vue'
import SongsTable from '@/components/content/SongsTable.vue'

import PlayBar from './PlayBar.vue'
import SideBar from './SideBar.vue'
import PlayDetail from './PlayDetail.vue'
import Comment from './Comment.vue'

import {
  _getLyricById,
  _getSimiPlaylistsById,
  _getSimiSongsById
} from '@/network/song.js'
import {
  _getCommentById,
  _getHotComments
} from '@/network/comment.js'

export default {
  name: 'Player',
  components: {
    PlayBar,
    PlayDetail,
    SideBar,
    SongsTable,
    Drawer,
    Header,
    SearchBar,
    Scroll,
    Comment
  },
  computed: {
    playContent () {
      return this.$store.state.playContent
    },
    playList () {
      return this.$store.state.playList
    },
    btnStyle () {
      return { // 返回顶部按钮
        bottom: this.isShowBackTop ? '90px' : '20px',
        opacity: this.isShowBackTop ? 1 : 0
      }
    },
    btnStyle2 () { // 写评论按钮
      return {
        bottom: !this.isShowBackTop && this.isShowPlayDetail ? '90px' : '20px',
        opacity: !this.isShowBackTop && this.isShowPlayDetail ? 1 : 0
      }
    }
  },
  data () {
    return {
      lyric: [],
      simiPlaylists: [],
      simiSongs: [],
      hotComments: [], // 热门评论
      comments: [], // 最新评论
      activeId: 0, // 当前选中歌曲 id
      isShowPlayDetail: false, // 是否显示歌曲详情
      isShowPlayList: false, // 是否显示播放列表
      isShowBackTop: false
      // tabOffsetTop: 0,
      // isTabFixed: false
    }
  },
  created () {
    this.getLyricById()
    if (this.isShowPlayDetail) {
      this.getSimiPlaylistsById()
      this.getSimiSongsById()
      this.getHotComments()
      this.getCommentById()
    }
  },
  methods: {
    // 网络请求相关方法
    /**
     * 获取歌词
     */
    async getLyricById () {
      const { data: res } = await _getLyricById(this.playContent.id)
      if (!res.lrc.lyric) {
        return console.log('no lyric')
      }
      const lyricData = res.lrc.lyric.split('\n')
      const lyricObj = []
      // 正则匹配 [03:57.201]原谅我...
      const reg = /\[\d*:\d*(\.|:)\d*]/g
      lyricData.forEach(v => {
        const timeRegArr = v.match(reg)
        // if (!timeRegArr) continue
        if (!timeRegArr) return
        // 获取歌词
        const content = v.replace(timeRegArr, '')
        // 获取时间
        const t = timeRegArr[0]
        const min = parseInt(t.match(/\[\d*/i).toString().slice(1))
        const sec = parseInt(t.match(/:\d*/i).toString().slice(1))
        const time = min * 60 + sec
        lyricObj.push({ time, content })
      })
      this.lyric = lyricObj
    },

    /**
     * 获取相似歌单
     */
    async getSimiPlaylistsById () {
      const { data: res } = await _getSimiPlaylistsById(this.playContent.id)
      this.simiPlaylists = res.playlists
    },

    /**
     * 获取相似歌曲
     */
    async getSimiSongsById () {
      const { data: res } = await _getSimiSongsById(this.playContent.id)
      this.simiSongs = res.songs
    },

    /**
     * 获取热门评论
     */
    async getHotComments () {
      const { data: res } = await _getHotComments(this.playContent.id, 0, 10)
      this.hotComments = res.hotComments
      // console.log(this.hotComments[0])
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },

    /**
     * 获取最新评论
     */
    async getCommentById () {
      const { data: res } = await _getCommentById(this.playContent.id)
      this.comments = res.comments
      // console.log(this.comments)
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },

    // 事件监听相关方法
    /**
     * 切换歌曲详情显示/隐藏
     */
    handleShowPlayDetail () {
      this.isShowPlayDetail = !this.isShowPlayDetail
      if (this.isShowPlayDetail) {
        this.getSimiPlaylistsById()
        this.getSimiSongsById()
        this.getHotComments()
        this.getCommentById()
      }
    },

    /**
     * 双击侧边栏歌曲
     */
    handleRowDbClick (id) {
      // console.log(id)
      const content = this.playList.find(v => v.id === id)
      this.$store.commit('setContent', content)
    },

    /**
     * 监听页面滚动
     */
    contentScroll (pos) {
      // console.log(pos.y)
      // 1. 控制返回顶部图标是否显示
      // console.log('scroll', pos)
      this.isShowBackTop = (-pos.y) > 10
      // console.log(this.isShowBackTop)
      // console.log((-pos.y))
      // 2. 动态改变 TabControl 样式
      // console.log(this.$refs.tabControlRef.offsetTop)
      // this.isTabFixed = (-pos.y) > this.tabOffsetTop
    }
  },
  watch: {
    playContent () {
      this.getLyricById()
      if (this.isShowPlayDetail) {
        this.getSimiPlaylistsById()
        this.getSimiSongsById()
        this.getHotComments()
        this.getCommentById()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-wrap {
  height: calc(~"100% - 60px");
  width: 100%;
  overflow: hidden;
}
// .scroll-wrap::-webkit-scrollbar { /* 滚动条整体样式 */
//   width: 4px; /* 高宽分别对应横竖滚动条的尺寸 */
//   height: 20px;
// }

.back-top {
  position: fixed;
  // width: 200px;
  bottom: 90px;
  left: calc(~"50vw + 275px");
  z-index: 99;
  transition: 0.2s;
}

.add-comment-b {
  position: fixed;
  // width: 200px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 90px;
  z-index: 99;
  transition: 0.2s;
}

.scroll-bg {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  height: 60%;
  background-image: linear-gradient(#eee, #fff);
  z-index: -1;
}

.left-wrap {
  width: 200px;
  .btn {
    transform: rotate(90deg);
    font-size: 20px;
    padding-bottom: 20px;
  }
}
</style>
