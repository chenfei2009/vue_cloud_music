<template>
  <section :style="bgStyle" class="header-container">
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
    <SearchBar />
    <!-- <div class="search-bar"></div> -->
    <div class="user-bar">
      <div class="login-wrap" v-if="!isShowPlayDetail" @click="handleLogin">
        <!-- <el-image :scr="profile.avatarUrl"
          v-if="profile"></el-image>
        <i class="avatar iconfont icon-user01"></i> -->
        <el-avatar :size="30">
          <img :scr="profile.avatarUrl" v-if="profile.avatarUrl"/>
          <i class="avatar iconfont icon-user01" v-else></i>
        </el-avatar>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div>12345678</div>
            <el-dropdown-item>会员中心</el-dropdown-item>
            <el-dropdown-item>等级</el-dropdown-item>
            <el-dropdown-item>商城</el-dropdown-item>
            <el-dropdown-item>个人信息设置</el-dropdown-item>
            <el-dropdown-item>绑定社交账号</el-dropdown-item>
            <el-dropdown-item>我的客服</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="bar-item"><i class="iconfont icon-yifu"></i></div>
      <div class="bar-item"><i class="iconfont icon-setting"></i></div>
      <div class="bar-item"><i class="iconfont icon-Email"></i></div>
    </div>
  </section>
</template>

<script>

import SearchBar from '@/components/content/SearchBar.vue'

export default {
  name: 'Header',
  components: { SearchBar },
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
    },
    nickname () {
      return this.profile.nickname || '未登录'
    }
  },
  data () {
    return {
      profile: {}
    }
  },
  created () {
    const profile = JSON.parse(window.localStorage.getItem('profile')) || null
    this.profile = profile
  },
  methods: {
    handleLogin () {
      // 切换到登录页面
      this.$router.push('./login')
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;

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

  // .search-bar {
  //   flex: 1;
  // }

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
