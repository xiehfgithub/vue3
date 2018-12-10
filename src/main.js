/* import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') */

import Vue from 'vue'
import './plugins/axios'
import router from './router'
// mint-ui
import '@/assets/reset.css'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

import App from './App.vue'
import store from './vuex/store'
import './plugins/flexible.js'

//全局数据供组建公用
import config from '@/assets/baseConfig.js'
Vue.prototype.base = config;

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~Main.js~~~~~~~~~~~~~~~~~~~~~~~~~~')

axios.defaults.withCredentials=true;
Vue.config.productionTip = false


var app = new Vue({
  	el: '#app',
  	router,
  	store,
  	components: { App },
  	render: h => h(App)
})
