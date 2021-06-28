<template>
  <div class="edit__user">
    <h2 class="title">Edit User</h2>
    <form id="editUserForm" @submit.prevent="editUserForm">
      <div class="text__danger" v-if="errorsForm.length">
        <ul>
          <li v-for="(error, index) in errorsForm" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
      <div class="form__group">
        <label for="firstnameUser">First Name</label>
        <br />
        <input
          type="text"
          id="firstnameUser"
          name="firstnameUser"
          v-model="user.firstname"
        />
      </div>
      <div class="form__group">
        <label for="lastnameUser">Last Name</label>
        <br />
        <input
          type="text"
          id="lastnameUser"
          name="lastnameUser"
          v-model="user.lastname"
        />
      </div>
      <div class="form__group">
        <label for="usernameUser">Username</label>
        <br />
        <input
          type="text"
          id="usernameUser"
          name="usernameUser"
          v-model="user.username"
        />
      </div>
      <div class="form__group">
        <label for="emailUser">Email</label>
        <br />
        <input
          type="email"
          id="emailUser"
          name="emailUser"
          v-model="user.email"
        />
      </div>
      <div class="form__group">
        <label for="addressUser">Address</label>
        <br />
        <input
          type="text"
          id="addressUser"
          name="addressUser"
          v-model="user.address"
        />
      </div>
      <div class="form__group">
        <label for="phoneUser">Phone</label>
        <br />
        <input
          type="text"
          id="phoneUser"
          name="phoneUser"
          v-model="user.phone"
        />
      </div>
      <!-- <div class="form__group custom__file">
        <label for="avatarUser">Avatar User</label>
        <br />
        <input
          type="file"
          id="avatarUser"
          name="avatarUser"
          @change="saveImage"
        />
      </div> -->
      <div class="btn__group">
        <button type="button" class="btn__group__cancel" @click="backToUserList()">
          Back to list
        </button>
        <button
          type="button"
          class="btn__group__edit"
          @click.prevent="saveChange()"
        >
          Edit User
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FormData from 'vform';

export default {
  name: "editUser",
  props: ["userId"],
  data() {
    return {
        componentKey: 0,
        user: {},
        errorsForm: [],
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        address: "",
        phone: "",
    };
  },
  async created() {
    await this.getUser();
    this.user = this.userFromStore;
  },
  computed: {
      ...mapGetters("ADMIN", {
          userFromStore: "getUser",
      })
  },
  methods: {
      ...mapActions("ADMIN",
      {
          editUserFromStore: "editUser",
          getUserFromStore: "getUser",
      }),

      // Set get user from store to access user edit user chose
      async getUser() {
        console.log(this.userId);
          await this.getUserFromStore(this.userId);
      },

      // Save change user
      async saveChange() {
        let dataForm = new FormData;

        if(this.user.username != null) {
          dataForm.username = this.user.username;
        }

        if(this.user.email != null) {
          dataForm.email = this.user.email;
        }

        if(this.user.firstname != null) {
          dataForm.firstname = this.user.firstname;
        }

        if(this.user.lastname != null) {
          dataForm.lastname = this.user.lastname;
        }

        if(this.user.address != null) {
          dataForm.address = this.user.address;
        }

        if(this.user.phone != null) {
          dataForm.phone = this.user.phone;
        }
        
        await this.editUserFromStore({userId: this.userId, payload: dataForm});
        this.componentKey++;
      },

      // Cancel edit and back to user list
      backToUserList() {
        this.$router.push({ name: "manageUser" });
      },

  },
   // Set guard on the component options object:
  beforeRouteLeave(to, from, next) {
    next();
  },
  /* Called when this component is reused.
  Here we have a chance to update the component since mounted()
  and other life-cycle hooks won't be called when a component is reused.
  */
  async beforeRouteUpdate(to, from, next) {
    // Set user null to create new user (avoid new user push to current user)
    this.user = null;
      await this.getUserFromStore(this.userId);
      this.user = this.userFromStore;
    next();
  },
};
</script>

<style lang="scss" scoped>
.edit__user {   
  padding-top: 120px;
  padding-right: 15px;
  margin-left: 30px;
  width: 100%;
  @media only screen and (max-width: 900px) {
    pediting-top: 0;
    margin-left: 0;
  }
  h2 {
    font-size: 2em;
    font-weight: 600;
    color: rgb(125, 125, 125);
    margin-bottom: 30px;
  }
  div {
    margin-bottom: 20px;
    label {
      font-size: 1.4em;
      font-weight: 600;
      margin-bottom: 8px;
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
    }
    .btn__group__cancel {
      background-color: rgb(73, 70, 70);
       margin-right: 20px;
      
    }
    .btn__group__edit {
      background-color: rgb(41, 140, 178);  
    }
  }
}
</style>