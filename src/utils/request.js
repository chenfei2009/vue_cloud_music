/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'
import store from '@/store/index.js'

// 创建 axios 实例
// 通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://localhost:3000/', // 请求的基础路径
  withCredentials: true,
  // 定义后端返回的原始数据的处理
  // 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
  transformResponse: [data => {
    try {
      // 如果转换成功，则直接把结果返回
      // return data
      return JSON.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }
    // axios 默认在内部使用 JSON.parse 来转换处理原始数据
    // return JSON.parse(data)
  }]
})

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = window.localStorage.getItem('token')
    // console.log(token)
    // if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    //   config.headers.Authorization = `token ${token}`
    // }
    return config
  },
  err => {
    console.log(err)
    return Promise.reject(err)
  })

// http response 拦截器
request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 301:
          // 返回301（未授权），让用户重新登录。
          // 返回 401 清除token信息并跳转到登录页面
          // store.commit(types.LOGOUT);
          console.log('错误301')
          store.commit('showLogin')
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  })

// 导出请求方法
export default request
