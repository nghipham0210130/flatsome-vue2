import Vue from 'vue';
import App from './App.vue';
import store from './store';
import { router } from './router/routes'
import { veeValidate }  from './plugins/vee-validate/index';
import { simpleAlert } from './plugins/simple-alert/index';
import { libraryIndex } from './plugins/fontAwesome/index';
import { JwPagination } from 'jw-vue-pagination';

Vue.component("jw-pagination", JwPagination);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store: store,
  veeValidate,
  simpleAlert,
  libraryIndex,
  render: h => h(App)
}).$mount('#app')
