<template>
  <div class="dashboard">
    <nav class="dashboard__sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <router-link :to="{ name: 'manageProduct' }" class="nav__link"
            >Manage Product</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'manageUser' }" class="nav__link"
            >Manage User</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'manageBill' }" class="nav__link"
            >Manage Bill</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'manageAdmin' }" class="nav__link"
            >Manage Admin</router-link
          >
        </li>
        <li><a href="#" @click="logout()">Logout</a></li>
      </ul>
    </nav>
    <div class="dashboard__content">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "dashboard",
  data() {
    return {};
  },
  computed: {
    ...mapState("ADMIN", {
      isLoggedIn: "isLoggedIn",
      admin: "admin",
    }),
  },
  methods: {
    ...mapActions("ADMIN", {
      logoutFromStore: "logout",
    }),
    async logout() {
      await this.logoutFromStore();
      this.$router.push({name: "loginAdminLink"});
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard {
  display: grid;
  grid-template-columns: 20% 80%;
  .dashboard__sidebar {
    width: 100%;
    h2 {
      font-weight: 600;
      font-size: 3.6em;
      text-align: center;
    }
    ul {
      list-style-type: none;
      padding-left: 0;
      background-color: rgb(68, 96, 132);
      li {
        line-height: 50px;
        border: 1px solid rgb(54, 76, 105);
        a {
          font-size: 2.4em;
          color: rgb(255, 255, 255);
          padding: 15px;
        }
      }
    }
  }
}
</style>