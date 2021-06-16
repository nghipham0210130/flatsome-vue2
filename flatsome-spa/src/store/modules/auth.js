import { RepositoryFactory } from "../../_repositories/RepositoryFactory"; 
const UsersRepository = RepositoryFactory.get("users");

const state = {
    openModalLogin: false,
    loggingIn: false,
    errors: null,
    user: null,
    token: null,
};
const getters = {
    authenticated(state) {
        return state.logginIn;
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
        state.loggingIn = !state.loggingIn;  
        state.openModalLogin = !state.openModalLogin;
    },
    REGISTER_SUCCESS(state) {
        state.loggingIn = !state.loggingIn;
        state.openModalLogin = !state.openModalLogin;
    },
    SET_TOKEN(state, payload) {
        state.token = payload;
    },
    SET_USER(state, payload) {
        state.user = payload;
    },
    LOGOUT_USER(state) {
        state.currentUser = {}
    }
};
const actions = {
    async login({commit}, payload) {
        try {
            let response = await UsersRepository.postUserLogin(payload);
            let token = response.data.access_token
            commit("LOGIN_SUCCESS");
            commit('SET_TOKEN', token);
            console.log(response.data);
        } catch (error) {
            // password don't enough 6 characters
            if (error.response.status === 422) {
                this.errors = error.response.data.errors.password[0];
                console.log(error.response);
            }
            // email wrong or password wrong
            else if (error.response.status === 401) {
                this.errors = error.response.data.error;
                console.log(this.errors);
            }
        }
    },
    async register({commit}, payload) {
        try {
            const response = await UsersRepository.postUserRegister(payload);
            console.log("Response ....");
            console.log(response);
            commit("REGISTER_SUCCESS");
        } catch (error) {
            console.log(error.response);
            // password don't enough 6 characters
            if (error.response.status === 422) {
                this.errors = error.response.data.errors.email[0];
            }  
            else if (error.response.status === 401) {
                this.errors = error.response.data.error;
            }
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




// export default {
//     data() {
//         return {
//           isLoading: false,
//           users: null,
//         };
//       },
//       created() {
//         this.fetchUser();
//       },
//       methods: {
//         // fetch data for User
//         async fetchUser() {
//             this.isLoading = true;
//             const { dataUser } = await UsersRepository.get();
//             this.isLoading = false;
//             this.users = data.data;
//           },
//       },

// }
