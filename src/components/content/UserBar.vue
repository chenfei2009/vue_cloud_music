<template>
  <div class="user-bar">
    <div class="login-wrap" @click="$store.commit('showLogin')">
      <!-- <el-image :scr="profile.avatarUrl"
        v-if="profile"></el-image>
      <i class="avatar iconfont icon-user01"></i> -->
      <div class="avatar">
        <img :src="profile.avatarUrl" v-if="profile.avatarUrl"/>
        <i class="avatar-icon iconfont icon-user01" v-else></i>
      </div>
      <DropDown :title="nickname">
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
        <div class="list-wrap">
          <DropDownItem>会员中心</DropDownItem>
          <DropDownItem>等级</DropDownItem>
          <DropDownItem>商城</DropDownItem>
          <DropDownItem>个人信息设置</DropDownItem>
          <DropDownItem>绑定社交账号</DropDownItem>
          <DropDownItem>我的客服</DropDownItem>
          <DropDownItem>退出登录</DropDownItem>
          <DropDownItem>会员中心</DropDownItem>
        </div>
      </DropDown>
    </div>
    <div class="bar-item"><i class="iconfont icon-yifu"></i></div>
    <div class="bar-item"><i class="iconfont icon-setting"></i></div>
    <div class="bar-item"><i class="iconfont icon-Email"></i></div>
    <Login v-show="isShowLogin"/>
  </div>
</template>

<script>
import DropDown from '@/components/common/DropDown.vue'
import DropDownItem from '@/components/common/DropDownItem.vue'
import Login from '@/components/content/Login.vue'

import { _getLoginStatus } from '@/network/login.js'

export default {
  name: 'UserBar',
  props: {},
  components: { DropDown, DropDownItem, Login },
  computed: {
    nickname () {
      return this.profile.nickname || '未登录'
    },
    isShowLogin () {
      return this.$store.state.isShowLogin
    }
  },
  data () {
    return {
      isShowPanel: false,
      profile: {}
    }
  },
  created () {
    this.getLoginStatus()
    // const profile = JSON.parse(window.localStorage.getItem('profile')) || null
    // this.profile = profile
  },
  methods: {
    /**
     * 获取登录状态
     */
    async getLoginStatus () {
      const { data: res } = await _getLoginStatus()
      if (res.data.code === 200) {
        // 当前登录状态有效
        const profile = JSON.parse(window.localStorage.getItem('profile')) || null
        this.profile = profile
        return
      }
      // 当前登录状态已过期
      console.log('登录超时')
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
    .data-wrap {
      display: flex;
      justify-content: space-around;
      width: 200px;
      .data-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    .sign-wrap {
      display: flex;
      justify-content: center;
      padding: 10px;
      .sign-btn {
        height: 30px;
        width: 60px;
        text-align: center;
        line-height: 30px;
        border: 1px solid #ccc;
        border-radius: 15px;
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
