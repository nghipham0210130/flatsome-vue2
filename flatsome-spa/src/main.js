import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { router } from './router/routes'
// import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons'



// Import modal 
import Modal from "@burhanahmeed/vue-modal-2";

library.add(faExpandAlt, faUserSecret);
Vue.use(Modal);
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
