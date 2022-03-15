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
        width="50">
      </el-table-column>
      <el-table-column v-if="showAction"
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
        :width="nameWidth"
        sortable>
        <template slot-scope="scope">
          <i class="active-tag iconfont icon-caret-right" v-show="showPlayTag && scope.row.id === activeId"></i>
          <span :class="scope.row.id === activeId ? 'active' : ''"
            class="cell-text">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showArtist"
        prop="artists"
        label="歌手"
        :width="artistsWidth"
        sortable>
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
          <span class="cell-text">{{scope.row.al.name}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showOrigin"
        prop="origin"
        label="来源"
        width="30">
        <i class="iconfont icon-link"></i>
      </el-table-column>
      <el-table-column
        prop="dt"
        label="时长"
        :width="dtWidth"
        sortable>
        <template slot-scope="scope">
          <span class="cell-text">{{scope.row.dt | formatSecond}}</span>
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
    // activeId: {
    //   type: Number,
    //   default: null
    // },
    title: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    nameWidth: {
      type: Number
    },
    artistsWidth: {
      type: Number,
      default: 200
    },
    dtWidth: {
      type: Number,
      default: 100
    },
    showHeader: { // 是否显示表头
      type: Boolean,
      default: false
    },
    showIndex: { // 是否显示索引
      type: Boolean,
      default: false
    },
    showAction: { // 是否显示操作按钮
      type: Boolean,
      default: false
    },
    showPlayTag: { // 是否显示播放标记
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
    },
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
    return {
      isShowAll: false
    }
  },
  created () {},
  methods: {
    onDbClick (row) {
      console.log(row.id)
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

.el-table /deep/ td:first-child {
  .cell {
    padding-left: 20px;
  }
}

.el-table /deep/ .el-table__cell {
  padding: 8px 0;
  // .cell-text {
  //   font-size: 14px;
  // }
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

.cell-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
