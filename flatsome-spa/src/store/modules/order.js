// import { RepositoryFactory } from "../../_repositories/RepositoryFactory"; 
// const ProductsRepository = RepositoryFactory.get("products");
// const UsersRepository = RepositoryFactory.get("users");


const state = {
    orderList: [], // manage all order
    orders: [],  // manage 1 order contain products (productId, quantities, userId (current user)), after checkout push order to orders
    userId: 0,
    orderListId: 0,
    orderId: 0,
    coupon: 0,
};
const getters = {
    getOrders(state) {
        return state.orders;
    },
    getOorderList(state) {
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
    SET_ORDER_LIST(state, payload) {
        state.orderList[state.orderListId] = payload;
        state.orderListId++;
    },
    // Set order
    SET_ORDER(state, payload) {
        state.order = payload;
    },
    // Set orders (contain order element after add to cart)
    SET_ORDERS(state, payload) {
        state.orders[state.orderId] = payload;
        state.orderId++;
    },
    // Set user id
    SET_USER_ID(state, payload) {
        state.userId = payload;
    },
    // Set coupon to discount
    SET_COUPON(state, payload){
        state.coupon = payload;
    },
    // Change orders
    CHANGE_ORDERS(state, payload) {
        state.orders[payload.index].numberProduct = payload.numberProduct;
    },
    // Reset orders when complete payment
    RESET_ORDERS(state) {
        while(state.orders.length > 0) {
            state.orders.pop();
        }
        state.orderId = 0;
    },
    // Reset coupon when complete payment
    RESET_COUPON(state) {
        state.coupon = 0;
    },
    // Delete order in cart
    DELETE_ORDER_IN_CART(state, payload) {
        state.orders.splice(payload.index+1, 1);
    }
};

const actions = {
    // Add product to cart
    addProductToCart({commit}, payload) {
        commit("SET_ORDER", payload);
        commit("SET_ORDERS", payload);
    },
    
    // Change product to cart
    changeProductToCart({commit}, payload){
        commit("CHANGE_ORDERS", payload);
    },

    // Delete product of cart 
    deleteProductOfCart({commit}, payload) {
        commit("DELETE_ORDER_IN_CART", payload);
    },

    // Apply coupon of cart
    applyCoupon({commit}, payload) {
        commit("SET_COUPON", payload);
    },

    // Add orders to orders list when finish payment
    addToOrderList({commit}, payload) {
        commit("SET_ORDER_LIST", payload);
        commit("RESET_ORDERS");
        commit("RESET_COUPON");
    },

    // Cancel orders
    cancelThisOrder({commit}) {
        commit("RESET_ORDERS");
        commit("RESET_COUPON");
    }

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
