<template>
  <div class="product">
    <!-- Product card  -->
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
        <div class="card__status">Out of stock</div>
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
    <div class="product__card">
      <div class="card__header">
        <img
          class="card__image"
          src="../../../assets/img/product-category/bags.jpeg"
          alt="Product Item"
        />
        <div class="card__status">Out of stock</div>
      </div>
      <div class="card__body">
        <h5 class="card__category">Clothing</h5>
        <h4 class="card__name">Happy Ninja</h4>
        <p class="card__price">$ 35,00</p>
      </div>
      <div class="card__urgent">
        <p class="sale">Sale!</p>
        <p class="new">New</p>
        <p class="hot">Hot</p>
      </div>
    </div>
    <div class="product__card">
      <div class="card__header">
        <img
          class="card__image"
          src="../../../assets/img/product-category/bags.jpeg"
          alt="Product Item"
        />
        <div class="card__status">Out of stock</div>
      </div>
      <div class="card__body">
        <h5 class="card__category">Clothing</h5>
        <h4 class="card__name">Happy Ninja</h4>
        <p class="card__price">$ 35,00</p>
      </div>
      <div class="card__urgent">
        <p class="sale">Sale!</p>
        <p class="new">New</p>
        <p class="hot">Hot</p>
      </div>
    </div>
    <div class="product__card">
      <div class="card__header">
        <img
          class="card__image"
          src="../../../assets/img/product-category/bags.jpeg"
          alt="Product Item"
        />
        <div class="card__status">Out of stock</div>
      </div>
      <div class="card__body">
        <h5 class="card__category">Clothing</h5>
        <h4 class="card__name">Happy Ninja</h4>
        <p class="card__price">$ 35,00</p>
      </div>
      <div class="card__urgent">
        <p class="sale">Sale!</p>
        <p class="new">New</p>
        <p class="hot">Hot</p>
      </div>
    </div>
    <div class="product__card">
      <div class="card__header">
        <img
          class="card__image"
          src="../../../assets/img/product-category/bags.jpeg"
          alt="Product Item"
        />
        <div class="card__status">Out of stock</div>
      </div>
      <div class="card__body">
        <h5 class="card__category">Clothing</h5>
        <h4 class="card__name">Happy Ninja</h4>
        <p class="card__price">$ 35,00</p>
      </div>
      <div class="card__urgent">
        <p class="sale">Sale!</p>
        <p class="new">New</p>
        <p class="hot">Hot</p>
      </div>
    </div>
    <div class="product__card">
      <div class="card__header">
        <img
          class="card__image"
          src="../../../assets/img/product-category/bags.jpeg"
          alt="Product Item"
        />
        <div class="card__status">Out of stock</div>
      </div>
      <div class="card__body">
        <h5 class="card__category">Clothing</h5>
        <h4 class="card__name">Happy Ninja</h4>
        <p class="card__price">$ 35,00</p>
      </div>
      <div class="card__urgent">
        <p class="sale">sale!</p>
        <p class="new">New</p>
        <p class="hot">Hot</p>
      </div>
    </div>
    <div class="product__card">
      <div class="card__header">
        <img
          class="card__image"
          src="../../../assets/img/product-category/bags.jpeg"
          alt="Product Item"
        />
        <div class="card__status">Out of stock</div>
      </div>
      <div class="card__body">
        <h5 class="card__category">Clothing</h5>
        <h4 class="card__name">Happy Ninja</h4>
        <p class="card__price">$ 35,00</p>
      </div>
      <div class="card__urgent">
        <p class="sale">Sale!</p>
        <p class="new">New</p>
        <p class="hot">Hot</p>
      </div>
    </div>
    <div class="product__card">
      <div class="card__header">
        <img
          class="card__image"
          src="../../../assets/img/product-category/bags.jpeg"
          alt="Product Item"
        />
        <div class="card__status">Out of stock</div>
      </div>
      <div class="card__body">
        <h5 class="card__category">Clothing</h5>
        <h4 class="card__name">Happy Ninja</h4>
        <p class="card__price"><b>$35,00</b></p>
      </div>
      <div class="card__urgent">
        <p class="sale">Sale!</p>
        <p class="new">New</p>
        <p class="hot">Hot</p>
      </div>
    </div>
  </div>
</template>

<script>
import { rootCategories } from "../../../models/Product";
export default {
  data() {
    return {
      rootCategories,
    };
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
