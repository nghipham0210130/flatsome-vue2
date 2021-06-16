<template>
  <main
    class="product-detail"
    v-if="product != null  && getImage(0) != undefined"
  >
    <div class="product-detail__image">
      <div class="image__main">
        <img
            class="card__image"
            :src="getImage(imageId)"
            alt="Product Item"
          />
        <span class="icon">
          <font-awesome-icon icon="expand-alt" />
        </span>
      </div>
      <div class="image__option">
        <div class="option__front">
          <img
            class="card__image"
            :src="getImage(0)"
            alt="Product Item Front"
            @click="imageId = 0"
          />
        </div>
        <div class="option__back">
          <!-- Image when hover -->
          <img
            class="card__image hover"
            :src="getImage(1)"
            alt="Product Item Back"
            @click="imageId = 1"
          />
        </div>
      </div>
    </div>
    <div class="product-detail__infomation">
      <div class="information__link">
        <h5>HOME / SHOP/ CLOTHING / HOODIES</h5>
        <div class="link__transform">
          <span class="arrow left"></span>
          <span class="arrow right"></span>
        </div>
      </div>
      <h3 class="infomation__title">{{ product.name }}</h3>
      <h3 class="infomation__price">${{ product.price }}</h3>
      <p class="infomation__detail">
        {{ product.description }}
      </p>
      <div class="information__cart">
        <div class="quantities">
          <span class="minus" @click="decreaseQuantity">-</span>
          <input type="text" :value="currentQuantity" inputmode="numberic" />
          <span class="plus" @click="increaseQuantity">+</span>
        </div>
        <button class="btn btn__add-to-cart">Add to cart</button>
      </div>
      <p class="infomation__category">
        Categories:
        <span v-if="product.categories[0].parent_id != null">{{
          getParentCategory(product.categories[0].parent_id)
        }}</span>
        <span v-if="product.categories[0].name != undefined">{{
          product.categories[0].name
        }}</span>
      </p>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ProductDetail",
  components: {},
  data() {
    return {
      isLoadingProduct: false,
      isLoadingProducts: false,
      currentQuantity: 1,
      imageId: 0,
    };
  },
  async created() {
    await this.getProduct(this.$route.params.productId);
    await this.getSidebar;
    this.currentRoutePath;
  },
  computed: {
    ...mapState("PRODUCT", {
      product: "product",
      categories: "categories",
      isLoading: "isLoading",
      loaded: "loaded",
    }),
    currentRoutePath() {
      return this.$route.path;
    },
  },
  mounted() {},
  methods: {
    ...mapActions("PRODUCT", {
      // Action get product
      getProduct: "getProduct",
    }),

    // Get parent category for current category
    getParentCategory(imageId) {
      const parentCategory = this.categories.find(
        (category) => category.id == imageId
      );
      return parentCategory.name;
    },
    // Get image from productImages (id = 0 | 1)
    getImage(imageId) {
      if(this.product.productImages[imageId] == null) {
        return undefined;
      }
      if (this.product.productImages[imageId].image == undefined) {
        return undefined;
      }
      if (imageId == 1 || imageId == 0) {
        return this.product.productImages[imageId].image;
      }
      return this.product.productImages[0].image;
    },
    // decreasecrease quantities to one if currentQuantity > 0
    decreaseQuantity() {
      if (this.currentQuantity > 0) {
        this.currentQuantity--;
      }
    },
    // increase quantities to one
    increaseQuantity() {
      console.log(this.product.quantities);
      if (this.currentQuantity < this.product.quantities) {
        this.currentQuantity++;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.product-detail {
  padding-top: 125px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 25px;
  img {
    max-width: 100%;
  }
  .product-detail__image {
    .image__main {
      position: relative;
      margin-bottom: 15px;
      .card__image {
        max-width: 100%;
        height: 51em;
        object-fit: cover;
      }
      .icon {
        width: 39px;
        height: 39px;
        color: rgb(192, 192, 192);
        position: absolute;
        left: 18px;
        bottom: 18px;
        border-radius: 50%;
        border: 2px solid rgb(192, 192, 192);
        svg {
          margin-left: 8px;
          margin-top: 7px;
          &.svg-inline--fa {
            &.fa-w-14 {
              font-size: 20px;
            }
          }
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
    .image__option {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      column-gap: 20px;
      div:hover {
        cursor: pointer;
        border: 2px solid rgb(204, 204, 204);
      }
    }
  }
  .product-detail__infomation {
    .information__link {
      position: relative;
      color: rgb(148, 148, 148);
      h5 {
        font-size: 1.6em;
        text-transform: uppercase;
      }
      .link__transform {
        position: absolute;
        right: 10px;
        top: 0;
        span {
          position: relative;
          &.arrow {
            border: solid;
            border-width: 0 2px 2px 0;
            display: inline-block;
            padding: 3px;
            margin-left: 30px;
            &.left {
              transform: rotate(135deg);
              -webkit-transform: rotate(135deg);
            }
            &.right {
              transform: rotate(-45deg);
              -webkit-transform: rotate(-45deg);
            }
          }
        }
        &::after {
          content: "";
          width: 28px;
          height: 28px;
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgb(192, 192, 192);
          left: 19px;
          top: -6px;
        }
        &::before {
          content: "";
          width: 28px;
          height: 28px;
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgb(192, 192, 192);
          left: 59px;
          top: -6px;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
    h3 {
      &.infomation__title {
        text-transform: uppercase;
        font-weight: 600;
        color: rgb(119, 119, 119);
        line-height: 35px;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          top: 31px;
          left: 0;
          width: 30px;
          border-bottom: 3px solid rgba(119, 119, 119, 0.5);
        }
      }
    }
    p {
      font-size: 1.4em;
      color: rgb(131, 131, 131);
      margin-bottom: 20px;
      width: 100%;
      &.infomation__category {
        padding-top: 6px;
        border-top: 1px dotted rgb(131, 131, 131);
        span {
          color: rgb(55, 76, 101);
        }
      }
    }
    .information__cart {
      display: flex;
      flex-direction: row;
      margin-bottom: 37px;
      .quantities {
        margin-right: 20px;
        span {
          cursor: pointer;
          &.minus,
          &.plus {
            width: 20px;
            height: 40px;
            background: #f2f2f2;
            padding: 8px 5px 8px 5px;
            border: 1px solid #ddd;
            display: inline-block;
            vertical-align: middle;
            text-align: center;
          }
        }

        input {
          height: 40px;
          width: 40px;
          text-align: center;
          font-size: 1.4em;
          border: 1px solid #ddd;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .btn {
        color: #ffff;
        text-transform: uppercase;
        font-weight: bold;
        background-color: rgb(74, 216, 255);
        padding: 0.375rem 1.25rem;
        border-radius: 0;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>