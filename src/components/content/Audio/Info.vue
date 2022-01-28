<template>
  <!-- 歌曲信息模块 -->
  <div class="info-container">
    <div class="info-cover">
      <img :src="audio.al.picUrl" alt="#">
    </div>
    <div class="info-text">
      <div class="info-name">{{audio.name}}</div>
      <div class="info-singer">
        <span v-for="item in audio.ar" :key="item.id">{{item.name}}</span>
      </div>
    </div>
    <div class="info-zan"><i class="iconfont icon-dianzan"></i></div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: {},
  computed: {
    audio () {
      return this.$store.state.playContent
    }
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.info-container {
  display: flex;
  align-items: center;
  width: 200px;
  height: 100%;
  .info-cover {
    width: 50px;
    height: 50px;
    background-color: rgb(129, 116, 116);
    img {
      width: 100%;
    }
  }
  .info-text {
    margin-left: 10px;
    width: 120px;
    .info-singer {
      font-size: 12px;
      margin-top: 2px;
    }
  }
  .info-zan {
    height: 40px;
    .iconfont {
      font-size: 18px;
    }
  }
}
</style>
