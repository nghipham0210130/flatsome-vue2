<template>
  <div class="product__category">
    <!-- <div class="product__category__item" v-for="item in rootCategories" :key="item.idRootCategory">
            <img :src="getUrlImageCategory(item.idRootCategory)" alt="Category">
        </div>  -->
    <div class="product__category__item">
      <img
        src="../../../assets/img/product-category/booking.jpeg"
        alt="Category"
      />
      <div class="item__tag">
        <h5 class="tag__title">Booking</h5>
        <p class="tag__amount">12 Products</p>
      </div>
    </div>
    <div class="product__category__item">
      <img
        src="../../../assets/img/product-category/booking.jpeg"
        alt="Category"
      />
      <div class="item__tag">
        <h5 class="tag__title">Booking</h5>
        <p class="tag__amount">12 Products</p>
      </div>
    </div>
    <div class="product__category__item">
      <img
        src="../../../assets/img/product-category/booking.jpeg"
        alt="Category"
      />
      <div class="item__tag">
        <h5 class="tag__title">Booking</h5>
        <p class="tag__amount">12 Products</p>
      </div>
    </div>
    <div class="product__category__item">
      <img
        src="../../../assets/img/product-category/booking.jpeg"
        alt="Category"
      />
      <div class="item__tag">
        <h5 class="tag__title">Booking</h5>
        <p class="tag__amount">12 Products</p>
      </div>
    </div>
    <div class="product__category__item">
      <img
        src="../../../assets/img/product-category/booking.jpeg"
        alt="Category"
      />
      <div class="item__tag">
        <h5 class="tag__title">Booking</h5>
        <p class="tag__amount">12 Products</p>
      </div>
    </div>
    <div class="product__category__item">
      <img
        src="../../../assets/img/product-category/booking.jpeg"
        alt="Category"
      />
      <div class="item__tag">
        <h5 class="tag__title">Booking</h5>
        <p class="tag__amount">12 Products</p>
      </div>
    </div>
    <div class="product__category__item">
      <img
        src="../../../assets/img/product-category/booking.jpeg"
        alt="Category"
      />
      <div class="item__tag">
        <h5 class="tag__title">Booking</h5>
        <p class="tag__amount">12 Products</p>
      </div>
    </div>
    <div class="product__category__item">
      <img
        src="../../../assets/img/product-category/booking.jpeg"
        alt="Category"
      />
      <div class="item__tag">
        <h5 class="tag__title">Booking</h5>
        <p class="tag__amount">12 Products</p>
      </div>
    </div>
    <div class="product__category__item">
      <img
        src="../../../assets/img/product-category/booking.jpeg"
        alt="Category"
      />
      <div class="item__tag">
        <h5 class="tag__title">Booking</h5>
        <p class="tag__amount">12 Products</p>
      </div>
    </div>
  </div>
</template>

<script>
import { rootCategories } from "../../../data/Product";
export default {
  data() {
    return {
      rootCategories,
    };
  },
  methods: {
    // // analysis amount product follow input category
    // amountProductByColorID(category) {
    //   let amountProduct = 0;
    //   this.products.find(x => {
    //     if (x.idColor === idColor) {
    //       amountProduct = amountProduct + x.amountAvailable;
    //     }
    //   });
    //   return amountProduct;
    // },
    getUrlImageCategory: function(idRootCategory) {
      const tempUrlImage = this.rootCategories.find(
        (x) => x.idRootCategory === idRootCategory
      ).urlImage;
      console.log(tempUrlImage);
      return tempUrlImage;
    },
  },
};
</script>

<style lang="scss" scoped>
.product__category {
  display: grid;
  grid-template-columns: repeat(3, calc((100% - 40px) / 3));
  grid-template-rows: 296px 296px 296px;
  gap: 20px;
  column-gap: 20px;
  .product__category__item {
    position: relative;
    img {
      height: 100%;
    }
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
    &:hover {
      .item__tag {
        background-color: rgb(12, 135, 170);
        .tag__title {
            color: #fff;
        }
      }
    }
  }
}
</style>
