<template>
  <div class="artist-info-container">
    <el-image class="cover-wrap" :src="artist.picUrl" fit="cover"/>
    <div class="info-wrap">
      <h1 class="info-name">{{artist.name}}</h1>
      <div class="info-alias" v-if="artist.alias">{{artist.alias[0]}}</div>
      <div class="btn-wrap">
        <button class="round"
          @click="handleSubs"
          ><i class="iconfont icon-add"></i>收藏</button>
      </div>
      <div class="info-item">
        <span>歌曲数：</span>
        <span>{{artist.musicSize}}</span>
        <span>专辑数：</span>
        <span>{{artist.albumSize}}</span>
        <span>MV数：</span>
        <span>{{artist.mvSize}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtistInfo',
  props: {
    artist: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    handleSubs () {
      console.log('检查是否登录')
      // 检查是否登录
      this.$emit('subscribe')
      // 未登录跳转到登录页面
      // this.$store.commit('showLogin')
    }
  }
}
</script>

<style lang="less" scoped>
.artist-info-container {
  display: flex;
  margin-bottom: 20px;
}
.cover-wrap {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  overflow: hidden;
}
.info-wrap {
  margin-left: 20px;
  > * {
    margin-bottom: 15px;
  }
  .info-alias {
    font-size: 10px;
  }
  .user-wrap  {
    display: flex;
    align-items: center;
    .avatar-wrap {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .btn-wrap {
    display: flex;
    align-items: center;
  }
  .info-item {
    display: flex;
    .tags-wrap {
      display: flex;
    }
    .item-content {
      width: 150px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
