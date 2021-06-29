<template>
  <div class="user__profile">
    <div class="user__profile__title">
      <h2 class="">
        <strong>My account</strong>
      </h2>
      <h5>Account details</h5>
    </div>
    <div class="main">
      <nav class="navbar">
        <div
          class="user__title"
        >
          <img
            class="user__avatar"
            :src="getImage()"
            alt="Avatar empty"
          />
          <div class="user__name">
            zenmatsu93
            <span
              ><i> #{{ formInfo.userId }}</i></span
            >
          </div>
        </div>
        <ul class="user__information">
          <li class="information__link"><a>Dashboard</a></li>
          <li class="information__link"><a>Order</a></li>
          <li class="information__link"><a>Download</a></li>
          <li class="information__link"><a>Address</a></li>
          <li class="information__link"><a>Account details</a></li>
          <li class="information__link"><a>Wishlist</a></li>
          <li class="information__link"><a>Logout</a></li>
        </ul>
      </nav>
      <div class="user__update">
        <h4 class="update__info title">INFOMATION CHANGE</h4>
        <form id="changeInfoForm" @submit.prevent="changeInfoUser">
          <div class="info__name">
            <div class="info__firstname">
              <label for="fName">First name</label>
              <br />
              <input
                type="text"
                id="fName"
                name="fName"
                v-model="formInfo.firstName"
              />
            </div>
            <div class="info__lastame">
              <label for="fName">Last name</label>
              <br />
              <input
                type="text"
                id="lName"
                name="lName"
                v-model="formInfo.lastName"
              />
            </div>
          </div>
          <div class="info__username">
            <label for="uName">User name</label>
            <br />
            <input
              type="text"
              id="uName"
              name="uName"
              v-model="formInfo.userName"
            />
          </div>
          <div class="info__note">
            <i
              >This will be how your name will be displayed in the account
              section and in reviews
            </i>
          </div>
          <div class="info__email__address">
            <label for="emailAddress">Email address</label>
            <br />
            <input
              type="text"
              id="emailAddress"
              name="emailAddress"
              v-model="formInfo.emailAddress"
            />
          </div>
          <div class="info__address">
            <label for="address">Address</label>
            <br />
            <input
              type="text"
              id="address"
              name="address"
              v-model="formInfo.address"
            />
          </div>
          <div class="info__phone">
            <label for="phone">Phone</label>
            <br />
            <input
              type="text"
              id="phone"
              name="phone"
              v-model="formInfo.phone"
            />
          </div>
          <button type="submit" @click.prevent="saveInfoUser()">
            SAVE CHANGES INFOMATION
          </button>
        </form>
        <h4 class="update__password title">PASSWORD CHANGE</h4>
        <form id="changePasswordForm" @submit.prevent="changePasswordUser">
          <div class="current__password">
            <label for="currentPassword"
              >Current password (leave blank to leave unchanged)</label
            >
            <span class="text__danger" v-if="errorCurrPass">  {{
              errorCurrPass
            }}</span>
            <br />
            <input
              type="text"
              id="currentPassword"
              name="currentPassword"
            />
          </div>
          <div class="new__password">
            <label for="newPassword"
              >New password(leave blank to leave unchanged)</label
            >
            <span class="text__danger" v-if="errorNewPass">  {{
              errorNewPass
            }}</span>
            <br />
            <input type="password" id="newPassword" name="newPassword" />
          </div>
          <div class="confirm__password">
            <label for="confirmPassword">Confirm new password</label>
            <span class="text__danger" v-if="errorPassConfirm">  {{ errorPassConfirm }}</span>
            <br />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
          </div>
          <button type="submit" @click.prevent="savePasswordUser()">
            SAVE CHANGES PASSWORD
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Form from "vform";

export default {
  name: "Profile",
  components: {},
  data() {
    return {
      formInfo: new Form({
        firstName: "",
        lastName: "",
        userName: "",
        emailAddress: "",
        address: "",
        phone: "",
        avatar: "",
        userId: "",
        emailVerifiedAt: "",
      }),
      formPassword: new Form({
        currentPassword: "",
        newPassword: "",
        comfirmPassword: "",
      }),
      errorCurrPass: "",
      errorNewPass: "",
      errorPassConfirm: "",
    };
  },
  created() {
    this.getInitFormInfo();
    console.log("Hello", this.passwordFromStore);
  },
  computed: {
    ...mapGetters("AUTH", {
      // Get current user
      userFromStore: "user",
      passwordFromStore: "getPassword",
    }),
  },
  mounted () {
    this.getInitFormInfo();
    console.log(this.formPassword.currentPassword,
          this.formPassword.newPassword,
          this.formPassword.comfirmPassword);
  },
  methods: {
    ...mapActions("AUTH", {
      // Status logginIn of modal login from store
      updateInfoUser: "updateInfoUser",
      updatePasswordUser: "updatePasswordUser",
      updateAddressUser: "updateAddressUser",
    }),
    // Update info User
    async saveInfoUser() {
      await this.updateInfoUser({
        firstname: this.formInfo.firstName,
        lastname: this.formInfo.lastName,
        username: this.formInfo.userName,
        email: this.formInfo.emailAddress,
      });
      await this.updateAddressUser({
        address: this.formInfo.address,
        phone: this.formInfo.phone,
      });
    },
    // Update password User
    async savePasswordUser() {
      if (
        this.checkPassword(
          this.formPassword.currentPassword,
          this.formPassword.newPassword,
          this.formPassword.comfirmPassword
        )
      ) {
        await this.updatePasswordUser({
          password: this.formPassword.newPassword,
          password_confirmation: this.formPassword.comfirmPassword
        });
      }
    },
    getInitFormInfo() {
        this.formInfo = {
        firstName: this.userFromStore.firstname,
        lastName: this.userFromStore.lastname,
        userName: this.userFromStore.username,
        emailAddress: this.userFromStore.email,
        address: this.userFromStore.address,
        phone: this.userFromStore.phone,
        avatar: this.userFromStore.avatar,
        userId: this.userFromStore.id,
        emailVerifiedAt: this.userFromStore.email_verified_at,
    }
    },
    // Check password
    checkPassword(currentPassword, newPassword, passwordConfirm) {
      if (currentPassword != this.passwordFromStore) {
        this.errorCurrPass =
          "Current password is wrong. Please enter password again!";
        return false;
      }
      if (newPassword.length() < 6) {
        this.errorNewPass =
          "Password must have 6 or more characters. Please enter new password again! ";
        return false;
      }
      if (newPassword != passwordConfirm) {
        this.errorPassConfirm =
          "Password confirm is wrong. Please enter password again!";
        return false;
      }
      return true;
    },
    getImage() {
      if (this.formInfo.avatar == null | undefined) {
        return "../../../assets/img/avatar_icon.png";
      }
      return this.formInfo.avatar;
    }
  },
};
</script>

<style lang="scss" scoped>
.user__profile {
  padding: 0;
  margin: 0;
  .user__profile__title {
    margin: 0;
    position: relative;
    border-bottom: 1px solid rgb(173, 173, 173);
    width: 100%;
    text-transform: uppercase;
    h3 {
      color: rgb(95, 95, 95);
    }
    h5 {
      font-size: 1.4em;
      color: rgb(125, 125, 125);
    }
  }
  .main {
    position: relative;
    padding-top: 35px;
    display: flex;
    .navbar {
      width: 30%;
      padding-right: 30px;
      border-right: 1px solid rgb(189, 185, 185);
      display: block;
      .user__title {
        width: 100%;
        display: flex;
        flex-direction: row;
        img {
          width: 30%;
        }
        .user__name {
          margin: auto;
          font-size: 1.6em;
          span {
            opacity: 0.8;
          }
        }
      }
      .user__information {
        width: 100%;
        padding-left: 0;
        li {
          width: 100%;
          display: flex;
          flex-direction: column;
          text-align: left;
          line-height: 40px;
          a {
            font-size: 1.4em;
            font-weight: 700;
            text-transform: uppercase;
            color: rgb(125, 125, 125);
            &.active {
              color: rgb(0, 0, 0);
            }
          }
          &:not(:last-child) {
            border-bottom: 1px solid rgb(189, 185, 185);
          }
        }
      }
    }
    .user__update {
      margin-left: 30px;
      width: 100%;
      h4 {
        font-size: 2em;
        font-weight: 600;
        color: rgb(125, 125, 125);
      }
      div {
        margin-bottom: 20px;
        label {
          font-size: 1.4em;
          font-weight: 600;
          margin-bottom: 8px;
        }
        input {
          width: 100%;
          padding: 10px;
          font-size: 1.4em;
        }
        &.info__name {
          display: flex;
          justify-content: space-around;
          div {
            width: 100%;
            &:not(:last-child) {
              margin-right: 30px;
            }
          }
        }
        &.info__note {
          color: rgb(125, 125, 125);
          font-size: 1.4em;
        }
      }
      button {
        color: rgb(255, 255, 255);
        font-size: 1.6em;
        font-weight: 500;
        background-color: rgb(41, 140, 178);
        margin-bottom: 30px;
        padding: 10px 15px;
        border: none;
      }
    }
  }
  #changePasswordForm {
    input {
      font: small-caption;
    }
    .text__danger {
      color: rgb(241, 21, 21);
      font-size: 1.4em;
    }
  }
}
</style>



