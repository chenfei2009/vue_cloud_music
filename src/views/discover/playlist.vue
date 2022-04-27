<template>
  <div class="playlist-container tab-container">
    <!-- 精品歌单 -->
    <div class="high-list-wrap">
      <cover class="cover"
        :picUrl="highList.coverImgUrl"
        @itemClick="handleCoverClick(highList.id)"
        :fixWidth="150">
      </cover>
      <div class="desc">
        <button class="round">精品歌单</button>
        <div class="name">{{highList.name}}</div>
      </div>
      <div class="blur-mask"></div>
      <div class="blur-bg" :style="bgStyle"></div>
    </div>
    <!-- /精品歌单 -->
    <!-- 头部 筛选分类 -->
    <div class="select-wrap">
      <drop-down ref="dropDownRef"
        :title="curCat"
        class="main-list"
        align="left">
        <div class="sub-all" @click="allClick">全部歌单</div>
        <div v-for="(item, index) in cats" :key="index" class="main-item">
          <div class="sub-label">{{item.label}}</div>
          <ul class="sub-list"
            @click="subClick">
            <li v-for="(sub, index2) in item.subs"
              :key="index2"
              class="sub-item">
              <div class="sub-btn" :class="{'active': sub.name === curCat}">
                <span class="btn-text">{{sub.name}}</span>
                <span class="btn-tag" v-if="sub.hot">HOT</span>
              </div>
            </li>
          </ul>
        </div>
      </drop-down>
      <ul class="tag-list" @click="subClick">
        <!-- <li class="text-small tag-item"
          v-for="(item, index) in tags"
          :key="index"
          >{{item.name}}</li> -->
        <li v-for="(tag, index) in tags"
          :key="index"
          class="text-small sub-item">
          <div class="sub-btn" :class="{'active': tag.name === curCat}">
            <span class="btn-text">{{tag.name}}</span>
          </div>
        </li>
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
  _getHighPlaylist,
  _getSongsByListId
} from '@/network/playlist.js'
import { _getSongUrlById } from '@/network/song.js'

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
        backgroundImage: `url(${this.highList.coverImgUrl})`
      }
    }
  },

  data () {
    return {
      curCat: '全部歌单',
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

    async getSongsByListId (id) {
      const { data: res } = await _getSongsByListId(id)
      const songs = res.songs
      songs.forEach(async v => {
        const { data: res } = await _getSongUrlById(v.id)
        v.url = res.data[0].url
      })
      this.$store.commit('resetPlayList', { songs })
    },

    /**
     * 事件监听相关方法
     */
    subClick (e) {
      this.curCat = e.target.innerText
      this.getPlaylistByCat()
      this.getHighList()
      this.$refs.dropDownRef.isOpen = false
    },

    allClick () {
      this.curCat = '全部歌单'
      this.getPlaylistByCat()
      this.getHighList()
      this.$refs.dropDownRef.isOpen = false
    },

    // 歌单封面点击事件
    handleCoverClick (id) {
      console.log('跳转到歌单详情页', id)
      this.$router.push({
        path: '/playlist',
        query: { id }
      })
    },

    // 歌单播放按钮点击事件
    handleBtnClick (item) {
      console.log('播放歌单', item)
      this.$store.commit('setPlayListInfo', item)
      this.getSongsByListId(item.id)
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
.high-list-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  height: 180px;
  .cover {
    position: absolute;
    left: 15px;
    top: 5px;
    z-index: 3;
  }
  .desc {
    position: absolute;
    left: 180px;
    top: 30px;
    z-index: 3;
    button {
      height: 30px;
      background: none;
      border: 1px solid rgb(255, 204, 128);
      margin-bottom: 20px;
      font-size: 16px;
      color: rgb(255, 204, 128);;
    }
    .name {
      font-size: 16px;
      color: #fff;
    }
  }
  .blur-mask {
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    width: 100%;
    top: 0;
    height: 100%;
    z-index: 2;
  }
  .blur-bg {
    -webkit-filter: blur(25px);
    filter: blur(25px);
    background-size: cover;
    background-position: center;
  }
}

.select-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 10px 0;
}

.sub-all {
  padding: 20px;
  border-bottom: 1px solid #eee;
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
    }
  }
}

.sub-item {
  // width: 100px;
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

.tag-list {
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  justify-content: right;
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
