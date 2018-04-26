import Vue from "vue"
import Router from "vue-router"

// 开发环境禁用异步组件

Vue.use(Router)

let routers = [
  {
    path: "",
    redirect: "/module"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/pages/dashboard/index")
  },
  {
    path: "/module",
    name: "SysModule",
    component: () => import("@/pages/module/SysModule")
  },
  {
    path: "/user",
    name: "SysUser",
    component: () => import("@/pages/user/SysUser"),
    meta: {
      title: "用户管理"
    }
  }
]

export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("@/pages/pub/Index")
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/pages/pub/Login")
    },
    {
      path: "/main",
      component: () => import("@/pages/pub/Main"),
      children: routers
    }
  ]
})
