import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

import authStore from './modules/auth';
import productStore from './modules/product';
import orderStore from './modules/order';
import adminStore from'./modules/admin';



Vue.use(Vuex);

// Keep login when refresh browser
const dataState = 
  createPersistedState({
    paths: {
      isLoggedIn: Boolean,
      user: Object,
    }
  })
export default new Vuex.Store({
  modules: {
    AUTH: authStore,
    PRODUCT: productStore,
    ORDER: orderStore,
    ADMIN: adminStore,
  },
  plugins: [dataState]
});