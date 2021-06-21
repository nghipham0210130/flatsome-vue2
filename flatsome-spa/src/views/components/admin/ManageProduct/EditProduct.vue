<template>
  <div class="edit__product" v-if="product!=null">
    <h4 class="title">Edit Product {{productId}}</h4>
    <form id="changeProductForm" @submit.prevent="changeProductForm">
      <div class="info__name"> 
        <label for="nameProduct">Name</label>
        <br />
        <input
          type="text"
          id="nameProduct"
          name="nameProduct"
          v-model="formInfo.name"
        />
      </div>
      <div class="info__price">
        <label for="priceProduct">Price</label>
        <br />
        <input
          type="text"
          id="priceProduct"
          name="priceProduct"
          v-model="formInfo.price"
        />
      </div>
      <div class="info__quantities">
        <label for="quantitiesProduct">Quantity</label>
        <br />
        <input
          type="text"
          id="quantitiesProduct"
          name="quantitiesProduct"
          v-model="formInfo.quantities"
        />
      </div>
      <div class="info__description">
        <label for="descriptionProduct">Description</label>
        <br />
        <input
          type="text"
          id="descriptionProduct"
          name="descriptionProduct"
          v-model="formInfo.description"
        />
      </div>
      <button type="submit" @click.prevent="saveChangeProduct()">
        SAVE CHANGES PRODUCT
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Form from "vform";

export default {
  name: "editProduct",
  props: ["productId"],
  data() {
    return {
        formInfo: new Form({
        name: "",
        price: "",
        quantities: "",
        description: "",
      }),
      product: {},
    };
  },
  computed: {
      ...mapState("ADMIN", {
          productFromStore: "product",
      })
  },
  created() {
      this.getProduct();
  },
  mounted() {
      this.product = this.productFromStore;
  },
  methods: {
      ...mapActions("ADMIN",
      {
          getProductFromStore:"getProduct",
          editProductFromStore: "editProduct",
      }),
      async getProduct() {
          await this.getProductFromStore(this.productId);
      },
      async saveChangeProduct() {
          await this.editProductFromStore({productId: this.productId, 
          payload: {
              name: this.formInfo.name,
              description: this.formInfo.description,
              price: this.formInfo.price,
              quantities: this.formInfo.quantities,
          }});
          this.$forceUpdate();
          this.formInfo = {
            name: "",
            price: "",
            quantities: "",
            description: "",
         };
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
    // Set products null to create new products (avoid new products push to current products)
    this.product = null;
     await this.getProductFromStore(this.productId);
    this.product = this.productFromStore;
    next();
  },
};
</script>

<style lang="scss" scoped>
.edit__product {
  margin-left: 30px;
  width: 100%;
  h4 {
    font-size: 2em;
    font-weight: 600;
    color: rgb(125, 125, 125);
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
  button {
    color: rgb(255, 255, 255);
    font-size: 1.6em;
    font-weight: 500;
    background-color: rgb(41, 140, 178);
    margin-bottom: 30px;
    padding: 10px 15px;
    border: none;
  }
}
</style>