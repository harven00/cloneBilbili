import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/style.css'
import router from '@/router'
import http  from '../http'
import { Toast } from 'vant';
Vue.prototype.$http = http
Vue.prototype.$msg = Toast

Vue.use(Vant);
Vue.use(Toast);
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
