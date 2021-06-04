<template>
  <app-shop>
    <template v-slot:header__nav>
    </template>
    <template v-slot:shop__main>
      <div class="product__category">
        <div
          class="product__category__item"
          v-for="(product, index) in products"
          :key="index"
          :product="product"
          @click="selected = product.id"
          :style="{ backgroundImage: `url(${product.image})` }"
        >
          <!-- <img :src="product.image" alt="Category" /> -->
          <div class="item__tag">
            <h5 class="tag__title">{{ product.name }}</h5>
            <p class="tag__amount">{{ product.products_count }} Products</p>
          </div>
        </div>
      </div>
    </template>
  </app-shop>
</template>

<script>
import Shop from "./Shop";
import { RepositoryFactory } from "../../../repositories/RepositoryFactory";
const ProductsRepository = RepositoryFactory.get("products");

export default {
  components: {
    appShop: Shop,
  },
  data() {
    return {
      isLoading: false,
      products: null,
      selected: undefined,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    // fetch data
    async fetch() {
      this.isLoading = true;
      const { data } = await ProductsRepository.get();
      this.isLoading = false;
      this.products = data.data;
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
  // Style product category item
  .product__category__item {
    position: relative;
    background-position: center;
    background-size: cover;
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
