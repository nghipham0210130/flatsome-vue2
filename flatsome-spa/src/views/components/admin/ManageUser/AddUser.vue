<template>
  <div class="add__user">
    <h2 class="title">Add User</h2>
    <form id="addUserForm" @submit.prevent="addUserForm">
      <div class="text__danger" v-if="errorsForm.length">
        <ul>
          <li v-for="(error, index) in errorsForm" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
      <div class="form__group">
        <label for="firstnameNewUser">First Name</label>
        <br />
        <input
          type="text"
          id="firstnameNewUser"
          name="firstnameNewUser"
          v-model="user.firstname"
        />
      </div>
      <div class="form__group">
        <label for="lastnameNewUser">Last Name</label>
        <br />
        <input
          type="text"
          id="lastnameNewUser"
          name="lastnameNewUser"
          v-model="user.lastname"
        />
      </div>
      <div class="form__group">
        <label for="usernameNewUser">Username</label>
        <br />
        <input
          type="text"
          id="usernameNewUser"
          name="usernameNewUser"
          v-model="user.username"
        />
      </div>
      <div class="form__group">
        <label for="emailNewUser">Email</label>
        <br />
        <input
          type="email"
          id="emailNewUser"
          name="emailNewUser"
          v-model="user.email"
        />
      </div>
      <div class="form__group">
        <label for="addressNewUser">Address</label>
        <br />
        <input
          type="email"
          id="addressNewUser"
          name="addressNewUser"
          v-model="user.address"
        />
      </div>
      <div class="form__group">
        <label for="phoneNewUser">Phone</label>
        <br />
        <input
          type="email"
          id="phoneNewUser"
          name="phoneNewUser"
          v-model="user.phone"
        />
      </div>
      <div class="form__group">
        <label for="passwordNewUser">Password</label>
        <br />
        <input
          type="email"
          id="passwordNewUser"
          name="passwordNewUser"
          v-model="user.password"
        />
      </div>
      <div class="form__group custom__file">
        <label for="avatarNewUser">Avatar User</label>
        <br />
        <input
          type="file"
          id="avatarNewUser"
          name="avatarNewUser"
          @change="saveImage"
        />
      </div>
      <div class="btn__group">
        <button type="button" class="btn__group__cancel" @click="refresh()">
          REFRESH
        </button>
        <button
          type="button"
          class="btn__group__edit"
          @click.prevent="saveUser()"
        >
          Add User
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      user: {},
      errorsForm: [],
      username: "",
      email: "",
      avatar: null,
      firstname: "",
      lastname: "",
      password: "",
      address: "",
      phone: "",
    };
  },
  computed: {
    ...mapGetters("ADMIN", {
      userListFromStore: "getUserList",
    }),
  },
  methods: {
    ...mapActions("ADMIN", {
      addUserFromStore: "addUser",
      importImage: "importImage",
    }),

    // Save new user
    async saveUser() {
      this.errorsForm = [];
      if (!this.user.email) {
        this.errorsForm.push("Email is requires!");
      }

      if (!this.user.password) {
        this.errorsForm.push("Password is requires!");
      }

      if (!this.errorsForm.length) {

        let data = {
          username: this.user.username,
          email: this.user.email,
          avatar: this.user.avatar,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          address: this.user.address,
          phone: this.user.phone,
          password: this.user.password,
        };

        // Send a oject
        await this.addUserFromStore(data);
        this.user = {};
      }
    },

    // Save image
    async saveImage(e) {
      this.image = await this.importImage(e.target.files[0]);
      console.log(this.image);
    },

    // Refresh form
    refresh() {
      this.user = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.add__user {
  width: 100%;
  h2 {
    font-size: 2em;
    font-weight: 600;
    margin-bottom: 30px;
    @media only screen and (max-width: 900px) {
      font-size: 1.8em;
    }
  }
  .text__danger {
    color: rgb(253, 24, 24);
    font-size: 1.6em;
    font-weight: 600;
    ul {
      list-style-type: none;
    }
  }
  div {
    margin-bottom: 20px;
    label {
      font-size: 1.4em;
      font-weight: 600;
      margin-bottom: 15px;
    }
    input {
      width: calc(100% - 24px);
      padding: 10px;
      font-size: 1.4em;
    }
    &.info__note {
      color: rgb(125, 125, 125);
      font-size: 1.4em;
    }
  }
  .btn__group {
    text-align: center;
    button {
      color: rgb(255, 255, 255);
      font-size: 1.6em;
      font-weight: 500;
      margin-bottom: 30px;
      padding: 10px 15px;
      border: none;
      &:hover {
        cursor: pointer;
      }
    }
    .btn__group__cancel {
      background-color: rgb(150, 10, 10);
      margin-right: 20px;
    }
    .btn__group__edit {
      background-color: rgb(41, 140, 178);
    }
  }
}
</style>