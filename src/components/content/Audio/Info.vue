<template>
  <!-- 歌曲信息模块 -->
  <div class="info-container">
    <div class="info-cover">
      <!-- 遮罩层 -->
      <el-tooltip content="展开音乐详情页" placement="bottom" effect="light" :open-delay=500>
        <div class=info-tooltip @click="handleCoverClick"></div>
      </el-tooltip>
      <img :src="audio.cover" alt="#">
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
  methods: {
    handleCoverClick () {
      console.log('展开音乐详情页，获取当前歌曲id', this.$store.state.playContent.id)
      this.$router.push({
        path: '/song',
        query: { id: this.$store.state.playContent.id }
      })
    }
  }
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
    border-radius: 5px;
    overflow: hidden;
    .info-tooltip {
      display: none;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .info-cover:hover {
    .info-tooltip {
      display: block;
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
