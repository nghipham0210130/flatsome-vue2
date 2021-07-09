<template>
  <div class="manage__user__list" :key="componentKey">
    <h4>User List</h4>
    <div class="card__header">
      <p>ID</p>
      <p>Avatar</p>
      <p>Username</p>
      <p>Email</p>
      <p>Action</p>
    </div>
    <div
      class="card__body"
      v-for="(user, index) in pageOfItems "
      :key="index"
    >
      <p class="user__id">{{ user.id }}</p>
      <img class="user__images" :src="user.avatar"/>
      <p class="user__username">{{ user.username }}</p>
      <p class="user__email">{{ user.email }}</p>
      <p class="user__description">{{ user.description | abbreviate }}</p>
      <div class="user__actions">
        <router-link
          :to="{ name: 'editUser', params: { userId: user.id } }"
          class="actions__edit"
          >Edit</router-link
        >
        <a href="#" class="actions__delete" @click="deleteUser(user.id)"
          >Delete</a
        >
      </div>
    </div>
    <div class="cart__footer">
      <jw-pagination :items="users" @changePage="onChangePage" :styles="customStyles" :labels="customLabels"></jw-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";


const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
};

const customStyles = {
    ul: {
        justifyContent: 'center'
    },
    li: {
        display: 'inline-block',
        border: '2px solid rgb(68, 96, 132)'
    },
    a: {
        color: 'rgb(68, 96, 132)'
    },
};

export default {
  data() {
    return {
      componentKey: 0,
      users: [],
      pageOfItems : [],
      customStyles,
      customLabels,
    };
  }, 

  async created() {
    let numberUserPerPage = this.usersFromStore.length;
    await this.getUsers(numberUserPerPage);
    this.users = this.usersFromStore;
  },
  computed: {
    ...mapState("ADMIN", {
      usersFromStore: "users",
    }),
  },
  mouted() {
  },
  filters: {
    abbreviate(text) {
      return text && text.slice(0, 50);
    },
  },
  methods: {
    ...mapActions("ADMIN", {
      getUsersFromStore: "getUserList",
      deleteUserFromStore: "deleteUser",
    }),

    // Get users
    async getUsers(numberUserPerPage) {
      await this.getUsersFromStore(numberUserPerPage);

    },

    // Delete User by Id
    async deleteUser(id) {
      await this.deleteUserFromStore(id);
      location.reload();
      this.componentKey++;
    },

    // Change page
    onChangePage(pageOfUsers) {
      /// update page of items
      this.pageOfItems  = pageOfUsers;
    }
  },
  async beforeRouteUpdate(to, from, next) {
    // Set users null to create new users (avoid new users push to current users)
    // this.users = null;
    this.getUsersFromStore(this.usersFromStore.length);

    next();
  },
};
</script>

<style lang="scss" scoped>
.manage__user__list {
  font-size: 1.4em;
  h4 {
    font-size: 1.8em;
    font-weight: 600;
  }
  .card__header {
    display: grid;
    grid-template-columns: 5% 20% 10% 10% 30% 25%;
    font-weight: 600;
    column-gap: 5px;
    text-align: center;
    background-color: rgb(68, 96, 132);
    border: 1px solid rgb(0, 0, 0);
  }
  .card__body {
    display: grid;
    grid-template-columns: 5% 20% 10% 10% 30% 20%;
    column-gap: 1%;
    border: 1px solid rgb(0, 0, 0);
    .user__id,
    .user__price,
    .user__quantities,
    .user__actions {
      text-align: center;
    }
    .user__actions {
      font-weight: 600;
      margin: auto auto;
      @media only screen and (max-width: 900px) {
        display: flex;
        flex-direction: column;
      }
      .actions__edit {
        color: rgb(23, 92, 23);
        margin-right: 2em;
        @media only screen and (max-width: 900px) {
          margin-right: 0;
          margin-bottom: 1em;
        }
      }
      .actions__delete {
        color: rgb(196, 19, 19);
        @media only screen and (max-width: 900px) {
          margin-bottom: 0;
        }
      }
    }
    &:nth-of-type(2n) {
      background-color: rgb(211, 206, 206);
    }
    :last-child {
      margin-bottom: 30px;;
    }
  }
  .cart__footer {
    margin-top: 30px;
    text-align: center;
    @media only screen and (max-width: 900px) {
      bottom: 0;
    }
  }
}
</style>