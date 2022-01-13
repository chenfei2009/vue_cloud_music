<template>
  <el-header>
    <div class="logo-wrap">
      <div class="logo"></div>
    </div>
    <div class="header-bar">
      <div class="action-bar">
        <!-- <el-button size="mini" icon="el-icon-arrow-left" circle></el-button>
        <el-button size="mini" icon="el-icon-arrow-right" circle></el-button> -->
        <div class="action-btn"><i class="iconfont icon-arrow back-btn"></i></div>
        <div class="action-btn"><i class="iconfont icon-arrow"></i></div>
        <div class="search-wrap">
          <i class="iconfont icon-search search-btn"></i>
          <input type="text" placeholder="搜索" v-model="inputVal">
        </div>
      </div>
      <div class="user-bar">
        <div class="avatar">
          <i class="iconfont icon-user01"></i>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            未登录<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>选项一</el-dropdown-item>
            <el-dropdown-item>选项二</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="bar-item"><i class="iconfont icon-yifu"></i></div>
        <div class="bar-item"><i class="iconfont icon-setting"></i></div>
        <div class="bar-item"><i class="iconfont icon-Email"></i></div>
      </div>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'Header',
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
  background-color: #ec4141;
  color: #fff;
  text-align: center;
  width: 100vw;
  line-height: 60px;

  .logo-wrap {
    display: flex;
    align-items: center;
    width: 180px;
    background-color: #ec4141;
    .logo {
      width: 140px;
      height: 46px;
      background: url('../../../assets/img/logo.png');
      // background-size: cover;
    }
  }

  .header-bar {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .action-bar {
    display: flex;
    align-items: center;
    height: 60px;
    // el-input {
    //   height: 30px;
    //   border-radius: 10px;
    // }
    .action-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin: 0 5px;
      background-color: #e13e3e;
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
        background-color: #e13e3e;
        color: #fff;
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
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }

  .user-bar {
    display: flex;
    justify-content: right;
    .avatar {
      .iconfont {
        color: rgba(255, 255, 255, 0.8);
        font-size: 24px;
      }
    }
    .el-dropdown {
      color: #fff;
      margin: 0 5px;
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
