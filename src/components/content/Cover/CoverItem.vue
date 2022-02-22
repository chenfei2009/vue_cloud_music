<template>
  <div class="playlist-item-container" :style="itemStyle">
    <div class="item-cover-wrap" @click="onItemClick">
      <el-image :src="item.picUrl" fit="cover" class="item-img"></el-image>
      <!-- 播放量 -->
      <div class="item-play-count" v-if="item.playCount">
        <i class="iconfont icon-play"></i>
        <span class="count-text">{{playCount}}</span>
        </div>
      <!-- 播放按钮 -->
      <div class="item-btn" @click.stop="onBtnClick" :style="btnStyle">
        <i class="iconfont icon-caret-right"></i>
      </div>
    </div>
    <span class="item-name" @click="onItemClick">{{item.name}}</span>
  </div>
</template>

<script>
export default {
  name: 'PlaylistItem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    column: {
      type: Number,
      default: 5
    },
    showBtn: {
      type: String, // hidden hover fixed
      default: 'hidden'
    }
  },
  computed: {
    itemStyle () {
      const dividsion = 15 * (this.column - 1) + 'px'
      return {
        // max-width: 200px;
        // width: calc(~"(100% - 60px) / 5") // 错误写法
        // width: 'calc((100% - 60px) / 5)'
        // width: `calc((100% - 60px) / ${this.column})`
        width: `calc((100% - ${dividsion}) / ${this.column})`
      }
    },
    btnStyle () {
      switch (this.showBtn) {
        case 'hidden':
          return { display: 'none' }
        case 'fixed':
          return { opacity: 1 }
        default:
          return false
      }
    },
    playCount () {
      return this.item.playCount > 10000 ? parseInt(this.item.playCount / 10000) + '万' : this.item.playCount
    }
  },
  data () {
    return {}
  },
  created () {},
  methods: {
    onItemClick () {
      console.log('跳转到歌单详情页')
      this.$emit('itemClick', this.item.id)
    },
    onBtnClick () {
      this.$emit('btnClick', this.item)
    }
  }
}
</script>

<style lang="less" scoped>
.playlist-item-container {
  margin: 10px 0;
  // max-width: 200px;
  // width: calc(~"(100% - 60px) / 5");
  .item-cover-wrap {
    position: relative;
    cursor: pointer;
    .item-img {
      width: 100%;
      border-radius: 5px;
      overflow: hidden;
    }
    /* 播放量 */
    .item-play-count {
      position: absolute;
      top: 2px;
      right: 5px;
      color: #fff;
      font-size: 12px;
      .iconfont {
        font-size: 10px;
        margin-right: 3px;
      }
    }
    /* 播放按钮 */
    .item-btn {
      // display: none;
      display: flex;
      opacity: 0;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 10px;
      right: 10px;
      width: 30px;
      height: 30px;
      background-color: #eee;
      border-radius: 50%;
      color: var(--themeColor);
      .iconfont {
        font-size: 18px;
      }
    }
    &:hover {
      .item-btn {
        opacity: 1;
        transition: opacity 1s;
      }
    }
  }
  .item-name {
    margin-top: 15px;
    cursor: pointer;
    font-size: 12px;
  }
}
</style>
