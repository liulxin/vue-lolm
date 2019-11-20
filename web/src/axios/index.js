import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
  // baseURL: 'http://localhost:3000/web/api',
  withCredentials: true
})

http.interceptors.request.use(
  function(config) {
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
    return Promise.reject(error)
  }
)

export default http
