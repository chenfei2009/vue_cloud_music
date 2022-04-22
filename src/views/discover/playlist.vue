<template>
  <div class="playlist-container tab-container">
    <!-- 精品歌单 -->
    <div class="high-list-wrap" :style="bgStyle">
      <cover :picUrl="highList.coverImgUrl"
        @itemClick="handleCoverClick(highList.id)"
        :fixWidth="150">
      </cover>
      <button>精品歌单</button>
      <div class="name">{{highList.name}}</div>
    </div>
    <!-- /精品歌单 -->
    <!-- 头部 筛选分类 -->
    <div class="select-wrap">
      <drop-down ref="dropDownRef"
        :title="curCat"
        class="main-list"
        align="left">
        <div v-for="(item, index) in cats" :key="index" class="main-item">
          <div class="sub-label">{{item.label}}</div>
          <ul class="sub-list"
            @click="subClick">
            <li v-for="(sub, index2) in item.subs" :key="index2" class="sub-item">
              <div class="sub-btn" :class="{'active': sub.name === curCat}">
                <span class="btn-text">{{sub.name}}</span>
                <span class="btn-tag" v-if="sub.hot">HOT</span>
              </div>
            </li>
          </ul>
        </div>
      </drop-down>
      <ul class="tag-list">
        <li class="text-small tag-item"
          v-for="(item, index) in tags"
          :key="index"
          >{{item.name}}</li>
      </ul>
    </div>
    <!-- /头部 筛选分类 -->
    <!-- 歌单列表 -->
    <div class="playlists-wrap" v-loading="loading">
      <cover v-for="item in playlists"
        :key="item.id"
        :picUrl="item.coverImgUrl"
        @itemClick="handleCoverClick(item.id)">
        <div class="hover-wrap">
          <play-button :isPlay="false" @btnClick="handleBtnClick(item)"/>
        </div>
        <div class="play-count">{{item.playCount | countFilter}}</div>
        <span slot="text">{{item.name}}</span>
      </cover>
    </div>
    <!-- /歌单列表 -->
    <!-- 分页 -->
    <el-pagination
      v-show="!loading"
      background
      layout="prev, pager, next"
      :page-size="50"
      :total="total"
      @current-change="curChange"
      @prev-click="goPrev"
      @next-click="goNext">
    </el-pagination>
    <!-- /分页 -->
  </div>
</template>

<script>
import DropDown from '@/components/common/DropDown.vue'
import Cover from '@/components/content/Cover.vue'
import PlayButton from '@/components/common/PlayButton.vue'

import {
  _getPlaylistCats,
  _getPlaylistHots,
  _getPlaylistByCat,
  _getHighPlaylist
} from '@/network/playlist.js'

export default {
  name: 'Playlist',

  components: {
    DropDown,
    Cover,
    PlayButton
  },

  computed: {
    loading () {
      return this.playlists.length === 0
    },
    bgStyle () {
      return {
        height: '200px',
        backgoundImage: `url(${this.highList.coverImgUrl})`
      }
    }
  },

  data () {
    return {
      curCat: '华语',
      cats: [],
      tags: [],
      playlists: [],
      highList: {},
      highPlaylists: [],
      total: 0,
      limit: 50
    }
  },

  created () {
    this.getHighList()
    this.getPlaylistCats()
    this.getPlaylistHots()
    this.getPlaylistByCat()
  },

  filters: {
    countFilter (playCount) {
      return playCount > 10000 ? parseInt(playCount / 10000) + '万' : playCount
    }
  },

  methods: {
    /**
     * 网络请求相关方法
     */
    // 获取歌单类别数据
    async getPlaylistCats () {
      const { data: res } = await _getPlaylistCats()
      const temp = []
      for (const key in res.categories) {
        const arr = res.sub.filter(v => v.category.toString() === key)
        temp.push({
          cat: key,
          label: res.categories[key],
          subs: arr
        })
      }
      this.cats = temp
      console.log(temp)
    },

    // 获取热门类别
    async getPlaylistHots () {
      const { data: res } = await _getPlaylistHots()
      this.tags = res.tags
    },

    // 获取指定类别歌单
    async getPlaylistByCat (offset = null) {
      this.playlists = []
      const { data: res } = await _getPlaylistByCat('hot', this.curCat, this.limit, offset)
      this.playlists.push(...res.playlists)
      this.total = res.total
    },

    // 获取精品歌单
    async getHighList (limit = 1, before = null) {
      const { data: res } = await _getHighPlaylist('hot', this.curCat, limit, before)
      console.log(res)
      this.highList = res.playlists[0]
    },

    /**
     * 事件监听相关方法
     */
    subClick (e) {
      this.curCat = e.target.innerText
      this.$refs.dropDownRef.isOpen = false
    },

    handleCoverClick (id) {
      console.log(id)
    },

    // 改变页码
    curChange (val) {
      this.getPlaylistByCat((val - 1) * this.limit)
    },

    goPrev (val) {
      this.getPlaylistByCat((val - 2) * this.limit)
    },

    goNext (val) {
      this.getPlaylistByCat(val * this.limit)
    }
  }
}
</script>

<style lang="less" scoped>
.select-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.main-item {
  display: flex;
  margin: 20px;
  width: 700px;
  // flex-direction: column;
  .sub-label {
    width: 100px;
    padding: 5px 0;
  }
  .sub-list {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    .sub-item {
      width: 100px;
      cursor: pointer;
      &:hover {
        .btn-text {
          color: red;
        }
      }
      .sub-btn {
        display: inline-block;
        position: relative;
        padding: 5px 10px;
        border-radius: 15px;
        border: 0;
        .btn-text {
          font-size: 12px;
        }
        .btn-tag {
          font-size: 3px;
          position: absolute;
          color: red;
        }
        &.active {
          background-color: #eee;
        }
      }
    }
  }
}

.tag-list {
  display: flex;
  .tag-item {
    padding-left: 10px;
  }
}

.playlists-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* 播放按钮 */
  .hover-wrap {
    opacity: 0;
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
  }
  .item-cover-wrap:hover {
    .hover-wrap {
      opacity: 1;
      transition: opacity 1s;
    }
  }
  .play-count {
    position: absolute;
    top: 2px;
    right: 5px;
    color: #fff;
    font-size: 12px;
  }
}
</style>
