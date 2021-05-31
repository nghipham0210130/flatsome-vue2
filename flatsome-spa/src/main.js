import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { router } from './router/routes'
// import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
// import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// // Import the Auth0 configuration
// import { domain, clientId } from "../auth_config.json";

// // Import the plugin here
// import { Auth0Plugin } from "./auth";

// // Import modal 
// import Modal from "@burhanahmeed/vue-modal-2";


// // Install the authentication plugin here
// Vue.use(Auth0Plugin, {
//   domain,
//   clientId,
//   // onRedirectCallback: appState => {
//   //   router.push(
//   //     appState && appState.targetUrl
//   //       ? appState.targetUrl
//   //       : window.location.pathname
//   //   );
//   // }
// });

// Vue.use(Modal);
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
