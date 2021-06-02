<template>
  <div class="product__category">
    <!-- <div class="product__category__item" v-for="item in rootCategories" :key="item.idRootCategory">
            <img :src="getUrlImageCategory(item.idRootCategory)" alt="Category">
        </div>  -->
    <div class="product__category__item" v-for="(product, index) in products" :key="index" :product="product" @click="goToProductList()">
      <img
        :src="product.image"
        alt="Category"
      />
      <div class="item__tag">.
        <h5 class="tag__title">{{product.name}}</h5>
        <p class="tag__amount">{{product.products_count}} Products</p>
      </div>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from '../../../repositories/RepositoryFactory';
const ProductsRepository = RepositoryFactory.get('products');

export default {
  name: "product__category",
  data() {
    return {
      isLoading: false,
      products: null,
    };
  },
  created() {
    this.fetch()
  },
  methods: {
    // fetch data
    async fetch() {
      this.isLoading = true;
      console.log(ProductsRepository);
      const { data } = await ProductsRepository.get();
      this.isLoading = false;
      this.products = data.data;
    },
    // Move to productListLink
    goToProductList() {
      this.$router.replace({name: 'productListLink'});
    }
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
  column-gap: 20px;
  // Style product category item
  .product__category__item {
    position: relative;
    img {
      width: 100%;
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
        .tag__title, .tag__amount {
            color: #fff;
        }
      }
    }
  }
}
</style>
