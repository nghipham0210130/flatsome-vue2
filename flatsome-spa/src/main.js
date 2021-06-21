import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { router } from './router/routes'
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons'
import VueSimpleAlert from "vue-simple-alert";



// // Import modal 
// import Modal from "@burhanahmeed/vue-modal-2";

library.add(faExpandAlt, faUserSecret, faLongArrowAltLeft, faTag, faTimesCircle);
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueSimpleAlert);

new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
