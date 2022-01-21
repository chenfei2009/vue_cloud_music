<template>
  <div class="playlist-container">
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
      <el-table
        :data="tableData"
        :show-header="false"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="歌曲"
          width="200">
          <template slot-scope="scope">
            <span :class="scope.row.id === activeId ? 'active' : ''"
              class="cell-text">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="tag"
          label="标签">
        </el-table-column> -->
        <el-table-column
          prop="singer"
          label="歌手"
          width="100">
          <template slot-scope="scope">
            <span :class="scope.row.id === activeId ? 'active' : ''"
              class="cell-text">{{scope.row.singer}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="link"
          label="链接"
          width="30">
        </el-table-column>
        <el-table-column
          prop="time"
          label="时长">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayList',
  props: {
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    activeId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // tableData: []
    }
  },
  created () {
    console.log(this.tableData)
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.playlist-container {
  position: absolute;
  right: 0;
  width: 450px;
  top: 60px;
  bottom: 70px;
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
    /deep/ tr {
      :first-child {
        padding-left: 6px;
      }
      td {
        font-size: 12px;
        padding: 4px 0;
      }
    }
    .cell-text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .active {
      color: red;
    }
  }
}
</style>
