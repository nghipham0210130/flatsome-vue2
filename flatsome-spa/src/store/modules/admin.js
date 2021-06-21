import { RepositoryFactory } from "../../_repositories/RepositoryFactory";
const UsersRepository = RepositoryFactory.get("users");
const ProductsRepository = RepositoryFactory.get("products");

const state = {
  isLoggedIn: false,
  admin: {},
  errors: {},
  token: localStorage.getItem("admin_token") || "",
  products: {},
  product: {},
};
const getters = {
  authenticated(state) {
    return state.isLoggedIn;
  },
  errors(state) {
    return state.errors;
  },
};
const mutations = {
  /* FOR ADMIN */
  LOGIN_SUCCESS(state) {
    state.isLoggedIn = !state.isLoggedIn;
  },
  LOGOUT_ADMIN(state) {
    state.isLoggedIn = false;
  },
  SET_ADMIN(state, payload) {
    state.admin = payload;
  },
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
  SET_ERORRS(state, payload) {
    state.errors = payload;
  },
  // Set product list
  SET_PRODUCTS(state, payload) {
    state.products = payload;
  },
  // Set product
  SET_PRODUCT(state, payload) {
    state.product = payload;
  },
  // Change list
  CHANGE_PROFILE_USER(state, payload) {
    state.user = payload;
  },
  CHANGE_PASSWORD_USER(state, payload) {
    state.user = payload;
  },
  CHANGE_ADDRESS_USER(state, payload) {
    state.user = payload;
  },
};
const actions = {
  async loginAdmin({ commit }, payload) {
    try {
      let response = await UsersRepository.postAdminLogin(payload);
      let token = response.data.access_token;
      let admin = response.data.user;
      localStorage.setItem("admin_token", token);
      commit("LOGIN_SUCCESS");
      commit("SET_ADMIN", admin);
      commit("SET_TOKEN", token);
    } catch (error) {
      localStorage.removeItem("admin_token");
      // password don't enough 6 characters
      if (error.response.status === 422) {
        let errors = error.response.data.errors;
        commit("SET_ERORRS", errors);
      }
      // email wrong or password wrong
      else if (error.response.status === 401) {
        let errors = error.response.data;
        commit("SET_ERORRS", errors);
      }
    }
  },
  // Logout
  async logout({ commit }) {
    commit("LOGOUT_ADMIN");
    await UsersRepository.getLogoutAdmin();
    localStorage.removeItem("admin_token");
  },
  // Get Products
  async getProducts({ commit }, payload) {
    try {
      let response = await ProductsRepository.showProducts(payload);
      let products = response.data.data;
      commit("SET_PRODUCTS", products);
    } catch (error) {
      console.log(error);
    }
  },
  // Edit Product
  async editProduct({ commit }, { productId, payload }) {
    try {
      await ProductsRepository.updateProduct(productId, payload);
      commit("CHANGE_PRODUCT", payload);
    } catch (error) {
      console.log(error);
    }
  },
  // Get Product
  async getProduct({ commit }, productId) {
    try {
      let response = await ProductsRepository.getProduct(productId);
      commit("SET_PRODUCT", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
