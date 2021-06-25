<template>
  <header>
    <!-- Header -->
    <div class="header" :key="componentKey">
      <!-- Logo -->
      <div class="header__logo">
        <router-link :to="{ name: 'shopLink' }">
          <img src="../../assets/img/logo-light.png" alt="Logo" />
        </router-link>
      </div>
      <!-- Nav contain login and card -->
      <nav>
        <!-- Menu button use to catch event click to hamburger button -->
        <input class="menu__btn" type="checkbox" id="menu__btn" />
        <label class="menu__icon" for="menu__btn"
          ><span class="nav__icon"></span>
        </label>
        <!-- Menu nav  -->
        <ul class="menu">
          <!-- Check that the SDK client is not currently loading before accessing is methods -->
          <li class="nav__account">
            <a
              v-if="!isLoggedIn"
              id="loginButtonModal"
              ref="loginButtonModal"
              @click="showModalLogin()"
              >Login</a
            >
            <app-login v-show="openModalLogin"></app-login>
            <nav v-if="isLoggedIn" >
              <a href="#"
                >My account</a>
              <ul class="dropdown">
                <li>
                  <router-link
                    :to="{
                      name: 'profileLink',
                    }"
                    >My Profile</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{
                      name: 'orderListLink',
                    }"
                    >My Order List</router-link
                  >
                </li>
                <li>
                  <a @click="logout()">Logout</a>
                </li>
              </ul>
            </nav>
          </li>
          <li class="nav__card">
            <router-link :to="{ name: 'checkoutLink' }"
              >Cart / ${{ totalAmount }},00</router-link
            ><span>{{ numberProduct }}</span>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Login from "../components/authentication/Login.vue";

export default {
  name: "appHeader",
  components: {
    appLogin: Login,
  },
  data() {
    return {
      componentKey: 0,
    };
  },
  computed: {
    ...mapState("AUTH", {
      // Get status open of modal login from store
      openModalLogin: "openModalLogin",
      isLoggedIn: "isLoggedIn",
      user: "user",
    }),
    ...mapMutations("AUTH", {
      showModalLoginFromStore: "SHOW_MODAL_LOGIN",
    }),
    ...mapGetters("AUTH", {
      // Get authenticated
      authenticated: "authenticated",
      user: "user",
    }),
    ...mapGetters("PRODUCT", {
      totalAmount: "totalAmount",
      numberProduct: "numberProduct",
    }),
  },
  methods: {
    ...mapActions("AUTH", {
      logoutFromStore: "logout",
    }),
    ...mapActions("PRODUCT", {
      resetCart: "RESET_CART",
    }),
    showModalLogin() {
      this.showModalLoginFromStore;
    },
    async logout() {
      await this.logoutFromStore();
      localStorage.removeItem("token");
      this.componentKey++;
    },
  },
};
</script>

<style lang="scss" scoped>
template {
  font-size: 62.5%;
}
// Style header to header fixed top when sroll
header {
  position: fixed;
  width: 100%;
  z-index: 1;
  left: 0;
  top: 0;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 86px;
    padding-left: 15px;
    padding-right: 15px;
    background-color: rgb(13, 13, 13);
    .header__logo {
      display: block;
      float: left;
      img {
        width: 197px;
        color: #ffff;
      }
    }
    nav {
      .menu__btn {
        display: none;
        &:hover {
          cursor: pointer;
        }
        // Style menu again when checked hamburger
        &:checked {
          // Hamburger change shape when checked
          & ~ .menu__icon {
            &:not(.steps) {
              .nav__icon {
                &::before,
                &::after {
                  top: 0;
                }
              }
            }
            .nav__icon {
              @media only screen and (max-width: 900px) {
                background: transparent;
              }
              &:before {
                @media only screen and (max-width: 900px) {
                  transform: rotate(-45deg);
                }
              }
              &:after {
                @media only screen and (max-width: 900px) {
                  transform: rotate(45deg);
                }
              }
            }
          }
          & ~ .menu {
            @media only screen and (max-width: 900px) {
              margin: 0;
              max-height: 500px;
              display: block;
              width: 70%;
              color: rgb(245, 245, 245);
              background-color: rgba(13, 13, 13, 0.5);
              position: absolute;
              top: 86px;
              right: 0;
              li:hover {
                background-color: rgba(13, 13, 13);
              }
            }
            li {
              &:hover {
                cursor: pointer;
                opacity: 0.9;
              }
              &.nav__card {
                margin: 0;
              }
            }
          }
        }
      }
      // Style menu icon with screen more than 900px
      .menu__icon {
        display: none;
        float: right;
        cursor: pointer;
        padding: 28px 20px;
        position: relative;
        user-select: none;
        .nav__icon {
          background: #333;
          display: block;
          height: 2px;
          position: relative;
          width: 18px;
          &::before,
          &::after {
            background: #333;
            content: "";
            display: block;
            height: 100%;
            position: absolute;
            width: 100%;
          }
          &::before {
            top: 5px;
          }
          &::after {
            top: -5px;
          }
        }
        @media only screen and (max-width: 900px) {
          display: inline-block;
        }
      }
      ul {
        margin-bottom: 0;
        @media only screen and (max-width: 900px) {
          margin: 0;
          padding: 0;
          list-style: none;
          overflow: hidden;
        }
        &.menu {
          @media only screen and (max-width: 900px) {
            clear: both;
            max-height: 0;
          }
          li {
            display: inline-block;
            cursor: pointer;
            @media only screen and (max-width: 900px) {
              display: block;
              padding: 20px 20px;
              border-right: 1px solid #f4f4f4;
            }
            nav {
              &:hover > ul,
              &:focus-within > ul {
                  visibility: visible;
                  opacity: 1;
                  display: block;
              }
              ul {
                padding: 0;
                visibility: hidden;
                opacity: 0;
                min-width: 10rem;
                position: absolute;
                transition: all 0.5s ease;
                margin-top: 1rem;
                top: 62px;
                right: 130px;
                display: none;
                background-color: #161616ea;
                z-index: 1;
                border-radius: 5px;
                &:hover,
                &:focus {
                  visibility: visible;
                  opacity: 1;
                  display: block;
                }
                li {
                  clear: both;
                  width: 100%;
                  display: block;
                  float: left;
                  padding: 1rem;
                  position: relative;
                  text-decoration: none;
                  transition-duration: 0.5s;
                  border-radius: 5px;
                  a {
                    color: rgb(255, 255, 255);
                    font-size: 1.2em;
                  }
                  &:hover{
                    opacity: 0.8;
                    background-color: rgb(13, 13, 13);
                    
                  }
                }
                &::before {
                  content: "";
                  position: absolute;
                  left: 70%;
                  top: -30px;
                  width: 0;
                  height: 0;
                  border-left: 8px solid transparent;
                  border-bottom: 30px solid #161616ea;
                  border-right: 8px solid transparent;
                }
              }
            }
            &.nav__card {
              position: relative;
              margin-left: 30px;
              a {
                margin-right: 10px;
                &::before {
                  content: "";
                  height: 29px;
                  border: 1px solid rgba(37, 37, 37);
                  position: absolute;
                  top: 0;
                  left: -14px;
                }
              }
              // Style basket shape
              span {
                color: #ffff;
                font-weight: bold;
                border-radius: 0;
                margin: 0.4em 0;
                border: 2px solid #fff;
                position: relative;
                display: inline-block;
                vertical-align: middle;
                text-align: center;
                width: 1.85em;
                height: 1.85em;
                font-size: 1.3em;
                line-height: 1.9em;
                &::after {
                  content: "";
                  top: -0.5em;
                  margin-bottom: 0;
                  height: 5px;
                  width: 10px;
                  left: 5px;
                  position: absolute;
                  pointer-events: none;
                  border: 2px solid #fff;
                  border-top-left-radius: 99px;
                  border-top-right-radius: 99px;
                  border-bottom: 0;
                }
              }
            }
            a {
              color: #ffff;
              text-decoration: none;
              font-size: 1.3em;
              text-transform: uppercase;
              font-weight: bold;
              &:hover {
                cursor: pointer;
              }
            }
            img {
              width: 28px;
            }
          }
        }
      }
    }
  }
}
</style>