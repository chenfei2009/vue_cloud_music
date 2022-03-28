<template>
  <div class="header-container" :style=bgStyle>
    <slot name="left"></slot>
    <!-- <div class="left-wrap"><slot name="left"></slot></div> -->
    <div class="center-wrap"><slot name="center"></slot></div>
    <slot name="right"></slot>
    <!-- <div class="right-wrap"><slot name="right"></slot></div> -->
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    bgColor: {
      type: String,
      default: 'var(--themeColor)'
    },
    height: {
      type: [Number, String],
      default: 60
    }
  },
  computed: {
    bgStyle () {
      return {
        height: this.height + 'px',
        backgroundColor: this.bgColor
      }
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .center-wrap {
    flex: 1;
  }
}
</style>
