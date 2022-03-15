<template>
  <el-header :style="bgStyle">
    <div class="left-bar">
      <div class="logo-wrap" v-if="!isShowPlayDetail">
        <div class="logo-bg">
          <i class="logo iconfont icon-netease-cloud-music-line"></i>
        </div>
        <span>网易云音乐</span>
      </div>
      <i class="btn iconfont icon-arrow"
        @click="onArrowClick"
        v-else></i>
    </div>
    <div class="search-bar">
      <div class="action-btn" @click="$router.go(-1)"><i class="iconfont icon-arrow back-btn"></i></div>
      <div class="action-btn" @click="$router.go(1)"><i class="iconfont icon-arrow"></i></div>
      <div class="search-wrap">
        <i class="iconfont icon-search search-btn"></i>
        <input type="text" placeholder="搜索" v-model="inputVal">
      </div>
    </div>
    <div class="user-bar">
      <div class="login-wrap" v-if="!isShowPlayDetail">
        <i class="avatar iconfont icon-user01"></i>
        <el-dropdown>
          <span class="el-dropdown-link">
            未登录<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>选项一</el-dropdown-item>
            <el-dropdown-item>选项二</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="bar-item"><i class="iconfont icon-yifu"></i></div>
      <div class="bar-item"><i class="iconfont icon-setting"></i></div>
      <div class="bar-item"><i class="iconfont icon-Email"></i></div>
    </div>
    <div class="popover" v-show="isShowPopover">
      <Scroll ref="scroll"
        class="scroll-wrap"
        :probeType="3"
        :stopPropagation="true"
        :bounce="false"
        :mouseWheel="true"
        :scrollbar="true">
        <div class="scroll-title">搜索历史</div>
        <div class="scroll-title">热搜榜</div>
        <ul class="hot-list">
          <li class="hot-item" v-for="(item, index) in hotData" :key="index">
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
    </div>
  </el-header>
</template>

<script>
import Scroll from '@/components/common/Scroll.vue'

import { _getDefaultKey, _getHotKeys } from '@/network/search.js'

export default {
  name: 'Header',
  components: { Scroll },
  props: {
    bgColor: {
      type: String,
      default: 'var(--themeColor)'
    },
    isShowPlayDetail: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    bgStyle () {
      return { backgroundColor: this.bgColor }
    }
  },
  data () {
    return {
      inputVal: '',
      showKeyword: '',
      hotData: [],
      isShowPopover: true
    }
  },
  created () {
    this.getDefaultKey()
    this.getHotKeys()
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

    // 事件监听相关方法
    onArrowClick () {
      this.$emit('arrowClick')
    },

    handleWordClick (searchWord) {
      this.isShowPopover = false
      this.$router.push({
        path: '/search',
        query: { searchWord }
      })
    }
  },
  watch: {
    hotData () {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: space-between;

  .left-bar {
    display: flex;
    align-items: center;
    width: 200px;
    .logo-wrap {
      display: flex;
      align-items: center;
      .logo-bg {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #fff;
        .logo {
          font-size: 20px;
          color: var(--themeColor);
        }
      }
      span {
        margin-left: 5px;
        font-size: 18px;
        color: #fff;
      }
    }
    .btn {
      transform: rotate(90deg);
      font-size: 20px;
      padding-bottom: 20px;
    }
  }

  .search-bar {
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
        // color: #fff;
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

  .user-bar {
    display: flex;
    justify-content: right;
    align-items: center;
    .login-wrap {
      display: flex;
      align-items: center;
      .avatar {
        color: rgba(255, 255, 255, 0.8);
        font-size: 24px;
      }
      .el-dropdown {
        color: #fff;
        margin: 0 5px;
      }
    }
    .bar-item {
      margin: 0 5px;
      .iconfont {
        font-size: 18px;
      }
    }
  }

  .popover {
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

    .hot-item {
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
  }
}
</style>
