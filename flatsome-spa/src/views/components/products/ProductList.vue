<template>
<!-- <label for="numberShow">Showing all 6 results</label>
                <select name="numberShow" id="numberShow">
                    <option value="default">Default sorting</option>
                    <option value="popularity">Sort by popularity</option>
                    <option value="averageRating">Sort by average rating</option>
                    <option value="latest">Sort by latest</option>
                    <option value="priceLowToHigh">Sort by price: low to high</option>
                    <option value="priceHighToLow">Sort by price: high to low</option>
                </select> -->
  <section class="product">
     <div class="product__card">
      <!-- Header card -->
      <div class="card__header">
        <!-- Image -->
        <img
          class="card__image"
          src="../../../assets/img/product-category/bags.jpeg"
          alt="Product Item"
        />
        <!-- Image when hover -->
        <img
          class="card__image hover"
          src="../../../assets/img/product-category/women.jpeg"
          alt=""
        />
        <!-- Status of product: available or out of stock -->
        <!-- <div class="card__status">Out of stock</div> -->
        <div class="card__quick__view hover">Quick view</div>
      </div>
      <!-- Body card with description of product -->
      <div class="card__body">
        <!-- Category -->
        <h5 class="card__category">Clothing</h5>
        <!-- Name -->
        <h4 class="card__name">Happy Ninja</h4>
        <!-- Price -->
        <p class="card__price">$ 35,00</p>
      </div>
      <!-- Mark Product: Sale | New | Hot  -->
      <div class="card__urgent">
        <p class="sale">Sale!</p>
        <p class="new">New</p>
        <p class="hot">Hot</p>
      </div>
    </div>
  </section>
</template>

<script>

import { RepositoryFactory } from "../../../repositories/RepositoryFactory";
const ProductsRepository = RepositoryFactory.get("products");

export default {
  name: "ProductList",
  props: {

  },
  data() {
    return {
      isLoading: false,
      products: null,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    // fetch data
    async fetch() {
      this.isLoading = true;
      const { data } = await ProductsRepository.getProductsByCategory(this.$route.params, 6);
      this.isLoading = false;
      this.products = data.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.product {
  display: grid;
  grid-template-columns: repeat(3, calc((100% - 40px) / 3));
  grid-template-rows: 360px 360px 360px;
  column-gap: 20px;
  row-gap: 40px;
  @media only screen and (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  .product__card {
    position: relative;
    .hover {
      position: absolute;
      visibility: hidden;
      opacity: 0;
    }
    // Style card header
    .card__header {
      position: relative;
      // Style imge
      .card__image {
        height: 296px;
        width: 100%;
        margin-bottom: 8px;
        &.hover {
          top: 0;
          left: 0;
        }
      }
      // Show status out of stock
      .card__status {
        width: 100%;
        font-size: 1.6em;
        font-weight: 700;
        text-align: center;
        text-transform: uppercase;
        padding-top: 25px;
        padding-bottom: 23px;
        background-color: rgba(255, 255, 255, 0.8);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      // Quick view of cart
      .card__quick__view {
        width: 100%;
        font-size: 1.2em;
        line-height: 1.2em;
        padding-top: 10px;
        padding-bottom: 10px;
        text-transform: uppercase;
        color: #fff;
        font-weight: 700;
        text-align: center;
        background-color: rgb(12, 135, 170);
        bottom: 8px;
      }
      // Display element when hover
      &:hover {
        .hover {
          visibility: visible;
          opacity: 1;
        }
      }
    }
    // Style card body
    .card__body {
      text-align: left;
      .card__category {
        font-size: 1.2em;
        color: rgb(85, 85, 85);
        text-transform: uppercase;
        margin: 0;
        font-weight: 300;
        margin-bottom: 2px;
      }
      .card__name {
        font-size: 1.6em;
        color: rgb(71, 90, 114);
        margin: 0;
        font-weight: 500;
        margin-bottom: 3px;
      }
      .card__price {
        margin: 0;
        font-size: 1.6em;
        font-weight: 700;
      }
    }
    .card__urgent {
      // style p tag common
      p {
        position: absolute;
        margin: 0;
        color: #fff;
        text-transform: capitalize;
        font-size: 1.6em;
        border-radius: 50%;
      }
      // style class sale
      .sale {
        padding: 14px 6px;
        background-color: rgb(74, 216, 255);
        top: 30px;
        left: -7px;
      }
      // style class new
      .new {
        padding: 14px 8px;
        background-color: rgb(0, 102, 0);
        top: 117px;
        left: -7px;
      }
      // style class hot
      .hot {
        padding: 14px 11px;
        background-color: rgb(204, 0, 0);
        top: 74px;
        left: -7px;
      }
    }
  }
}
</style>
