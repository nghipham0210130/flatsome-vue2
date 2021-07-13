<template>
  <div class="add__bill">
    <h2 class="title">Add Product</h2>
    <form id="addProductForm" @submit.prevent="addProductForm">
      <div class="text__danger" v-if="errorsForm.length">
        <ul>
          <li v-for="(error, index) in errorsForm" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
      <div class="form__group">
        <label for="nameNewProduct">Name</label>
        <br />
        <input type="text" id="nameNewProduct" name="nameNewProduct" v-model="bill.name" />
      </div>
      <div class="form__group">
        <label for="priceNewProduct">Price</label>
        <br />
        <input type="number" id="priceNewProduct" name="priceNewProduct" v-model="bill.price" />
      </div>
      <div class="form__group">
        <label for="quantitiesNewProduct">Quantity</label>
        <br />
        <input
          type="number"
          id="quantitiesNewProduct"
          name="quantitiesNewProduct"
          v-model="bill.quantities"
        />
      </div>
      <div class="form__group">
        <label for="categoriesNewProduct">Categories</label>
        <br />
        <input
          type="text"
          id="categoriesNewProduct"
          name="categoriesNewProduct"
          v-model="bill.categories"
        />
      </div>
      <div class="form__group custom__file">
        <label for="categoriesNewProduct">Image Product</label>
        <br/>
        <input
          type="file"
          id="imagesNewProduct"
          name="imagesNewProduct"
          @change="saveImage"
        />
      </div>
      <div class="form__group">
        <label for="descriptionNewProduct">Description</label>
        <br />
        <input
          type="text"
          id="descriptionNewProduct"
          name="descriptionNewProduct"
          v-model="bill.description"
        />
      </div>
      <div class="btn__group">
        <button type="button" class="btn__group__cancel" @click="refresh()">
          REFRESH
        </button>
        <button
          type="button"
          class="btn__group__edit"
          @click.prevent="saveProduct()"
        >
          Add Product
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
      bill: {},
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
      billListFromStore: "getProducts",
    }),
  },
  methods: {
    ...mapActions("ADMIN", {
      addProductFromStore: "addProduct",
      importImage: "importImage",
    }),

    // Save new bill
    async saveProduct() {
      this.errorsForm = [];
      if (!this.bill.name) {
        this.errorsForm.push("Name is requires!");
      }
      if (!this.bill.price) {
        this.errorsForm.push("Price is requires!");
      }
      if (!this.bill.quantities) {
        this.errorsForm.push("Quantities is requires!");
      }
      if (!this.bill.description) {
        this.errorsForm.push("Description is requires!");
      }

      if (!this.errorsForm.length) {
        let formData = new FormData();
        formData.append("name", this.bill.name);
        formData.append("price", this.bill.price);
        formData.append("quantities", this.bill.quantities);
        formData.append("description", this.bill.description);
        formData.append("categories", this.bill.categories);
        formData.append("image", this.image);

        // Send a JSON oject
        await this.addProductFromStore(formData).then((response) => {
          if(response) {
            document.getElementById("nameNewProduct").value = "";
            document.getElementById("priceNewProduct").value = "";
            document.getElementById("quantitiesNewProduct").value = "";
            document.getElementById("categoriesNewProduct").value = "";
            document.getElementById("imagesNewProduct").value = "";
            document.getElementById("descriptionNewProduct").value = "";
            this.$alert("Add Product Success");
          }
        }).catch(error => {
          console.log(error);
          this.errorsForm.push(error.response);
        });

        this.bill = {};
      }
    },

    // Save image
    async saveImage(e) {
      this.image = await this.importImage(e.target.files[0]);
      console.log(this.image);
    },

    // Refresh form
    refresh() {
      this.bill = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.add__bill {
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