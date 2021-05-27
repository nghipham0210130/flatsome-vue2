<template>
  <header>
    <!-- Header -->
    <div class="header">
      <!-- Logo -->
      <div class="header__logo">
        <router-link :to="{ name: 'homeLink' }">
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
            <a href="#/" id="loginButtonModal" ref="loginButtonModal">Login</a>
            <!-- Modal Login -->
            <div id="loginModal" class="modal">
              <div class="modal__content">
                <!-- Form Login -->
                <form id="loginForm">
                  <h4 class="login__title">Login</h4>
                  <div>
                    <label for="emailLogin">Username or email address*</label>
                    <input type="email" id="emailLogin"/>
                  </div>
                  <div>
                    <label for="passwordLogin">Password*</label>
                    <input
                      type="password"
                      id="passwordLogin"
                      
                    />
                  </div>
                  <label class="remember__user"
                    >Remember me
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                  <button type="button" class="btn__signin">Sign in</button>
                  <a href="#">Lost your password?</a>
                </form>
                <hr />
                <!-- Form Register -->
                <form action="register" id="registerForm">
                  <h4 class="register__title">Register</h4>
                  <div>
                    <label for="emailRegister">Email address*</label>
                    <input type="email" id="emailRegister" />
                  </div>
                  <div>
                    <label for="passwordRegister">Password*</label>
                    <input type="password" id="passwordRegister" />
                  </div>
                  <p>
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our privacy policy.
                  </p>
                  <button type="button" class="btn__register">Register</button>
                </form>
              </div>
            </div>

            <!-- show logout when authenticated -->
            <!-- <a>Log out></a> -->
          </li>
          <li class="nav__card"><a href="">Card/$0,00</a><span>0</span></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>


export default {
  name: "appHeader",
  data() {
    return {
      // login: false,
      // email: "",
      // password: "",
    };
  },
  mounted () {
    this.$nextTick(function () {
       // Get the modal
      var modal = document.getElementById("loginModal");
      
      // Get the button that opens the modal
      var btn = document.getElementById("loginButtonModal");

      // Get the button element that login of the modal
      var btnLogin = document.getElementsByClassName("btn__login");

      // Get the button element that register of the modal
      var btnRegister = document.getElementsByClassName("btn__register");

      // When the user clicks the button, open the modal
      btn.onclick = function () {
        modal.style.display = "block";
      };

      // When the user clicks on Login button, close the modal
      btnLogin.onclick = function () {
        modal.style.display = "none";
      };

      // When the user clicks on Register button, close the modal
      btnRegister.onclick = function () {
        modal.style.display = "none";
      };

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display ="none";
        }
      };
    })
  },
  methods: {
    // Log the user in
    // login() {
    //   this.$auth.loginWithRedirect();
    // },
    // Log the user out
    // logout() {
    //   console.log("AHUHUHU");
    //   this.$auth.logout({
    //     returnTo: window.location.origin
    //   });
    // },
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
            @media only screen and (max-width: 900px) {
              display: block;
              padding: 20px 20px;
              border-right: 1px solid #f4f4f4;
              text-decoration: none;
            }
            &.nav__account {
              .modal {
                display: none; /* Hidden by default */
                position: fixed; /* Stay in place */
                z-index: 1; /* Sit on top */
                padding-top: 255px; /* Location of the box */
                left: 0;
                top: 0;
                width: 100%; /* Full width */
                height: 100%; /* Full height */
                overflow: auto; /* Enable scroll if needed */
                background-color: rgb(0, 0, 0); /* Fallback color */
                background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
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
