import Vue from 'vue'
import Router from 'vue-router'

let _import
if (process.env.NODE_ENV === 'production') {
  _import = path => () => import(path + '.vue')
} else {
  _import = require
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: _import('@/components/HelloWorld').default
    }
  ]
})
