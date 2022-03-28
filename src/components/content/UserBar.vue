<template>
  <div class="user-bar">
    <div class="login-wrap" @click="handleLogin">
      <!-- <el-image :scr="profile.avatarUrl"
        v-if="profile"></el-image>
      <i class="avatar iconfont icon-user01"></i> -->
      <div class="avatar">
        <img :src="profile.avatarUrl" v-if="profile.avatarUrl"/>
        <i class="avatar-icon iconfont icon-user01" v-else></i>
      </div>
      <div class="dropdown-link">
        {{nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <div class="dropdown-panel" v-if="isShowPanel">
        <div class="data-wrap">
          <div class="data-item">
            <span>{{profile.eventCount}}</span>
            <span>动态</span>
          </div>
          <div class="data-item">
            <span>{{profile.follows}}</span>
            <span>关注</span>
          </div>
          <div class="data-item">
            <span>{{profile.followeds}}</span>
            <span>粉丝</span>
          </div>
        </div>
        <div class="sign-wrap">
          <div class="sign-btn">
            签到
          </div>
        </div>
        <ul class="list-wrap">
          <li class="list-item">会员中心</li>
          <li class="list-item">等级</li>
          <li class="list-item">商城</li>
          <li class="list-item">个人信息设置</li>
          <li class="list-item">绑定社交账号</li>
          <li class="list-item">我的客服</li>
          <li class="list-item">退出登录</li>
          <li class="list-item">会员中心</li>
        </ul>
      </div>
    </div>
    <div class="bar-item"><i class="iconfont icon-yifu"></i></div>
    <div class="bar-item"><i class="iconfont icon-setting"></i></div>
    <div class="bar-item"><i class="iconfont icon-Email"></i></div>
  </div>
</template>

<script>

export default {
  name: 'UserBar',
  props: {},
  computed: {
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
      if (this.profile.userId) return
      // 切换到登录页面
      this.$router.push('./login')
    }
  }
}
</script>

<style lang="less" scoped>
.user-bar {
  display: flex;
  justify-content: right;
  align-items: center;
  .login-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
      .avatar-icon {
        color: rgba(255, 255, 255, 0.8);
        font-size: 24px;
      }
    }
    .el-dropdown {
      color: #fff;
      margin: 0 5px;
    }
    .data-wrap {
      display: flex;
      justify-content: space-around;
      width: 200px;
      data-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
  .bar-item {
    margin: 0 5px;
    .iconfont {
      font-size: 18px;
    }
  }
}
</style>
