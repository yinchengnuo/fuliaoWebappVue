import Vue from 'vue'
import axios from 'axios'
import store from './store'
import Meta from 'vue-meta'
import router from './router'
import VueAxios from 'vue-axios'
// import FastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/dist/css/swiper.css'
import './assets/styles/reset.css'
import './assets/styles/iconfont.css'

import App from './App.vue'
import Error from './views/Error.vue'

Vue.use(Meta, {
  keyName: 'meta'
})
Vue.use(VueAxios, axios)
Vue.use(VueAwesomeSwiper)
// FastClick.attach(document.body)

Vue.config.productionTip = false
if (document.body.offsetWidth > 768) {
  new Vue({
    render: h => h(Error)
  }).$mount('#app')
} else {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
