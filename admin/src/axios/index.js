import axios from 'axios'
import Vue from 'vue'
import router from '../router'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api',
  // baseURL: 'http://localhost:3000/admin/api',
  withCredentials: true
})

http.interceptors.request.use(
  function(config) {
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    // config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    // error.response.status
    // console.log(error.response)
    if (error.response.data.message) {
      Vue.prototype.$message({
        type: 'error',
        message: error.response.data.message
      })
    }
    // 401 跳转登录页
    if (error.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default http
