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
    <div class="bar-item">
      <!-- 自定义主题 -->
      <DropDown title="主题">
        <div class="theme-title">主题</div>
        <div class="default-wrap">
          <div class="default-item" @click="defaultTheme">默认主题</div>
          <div class="default-item" @click="dark">暗黑主题</div>
          <div class="default-item" @click="light">浅色主题</div>
        </div>
        <div class="theme-title">颜色</div>
        <div class="color-picker-wrap">
          <div class="block">
            <span class="demonstration">选择颜色</span>
            <el-color-picker color-format="rgb"
              v-model="color"
              @change="handleColorChange"
              ></el-color-picker>
          </div>
        </div>
        <!-- <button @click="custom">自定义主题</button> -->
      </DropDown>
      <!-- /自定义主题 -->
      <!-- <i class="iconfont icon-yifu"></i> -->
    </div>
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
import { setTheme } from '@/assets/theme/theme.js'

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
      profile: {},
      color: null
    }
  },
  created () {
    this.getLoginStatus()
    // const profile = JSON.parse(window.localStorage.getItem('profile')) || null
    // this.profile = profile
  },
  mounted () {
    this.init()
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
    },

    // 初始化主题
    init () {
      const theme = localStorage.getItem('theme') || null
      if (theme) return setTheme(theme)
      setTheme('default')
    },
    // 更改为默认主题
    defaultTheme () {
      console.log('default')
      setTheme('default')
    },
    // 更改为暗黑主题
    dark () {
      console.log('dark')
      setTheme('dark')
    },
    // 更改为浅色主题
    light () {
      console.log('light')
      setTheme('light')
    },
    // 更改为自定义主题
    handleColorChange () {
      const regexp = /[0-9]+/g
      const re = this.color.match(regexp)
      const newPrimaryColor = `${re[0]},${re[1]},${re[2]}`
      localStorage.setItem('primaryColor', newPrimaryColor) // 将新的主题色存入本地
      setTheme()
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
    .theme-title {
      padding: 10px;
    }
    .default-wrap {
      width: 200px;
      padding: 0 10px;
      // display: flex;
    }
    .color-picker-wrap {
      padding: 0 10px;
    }
  }
}
</style>
