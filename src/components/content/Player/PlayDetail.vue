<template>
  <div class="play-detail-container">
    <div class="main container">
      <div class="left">
        <div class="cover-wrap">
          <el-image class="cover"
            :src="playContent.picUrl ? playContent.picUrl : playContent.al.picUrl"
            ></el-image>
        </div>
      </div>
      <div class="center">
        <div class="title">
          <div class="name">{{playContent.name}}</div>
          <div class="ar-al-wrap">
            <div class="artist" v-for="item in artists" :key="item.id">
            -{{item.name}}
            </div>
            <div class="album">
              {{playContent.al ? playContent.al.name : playContent.song.album.name}}
            </div>
          </div>
        </div>
        <LyricPanel :lyric="lyric" />
      </div>
      <!-- 滚动区域 -->
      <div class="right" v-show="!isCollapsed">
        <Scroll ref="scroll"
          class="scroll-wrap"
          :probeType="3"
          :stopPropagation="true"
          :bounce="false"
          :mouseWheel="true"
          :scrollbar="true">
          <el-tooltip :content="playlistInfo.name" placement="bottom" effect="light" :open-delay=500>
            <div class="play-list-info">
              播放来源：{{playlistInfo.name}}
            </div>
          </el-tooltip>
          <!-- 相关歌单列表 -->
          <div class="title">包含这首歌的歌单</div>
          <ul class="rec-list-wrap">
            <li v-for="item in simiPlaylists" :key="item.id" class="rec-list-item">
              <el-image fit :src="item.coverImgUrl" class="item-cover"></el-image>
              <div class="item-name">{{item.name}}</div>
            </li>
          </ul>
          <!-- 推荐歌曲列表 -->
          <div class="title">喜欢这首歌的人也听</div>
          <ul class="rec-list-wrap">
            <li v-for="item in simiSongs" :key="item.id" class="rec-list-item">
              <el-image fit :src="item.album.picUrl" class="item-cover"></el-image>
              <div class="item-name">{{item.name}}</div>
            </li>
          </ul>
        </Scroll>
      </div>
      <div class="aside-btn">
        <i class="iconfont icon-arrow" @click="isCollapsed=!isCollapsed"></i>
      </div>
    </div>
    <!-- <div class="aside-btn">
      <i class="iconfont icon-arrow" @click="isCollapsed=!isCollapsed"></i>
    </div> -->
  </div>
</template>

<script>
import LyricPanel from './LyricPanel.vue'
import Scroll from '@/components/common/Scroll.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'PlayDetail',
  components: { LyricPanel, Scroll },
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
    ...mapGetters(['playContent', 'currentTime', 'playlistInfo']),
    artists () {
      return this.playContent.ar || this.playContent.song.artists
    }
  },
  data () {
    return {
      isCollapsed: false
    }
  },
  created () {},
  mounted () {},
  methods: {},
  watch: {
    playContent (val) {
      console.log(val)
    },
    simiPlaylists (val) {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    simiSongs (val) {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.play-detail-container {
  position: relative;
  width: 100%;
  height: 450px;
  min-height: 400px;
  max-height: 600px;
  padding: 20px 30px 30px 0;
  margin: 10px 0;
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
      position: relative;
      width: 20vw;
      margin-top: 80px;
      height: 300px;
      // box-shadow: #fff 0px -30px 30px -15px inset;
      .scroll-wrap {
        height: 100%;
        overflow: hidden;
      }
      // .scroll-wrap::-webkit-scrollbar { /* 滚动条整体样式 */
      //   width: 4px; /* 高宽分别对应横竖滚动条的尺寸 */
      //   height: 20px;
      // }
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
    width: 30px;
    height: 100%;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
