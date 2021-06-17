import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

import authStore from './modules/auth';
import productStore from './modules/product';



Vue.use(Vuex);


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
  },
  plugins: [dataState]
});