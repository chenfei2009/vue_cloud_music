<template>
  <div class="slider-bar-wrapper" :style="wrapStyle">
    <div class="runway" :style="runwayStyle" ref="runway"
      @mousedown="onMousedown"
      @mouseover="onMouseover"
      @mousemove="onMousemove"
      @mouseup="onMouseup">
      <div class="bar" :style="barStyle">
        <div class="btn" :style="btnStyle"></div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SliderBar',
  props: {
    bgc: {
      type: String,
      default: '#eee'
    },
    leftBg: {
      type: String,
      default: 'red'
    },
    btnBgc: {
      type: String,
      default: 'red'
    },
    height: String,
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
      default: 36
    }
  },
  data () {
    return {
      pValue: this.value,
      pMax: this.max,
      pMin: this.min,
      wrapStyle: {
        width: this.width
      },
      runwayStyle: {
        backgroundColor: this.bgc,
        height: this.height,
        borderRadius: parseInt(this.height) / 2 + 'px'
      },
      barStyle: {
        position: 'relative',
        width: this.progressPercent + '%',
        background: this.leftBg,
        height: this.height,
        borderRadius: parseInt(this.height) / 2 + 'px'
      },
      btnStyle: {
        position: 'absolute',
        backgroundColor: this.btnBgc,
        height: parseInt(this.height) * 1.6 + 'px',
        width: parseInt(this.height) * 1.6 + 'px',
        borderRadius: '50%',
        right: '-' + parseInt(this.height) / 2 + 'px',
        top: '-' + parseInt(this.height) * 0.3 + 'px'
      },
      // 标记是否按下鼠标
      isMouseDownOnBall: false
    }
  },
  computed: {
    barPercent () {
      return (this.pValue - this.pMin) / (this.pMax - this.pMin) * 100
    },
    runway () {
      // return this.$el.getElementsByClassName('runway')[0]
      return this.$refs.runway
    }
  },
  methods: {
    onMousedown (e) {
      if (e.which === 1) {
        this.isMouseDownOnBall = true
      }
    },
    onMousemove (e) {
      if (this.isMouseDownOnBall === true) {
        // 修改进度条本身
        const decimal = (e.clientX - this.$el.offsetLeft) / this.runway.clientWidth
        const percent = decimal * 100
        this.barStyle.width = percent + '%'
        // 修改value
        this.pValue = this.pMin + decimal * (this.pMax - this.pMin)
        this.$emit('drag', this.pValue, percent)
      }
    },
    onMouseup (e) {
      if (this.isMouseDownOnBall) {
        // 修改进度条本身
        const decimal = (e.clientX - this.$el.offsetLeft) / this.runway.clientWidth
        const percent = decimal * 100
        this.barStyle.width = percent + '%'
        // 修改value
        this.pValue = this.pMin + decimal * (this.pMax - this.pMin)
        this.$emit('change', this.pValue, percent)
        this.isMouseDownOnBall = false
      }
    },
    onMouseover (e) {
      // 没有按左键进入进度条
      if (e.which === 0) {
        this.isMouseDownOnBall = false
      }
    }
  },
  watch: {
    max (cur, old) {
      this.pMax = cur
    },
    min (cur, old) {
      this.pMin = cur
    },
    value (cur, old) {
      this.pValue = cur
    },
    barPercent (cur, old) {
      this.barStyle.width = cur + '%'
    }
  },
  mounted () {
    // 数据验证
    if (this.max < this.min) {
      console.error("max can't less than min !")
    }
    // 初始百分比
    this.barStyle.width = (this.pValue - this.pMin) / (this.pMax - this.pMin) * 100 + '%'
  }
}
</script>

<style lang="less" scoped>
.slider-bar-wrapper {
  &:hover {
    cursor: pointer;
  }
  .runway {
    margin: 10px 5px;
  }
}
</style>
