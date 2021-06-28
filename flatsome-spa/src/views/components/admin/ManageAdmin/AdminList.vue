<template>
  <div class="manage__admin__list" :key="componentKey">
    <h4>Admin List</h4>
    <div class="card__header">
      <p>ID</p>
      <p>Name</p>
      <p>Price</p>
      <p>Quantity</p>
      <p>Description</p>
      <p>Action</p>
    </div>
    <div
      class="card__body"
      v-for="(admin, index) in pageOfItems "
      :key="index"
    >
      <p class="admin__index">{{ admin.id }}</p>
      <p class="admin__name">{{ admin.name }}</p>
      <p class="admin__price">{{ admin.price }}</p>
      <p class="admin__quantities">{{ admin.quantities }}</p>
      <p class="admin__description">{{ admin.description | abbreviate }}</p>
      <div class="admin__actions">
        <router-link
          :to="{ name: 'editAdmin', params: { adminId: admin.id } }"
          class="actions__edit"
          >Edit</router-link
        >
        <a href="#" class="actions__delete" @click="deleteAdmin(admin.id)"
          >Delete</a
        >
      </div>
    </div>
    <div class="cart__footer">
      <jw-pagination :items="admins" @changePage="onChangePage" :styles="customStyles" :labels="customLabels"></jw-pagination>
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
      numberAdminPerPage: 68,
      admins: [],
      pageOfItems : [],
      customStyles,
      customLabels,
    };
  },
  async created() {
    await this.getAdmins();
    this.admins = this.adminsFromStore;
  },
  computed: {
    ...mapState("ADMIN", {
      adminsFromStore: "admins",
    }),
  },
  mouted() {
    // console.log(this.adminsFromStore.length);
  },
  filters: {
    abbreviate(text) {
      return text && text.slice(0, 50);
    },
  },
  methods: {

    ...mapActions("ADMIN", {
      getAdminsFromStore: "getAdmins",
      deleteAdminFromStore: "deleteAdmin",
    }),

    // Get admins
    async getAdmins() {
      await this.getAdminsFromStore(this.adminsFromStore.length);
    },

    // Delete Admin by Id
    async deleteAdmin(id) {
      await this.deleteAdminFromStore(id);
      location.reload();
      this.componentKey++;
    },

    // Change page
    onChangePage(pageOfAdmins) {
      /// update page of items
      this.pageOfItems  = pageOfAdmins;
    }
  },
  async beforeRouteUpdate(to, from, next) {
    // Set admins null to create new admins (avoid new admins push to current admins)
    this.admins = null;
    next();
  },
};
</script>

<style lang="scss" scoped>
.manage__admin__list {
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
    .admin__index,
    .admin__price,
    .admin__quantities,
    .admin__actions {
      text-align: center;
    }
    .admin__actions {
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