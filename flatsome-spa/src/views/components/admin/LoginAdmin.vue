<template>
  <!-- Modal Login -->
  <div id="login" class="modal">
    <div class="modal__content">
      <!-- Form Login -->
      <form id="login" @submit.prevent="login">
        <h4 class="login__title">Login With Role Admin</h4>
        <label for="email">Username or email address*</label>
        <span class="text__danger" v-if="emailErrorLogin != null">{{
          emailErrorLogin
        }}</span>
        <input
          v-model="formLogin.email"
          type="text"
          id="email"
          name="emailLogin"
        />
        <label for="password">Password*</label>
        <span class="text__danger" v-if="passwordErrorLogin != null">{{
          passwordErrorLogin
        }}</span>
        <input
          v-model="formLogin.password"
          type="password"
          id="password"
          name="passwordLogin"
        />
        <button type="submit" class="btn__signin" @click.prevent="login()">
          Log in
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Form from "vform";

export default {
  data() {
    return {
      formLogin: new Form({
        email: "",
        password: "",
      }),
      emailErrorLogin: "",
      passwordErrorLogin: "",
    };
  },
  computed: {
    ...mapState("ADMIN", {
      // Status logginIn of modal login from store
      isLoggedIn: "isLoggedIn",
      // Get errors if login or register error
      errorsFromStore: "errors",
      admin: "admin",
    }),
  },
  methods: {
    ...mapActions("ADMIN", {
      loginForm: "loginAdmin",
      logoutFromStore: "logout",
    }),
    // Transmission login action with data (emailLogin and passwordLogin)
    async login() {
      const data = {
        username: this.formLogin.email,
        password: this.formLogin.password,
      }
      console.log("This login local", data);
      await this.loginForm(data);
      // Check login not success
      if (!this.isLoggedIn) {
        //  Check errors email correctly
        if (this.errorsFromStore.username) {
          this.emailErrorLogin = this.errorsFromStore.username[0];
        }
        //  Check errors email available
        if (this.errorsFromStore.error) {
          this.emailErrorLogin = this.errorsFromStore.error;
        }
        //  Check errors password available
        if (this.errorsFromStore.password) {
          this.passwordErrorLogin = this.errorsFromStore.password[0];
        }
      } else {
        this.formLogin.email = null;
        this.formLogin.password = null;
        this.$router.push({ name: "Dashboard" });
      }
    },

  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: block;
  padding-top: 120px;
  .modal__content {
    max-width: 875px;
    margin: 0 auto;
    column-gap: 30px;
    padding: 30px 35px 65px;
    font-size: 1.4em;
    transform: translateZ(0);
    background-color: #fff;
    h4 {
      font-size: 2em;
      text-transform: uppercase;
      color: rgb(85, 85, 85);
      font-weight: bold;
      margin-bottom: 28px;
      text-align: center;
      margin-bottom: 50px;
    }
    label {
      display: block;
      font-weight: bold;
      color: rgb(0, 0, 0);
      font-size: 1.4em;
    }
    input {
      width: 100%;
      margin-bottom: 28px;
      padding: 10px 15px;
      border: 1px solid rgb(221, 221, 221);
    }
    a {
      font-size: 1.4em;
      text-transform: capitalize;
      color: rgb(51, 72, 98);
    }
    p {
      font-size: 1.4em;
      color: rgb(128, 128, 128);
    }
    #password {
      margin-bottom: 50px;
    }
    button {
      display: block;
      position: absolute;
      text-transform: uppercase;
      font-size: 1.6em;
      font-weight: 400;
      color: #fff;
      background-color: rgb(41, 140, 178);
      margin-bottom: 35px;
      border: none;
      padding: 10px 20px;
      left: 50%;
      transform: translate(-50%);
    }
    span {
      &.text__danger {
        color: rgb(238, 9, 9);
        font-size: 1.2em;
      }
    }
  }
}
</style>