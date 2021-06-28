<template>
  <div class="edit__admin" v-if="admin!=null" :key="componentKey">
    <h2 class="title">Edit Admin</h2>
    <form id="changeAdminForm" @submit.prevent="changeAdminForm">
      <div class="info__name"> 
        <label for="nameAdmin">Name</label>
        <br />
        <input
          type="text"
          id="nameAdmin"
          name="nameAdmin"
          v-model="admin.name"
        />
      </div>
      <div class="info__price">
        <label for="priceAdmin">Price</label>
        <br />
        <input
          type="text"
          id="priceAdmin"
          name="priceAdmin"
          v-model="admin.price"
        />
      </div>
      <div class="info__quantities">
        <label for="quantitiesAdmin">Quantity</label>
        <br />
        <input
          type="text"
          id="quantitiesAdmin"
          name="quantitiesAdmin"
          v-model="admin.quantities"
        />
      </div>
      <div class="info__description">
        <label for="descriptionAdmin">Description</label>
        <br />
        <input
          type="text"
          id="descriptionAdmin"
          name="descriptionAdmin"
          v-model="admin.description"
        />
      </div>
      <div class="btn__group">
        <button type="button" class="btn__group__cancel" @click="backToAdminList()">
        Previous
      </button>
        <button type="button" class="btn__group__edit" @click.prevent="saveChangeAdmin()">
        SAVE
      </button>
      </div>  
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "editAdmin",
  props: ["adminId"],
  data() {
    return {
        componentKey: 0,
        name: "",
        price: "",
        quantities: "",
        description: "",
        categories: [],
        image: [],
        admin: null,
    };
  },
  async created() {
    await this.getAdmin();
    this.admin = this.adminFromStore;
  },
  computed: {
      ...mapGetters("ADMIN", {
          adminFromStore: "getAdmin",
      })
  },
  methods: {
      ...mapActions("ADMIN",
      {
          editAdminFromStore: "editAdmin",
          getAdminFromStore: "getAdmin",
      }),
      // Set get admin from store to access admin edit admin chose
      async getAdmin() {
          await this.getAdminFromStore(this.adminId);
      },
      // Save change admin
      async saveChangeAdmin() {
        let formData = new FormData();
        formData.append("name", this.admin.name);
        formData.append("price", this.admin.price);
        formData.append("quantities", this.admin.quantities);
        formData.append("description", this.admin.description);
        formData.append("categories", this.admin.categories);
        formData.append("image", this.admin.image);
        console.log(formData, this.admin);
        
        await this.editAdminFromStore({adminId: this.adminId, payload: formData});
        this.componentKey++;
      },

      // Cancel edit and back to admin list
      backToAdminList() {
        this.$router.push({ name: "manageAdmin" });
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
    // Set admin null to create new admin (avoid new admin push to current admin)
    this.admin = null;
      await this.getAdminFromStore(this.adminId);
      this.admin = this.adminFromStore;
    next();
  },
};
</script>

<style lang="scss" scoped>
.edit__admin {   
  padding-top: 120px;
  padding-right: 15px;
  margin-left: 30px;
  width: 100%;
  @media only screen and (max-width: 900px) {
    padding-top: 0;
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