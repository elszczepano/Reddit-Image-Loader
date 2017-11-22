import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/Menu'
import Content from '@/components/Content'
import Main from '@/components/Main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})
