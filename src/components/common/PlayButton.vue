<template>
  <div class="play-btn" @click.stop="btnClick" :Style="btnStyle">
    <!-- <i class="iconfont icon-caret-right" v-if="!audio.playing"></i> -->
    <i class="iconfont icon-caret-right" v-if="!isPlay"></i>
    <i class="iconfont icon-pause" v-else></i>
  </div>
</template>

<script>
export default {
  name: 'PlayButton',
  props: {
    isPlay: {
      type: Boolean,
      default: false
    },
    top: String,
    bottom: String,
    left: String,
    right: String
  },
  computed: {
    btnStyle () {
      // if (this.top || this.bottom || this.left || this.right) {
      //   return {
      //     position: 'absolute',
      //     top: this.top ? this.top : '',
      //     bottom: this.bottom ? this.bottom : '',
      //     left: this.left ? this.left : '',
      //     right: this.right ? this.right : ''
      //   }
      // }
      return {}
    }
  },
  methods: {
    btnClick () {
      // startPlayOrPause
      this.$emit('btnClick')
    }
  }
}
</script>

<style lang="less" scoped>
.play-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: #eee;
  border-radius: 50%;
  font-size: 16px;
  .iconfont {
    font-size: 18px;
  }
}
</style>
