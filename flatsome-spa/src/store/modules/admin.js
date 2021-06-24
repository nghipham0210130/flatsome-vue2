import { RepositoryFactory } from "../../_repositories/RepositoryFactory";
const UsersRepository = RepositoryFactory.get("users_admin");
const ProductsRepository = RepositoryFactory.get("products_admin");

const state = {
  isLoggedIn: false,
  admin: {},
  errors: {},
  token: localStorage.getItem("admin__token") || "",
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
  getProduct(state) {
    return state.product;
  },
  getProducts(state) {
    return state.products;
  }
};
const mutations = {
  /* FOR ADMIN */

  // Status when login success
  LOGIN_SUCCESS(state) {
    state.isLoggedIn = true;
  },

  // Set logout admin
  LOGOUT_ADMIN(state) {
    state.isLoggedIn = false;
    state.admin = null;
  },

  // Set admin
  SET_ADMIN(state, payload) {
    state.admin = payload;
  },

  // Set token
  SET_TOKEN(state, payload) {
    state.token = payload;
  },

  // Set error
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

  // Reset product list when Delete a product
  RESET_PRODUCTS(state, payload) {
    const newProducts = state.products.filter(product => product.id !== payload);
    state.products = newProducts;
  },

  // Add New Product
  ADD_PRODUCT(state, payload) {
    state.product = payload;
    const newProducts = state.products.concat(state.product);
    state.products = newProducts;
  },

  // Edit product
  EDIT_PRODUCT(state, productId, payload) {
    state.products.forEach(product => {
      if(product.id == productId) {
        product = payload;
      }
    })
  }
};
const actions = {

  // Login
  async loginAdmin({ commit }, payload) {
    try {
      let response = await UsersRepository.postAdminLogin(payload);
      let token = response.data.access_token;
      let admin = response.data.admin;
      console.log(token, admin);
      // let d = new Date();
      // d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
      // let expires = "expires=" + d.toUTCString();
      // document.cookie = "admin_token" + token + "," + expires + "path=Admin/Dashboard";
      // document.cookie.set("admin_token", token, "expiring time");
      localStorage.setItem("admin__token", token);
      commit("LOGIN_SUCCESS");
      commit("SET_ADMIN", admin);
      commit("SET_TOKEN", token);
    } catch (error) {
      localStorage.removeItem("admin__token");
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
    await UsersRepository.getLogoutAdmin()
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
  async editProduct({ commit }, {productId, payload}) {
    try { 
      console.log(productId, "payload", payload);
      await ProductsRepository.updateProduct(productId, payload);
      commit("EDIT_PRODUCT", productId, payload);
    } catch (error) {
      console.log(error);
    }
  },

  // Get Product
  async getProduct({ commit }, productId) {
    try {
      if(productId != undefined) {
        let response = await ProductsRepository.getProduct(productId);
        let product = response.data.data;
        commit("SET_PRODUCT", product);
      }
    } catch (error) {
      console.log(error);
    }
  },

  // Delete product
  async deleteProduct({ commit }, productId) {
    try {
      // Creat new products without product has id = productId
      commit("RESET_PRODUCTS", productId);
      await ProductsRepository.deleteProduct(productId);
    } catch (error) {
      console.log(error);
    }
  },

  // Create Product
  async addProduct({commit}, payload) {
    try {
      console.log("New Project");
      await ProductsRepository.createProduct(payload).then((response) => {
        if(response.status) {
          console.log("Success");
        } else {
          console.log("Error");
        }
      }
        );
      commit("ADD_PRODUCT", payload);
    } catch (error) {
      console.log(error);
    }

  }

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
