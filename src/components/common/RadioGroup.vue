<template>
  <div class="radio-group-container">
    <slot name="label"></slot>
    <div class="item-wrap"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'RadioGroup'
}
</script>

<style lang="less" scoped>
.radio-group-container {
  display: flex;
  align-items: center;
  // margin: 10px 0;
  .item-wrap {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
