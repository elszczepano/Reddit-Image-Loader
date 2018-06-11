import Vue from 'vue'
import App from './App'
import headroom from 'vue-headroom'
import router from './router'
import 'font-awesome/scss/font-awesome.scss'

Vue.use(headroom)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  template: '<App/>',
  components: { App }
})
