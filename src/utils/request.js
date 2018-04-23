import axios from "axios"
import config from "@/config"
import router from "@/router"

axios.defaults.baseURL = config.apiBasePath

axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  alert("请求失败,请检查网络:" + error)
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  let data = response.data
  if (!data) {
    alert("返回数据异常")
    router.replace("/login")
  }
  if (data) {
    return data
  }
  return response
}, function (error) {
  alert("请求失败,请检查网络:" + error)
  return Promise.reject(error)
})

let request = {}
request.install = function (Vue, options) {
  Vue.prototype.$get = axios.get
  Vue.prototype.$post = axios.post
}

export default request
