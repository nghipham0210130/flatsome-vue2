<template>
  <div class="manage__user">
    <div class="manage__user__nav">
      <button type="button" class="nav__manage" @click="changeShow(0)">
        Manage User
      </button>
      <button type="button" class="nav__add" @click="changeShow(1)">
        Add User
      </button>
    </div>
    <router-view></router-view>
    <user-list v-show="showList" :key="componentKey"></user-list>
    <add-user v-show="showAdd"></add-user>
  </div>
</template>

<script>
import UserList from "./UserList";
import AddUser from "./AddUser";

export default {
  name: "manageUser",
  components: {
    userList: UserList,
    addUser: AddUser,
  },
  data() {
    return {
      componentKey: 0,
      showList: false,
      showAdd: false,
    };
  },
  created() {
    this.showList = true;
  },
  methods: {
    changeShow(index) {
      if (index == 0) {
        this.showList = true;
        this.showAdd = false;
      } else {
        this.showList = false;
        this.showAdd = true;
      }
      this.componentKey++;
    },
  },
};
</script>
<style lang="scss" scoped>
.manage__user {
  margin-left: 60px;
  @media only screen and (max-width: 900px) {
    margin-left: 0;
  }
  .manage__user__nav {
    padding-top: 20px;
    margin-bottom: 60px;
    @media only screen and (max-width: 900px) {
      padding-top: 0;
    }
    button {
      font-size: 2em;
      background-color: rgb(105, 108, 112);
      color: rgb(251, 251, 251);
      padding: 10px 15px;
      &:not(:last-child) {
        margin-right: 30px;
      }
      &:hover {
        cursor: pointer;
      }
      @media only screen and (max-width: 900px) {
        font-size: 1.6em;
      }
    }
  }
}
</style>