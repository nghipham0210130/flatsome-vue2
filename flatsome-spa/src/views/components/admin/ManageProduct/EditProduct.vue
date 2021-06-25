<template>
  <div class="edit__product" v-if="product!=null" :key="componentKey">
    <h2 class="title">Edit Product</h2>
    <form id="changeProductForm" @submit.prevent="changeProductForm">
      <div class="info__name"> 
        <label for="nameProduct">Name</label>
        <br />
        <input
          type="text"
          id="nameProduct"
          name="nameProduct"
          v-model="product.name"
        />
      </div>
      <div class="info__price">
        <label for="priceProduct">Price</label>
        <br />
        <input
          type="text"
          id="priceProduct"
          name="priceProduct"
          v-model="product.price"
        />
      </div>
      <div class="info__quantities">
        <label for="quantitiesProduct">Quantity</label>
        <br />
        <input
          type="text"
          id="quantitiesProduct"
          name="quantitiesProduct"
          v-model="product.quantities"
        />
      </div>
      <div class="info__description">
        <label for="descriptionProduct">Description</label>
        <br />
        <input
          type="text"
          id="descriptionProduct"
          name="descriptionProduct"
          v-model="product.description"
        />
      </div>
      <div class="btn__group">
        <button type="button" class="btn__group__cancel" @click="backToProductList()">
        Previous
      </button>
        <button type="button" class="btn__group__edit" @click.prevent="saveChangeProduct()">
        SAVE
      </button>
      </div>  
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "editProduct",
  props: ["productId"],
  data() {
    return {
        componentKey: 0,
        name: "",
        price: "",
        quantities: "",
        description: "",
        categories: [],
        image: [],
        product: null,
    };
  },
  async created() {
    await this.getProduct();
    this.product = this.productFromStore;
  },
  computed: {
      ...mapGetters("ADMIN", {
          productFromStore: "getProduct",
      })
  },
  methods: {
      ...mapActions("ADMIN",
      {
          editProductFromStore: "editProduct",
          getProductFromStore: "getProduct",
      }),
      // Set get product from store to access product edit product chose
      async getProduct() {
          await this.getProductFromStore(this.productId);
      },
      // Save change product
      async saveChangeProduct() {
        let formData = new FormData();
        formData.append("name", this.product.name);
        formData.append("price", this.product.price);
        formData.append("quantities", this.product.quantities);
        formData.append("description", this.product.description);
        formData.append("categories", this.product.categories);
        formData.append("image", this.product.image);
        console.log(formData, this.product);
        
        await this.editProductFromStore({productId: this.productId, payload: formData});
        this.componentKey++;
      },

      // Cancel edit and back to product list
      backToProductList() {
        this.$router.push({ name: "manageProduct" });
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
    // Set product null to create new product (avoid new product push to current product)
    this.product = null;
      await this.getProductFromStore(this.productId);
      this.product = this.productFromStore;
    next();
  },
};
</script>

<style lang="scss" scoped>
.edit__product {   
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