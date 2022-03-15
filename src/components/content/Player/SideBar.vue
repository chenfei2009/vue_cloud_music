<template>
  <div class="side-bar-container">
    <div class="title-wrap">
      <div class="title"><h2>当前播放</h2></div>
      <div class="action-wrap">
        <div class="total">总50首</div>
        <div class="action">
          <i class="iconfont icon-add"></i>
          <div class="collect-all">收藏全部</div>
          <div class="clear-all">清空列表</div>
        </div>
      </div>
    </div>
    <div class="table-wrap">
      <slot name="table"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  computed: {},
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.side-bar-container {
  position: fixed;
  right: 0;
  width: 450px;
  top: 60px;
  bottom: 70px;
  z-index: 99;
  // height: calc(~'100% - 70px');
  background-color: #fff;
  .title-wrap {
    height: 80px;
    padding: 0 20px;
    h2 {
      padding: 10px 0;
      margin: 0;
    }
    .action-wrap {
      display: flex;
      justify-content: space-between;
      .total {
        font-size: 12px;
        color: #ccc;
      }
      .action {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .collect-all {
          margin: 0 20px 0 10px;
        }
      }
    }
  }
  .table-wrap {
    width: 450px;
    height: calc(~"100vh - 210px");
    overflow: scroll;
    // /deep/ tr {
    //   :first-child {
    //     padding-left: 10px;
    //   }
    //   td {
    //     font-size: 12px;
    //     padding: 4px 0;
    //   }
    // }
    .cell-text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .active {
      color: var(--themeColor);
    }
    .active-tag {
      position: absolute;
      left: 0;
      transform: translateX(-10%);
      color: var(--themeColor);
    }
  }
}
</style>
