<template>
  <div class="playlist-item-container">
    <div class="item-cover-wrap">
      <el-image :src="url" :fit="cover" class="item-img"></el-image>
      <div class="item-btn" @click="onBtnClick" v-show="isShowBtn">
        <i class="iconfont icon-caret-right" v-if="1"></i>
        <i class="iconfont icon-pause" v-else></i>
      </div>
    </div>
    <div class="item-text">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: 'PlaylistItem',
  props: {
    url: {
      type: String,
      default: '#'
    },
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isShowBtn: true
    }
  }
}
</script>

<style lang="less" scoped>
.playlist-item-container {
  margin: 10px 0;
  .item-cover-wrap {
    position: relative;
    .item-img {
      width: 200px;
      height: 200px;
      border-radius: 5px;
      overflow: hidden;
    }
    .item-btn {
      display: flex;
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
    }
  }
}
</style>
