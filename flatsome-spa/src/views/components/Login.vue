<template>
  <!-- Modal Login -->
  <div id="loginModal" class="modal" :key="componentKey">
    <button tupe="button" class="modal__icon icon__close" @click="closeModal()">X</button>
    <div class="modal__content">
      <!-- Form Login -->
      <form id="loginForm" @submit.prevent="login">
        <h4 class="login__title">Login</h4>
        <label for="emailLogin">Username or email address*</label>
        <span class="text__danger" v-if="emailErrorLogin != null">{{
          emailErrorLogin
        }}</span>
        <input
          v-model="formLogin.email"
          type="email"
          id="emailLogin"
          name="emailLogin"
        />
        <label for="passwordLogin">Password*</label>
        <span class="text__danger" v-if="passwordErrorLogin != null">{{
          passwordErrorLogin
        }}</span>
        <input
          v-model="formLogin.password"
          type="password"
          id="passwordLogin"
          name="passwordLogin"
        />
        <label class="remember__user" for="isRemember">
          Remember me
          <input
            v-model="formLogin.isRemember"
            type="checkbox"
            id="isRemember"
            value="Remember"
          />
          <span class="checkmark"></span>
        </label>
        <button type="submit" class="btn__signin" @click.prevent="login()">
          Log in
        </button>
        <a href="#">Lost your password?</a>
      </form>
      <hr />
      <!-- Form Register -->
      <form id="registerForm" @submit.prevent="register">
        <h4 class="register__title">Register</h4>
        <label for="emailRegister">Email address*</label>
        <span class="text__danger" v-if="emailErrorRegister != null">{{
          emailErrorRegister
        }}</span>
        <input
          v-model="formRegister.email"
          type="email"
          id="emailRegister"
          name="emailRegister"
        />
        <label for="passwordRegister">Password*</label>
        <span class="text__danger" v-if="passwordErrorRegister != null">{{
          passwordErrorRegister
        }}</span>
        <input
          v-model="formRegister.password"
          type="password"
          id="passwordRegister"
          name="passwordRegister"
        />
        <p>
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our privacy policy.
        </p>
        <button type="submit" class="btn__register" @click.prevent="register()">
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Form from "vform";

export default {
  data() {
    return {
      componentKey: 0,
      formLogin: new Form({
        email: "",
        password: "",
        isRemember: false,
      }),
      formRegister: new Form({
        email: "",
        password: "",
      }),
      emailErrorLogin: "",
      passwordErrorLogin: "",
      emailErrorRegister: "",
      passwordErrorRegister: "",
    };
  },
  computed: {
    ...mapState("AUTH", {
      // Status logginIn of modal login from store
      isLoggedIn: "isLoggedIn",
      // Get errors if login or register error
      errorsFromStore: "errors",
      password: "password",
    }),
    ...mapMutations("AUTH", {
      closeModalLogin: "SHOW_MODAL_LOGIN",
      setPassword: "SET_PASSWORD",
    })
  },
  methods: {
    ...mapActions("AUTH", {
      loginForm: "login",
      registerForm: "register",
    }),
    // Transmission login action with data (emailLogin and passwordLogin)
    async login() {
      await this.loginForm({
        email: this.formLogin.email,
        password: this.formLogin.password,
        isRemember: this.formLogin.isRemember,
      });
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
      }
      else {
        this.formLogin.email = null;
        this.formLogin.password = null;
        this.formLogin.isRemember = false;
        this.componentKey++;
      }
    },
    // Transmission register action with data (emailRegister and passwordRegister)
    async register() {
      await this.registerForm({
        email: this.formRegister.email,
        password: this.formRegister.password,
      });
      // Check register not success
      if (!this.isLoggedIn) {
        //  Check errors email available
        if (this.errorsFromStore.email) {
          this.emailErrorRegister = this.errorsFromStore.email[0];
        }
        //  Check errors password available
        if (this.errorsFromStore.password) {
          this.passwordErrorRegister = this.errorsFromStore.password[0];
        }
      } else {
        this.formLogin.email = null;
        this.formLogin.password = null;
        this.componentKey++;
      }
    },
    closeModal() {
      this.closeModalLogin;
      this.componentKey++;
    }
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  // padding-top: 255px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  .modal__icon {
    &.icon__close {
      padding-top: 10px;
      margin-bottom: 245px; 
      font-size: 2em;
      border : none;
      color: rgb(255, 255, 255);
      background-color: transparent; 
      margin-left: 97%;
    }
  }
  .modal__content {
    max-width: 875px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    column-gap: 30px;
    padding: 30px 35px 65px;
    font-size: 1.4em;
    border: 1px solid rgb(128, 128, 128);
    transform: translateZ(0);
    background-color: #fff;
    h4 {
      text-transform: uppercase;
      color: rgb(85, 85, 85);
      font-weight: bold;
      margin-bottom: 28px;
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
    button {
      display: block;
      text-transform: uppercase;
      font-size: 1.6em;
      font-weight: 400;
      color: #fff;
      background-color: rgb(41, 140, 178);
      margin-bottom: 35px;
      border: none;
      padding: 10px 20px;
    }
    span {
      &.text__danger {
        color: rgb(238, 9, 9);
        font-size: 1.2em;
      }
    }
    hr {
      height: 100%;
      border: 1px solid rgb(221, 221, 221);
    }
    /* The remember */
    .remember__user {
      display: block;
      position: relative;
      padding-left: 35px;
      margin-bottom: 12px;
      cursor: pointer;
      font-size: 1.4em;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      margin-bottom: 25px;
      /* Hide the browser's default checkbox */
      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        /* When the checkbox is checked, add a blue background */
        &:checked ~ .checkmark {
          background-color: #2196f3;
        }
        /* Show the checkmark when checked */
        &:checked ~ .checkmark:after {
          display: block;
        }
      }
      /* Create a custom checkbox */
      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        border-radius: 5px;
        background-color: #eee;
        /* Create the checkmark/indicator (hidden when not checked) */
        &:after {
          content: "";
          position: absolute;
          display: none;
        }
        /* Style the checkmark/indicator */
        &:after {
          left: 9px;
          top: 3px;
          width: 7px;
          height: 15px;
          border: solid white;
          border-width: 0 3px 3px 0;
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
      }
      /* On mouse-over, add a grey background color */
      &:hover input ~ .checkmark {
        background-color: #ccc;
      }
    }
  }
}
</style>