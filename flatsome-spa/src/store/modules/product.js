import { RepositoryFactory } from "../../_repositories/RepositoryFactory"; 
const ProductsRepository = RepositoryFactory.get("products");

const state = {
    product: null,
    products: [],
    productCategories: [],
    categories: [],
    productCategoryId: null,
    isLoading: false,
    loaded: false,
};
const getters = {
    // Product Id
    product(state) {
        return state.product;
    },
    // Products
    products(state) {
        return state.products;
    },
    // ProductCategory
    productCategory(state) {
        return state.productCategories;
    },
    isLoading(state) {
        return state.isLoading;
    }
};
const mutations = {
    // Set sidebar 
    SET_SIDEBAR(state, payload) {
        state.categories = payload;
    },

    // Payload is productId
    SET_PRODUCT(state, payload) {
        state.product = payload;
    },

    // Payload is productList
    SET_PRODUCTS(state, payload) {
        state.products = payload;
    },

    // Payload is productCategories
    SET_PRODUCTCATEGORIES(state, payload) {
        state.productCategories = payload;
    },

    // Payload is productCategories
    SET_LOADING(state, payload) {
        state.isLoading = payload;
    },

    // Set data loaded
    SET_LOADED(state, payload) {
        state.loaded =payload;
    },

    // Set product category Id
    SET_PRODUCT_CATEGORY_ID(state, payload) {
        state.productCategoryId = payload;
    },

};
const actions = {
    // Get categories for sidebar 
    async getSidebar({commit}) {
        try {
        let response = await ProductsRepository.getSidebar();
        commit("SET_SIDEBAR", response.data.data);
        } catch (error) {
            console.log(error);
        }
      },

    // Get product categories
    async getProductCategories({commit}) {
        try {
            let response = await ProductsRepository.get();
            commit("SET_PRODUCTCATEGORIES", response.data.data);
        } catch (error) {
            console.log(error);
        }
    },
    //Get product list follow category, inputs are productCategoryId, numberProductPerPage
    async getProducts({commit}, {productCategoryId, numberProductPerPage}) {
        try {
            let response = await ProductsRepository.getProductsByCategory(productCategoryId, numberProductPerPage);
            commit("SET_PRODUCTS", response.data.data); 
            commit("SET_PRODUCT_CATEGORY_ID", productCategoryId);
        } catch (error) {
            console.log(error);
        }
    },
    // Get product detail, inputs are productId
    async getProduct({commit}, productId) {
        let isLoading = false;
        try {
            let response = await ProductsRepository.getProduct(productId);
            isLoading = true;
            commit("SET_PRODUCT", response.data.data);
            commit("SET_LOADING", isLoading);
        } catch (error) {
            console.log(error);
        } finally {
            let loaded = true;
            commit("SET_LOADED", loaded);
        }
    }


};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
