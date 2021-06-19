// import { RepositoryFactory } from "../../_repositories/RepositoryFactory"; 
// const ProductsRepository = RepositoryFactory.get("products");
// const UsersRepository = RepositoryFactory.get("users");


const state = {
    orders: [], // manage all order
    order: [],  // manage 1 order contain products (productId, quantities, userId (current user)), after checkout push order to orders
    orderId: 0, // plus one after add product success
};
const getters = {
    getOrder(state) {
        return state.order;
    },
    getUserId(state) {
        return state.userId;
    },
    getOderId(state) {
        return state.orderId;
    },
    getProduct(state) {
        return state.product;
    },
    
};
const mutations = {
    SET_ORDER_ID(state) {
        state.id++;
    },
    SET_ORDER(state, payload) {
        state.order = payload;
    },
    SET_ORDERS(state) {
        state.orders[state.id] = state.order;
    }
};

const actions = {

    addProductToCart({commit}, payload) {
        commit("SET_ORDER", payload)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
