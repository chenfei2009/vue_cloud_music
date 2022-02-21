<template>
  <div class="songs-table-container">
    <el-table
      :data="songs"
      @row-dblclick="onDbClick"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        width="40">
      </el-table-column>
      <el-table-column
        label="操作"
        width="60">
        <template slot-scope="scope">
          <i class="iconfont icon-heart1" @click="handleClick(scope.row)"></i>
          <i class="iconfont icon-download" @click="handleClick(scope.row)"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="标题">
        <template slot-scope="scope">
          <i class="active-tag iconfont icon-caret-right" v-show="scope.row.id === activeId"></i>
          <span :class="scope.row.id === activeId ? 'active' : ''"
            class="cell-text">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="singer"
        label="歌手"
        width="200">
        <template slot-scope="scope">
          <span :class="scope.row.id === activeId ? 'active' : ''"
            class="cell-text">{{scope.row.ar[0].name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="album"
        label="专辑">
        <template slot-scope="scope">
          <span :class="scope.row.id === activeId ? 'active' : ''"
            class="cell-text">{{scope.row.al.name}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="link"
        label="链接"
        width="30">
      </el-table-column> -->
      <el-table-column
        prop="dt"
        label="时长"
        width="100">
        <template slot-scope="scope">
          <span :class="scope.row.id === activeId ? 'active' : ''"
            class="cell-text">{{scope.row.dt | formatSecond}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import formatTime from '@/utils/formatTime.js'

export default {
  name: 'SongsTable',
  props: {
    songs: {
      type: Array,
      default () {
        return []
      }
    },
    activeId: {
      type: Number,
      default: null
    }
  },
  computed: {},
  data () {
    return {}
  },
  created () {},
  methods: {
    onDbClick (row) {
      // console.log(row)
      this.$emit('rowDbClick', row.id)
    },
    handleClick (row) {
      console.log(row)
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
.songs-table-container {
  width: 100%;
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
</style>
