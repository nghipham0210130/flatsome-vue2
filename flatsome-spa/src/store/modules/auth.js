import { RepositoryFactory } from "../../_repositories/RepositoryFactory"; 
const UsersRepository = RepositoryFactory.get("users");

const state = {
    openModalLogin: false,
    isLoggedIn: false,
    errors: {},
    user: {},
    token: localStorage.getItem("token") || "",
};
const getters = {
    authenticated(state) {
        return state.isLoggedIn;
    },
    user(state) {
        return state.user;
    },
    errors(state) {
        return state.errors;
    }
};
const mutations = {
    SHOW_MODAL_LOGIN(state) {
        state.openModalLogin = !state.openModalLogin;
    },
    LOGIN_SUCCESS(state){
        state.isLoggedIn = !state.isLoggedIn;  
        state.openModalLogin = !state.openModalLogin;
    },
    REGISTER_SUCCESS(state) {
        state.isLoggedIn = !state.isLoggedIn;
        state.openModalLogin = !state.openModalLogin;
    },
    SET_TOKEN(state, payload) {
        state.token = payload;
    },
    SET_USER(state, payload) {
        state.user = payload;
    },
    LOGOUT_USER(state) {
        state.currentUser = {};
        state.isLoggedIn = !state.isLoggedIn;
    },
    SET_ERORRS(state, payload) {
        state.errors = payload;
    },
};
const actions = {
    async login({commit}, payload) {
        try {
            let response = await UsersRepository.postUserLogin(payload);
            let token = response.data.access_token;
            let user = response.data.user;
            localStorage.setItem("token", token);
            commit("LOGIN_SUCCESS");
            commit("SET_USER", user);
            commit('SET_TOKEN', token);
        } catch (error) {
            localStorage.removeItem('token');
            // password don't enough 6 characters
            if (error.response.status === 422) {
                let errors = error.response.data.errors;
                commit("SET_ERORRS", errors);
            }
            // email wrong or password wrong
            else if (error.response.status === 401) {
                let errors = error.response.data.error;
                commit("SET_ERORRS", errors);
            }
        }
    },
    async register({commit}, payload) {
        try {
            const response = await UsersRepository.postUserRegister(payload);
            let user = response.data;
            let token = response.data.access_token;
            localStorage.setItem("token", token);
            console.log("Hi", token);
            commit("REGISTER_SUCCESS");
            commit("SET_USER", user);
            commit("SET_TOKEN", token);
        } catch (error) {
            localStorage.removeItem('token');
            // email has already been take || password don't enough 6 characters
            if (error.response.status === 422) {
                let errors = error.response.data.errors;
                commit("SET_ERORRS", errors);
            }  
            else if (error.response.status === 401) {
                let errors = error.response.data.error;
                commit("SET_ERORRS", errors);
            }
        }
    },
    closeModalLogin({commit}) {
        commit("SHOW_MODAL_LOGIN");
    },
    async logout({commit}) {
        await UsersRepository.getLogout();
        commit("LOGOUT_USER");
        commit("SET_TOKEN", null);
        localStorage.removeItem("token");
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
