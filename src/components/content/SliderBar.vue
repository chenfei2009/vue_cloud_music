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
      default: 0
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pValue: this.value,
      pMax: this.max,
      pMin: this.min,
      isMouseDownOnBall: false // 标记是否按下鼠标
    }
  },
  computed: {
    barPercent () {
      return (this.pValue - this.pMin) / (this.pMax - this.pMin) * 100
    },
    runway () {
      // return this.$el.getElementsByClassName('runway')[0]
      return this.$refs.runway
    },
    wrapStyle () {
      return this.vertical ? { height: this.height } : { width: this.width }
    },
    runwayStyle () {
      return {
        display: this.vertical ? 'flex' : '',
        'align-items': this.vertical ? 'flex-end' : '',
        backgroundColor: this.bgc,
        width: this.vertical ? this.width : '100%',
        height: this.vertical ? '100%' : this.height,
        borderRadius: this.vertical ? (parseInt(this.width) / 2 + 'px') : (parseInt(this.height) / 2 + 'px')
      }
    },
    barStyle () {
      return {
        position: 'relative',
        width: this.vertical ? this.width : (this.barPercent + '%'),
        height: this.vertical ? (this.barPercent + '%') : this.height,
        background: this.leftBg,
        borderRadius: this.vertical ? (parseInt(this.width) / 2 + 'px') : (parseInt(this.height) / 2 + 'px')
      }
    },
    btnStyle () {
      return {
        position: 'absolute',
        width: this.vertical ? (parseInt(this.width) * 1.6 + 'px') : (parseInt(this.height) * 1.6 + 'px'),
        height: this.vertical ? (parseInt(this.width) * 1.6 + 'px') : (parseInt(this.height) * 1.6 + 'px'),
        top: this.vertical ? ('-' + parseInt(this.width) / 2 + 'px') : ('-' + parseInt(this.height) * 0.3 + 'px'),
        left: this.vertical ? ('-' + parseInt(this.width) * 0.3 + 'px') : (''),
        right: this.vertical ? ('') : ('-' + parseInt(this.height) / 2 + 'px'),
        backgroundColor: this.btnBgc,
        borderRadius: '50%'
      }
    }
  },
  methods: {
    setValue (e) {
      // 修改进度条本身
      let decimal = null
      if (this.vertical) {
        decimal = 1 - (e.clientY - this.$el.offsetTop) / this.runway.clientHeight
      } else {
        decimal = (e.clientX - this.$el.offsetLeft) / this.runway.clientWidth
        // this.barStyle.width = decimal * 100 + '%'
      }
      // 修改value
      this.pValue = this.pMin + decimal * (this.pMax - this.pMin)
      const index = parseInt(decimal * 100)
      return index
    },
    onMousedown (e) {
      if (e.which === 1) {
        this.isMouseDownOnBall = true
      }
    },
    onMousemove (e) {
      if (this.isMouseDownOnBall === true) {
        const index = this.setValue(e)
        this.$emit('drag', this.pValue, index)
      }
    },
    onMouseup (e) {
      if (this.isMouseDownOnBall) {
        const index = this.setValue(e)
        this.$emit('change', this.pValue, index)
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
    }
  },
  mounted () {
    // 数据验证
    if (this.max < this.min) {
      console.error("max can't less than min !")
    }
    // 初始百分比
    if (this.vertical) {
      this.barStyle.height = (this.pValue - this.pMin) / (this.pMax - this.pMin) * 100 + '%'
    } else {
      this.barStyle.width = (this.pValue - this.pMin) / (this.pMax - this.pMin) * 100 + '%'
    }
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
