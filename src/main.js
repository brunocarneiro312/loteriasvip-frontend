import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueToast from 'vue-toast-notification';
import apiCaller from "./apiCaller";
import VueFormWizard from "vue-form-wizard/src";
import 'vue-form-wizard/dist/vue-form-wizard.min.css';

Vue.config.productionTip = false;

Vue.use(apiCaller);
Vue.use(VueToast);
Vue.use(VueFormWizard);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
