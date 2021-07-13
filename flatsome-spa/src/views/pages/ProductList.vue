<template id="productList" >
  <section>
    <div class="product__list__show">
      <label for="numberShow">Showing all {{ showNumber }} results</label>
      <select name="numberShow" id="numberShow" v-model="showNumber">
        <option
          v-for="(item, index) in showsOptions"
          :key="index"
          @click="changeShow(item.number)"
        >
          {{ item.number }} products
        </option>
        <option @click="changeShow(products.length)">Show all</option>
      </select>
    </div>
    <div class="product__list">
      <div v-for="(product, index) in products" :key="index" :product="product">
        <div class="product__card">
          <product :productId="product.id"></product>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Product from "../components/Product";

const showsOptions = [
  { id: 0, number: 6 },
  { id: 1, number: 8 },
  { id: 2, number: 24 },
];

export default {
  name: "ProductList",
  components: {
    product: Product,
  },
  data() {
    return {
      isLoading: false,
      productId: null,
      products: null,
      showsOptions: [],
      showNumber: 6,
      numberProductPerPage: 6,
    };
  },
  async created() {
    this.showsOptions = showsOptions;
    await this.getProducts({
      productCategoryId: this.$route.params.categoryId,
      numberProductPerPage: this.numberProductPerPage,
    });
  },
  mouted() {
    this.products = this.productsFromStore;
  },
  computed: {
    ...mapState("PRODUCT", {
      // Get products from store
      productsFromStore: "products",
      // Get productCategoryId from store
      productCategoryId: "productCategoryId",
    }),
    ...mapState("AUTH", {
      user: "user",
    }),
  },
  methods: {
    ...mapActions("PRODUCT", {
      // Action get product list
      getProducts: "getProducts",
    }),

    changeShow(value) {
      this.showNumber = value;
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
    this.products = null;
    await this.getProducts({
      productCategoryId: to.params.categoryId,
      numberProductPerPage: this.numberProductPerPage,
    });
    this.products = this.productsFromStore;
    next();
  },
};
</script>

<style lang="scss" scoped>
.product__list__show {
  text-align: right;
  font-size: 1.6em;
  margin-bottom: 30px;
  label {
    margin-right: 5px;
    font-weight: 600;
  }
}
.product__list {
  display: grid;
  grid-template-columns: repeat(3, calc((100% - 40px) / 3));
  grid-template-rows: 360px 360px 360px;
  column-gap: 20px;
  row-gap: 40px;
  @media only screen and (max-width: 900px) {
    grid-template-columns: 50% 50%;
    grid-template-rows: 240px 240px 240px;
    column-gap: 15px;
    row-gap: 100px;
  }
  a {
    &.product__card {
      position: relative;
    }
  }
}
</style>
