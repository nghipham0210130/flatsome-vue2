<template>
  <!-- Header card -->
  <router-link
    :to="{
      name: 'productDetail',
      params: { productId: productId },
    }"
    replace
    class="product"
    v-if="product != null && getImage(0) != undefined"
  >
    <div class="card__header">
      <!-- Image -->
      <img class="card__image" :src="getImage(0)" alt="Product Item Front" />
      <!-- Image when hover -->
      <img
        class="card__image hover"
        :src="getImage(1)"
        alt="Product Item Back"
      />
      <!-- Status of product: available or out of stock -->
      <div v-if="product.quantities == 0" class="card__status">
        Out of stock
      </div>
      <div class="card__quick__view hover">Quick view</div>
    </div>
    <!-- Body card with description of product -->
    <div class="card__body">
      <!-- Category -->
      <h5 class="card__category">{{ product.categories[0].name }}</h5>
      <!-- Name -->
      <h4 class="card__name">{{ product.name }}</h4>
      <!-- Price -->
      <p class="card__price">$ {{ product.price }}</p>
    </div>
    <!-- Mark Product: Sale | New | Hot  -->
    <div class="card__urgent">
      <p class="sale">Sale!</p>
      <!-- <p class="new">New</p>
          <p class="hot">Hot</p> -->
    </div>
  </router-link>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  props: {
    productId: Number,
  },
  data() {
    return {
      product: null,
    };
  },
  async created() {
    await this.getProduct(this.productId);
    this.product = this.productFromStore;
  },
  computed: {
    ...mapState("PRODUCT", {
      // Get status open of modal login from store
      isLoading: "isLoading",
      loaded: "loaded",
    }),
    ...mapGetters("PRODUCT", {
      // Get status open of modal login from store
      productFromStore: "product",
    }),
  },
  methods: {
    ...mapActions("PRODUCT", {
      // Action get product
      getProduct: "getProduct",
    }),

    // Get image from productImages (id = 0 | 1)
    getImage(imageId) {
      if (this.product.productImages[imageId] == undefined) {
        return undefined;
      }
      if (this.product.productImages[imageId].image == undefined) {
        this.product.productImages[imageId].image =
          "../../../assets/img/no_image_available.jpg";
        return this.product.productImages[imageId].image;
      }
      if (imageId == 1 || imageId == 0) {
        return this.product.productImages[imageId].image;
      }
      return this.product.productImages[0].image;
    },
  },
};
</script>

<style lang="scss" scoped>
.product {
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
      width: 100%;
      object-fit: cover;
      &.hover {
        top: 0;
        left: 0;
      }
    }
    &:hover {
      .hover {
        visibility: visible;
        opacity: 1;
      }
    }
    // Style imge
    .card__image {
      height: 296px;
      margin-bottom: 8px;
      @media only screen and (max-width: 900px) {
        height: 240px;
      }
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
      color: rgb(61, 61, 61);
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
      color: rgb(0, 0, 0);
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
  &:hover {
    cursor: pointer;
  }
}
</style>