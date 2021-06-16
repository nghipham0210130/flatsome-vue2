<template id="productList" >
  <!-- <label for="numberShow">Showing all 6 results</label>
  <select name="numberShow" id="numberShow">
      <option value="default">Default sorting</option>
      <option value="popularity">Sort by popularity</option>
      <option value="averageRating">Sort by average rating</option>
      <option value="latest">Sort by latest</option>
      <option value="priceLowToHigh">Sort by price: low to high</option>
      <option value="priceHighToLow">Sort by price: high to low</option>
  </select> -->

  <section class="product__list">
    <div v-for="(product, index) in products" :key="index" :product="product">
      <div class="product__card">
        <product :productId="product.id"></product>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

import Product from "./Product";

export default {
  name: "ProductList",
  components: {
    product: Product,
  },
  data() {
    return {
      isLoading: false,
      numberProductsShow: 6,
      productId: null,
      products: null,
    };
  },
  async created() {
    await this.getProducts({
        productCategoryId: this.$route.params.categoryId,
        numberProductPerPage: this.numberProductsShow
      });
    this.products = this.productsFromStore;
  },
  computed: {
    ...mapState("PRODUCT", {
      // Get status open of modal login from store
      productsFromStore: "products",
      productCategoryId: "productCategoryId",
    }),
    currentRoute() {
      return this.$route.params.categoryId;
    },
  },
  methods: {
    ...mapActions("PRODUCT", {
      // Action get product list
      getProducts: "getProducts",
    }),
  }
};
</script>

<style lang="scss" scoped>
.product__list {
  display: grid;
  grid-template-columns: repeat(3, calc((100% - 40px) / 3));
  grid-template-rows: 360px 360px 360px;
  column-gap: 20px;
  row-gap: 40px;
  @media only screen and (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  a {
    &.product__card {
      position: relative;
    }
  }
}
</style>
