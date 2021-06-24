<template>
  <div class="manage__product__list" :key="componentKey">
    <h4>Product List</h4>
    <div class="title">
      <p>ID</p>
      <p>Name</p>
      <p>Price</p>
      <p>Quantity</p>
      <p>Description</p>
      <p>Action</p>
    </div>
    <div
      class="product__list"
      v-for="(product, index) in products"
      :key="index"
    >
      <p class="product__index">{{ index + 1 }}</p>
      <p class="product__name">{{ product.name }}</p>
      <p class="product__price">{{ product.price }}</p>
      <p class="product__quantities">{{ product.quantities }}</p>
      <p class="product__description">{{ product.description | abbreviate }}</p>
      <div class="product__actions">
        <router-link
          :to="{ name: 'editProduct', params: { productId: product.id } }"
          class="actions__edit"
          >Edit</router-link
        >
        <a href="#" class="actions__delete" @click="deleteProduct(product.id)"
          >Delete</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      componentKey: 0,
      numberProductPerPage: 68,
      products: {},
    };
  },
  created() {
    this.getProducts();
    this.products = this.productsFromStore;
    console.log(this.products);
  },
  computed: {
    ...mapState("ADMIN", {
      productsFromStore: "products",
    }),
  },
  filters: {
    abbreviate(text) {
      return text && text.slice(0, 50);
    },
  },
  methods: {
    ...mapActions("ADMIN", {
      getProductsFromStore: "getProducts",
      deleteProductFromStore: "deleteProduct",
    }),
    async getProducts() {
      await this.getProductsFromStore(this.numberProductPerPage);
    },
    async deleteProduct(id) {
      await this.deleteProductFromStore(id);
      location.reload();
      this.componentKey++;
    },
  },
};
</script>

<style lang="scss" scoped>
.manage__product__list {
  font-size: 1.4em;
  h4 {
    margin-bottom: 60px;
    font-weight: 600;
  }
  .title {
    display: grid;
    grid-template-columns: 5% 20% 10% 10% 30% 25%;
    font-weight: 600;
    column-gap: 5px;
    text-align: center;
    background-color: rgb(68, 96, 132);
    border: 1px solid rgb(0, 0, 0);
  }
  .product__list {
    display: grid;
    grid-template-columns: 5% 20% 10% 10% 30% 25%;
    column-gap: 5px;
    border: 1px solid rgb(0, 0, 0);
    .product__index,
    .product__price,
    .product__quantities,
    .product__actions {
      text-align: center;
    }
    .product__actions {
      font-weight: 600;
      margin: auto auto;
      .actions__edit {
        color: rgb(23, 92, 23);
        margin-right: 2em;
      }
      .actions__delete {
        color: rgb(196, 19, 19);
      }
    }
    &:nth-of-type(2n) {
      background-color: rgb(211, 206, 206);
    }
  }
}
</style>