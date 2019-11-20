import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/scss/style.scss'
import http from './axios'

import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'

import VuePreview from 'vue-preview'

Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.config.productionTip = false
Vue.prototype.$http = http

// defalut install
Vue.use(VuePreview)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
