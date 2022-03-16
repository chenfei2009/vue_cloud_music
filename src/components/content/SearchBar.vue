<template>
  <div class="search-bar-container">
    <div class="action-btn" @click="$router.go(-1)"><i class="iconfont icon-arrow back-btn"></i></div>
    <div class="action-btn" @click="$router.go(1)"><i class="iconfont icon-arrow"></i></div>
    <div class="search-wrap">
      <i class="iconfont icon-search search-btn"></i>
      <input type="text"
        :placeholder="showKeyword"
        v-model="inputVal"
        @click.stop="isShowPanel=true"
        @input="handleInput"
        @keyup.enter="handleSubmit">
    </div>
    <div class="search-panel" v-if="isShowPanel" ref="panelRef">
      <Scroll v-if="songs.length === 0"
        ref="scroll"
        class="scroll-wrap"
        :probeType="3"
        :stopPropagation="true"
        :bounce="false"
        :mouseWheel="true"
        :scrollbar="true">
        <div class="scroll-title">搜索历史
          <i class="iconfont icon-delete"
            v-if="history.length>0"
            @click="dialogVisible=true"></i>
        </div>
        <ul class="history-list" v-if="history.length>0">
          <li v-for="(item, index) in history"
            :key="index"
            class="history-item"
            @click="handleItemClick(item)">
            <button class="btn-round">{{item}}</button>
            <span class="btn-delete" @click.stop="handleDeleteItem(index)">x</span>
          </li>
        </ul>
        <div class="scroll-title">热搜榜</div>
        <ul class="hot-list">
          <li class="list-item" v-for="(item, index) in hotData" :key="index">
            <!-- index searchWord icon score -->
            <div class="index"
              :class="{'active': index < 3}"
              >{{index + 1}}</div>
            <div class="right-wrap">
              <div class="word-wrap">
                <!-- <router-link :to="'/search?keyword='+item.searchWord"
                  @click="isShowPopover=false"
                  >{{item.searchWord}}</router-link> -->
                <span class="search-word"
                  @click="handleWordClick(item.searchWord)"
                  >{{item.searchWord}}</span>
                <span class="score text-small">{{item.score}}</span>
              </div>
              <div class="content" v-if="item.content">{{item.content}}</div>
            </div>
          </li>
        </ul>
      </Scroll>
      <div class="result-wrap" v-else>
        <div class="title">单曲
          <i class="iconfont title-icon icon-music"></i>
        </div>
        <ul class="song-list">
          <li class="list-item" v-for="item in songs" :key="item.id">
            <div v-html="formatData(item)"></div>
            <!-- {{formatSong(item)}} -->
          </li>
        </ul>
        <div class="title">歌手
          <i class="iconfont title-icon icon-person"></i>
        </div>
        <ul class="artist-list">
          <li class="list-item" v-for="item in artists" :key="item.id">
            <div v-html="formatData(item)"></div>
          </li>
        </ul>
        <div class="title">专辑
          <i class="iconfont title-icon icon-disc"></i>
        </div>
        <ul class="album-list">
          <li class="list-item" v-for="item in albums" :key="item.id">
            <div v-html="formatData(item)"></div>
          </li>
        </ul>
        <div class="title">歌单
          <i class="iconfont title-icon icon-list"></i>
        </div>
        <ul class="play-list">
          <li class="list-item" v-for="item in playlists" :key="item.id">
            <div v-html="formatData(item)"></div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible"
      width="500px"
      center
      :before-close="handleClose">
      <span>是否删除全部？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </el-dialog>
    <!-- 对话框/ -->
  </div>
</template>

<script>
import Scroll from '@/components/common/Scroll.vue'

import { _getDefaultKey, _getHotKeys, _getSearch } from '@/network/search.js'

export default {
  name: 'SearchBar',
  components: { Scroll },
  props: {
    bgColor: {
      type: String,
      default: 'var(--themeColor)'
    }
  },

  computed: {
    bgStyle () {
      return { backgroundColor: this.bgColor }
    },
    formatData () {
      return function (item) {
        let str = item.name
        if (item.artists) {
          str = str + ' - '
          item.artists.map(v => {
            str = str + v.name + ' '
          })
        }
        return this.highlights(str)
      }
    }
  },

  data () {
    return {
      inputVal: '',
      showKeyword: '搜索',
      hotData: [],
      isShowPanel: false,
      songs: [],
      artists: [],
      albums: [],
      playlists: [],
      history: [], // 搜索历史
      dialogVisible: false
    }
  },

  created () {
    this.getDefaultKey()
    this.getHotKeys()
    this.history = JSON.parse(window.localStorage.getItem('history')) || []
  },

  mounted () {
    document.addEventListener('click', this.bodyCloseMenus)
  },

  methods: {
    // 网络请求相关方法
    /**
     * 获取默认搜索关键词
     */
    async getDefaultKey () {
      const { data: res } = await _getDefaultKey()
      // console.log(res.data)
      this.showKeyword = res.data.showKeyword
    },

    /**
     * 获取热搜列表
     */
    async getHotKeys () {
      const { data: res } = await _getHotKeys()
      this.hotData = res.data
    },

    /**
     * 关键词搜索
     */
    async getSearch (keywords) {
      const { data: res1 } = await _getSearch(keywords, 1, 4)
      this.songs = res1.result.songs
      const { data: res2 } = await _getSearch(keywords, 100, 1)
      this.artists = res2.result.artists
      const { data: res3 } = await _getSearch(keywords, 10, 2)
      this.albums = res3.result.albums
      const { data: res4 } = await _getSearch(keywords, 1000, 2)
      this.playlists = res4.result.playlists
    },

    // 事件监听相关方法

    onArrowClick () {
      this.$emit('arrowClick')
    },

    /**
     * 热门搜索关键词点击事件
     */
    handleWordClick (s) {
      this.inputVal = s
      this.history.unshift(s)
      this.getSearch(this.inputVal)
      this.isShowPanel = false
      this.$router.push({
        path: '/search',
        query: { s }
      })
    },

    /**
     * 关闭搜索弹窗
     */
    bodyCloseMenus (e) {
      if (this.$refs.panelRef && !this.$refs.panelRef.contains(e.target)) {
        if (this.isShowPanel === true) {
          this.isShowPanel = false
        }
      }
    },

    /**
     * input 输入事件
     */
    handleInput () {
      const inputVal = this.inputVal.replace(/\s+$/, '')
      if (inputVal) return this.getSearch(inputVal)
      // console.log('没有输入')
      this.songs = []
      // this.artists = []
      // this.albums = []
      // this.playlists = []
    },

    /**
     * input 回车事件
     */
    handleSubmit (e) {
      // 表单预验证
      const inputVal = this.inputVal.replace(/\s+$/, '')
      if (!inputVal) return console.log('请输入有效字符')
      // input 输入框 失去焦点
      e.target.blur()
      // 修改本地缓存的 history
      this.history.unshift(inputVal)
      // const localHistory = JSON.parse(window.localStorage.getItem('history')) || []
      window.localStorage.setItem('history', JSON.stringify(this.history))
      this.isShowPanel = false
      this.$router.push({
        path: '/search',
        query: { s: inputVal }
      })
    },

    handleItemClick (item) {
      this.isShowPanel = false
      this.$router.push({
        path: '/search',
        query: { s: item }
      })
    },

    handleDeleteItem (index) {
      this.history.splice(index, 1)
      window.localStorage.setItem('history', JSON.stringify(this.history))
    },

    handleConfirm () {
      this.history = []
      window.localStorage.removeItem('history')
      this.dialogVisible = false
    },

    /**
     * 关键字高亮处理
     */
    highlights (str) {
      const search = this.inputVal
      const replaceReg = new RegExp(search, 'g')// 匹配关键字正则
      const replaceString = '<span class="active">' + search + '</span>' // 高亮替换v-html值
      str = str.replace(replaceReg, replaceString) // 开始替换
      return str
    }
  },

  watch: {
    hotData () {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  },

  beforeDestroy () {
    document.removeEventListener('click', this.bodyCloseMenus)
  }
}
</script>

<style lang="less" scoped>
.search-bar-container {
  flex: 1;
  display: flex;
  align-items: center;
  .action-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin: 0 5px;
    background-color: rgba(100, 100, 100, 0.1);
    .back-btn {
      transform: rotate(180deg);
    }
    .iconfont {
      color: rgba(255, 255, 255, 0.8);
    }
  }
  .search-wrap {
    position: relative;
    input {
      height: 30px;
      width: 150px;
      border-radius: 15px;
      border: 0;
      margin: 0 5px;
      padding-left: 40px;
      background-color: rgba(100, 100, 100, 0.1);
      color: #fff;
      outline: none;
    }
    input::-webkit-input-placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    input::-moz-placeholder {   /* Mozilla Firefox 19+ */
      color: rgba(255, 255, 255, 0.5);
    }
    input:-moz-placeholder {    /* Mozilla Firefox 4 to 18 */
      color: rgba(255, 255, 255, 0.5);
    }
    input:-ms-input-placeholder {  /* Internet Explorer 10-11 */
      color: rgba(255, 255, 255, 0.5);
    }
    .search-btn {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(255, 255, 255, 0.5);
    }
  }
}

.search-panel {
  position: fixed;
  top: 70px;
  left: 220px;
  width: 350px;
  height: calc(~"100vh - 160px");
  z-index: 99;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 2px 2px #eee;

  .scroll-wrap {
    height: 100%;
    overflow: hidden;
  }

  .scroll-title {
    padding: 15px;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 15px;
    .history-item {
      position: relative;
      // .btn-round {
      //   padding-right: 15px;
      // }
      &:hover {
        .btn-round {
          cursor: pointer;
          background-color: #eee;;
        }
        .btn-delete {
          cursor: pointer;
          opacity: 1;
        }
      }
      .btn-delete {
        position: absolute;
        top: 5px;
        right: 15px;
        opacity: 0;
      }
    }
  }

  .list-item {
    display: flex;
    padding: 10px 15px 10px 15px;
    // height: 30px;
    align-items: center;
    .index {
      width: 30px;
      font-size: 18px;
    }
    .active {
      color: red;
    }
    .search-word {
      padding: 0 5px 5px 0;
      cursor: pointer;
    }
    .content {
      color: #ccc;
    }
  }

  .list-item:hover {
    background-color: #eee;
  }
}

.result-wrap {
  padding-top: 15px;
  .title {
    position: relative;
    padding: 10px 40px;
    color: rgb(140, 140, 140);
    .title-icon {
      position: absolute;
      left: 15px;
    }
  }
  .list-item {
    font-size: 12px;
    padding: 10px 40px;
    span {
      font-size: 12px;
    }
    /deep/ .active {
      color: var(--themeColor);
    }
    &:hover {
      background-color: #eee;
    }
  }
}
</style>
