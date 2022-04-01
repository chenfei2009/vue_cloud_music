<template>
  <div class="cover-item-container" @click="onItemClick" :style="itemStyle">
    <div class="item-cover-wrap" :style="coverStyle">
      <el-image lazy :src="picUrl" fit="cover" class="item-img"></el-image>
      <slot></slot>
    </div>
    <div class="text-wrap"><slot name="text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'CoverItem',
  props: {
    picUrl: String,
    column: { // 图片列数
      type: Number,
      default: 5
    },
    dividsion: { // 图片间距
      type: Number,
      default: 15
    },
    ratio: { // 图片宽高比
      type: Number,
      default: 1
    },
    fixWidth: Number
  },
  computed: {
    totalDivision () {
      return this.dividsion * (this.column - 1) + 250
    },
    width () {
      if (this.fixWidth) return (this.fixWidth + 'px')
      return `calc((100vw - ${this.totalDivision + 'px'}) / ${this.column})`
    },
    height () {
      if (this.fixWidth) return (this.fixWidth / this.ratio + 'px')
      return `calc((100vw - ${this.totalDivision + 'px'}) / (${this.column * this.ratio}))`
    },
    maxWidth () {
      if (this.fixWidth) return false
      return (1100 - this.totalDivision + 250) / this.column + 'px'
    },
    minWidth () {
      if (this.fixWidth) return false
      return (930 - this.totalDivision) / this.column + 'px'
    },
    maxHeight () {
      if (this.fixWidth) return false
      return (1100 - this.totalDivision + 250) / (this.column * this.ratio) + 'px'
    },
    minHeight () {
      if (this.fixWidth) return false
      return (930 - this.totalDivision) / (this.column * this.ratio) + 'px'
    },
    coverStyle () {
      return {
        width: '100%',
        height: this.height,
        minHeight: this.minHeight,
        maxHeight: this.maxHeight
      }
    },
    itemStyle () {
      return {
        width: this.width,
        minWidth: this.minWidth,
        maxWidth: this.maxWidth
      }
    }
  },
  data () {
    return {}
  },
  created () {},
  methods: {
    onItemClick () {
      this.$emit('itemClick', this.item)
    },
    onBtnClick () {
      this.$emit('btnClick', this.item)
    }
  }
}
</script>

<style lang="less" scoped>
.cover-item-container {
  margin: 10px 0;
  // margin: 10px 15px 10px 0;
  // width: calc(~"(100% - 60px) / 5");
  .item-cover-wrap {
    position: relative;
    cursor: pointer;
    width: '100%';
    .item-img {
      width: 100%;
      height: 100%;
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
  .text-wrap {
    width: 100%;
    margin-top: 10px;
    cursor: pointer;
    font-size: 12px;
    overflow: hidden;
    // /deep/ * {
    //   text-overflow: ellipsis;
    //   white-space: nowrap;
    //   overflow: hidden;
    // }
  }
}
</style>
