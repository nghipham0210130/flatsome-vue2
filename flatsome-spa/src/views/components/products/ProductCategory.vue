<template>
  <div class="product__category">
    <div
      class="product__category__item"
      v-for="(productCategory, index) in productCategories"
      :key="index"
      :product="productCategory"
      @click="selected = productCategory.id"
      :style="{ backgroundImage: `url(${getImage(productCategory)})` }"
    >
      <router-link
        :to="{
          name: 'productList',
          params: { categoryId: productCategory.id },
        }"
        replace
        class="item__tag"
      >
        <h5 class="tag__title">{{ productCategory.name }}</h5>
        <p class="tag__amount">{{ productCategory.products_count }} Products</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      selected: undefined,
    };
  },
  created() {
    this.getProductCategories;
  },
  computed: {
    ...mapState("PRODUCT", {
      // Get status open of modal login from store
      productCategories: "productCategories",
    }),
    ...mapActions("PRODUCT", {
      getProductCategories: "getProductCategories",
    }),
  },
  methods: {
    // Get image
    getImage(productCategory) {
      // If image undefined, set image default
      if (productCategory.image == undefined) {
        productCategory.image = "../../../assets/img/no_image_available.jpg";
      }
      return productCategory.image;
    },
  },
};
</script>

<style lang="scss" scoped>
// Style product category
.product__category {
  text-align: center;
  display: grid;
  grid-template-columns: repeat(3, calc((100% - 40px) / 3));
  grid-template-rows: 296px 296px 296px;
  gap: 20px;
  @media only screen and (max-width: 900px) {
    grid-template-columns: 50% 50%;
    grid-template-rows: 240px 240px 240px;
  }
  // Style product category item
  .product__category__item {
    position: relative;
    background-position: center;
    background-size: cover;
    height: 296px;
    @media only screen and (max-width: 900px) {
      height: 240px;
    }
    // Tag of category item
    .item__tag {
      position: absolute;
      padding-top: 15px;
      padding-bottom: 16px;
      bottom: 45px;
      left: 50%;
      transform: translateX(-50%);
      text-transform: uppercase;
      background-color: rgba(255, 255, 255, 0.8);
      width: 100%;
      .tag__title {
        margin: 0;
        font-weight: 500;
        color: rgb(85, 85, 85);
      }
      p {
        color: rgb(71, 90, 114);
        font-size: 1.2em;
        margin: 0;
        font-weight: 300;
      }
    }
    // Change color text and color background of item__tag when hover card
    &:hover {
      .item__tag {
        background-color: rgb(12, 135, 170);
        .tag__title,
        .tag__amount {
          color: #fff;
        }
      }
    }
  }
}
</style>
