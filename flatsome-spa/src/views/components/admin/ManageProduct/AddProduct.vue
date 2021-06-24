<template>
  <div class="add__product">
    <h4 class="title">Add Product</h4>
    <form id="addProductForm" @submit.prevent="addProductForm">
      <div class="text__danger" v-if="errorsForm.length">
        <ul>
          <li v-for="(error, index) in errorsForm" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
      <div class="form__group">
        <label for="name">Name</label>
        <br />
        <input type="text" id="name" name="name" v-model="product.name" />
      </div>
      <div class="form__group">
        <label for="price">Price</label>
        <br />
        <input type="number" id="price" name="price" v-model="product.price" />
      </div>
      <div class="form__group">
        <label for="quantities">Quantity</label>
        <br />
        <input
          type="number"
          id="quantities"
          name="quantities"
          v-model="product.quantities"
        />
      </div>
      <div class="form__group">
        <label for="categoriesNewProduct">Categories</label>
        <br />
        <input
          type="text"
          id="categoriesNewProduct"
          name="categoriesNewProduct"
          v-model="product.categories"
        />
      </div>
      <div class="form__group">
        <label for="imagesNewProduct">Images</label>
        <br />
        <input
          type="text"
          id="imagesNewProduct"
          name="imagesNewProduct"
          v-model="product.image"
        />
      </div>
      <div class="form__group">
        <label for="descriptionNewProduct">Description</label>
        <br />
        <input
          type="text"
          id="descriptionNewProduct"
          name="descriptionNewProduct"
          v-model="product.description"
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
      product: {},
      name: "",
      price: null,
      quantities: null,
      description: "",
      categories: [],
      image: [],
      errorsForm: [],
    };
  },
  async created() {},
  computed: {
    ...mapGetters("ADMIN", {
      productListFromStore: "getProducts",
    }),
  },
  methods: {
    ...mapActions("ADMIN", {
      addProductFromStore: "addProduct",
    }),

    // Save new product
    async saveProduct() {
      this.errorsForm = [];
      if (!this.product.name) {
        this.errorsForm.push("Name is requires");
      }
      if (!this.product.price) {
        this.errorsForm.push("Price is requires");
      }
      if (!this.product.quantities) {
        this.errorsForm.push("Quantities is requires");
      }
      if (!this.product.description) {
        this.errorsForm.push("Description is requires");
      }

      if(!this.errorsForm.length) {
        let formData = new FormData();
         formData.append('name', this.product.name);
         formData.append('price', this.product.price);
         formData.append('quantities', this.product.quantities);
         formData.append('description', this.product.description);
         formData.append('categories', this.product.categories);
         formData.append('image', this.product.image);
         // Send a JSON oject
        await this.addProductFromStore(formData);
        this.product = {};
      }
    },

    //   if (!this.errorsForm.length) {

    //     await this.addProductFromStore({
    //       name: this.product.name,
    //       price: this.product.price,
    //       quantities: this.product.quantities,
    //       description: this.product.description,
    //       categories: this.product.categories,
    //       image: this.product.image,
    //     }).then((res) => console.log(res));
    //   }
    // },

    //

    // Refresh form
    refresh() {
     this.product = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.add__product {
  margin-left: 30px;
  width: 100%;
  h4 {
    margin-bottom: 60px;
    font-weight: 600;
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
      background-color: rgb(150, 10, 10);
      margin-right: 20px;
    }
    .btn__group__edit {
      background-color: rgb(41, 140, 178);
    }
  }
}
</style>