<template>
  <div class="songs-table-container">
    <div class="title-wrap" v-if="title">
      <h2>{{name}}</h2>
      <i class="iconfont icon-play"></i>
      <span class="division"></span>
      <i class="iconfont icon-add"></i>
    </div>
    <el-table
      v-loading="loading"
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
        :sortable="sortable">
        <template slot-scope="scope">
          <i class="active-tag iconfont icon-caret-right" v-show="showPlayTag && scope.row.id === activeId"></i>
          <div v-if="search && scope.row.id !== activeId" v-html="formatData(scope.row.name)"></div>
          <span :class="scope.row.id === activeId ? 'active' : ''"
            class="cell-text"
            v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showArtist"
        prop="artists"
        label="歌手"
        :width="artistsWidth"
        :sortable="sortable">
        <template slot-scope="scope">
          <!-- <span :class="scope.row.id === activeId ? 'active' : ''"
            class="cell-text">{{scope.row.ar[0].name}}</span> -->
          <Artists :artists="scope.row.ar || scope.row.song.artists"
            :search="search"/>
        </template>
      </el-table-column>
      <el-table-column v-if="showAlbum"
        prop="album"
        label="专辑"
        :sortable="sortable">
        <template slot-scope="scope">
          <div v-if="search && scope.row.id !== activeId" v-html="formatData(scope.row.al.name)"></div>
          <span v-else class="cell-text">{{scope.row.al.name}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showOrigin"
        prop="origin"
        label="来源"
        width="30">
        <i class="iconfont icon-link"></i>
      </el-table-column>
      <el-table-column v-if="showDt"
        prop="dt"
        label="时长"
        :width="dtWidth"
        :sortable="sortable">
        <template slot-scope="scope">
          <span class="cell-text">{{scope.row.dt | formatSecond}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showPop"
        prop="pop"
        label="热度"
        :width="popWidth">
        <template slot-scope="scope">
          <Slider :value="scope.row.pop" />
          <!-- <span class="cell-text">{{scope.row.pop}}</span> -->
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
import Slider from '@/components/common/Slider.vue'
import Artists from '@/components/content/Artists.vue'

import { mapGetters } from 'vuex'

import formatTime from '@/utils/formatTime.js'
import highlight from '@/utils/highlight.js'

export default {
  name: 'SongsTable',
  components: { Slider, Artists },

  props: {
    songs: {
      type: Array,
      default () {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
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
    popWidth: {
      type: Number,
      default: 120
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
    showDt: { // 是否显示时长
      type: Boolean,
      default: true
    },
    showOrigin: { // 是否显示来源
      type: Boolean,
      default: false
    },
    showPop: { // 是否显示热度
      type: Boolean,
      default: false
    },
    showAll: {
      type: Boolean,
      default: true
    },
    sortable: {
      type: Boolean,
      default: false
    },
    search: String // 搜索关键字
  },

  computed: {
    ...mapGetters(['playContent', 'playlist']),
    songsData () {
      if (this.showAll || this.songs.length <= 10 || this.isShowAll) return this.songs
      return this.songs.slice(0, 10)
    },
    activeId () {
      const index = this.songs.findIndex(v => v.id === this.playContent.id)
      return this.songs[index].id
    },
    formatData () {
      return function (str) {
        return highlight(str, this.search)
      }
    }
  },

  data () {
    return {
      isShowAll: false
      // loading: true
    }
  },

  created () {},

  activated () {
    // console.log('songTable activited')
    // this.loading = true
  },

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

.title-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  h2 {
    margin-right: 20px;
  }
  .division {
    display: inline-block;
    margin: 0 10px;
    width: 1px;
    height: 12px;
    background-color: #ccc;
  }
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

.show-all {
  padding: 8px 50px 8px 0;
  text-align: right;
}

.show-all::after {
  content: ' >'
}
</style>
