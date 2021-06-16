import Vue from 'vue';
import Vuex from 'vuex';

import authStore from './modules/auth';
import productStore from './modules/product';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AUTH: authStore,
    PRODUCT: productStore,
  }
});