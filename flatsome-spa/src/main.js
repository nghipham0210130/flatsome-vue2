import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { router } from './router/routes'
import store from './store';

import VeeValidate from 'vee-validate';
import VueSimpleAlert from "vue-simple-alert";
import JwPagination from "jw-vue-pagination";


// Add font awsome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';
library.add(fas, fab, faExpandAlt, faUserSecret, faLongArrowAltLeft, faTag, faTimesCircle);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.use(VueSimpleAlert);
Vue.component('jw-pagination', JwPagination);

new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
