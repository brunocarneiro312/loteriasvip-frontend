import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueToast from 'vue-toast-notification';
import apiCaller from "./apiCaller";
Vue.config.productionTip = false;

Vue.use(apiCaller);
Vue.use(VueToast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
