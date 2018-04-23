// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "./styles/element-extends.css"
import request from "./utils/request"

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(request)

// 全局错误处理
const errorHandler = (error, vm) => {
  console.error("抛出全局异常")
  console.error(vm)
  console.error(error)
}
Vue.config.errorHandler = errorHandler

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
})
