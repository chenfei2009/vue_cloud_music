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
        :data="playList"
        :show-header="false"
        @row-dblclick="onDbClick"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="歌曲"
          width="200">
          <template slot-scope="scope">
            <i class="active-tag iconfont icon-caret-right" v-show="scope.row.id === activeId"></i>
            <span :class="scope.row.id === activeId ? 'active' : ''"
              class="cell-text">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="singer"
          label="歌手"
          width="100">
          <template slot-scope="scope">
            <span :class="scope.row.id === activeId ? 'active' : ''"
              class="cell-text">{{scope.row.ar[0].name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="link"
          label="链接"
          width="30">
        </el-table-column>
        <el-table-column
          prop="dt"
          label="时长">
          <template slot-scope="scope">
            <span :class="scope.row.id === activeId ? 'active' : ''"
              class="cell-text">{{scope.row.dt | formatSecond}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import formatTime from '@/utils/formatTime.js'

export default {
  name: 'PlayList',
  // props: {
  //   tableData: {
  //     type: Array,
  //     default () {
  //       return []
  //     }
  //   },
  //   activeId: {
  //     type: Number,
  //     default: 0
  //   }
  // },
  computed: {
    playContent () {
      return this.$store.state.playContent
    },
    playList () {
      return this.$store.state.playList
    },
    activeId () {
      const index = this.playList.findIndex(v => v.id === this.playContent.id)
      return this.playList[index].id
    }
  },
  data () {
    return {}
  },
  created () {},
  methods: {
    onDbClick (row, column, event) {
      // console.log('row', row.id)
      this.$store.commit('setContent', this.playList[row.id])
    }
  },
  filters: {
    formatSecond (second = 0) {
      return formatTime(second / 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.playlist-container {
  position: absolute;
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
    /deep/ tr {
      :first-child {
        padding-left: 10px;
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
