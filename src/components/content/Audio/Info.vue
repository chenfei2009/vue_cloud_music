<template>
  <!-- 歌曲信息模块 -->
  <div class="info-container">
    <div class="info-cover">封面</div>
    <div class="info-text">
      <div class="info-name">{{name}}</div>
      <div class="info-singer">{{singer}}</div>
    </div>
    <div class="info-zan"><i class="iconfont icon-dianzan"></i></div>
  </div>
</template>

<script>
export default {
  name: 'FooterIndex',
  data () {
    return {
      name: 'Butterfly',
      singer: 'Mariah Carey'
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="less" scoped>
.info-container {
  display: flex;
  align-items: center;
  height: 100%;
  .info-cover {
    width: 50px;
    height: 50px;
    background-color: rgb(129, 116, 116);
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
