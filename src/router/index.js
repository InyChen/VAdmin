import Vue from "vue"
import Router from "vue-router"

// 开发环境禁用异步组件
let _import
if (process.env.NODE_ENV === "production") {
  _import = path => () => import(path + ".vue")
} else {
  _import = require
}

Vue.use(Router)

let routers = [
  {
    path: "",
    redirect: "/module"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: _import("@/pages/dashboard/index").default
  },
  {
    path: "/module",
    name: "SysModule",
    component: _import("@/pages/module/SysModule").default
  }
]

export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: _import("@/pages/pub/Index").default
    },
    {
      path: "/login",
      name: "Login",
      component: _import("@/pages/pub/Login").default
    },
    {
      path: "/main",
      component: _import("@/pages/pub/Main").default,
      children: routers
    }
  ]
})
