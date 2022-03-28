<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-header">
        <div class="left">
          <span v-show="loginType === (1 || 3)" @click="loginType=0">切换二维码登录</span>
          <span v-show="loginType === (1 || 3)" @click="loginType=2">切换邮箱登录</span>
          <span v-show="loginType === 2" @click="loginType=1">返回其他登录</span>
        </div>
        <i class="iconfont icon-x"></i>
      </div>
      <!-- 二维码登录 -->
      <section v-if="loginType === 0">
        <div>二维码登录</div>
        <div @click="loginType=1">切换手机登录</div>
      </section>
      <!-- /二维码登录 -->
      <!-- 手机登录 -->
      <section v-else-if="loginType === (1 || 3)">
        <div class="logo-wrap">
          <i class="iconfont icon-main icon-mobile-check"></i>
        </div>
        <el-form class="login-form" ref="login-form" :model="user" :rules="loginRules">
          <!-- <el-form-item>
            <el-input placeholder="请输入手机号" v-model="user.mobile" class="input-with-select">
              <el-select v-model="user.area" slot="prepend">
                <el-option
                  v-for="item in areas"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                </el-option>
              </el-select>
            </el-input>
          </el-form-item> -->
          <el-form-item class="form-left" >
            <el-select v-model="user.area">
              <el-option
                v-for="item in areas"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                <!-- <i slot="prefix" class="iconfont icon-phone"></i> -->
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="mobile" class="form-right" >
            <el-input v-model="user.mobile" placeholder="请输入手机号">
              <i slot="suffix" class="iconfont icon-phone"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="code" class="form-bottom">
            <el-input v-model="user.code" placeholder="请输入密码">
              <!-- <i slot="prefix" class="iconfont icon-phone"></i> -->
              <i slot="suffix" class="iconfont icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item v-show="loginType === 1">
            <!-- `checked` 为 true 或 false -->
            <el-checkbox v-model="user.autoLogin"
              >自动登录</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button v-show="loginType === 1"
              class="login-btn"
              type="primary"
              :loading="loginLoading"
              @click="onLogin"
              >登录</el-button>
            <el-button v-show="loginType === 3"
              class="login-btn"
              type="primary"
              :loading="loginLoading"
              @click="onRegister"
              >注册</el-button>
          </el-form-item>
          <el-form-item v-show="loginType === 1">
            <div @click="loginType=3">注册</div>
          </el-form-item>
          <el-form-item  v-show="loginType === 1">
            <!-- `checked` 为 true 或 false -->
            <el-checkbox v-model="user.agree"
              >我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
        </el-form>
      </section>
      <!-- /手机登录 -->
      <!-- 邮箱登录 -->
      <section v-else>
        <div class="logo-wrap">
          <i class="iconfont icon-main icon-mobile-check"></i>
        </div>
        <el-form class="login-form" ref="login-form" :model="user" :rules="loginRules">
          <el-form-item prop="email" class="form-top">
            <el-input v-model="user.email" placeholder="邮箱账号">
              <i slot="suffix" class="iconfont icon-email"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="form-bottom">
            <el-input v-model="user.password" placeholder="密码">
              <i slot="suffix" class="iconfont icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="agree">
            <!-- `checked` 为 true 或 false -->
            <el-checkbox v-model="user.autoLogin"
              >自动登录</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" :loading="loginLoading" @click="onLogin"
              >登录</el-button>
          </el-form-item>
        </el-form>
      </section>
      <!-- /邮箱登录 -->
    </div>
  </div>
</template>

<script>
import {
  _getQrKey,
  _getQrCreate,
  _loginByCellphone
} from '@/network/login'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      loginType: 1, // 0 二维码登录 1 手机登录 2 邮箱登录 3 注册
      areas: [
        {
          value: '+86',
          label: '中国'
        },
        {
          value: '+852',
          label: '中国香港'
        }
      ],
      user: {
        area: '+86',
        mobile: '',
        code: '',
        agree: false,
        email: '',
        password: ''
      },
      // checked: false,
      loginLoading: false,
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' }
          // { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ],
        agree: [
          {
            // 自定义校验规则：https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
            // 验证通过：callback()
            // 验证失败：callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            // message: '请勾选同意用户协议',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getQrCode()
  },
  mounted () {},
  methods: {
    // 网络请求相关方法
    /**
     * 获取二维码 key
     */
    async getQrCode () {
      const { data: res1 } = await _getQrKey()
      // console.log(res1)
      const { data: res2 } = await _getQrCreate(res1.data.unikey)
      console.log(res2.data)
    },

    // 登录点击事件
    onLogin () {
      // this.$router.push('/')
      // console.log(this.$router)
      // 获取表单数据
      const user = this.user // eslint-disable-line no-unused-vars
      // 表单验证
      // validate 方法是异步的
      this.$refs['login-form'].validate(valid => {
        // 如果表单验证失败，停止请求提交
        if (!valid) {
          return
        }
        // 如果验证通过，提交登录
        this.login()
      })
    },

    onRegister () {
      console.log('onRegister')
    },

    login () {
      console.log('login')
      // this.$router.push('/')
      // // 开启登陆中 loading...
      // this.loginLoading = true
      // // 验证通过，提交登录
      _loginByCellphone(this.user.mobile, this.user.code).then(res => {
        // // 登录成功
        // this.$message({ message: '登录成功', type: 'success' })
        // // 关闭 loading
        // this.loginLoading = false

        // 本地存储 token 数据
        console.log(res.data.token)
        window.localStorage.setItem('token', res.data.token)
        window.localStorage.setItem('profile', JSON.stringify(res.data.profile))
        // 跳转到首页
        this.$router.push('/')
      }).catch(err => {
        // 登录失败
        console.log('登录失败', err)
        // this.$message.error('登录失败，手机号或验证码错误')
        // // 关闭 loading
        // this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  .login-form-wrap {
    // box-sizing: border-box;
    width: 300px;
    height: 460px;
    padding: 10px;
    background: #fff;
    .login-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .logo-wrap {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-main {
        font-size: 60px;
        color: #f29c9f;
      }
    }
    section {
      padding: 0 20px;
    }
    .login-form {
      // border: 1px solid #ccc;
      .el-form-item {
        margin: 0;
      }
      /deep/ input {
        border: 0;
      }
      .form-left, .form-right, .form-top, .form-bottom {
        box-sizing: border-box;
        border: 1px solid #ccc;
        // margin: 0;
      }
      .form-left {
        width: 30%;
        display: inline-block;
      }
      .form-right {
        width: 70%;
        display: inline-block;
        border-left: 0;
      }
      // .form-top {
      //   border-bottom: 0;
      // }
      .form-bottom {
        border-top: 0;
      }
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
