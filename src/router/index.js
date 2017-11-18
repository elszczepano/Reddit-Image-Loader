import Vue from 'vue'
import Router from 'vue-router'
import viewApp from '@/components/viewApp'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'viewApp',
      component: viewApp
    }
  ]
})
