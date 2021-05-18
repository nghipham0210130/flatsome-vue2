import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import routes from './router/routes'


Vue.use(Router);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: routes,
  render: h => h(App)
}).$mount('#app')
