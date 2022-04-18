<template>
  <!-- 歌曲信息模块 -->
  <div class="info-container">
    <div class="info-action" :style="actionStyle">
      <div class="left">
        <i class="btn iconfont icon-arrow"
          @click="onCoverClick"></i>
      </div>
      <div class="right">
        <i class="btn iconfont icon-heart1"></i>
        <i class="btn iconfont icon-add"></i>
        <i class="btn iconfont icon-download"></i>
        <i class="btn iconfont icon-share"></i>
      </div>
    </div>
    <div class="info-cover">
      <!-- 遮罩层 -->
      <el-tooltip content="展开音乐详情页" placement="bottom" effect="light" :open-delay=500>
        <div class=info-tooltip @click="onCoverClick"></div>
      </el-tooltip>
      <el-image :src="picUrl" />
    </div>
    <div class="info-text">
      <div class="info-name">{{playContent.name}}</div>
      <div class="info-artist">
        <span v-for="item in artists" :key="item.id">{{item.name}}</span>
      </div>
    </div>
    <div class="info-zan"><i class="iconfont icon-dianzan"></i></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Info',
  props: {},
  computed: {
    ...mapGetters(['playContent']),
    // playContent () {
    //   return this.$store.getters.playContent
    // },
    actionStyle () {
      return { top: this.isShowDetail ? '0' : '-70px' }
    },
    picUrl () {
      return this.playContent.al ? this.playContent.al.picUrl : this.playContent.picUrl
    },
    artists () {
      return this.playContent.ar ? this.playContent.ar : this.playContent.song.artists
    }
  },
  data () {
    return {
      isShowDetail: false
    }
  },
  mounted () {},
  methods: {
    onCoverClick () {
      this.isShowDetail = !this.isShowDetail
      this.$emit('showDetailClick')
    }
  }
}
</script>

<style lang="less" scoped>
.info-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 240px;
  height: 100%;
  overflow: hidden;

  .info-action {
    position: absolute;
    width: 240px;
    height: 70px;
    background-color: #fff;
    left: 0;
    z-index: 9;
    display: flex;
    justify-content: space-between;
    transition: 0.5s;
    .left, .right {
      display: flex;
      align-items: center;
    }
    .left {
      width: 50px;
      .btn {
        transform: rotate(90deg);
      }
    }
    .right {
      flex: 1;
      justify-content: space-between;
      .btn {
        padding: 10px;
        border-radius: 50%;
        border: 1px solid #ccc;
      }
    }
  }

  .info-cover {
    width: 50px;
    height: 50px;
    margin: 10px 0;
    background-color: rgb(129, 116, 116);
    border-radius: 5px;
    overflow: hidden;
    .info-tooltip {
      display: none;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .info-cover:hover {
    .info-tooltip {
      display: block;
    }
  }
  .info-text {
    margin-left: 10px;
    width: 120px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    .info-artist {
      font-size: 12px;
      margin-top: 2px;
    }
  }
  .info-zan {
    height: 40px;
    .iconfont {
      font-size: 18px;
    }
  }
}
</style>
