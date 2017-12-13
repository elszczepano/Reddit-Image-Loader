import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import 'font-awesome/scss/font-awesome.scss'

Vue.use(VueResource)
Vue.http.options.root = 'http://www.reddit.com/r/'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  template: '<App/>',
  components: { App }
})
