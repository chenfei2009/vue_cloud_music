<template>
  <div class="play-detail-container">
    <div class="main container">
      <div class="left">
        <div class="cover-wrap">
          <el-image class="cover" :src="playContent.al.picUrl"></el-image>
        </div>
      </div>
      <div class="center">
        <div class="title">
          <div class="name">{{playContent.name}}</div>
          <div class="ar-al-wrap">
            <div class="artist" v-for="item in playContent.ar" :key="item.id">
            -{{item.name}}
            </div>
            <div class="album">-{{playContent.al.name}}</div>
          </div>
        </div>
        <LyricPanel :lyric="lyric" />
      </div>
      <div class="right" v-show="!isCollapsed">
        <el-tooltip :content="playListInfo.name" placement="bottom" effect="light" :open-delay=500>
          <div class="play-list-info">播放来源：{{playListInfo.name}}</div>
        </el-tooltip>
        <div class="title">包含这首歌的歌单</div>
        <!-- 相关歌单列表 -->
        <ul class="rec-list-wrap">
          <li v-for="item in simiPlaylists" :key="item.id" class="rec-list-item">
            <el-image fit :src="item.coverImgUrl" class="item-cover"></el-image>
            <div class="item-name">{{item.name}}</div>
          </li>
        </ul>
        <div class="title">喜欢这首歌的人也听</div>
        <!-- 推荐歌曲列表 -->
        <ul class="rec-list-wrap">
          <li v-for="item in simiSongs" :key="item.id" class="rec-list-item">
            <el-image fit :src="item.album.picUrl" class="item-cover"></el-image>
            <div class="item-name">{{item.name}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="aside-btn">
      <i class="iconfont icon-arrow" @click="isCollapsed=!isCollapsed"></i>
    </div>
  </div>
</template>

<script>
import LyricPanel from './LyricPanel.vue'

export default {
  name: 'PlayDetail',
  components: { LyricPanel },
  props: {
    lyric: {
      type: Array,
      default () {
        return []
      }
    },
    simiPlaylists: {
      type: Array,
      default () {
        return []
      }
    },
    simiSongs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    playContent () {
      return this.$store.state.playContent
    },
    currentTime () {
      return this.$store.state.currentTime
    },
    playListInfo () {
      return this.$store.state.playListInfo
    }
  },
  data () {
    return {
      isCollapsed: false
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.play-detail-container {
  position: relative;
  width: 100%;
  height: 60%;
  min-height: 400px;
  max-height: 600px;
  padding-top: 20px;
  margin: 10px 30px;
  .main {
    display: flex;
    height: 100%;
    justify-content: center;
    .left {
      flex: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      .cover-wrap {
        width: 260px;
        height: 260px;
        border-radius: 50%;
        padding: 30px;
        overflow: hidden;
        background-color: #000;
        border: 10px solid #ccc;
        .cover {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .center {
      flex: 3;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: space-around;
      padding: 0 20px;
      .title {
        .name {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .ar-al-wrap {
          display: flex;
          justify-content: center;
        }
      }
      .lrc-wrap {
        overflow: hidden;
        flex: 1;
      }
    }
    .right {
      width: 20vw;
      margin-top: 120px;
      height: 300px;
      overflow: hidden;
      // box-shadow: #fff 0px -30px 30px -15px inset;
      .play-list-info {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .title {
        margin: 10px 0;
        font-weight: 600;
      }
      .rec-list-wrap {
        .rec-list-item {
          display: flex;
          align-items: center;
          .item-cover {
            width: 30px;
            height: 30px;
            margin: 10px 10px 10px 0;
            border-radius: 10%;
            overflow: hidden;
          }
          .item-name {
            flex: 1;
            font-size: 12px;
          }
        }
      }
    }
  }

  .aside-btn {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
