<template>
  <div class="add__admin">
    <h2 class="title">Add Admin</h2>
    <form id="addAdminForm" @submit.prevent="addAdminForm">
      <div class="text__danger" v-if="errorsForm.length">
        <ul>
          <li v-for="(error, index) in errorsForm" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
      <div class="form__group">
        <label for="nameNewAdmin">Name</label>
        <br />
        <input type="text" id="nameNewAdmin" name="nameNewAdmin" v-model="admin.name" />
      </div>
      <div class="form__group">
        <label for="priceNewAdmin">Price</label>
        <br />
        <input type="number" id="priceNewAdmin" name="priceNewAdmin" v-model="admin.price" />
      </div>
      <div class="form__group">
        <label for="quantitiesNewAdmin">Quantity</label>
        <br />
        <input
          type="number"
          id="quantitiesNewAdmin"
          name="quantitiesNewAdmin"
          v-model="admin.quantities"
        />
      </div>
      <div class="form__group">
        <label for="categoriesNewAdmin">Categories</label>
        <br />
        <input
          type="text"
          id="categoriesNewAdmin"
          name="categoriesNewAdmin"
          v-model="admin.categories"
        />
      </div>
      <div class="form__group custom__file">
        <label for="categoriesNewAdmin">Image Admin</label>
        <br/>
        <input
          type="file"
          id="imagesNewAdmin"
          name="imagesNewAdmin"
          @change="saveImage"
        />
      </div>
      <div class="form__group">
        <label for="descriptionNewAdmin">Description</label>
        <br />
        <input
          type="text"
          id="descriptionNewAdmin"
          name="descriptionNewAdmin"
          v-model="admin.description"
        />
      </div>
      <div class="btn__group">
        <button type="button" class="btn__group__cancel" @click="refresh()">
          REFRESH
        </button>
        <button
          type="button"
          class="btn__group__edit"
          @click.prevent="saveAdmin()"
        >
          Add Admin
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import Form from "vform";

export default {
  data() {
    return {
      admin: {},
      name: "",
      price: null,
      quantities: null,
      description: "",
      categories: [],
      image: [],
      errorsForm: [],
    };
  },
  computed: {
    ...mapGetters("ADMIN", {
      adminListFromStore: "getAdmins",
    }),
  },
  methods: {
    ...mapActions("ADMIN", {
      addAdminFromStore: "addAdmin",
      importImage: "importImage",
    }),

    // Save new admin
    async saveAdmin() {
      this.errorsForm = [];
      if (!this.admin.name) {
        this.errorsForm.push("Name is requires!");
      }
      if (!this.admin.price) {
        this.errorsForm.push("Price is requires!");
      }
      if (!this.admin.quantities) {
        this.errorsForm.push("Quantities is requires!");
      }
      if (!this.admin.description) {
        this.errorsForm.push("Description is requires!");
      }

      if (!this.errorsForm.length) {
        let formData = new FormData();
        formData.append("name", this.admin.name);
        formData.append("price", this.admin.price);
        formData.append("quantities", this.admin.quantities);
        formData.append("description", this.admin.description);
        formData.append("categories", this.admin.categories);
        formData.append("image", this.image);

        // Send a JSON oject
        await this.addAdminFromStore(formData).then((response) => {
          if(response) {
            document.getElementById("nameNewAdmin").value = "";
            document.getElementById("priceNewAdmin").value = "";
            document.getElementById("quantitiesNewAdmin").value = "";
            document.getElementById("categoriesNewAdmin").value = "";
            document.getElementById("imagesNewAdmin").value = "";
            document.getElementById("descriptionNewAdmin").value = "";
            this.$alert("Add Admin Success");
          }
        }).catch(error => {
          console.log(error);
          this.errorsForm.push(error.response);
        });

        this.admin = {};
      }
    },

    // Save image
    async saveImage(e) {
      this.image = await this.importImage(e.target.files[0]);
      console.log(this.image);
    },

    // Refresh form
    refresh() {
      this.admin = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.add__admin {
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