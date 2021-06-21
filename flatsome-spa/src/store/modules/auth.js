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
    /* FOR USER */
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
        state.isLoggedIn = false;
    },
    SET_ERORRS(state, payload) {
        state.errors = payload;
    },
    CHANGE_PROFILE_USER(state, payload) {
        state.user = payload;
    },
    CHANGE_PASSWORD_USER(state, payload) {
        state.user = payload;
    },
    CHANGE_ADDRESS_USER(state, payload) {
        state.user = payload;
    },
    
    /* FOR ADMIN */
    LOGIN_ADMIN_SUCCESS(state){
        state.isLoggedIn = !state.isLoggedIn;  
        state.openModalLogin = !state.openModalLogin;
    },
    SET_ADMIN(state, payload) {
        state.user = payload;
    },
    LOGOUT_ADMIN(state) {
        state.isLoggedIn = false;
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
            localStorage.removeItem("token");
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
    // Register
    async register({commit}, payload) {
        try {
            const response = await UsersRepository.postUserRegister(payload);
            let user = response.data;
            let token = response.data.access_token;
            localStorage.setItem("token", token);
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
    // Logout
    async logout({commit}) {
        commit("LOGOUT_USER");
        await UsersRepository.getLogout();
        localStorage.removeItem("token");
    },
    // Change info User
    async updateInfoUser({commit}, payload) {
        try {
            await UsersRepository.updateProfileUser(payload);
            commit("CHANGE_PROFILE_USER", payload);
        } catch (error) {
            console.log(error);
        }
    },
    // Change password User
    async updatePasswordUser({commit}, payload) {
        try {
            await UsersRepository.updatePassword(payload);
            commit("CHANGE_PASSWORD_USER", payload);
        } catch (error) {
            console.log(error);
        }
    },
    // Change address User
    async updateAddressUser({commit}, payload) {
        try {
            await UsersRepository.updateAddress(payload);
            commit("CHANGE_ADDRESS_USER", payload);
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
}
