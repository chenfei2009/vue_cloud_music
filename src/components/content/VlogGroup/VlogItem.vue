<template>
  <div class="vlog-item-container">
    <div class="item-left-wrap">
      <el-image :src="item.url" :fit="cover" class="item-img"></el-image>
      <div class="item-btn" @click="onBtnClick">
        <i class="iconfont icon-caret-right" v-if="1"></i>
        <i class="iconfont icon-pause" v-else></i>
      </div>
    </div>
    <div class="item-right-wrap">
      <div class="item-name">{{item.name}}</div>
      <div class="item-tag-wrap">
        <span class="item-tag text-small">{{item.tag}}</span>
      </div>
      <div class="item-info text-small">
        <div class="item-artist">{{item.artist}}</div>
        <i class="iconfont icon-caret-right"></i>
        <div class="item-hit">{{item.hit}}</div>
        <i class="iconfont icon-recentsicon item-icon"></i>
        <div class="item-time">{{item.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VlogItem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
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
.vlog-item-container {
  display: flex;
  width: 50%;
  margin: 10px 0;
  .item-left-wrap {
    position: relative;
    .item-img {
      width: 80px;
      height: 80px;
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
  .item-right-wrap {
    padding: 10px;
    width: 100%;
    height: 60px;
    overflow: hidden;
    .item-name {
      padding-bottom: 5px;
    }
    .item-tag {
      padding: 0 2px;
      border: 1px solid #ccc;
    }
    .item-info {
      padding-top: 5px;
      display: flex;
      .iconfont {
        margin: 0 5px 0 10px;
        font-size: 10px;
        line-height: 16px;
      }
    }
  }
  .item-right-wrap:hover {
    background-color: #eee;
  }
}
</style>
