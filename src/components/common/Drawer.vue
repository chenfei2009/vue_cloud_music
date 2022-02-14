<template>
  <div class="drawer-wrap">
    <!-- 遮罩层 -->
    <div class="drawer-mask" v-show="mask" @click="handleClose"></div>
    <!-- /遮罩层 -->
    <!-- 滑块部分 -->
    <div class="drawer-main"
      :style="mainStyle">
      <slot></slot>
      <div class="drawer-footer" v-if="footer">
        <div class="btn btn-primary" @click="handleClose">取消</div>
        <div class="btn btn-plain" @click="handleConfirm">确定</div>
      </div>
    </div>
    <!-- /滑块部分 -->
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    mask: {
      type: Boolean,
      default: true
    },
    bgImage: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '50vh'
    },
    footer: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // mainClass () {
    //   return {
    //     'main-show': this.drawer,
    //     'main-hide': !this.drawer
    //   }
    // },
    mainStyle () {
      // return { bottom: this.drawer ? '0' : '-50vh' }
      return {
        top: this.drawer ? 0 : '100vh',
        height: this.height,
        backgroundImage: this.bgImage ? this.bgImage : ''
      }
    }
  },
  created () {
    console.log(this.drawer)
  },
  methods: {
    handleClose () {
      this.$emit('cancel')
    },
    handleConfirm () {
      this.$emit('confirm')
    }
  }
  // watch: {
  //   drawer (newVal, oldVal) {
  //     console.log(newVal, oldVal)
  //     console.log(this.mainStyle.top)
  //   }
  // }
}
</script>

style <style lang="less" scoped>
.drawer-wrap {
  position: relative;
}

  /* 遮罩层 */
  .drawer-mask {
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
  }

  /* 滑块 */
  .drawer-main {
    position: fixed;
    z-index: 10;
    left: 0;
    width: 100vw;
    height: 0;
    background: #fff;
    transition: all 0.5s;
  }
  .main-show {
    opacity: 1;
  }
  .main-hide {
    opacity: 1;
  }

  .drawer-footer {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    .btn {
      width: 30vw;
      margin: 20px 10px;
      text-align: center;
    }
  }
</style>
