<template>
  <div class="songs-table-container">
    <div class="title-bar" v-if="title">
      {{name}}
      <i class="iconfont icon-play"></i>
      <i class="iconfont icon-add"></i>
    </div>
    <el-table
      :data="songsData"
      @row-dblclick="onDbClick"
      stripe
      :show-header="showHeader"
      style="width: 100%">
      <el-table-column v-if="showIndex"
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
        label="标题"
        sortable>
        <template slot-scope="scope">
          <i class="active-tag iconfont icon-caret-right" v-show="scope.row.id === activeId"></i>
          <span :class="scope.row.id === activeId ? 'active' : ''"
            class="cell-text">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showArtist"
        prop="singer"
        label="歌手"
        sortable
        width="200">
        <template slot-scope="scope">
          <!-- <span :class="scope.row.id === activeId ? 'active' : ''"
            class="cell-text">{{scope.row.ar[0].name}}</span> -->
          <Artists :artists="scope.row.ar"/>
        </template>
      </el-table-column>
      <el-table-column v-if="showAlbum"
        prop="album"
        label="专辑"
        sortable>
        <template slot-scope="scope">
          <span :class="scope.row.id === activeId ? 'active' : ''"
            class="cell-text">{{scope.row.al.name}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showOrigin"
        prop="link"
        label="来源"
        width="30">
      </el-table-column>
      <el-table-column
        prop="dt"
        label="时长"
        sortable
        width="100">
        <template slot-scope="scope">
          <span :class="scope.row.id === activeId ? 'active' : ''"
            class="cell-text">{{scope.row.dt | formatSecond}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="show-all"
      v-if="this.songs.length > 10 && !isShowAll"
      @click="isShowAll=true"
      >显示全部歌曲</div>
  </div>
</template>

<script>
import Artists from '@/components/content/Artists.vue'

import formatTime from '@/utils/formatTime.js'

export default {
  name: 'SongsTable',
  components: { Artists },
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
    },
    title: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    showHeader: { // 是否显示表头
      type: Boolean,
      default: false
    },
    showIndex: { // 是否显示索引
      type: Boolean,
      default: false
    },
    showArtist: { // 是否显示歌手
      type: Boolean,
      default: true
    },
    showAlbum: { // 是否显示专辑
      type: Boolean,
      default: false
    },
    showOrigin: { // 是否显示来源
      type: Boolean,
      default: false
    },
    showAll: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    songsData () {
      if (this.showAll || this.songs.length <= 10 || this.isShowAll) return this.songs
      return this.songs.slice(0, 10)
    }
  },
  data () {
    return {
      isShowAll: false
    }
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
