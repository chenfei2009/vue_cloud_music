<template>
  <div class="header-container">
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
  props: {},
  computed: {},
  methods: {}
}
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .center-wrap {
    flex: 1;
  }
}
</style>
