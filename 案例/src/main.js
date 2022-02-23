import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap/dist/css/bootstrap.css" 

// 引入
import $axios from './http/index'
// 挂载到vue原型上
Vue.prototype.$axios=$axios


// 移动端
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

// PC端
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
