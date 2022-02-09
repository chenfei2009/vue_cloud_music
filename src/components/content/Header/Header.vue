<template>
  <el-header :style="bgStyle">
    <div class="left-bar">
      <div class="logo-wrap" v-if="!transparent">
        <div class="logo-bg">
          <i class="logo iconfont icon-netease-cloud-music-line"></i>
        </div>
        <span>网易云音乐</span>
      </div>
      <i class="btn iconfont icon-arrow" v-else></i>
    </div>
    <div class="action-bar">
      <div class="action-btn"><i class="iconfont icon-arrow back-btn"></i></div>
      <div class="action-btn"><i class="iconfont icon-arrow"></i></div>
      <div class="search-wrap">
        <i class="iconfont icon-search search-btn"></i>
        <input type="text" placeholder="搜索" v-model="inputVal">
      </div>
    </div>
    <div class="user-bar">
      <div class="login-wrap" v-if="!transparent">
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
  </el-header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    transparent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    bgStyle () {
      // const themeColor = this.$store.state.themeColor
      if (this.transparent) {
        return {
          color: '#000',
          backgroundColor: 'rgba(0, 0, 0, 0)'
        }
      }
      return { backgroundColor: 'var(--themeColor)' }
    }
  },
  data () {
    return {
      inputVal: ''
    }
  },
  methods: {}
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

  .action-bar {
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
}
</style>
