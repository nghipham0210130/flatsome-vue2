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
  image: null,
  users: {},
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
  },
  getUsers(state) {
    return state.users;
  },
  getUser(state) {
    return state.user;
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
  },

  // Import image
  IMPORT_PRODUCT(state, payload) {
    state.image = payload;
  },

  // Set User
  SET_USERS(state, payload) {
    state.users = payload;
  },

  // Add User
  ADD_USER(state, payload) {
    state.user = payload;
    const newUsers = state.users.concat(state.user);
    state.users = newUsers;
  },
};
const actions = {

  // Login
  async loginAdmin({ commit }, payload) {
    try {
      const response = await UsersRepository.postAdminLogin(payload);
      const token = response.data.access_token;
      const admin = response.data.admin;
      localStorage.setItem("admin__token", token);
      commit("LOGIN_SUCCESS");
      commit("SET_ADMIN", admin);
      commit("SET_TOKEN", token);
    } catch (error) {
      localStorage.removeItem("admin__token");
      // password don't enough 6 characters
      console.log("Eror", error);
      if (error.response.status === 422) {
        let errors = error.response.data.errors;
        commit("SET_ERORRS", errors);
      }
      // email wrong or password wrong
      else if (error.response.status === 401) {
        let errors = errors.response.data;
        commit("SET_ERORRS", errors);
      }
    }
  },

  // Logout
  async logout({ commit }) {
    commit("LOGOUT_ADMIN");
    await UsersRepository.getLogoutAdmin();
  },
  
  // Import image 
  async importImage({commit}, payload) {
    try {
      await ProductsRepository.importCsvProduct(payload);
      commit("IMPORT_PRODUCT", payload);
    } catch (error) {
      console.log(error);
    }
  },


  /* Manage User */
  // Get User List

  async getUserList({commit}, payload) {
    try {
      let response = await UsersRepository.getUserList(payload);
      let users = await response.data.data;
      commit("SET_USERS", users);
    } catch (error) {
      console.log(error.response);
    }
  },

   // Edit User
   async editUser({ commit }, {userId, payload}) {
    try { 
      console.log(userId, "payload", payload);
      await UsersRepository.updateUser(userId, payload);
      commit("EDIT_USER", userId, payload);
    } catch (error) {
      console.log(error);
    }
  },

  // Get User
  async getUser({ commit }, userId) {
    try {
      if(userId != undefined) {
        let response = await UsersRepository.getUser(userId);
        let user = response.data.data;
        commit("SET_USER", user);
      }
    } catch (error) {
      console.log(error);
    }
  },

  // Delete product
  async deleteUser({ commit }, userId) {
    try {
      // Creat new products without product has id = productId
      commit("RESET_USERS", userId);
      await UsersRepository.deleteProduct(userId);
    } catch (error) {
      console.log(error);
    }
  },

  // Create User
  async addUser({commit}, payload) {
    try {
      console.log(payload);
      await UsersRepository.createUser(payload);
      commit("                 ", payload);
    } catch (error) {
      console.log("Error", error.response); 
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
