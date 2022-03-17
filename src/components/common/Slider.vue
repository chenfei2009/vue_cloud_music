<template>
  <div class="slider-wrapper" :style="wrapStyle">
    <div class="bar" :style="barStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    height: {
      type: Number,
      default: 10
    },
    width: String,
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  computed: {
    barPercent () {
      return (this.value - this.min) / (this.max - this.min) * 100
    },
    wrapStyle () {
      return {
        backgroundColor: '#eee',
        borderRadius: parseInt(this.height) / 2 + 'px'
      }
    },
    barStyle () {
      return {
        position: 'relative',
        width: this.barPercent + '%',
        height: '100%',
        background: '#ccc',
        borderRadius: parseInt(this.height) / 2 + 'px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.slider-wrapper {
  width: calc(~"100% - 20px");
  height: 6px;
}
</style>
