<template>
  <main
    id="product"
    class="product-detail"
    v-if="product != null"
    :key="componentKey"
  >
    <div class="product__detail__image">
      <div class="image__main">
        <img
          v-if="getImage(0) == undefined"
          class="card__image"
          src="../../assets/img/no_image_available.jpg"
          alt="Product Item"
        />
        <img
          v-if="getImage(0) != undefined"
          class="card__image"
          :src="getImage(imageId)"
          alt="Product Item"
        />
        <transition name="zoomImage">
          <img
            v-if="show"
            class="card__image zoom"
            :src="getImage(imageId)"
            alt="Product Zoom"
          />
        </transition>
        <span @click="show = !show" class="icon">
          <font-awesome-icon icon="expand-alt" />
        </span>
      </div>
      <div class="image__option">
        <div class="option__front" :class="{ active: isActiveFront }">
          <img
            class="card__image"
            :src="getImage(0)"
            alt="Product Item Front"
            @click="(imageId = 0), changeActive()"
          />
        </div>
        <div class="option__back" :class="{ active: isActiveBack }">
          <!-- Image when hover -->
          <img
            class="card__image hover"
            :src="getImage(1)"
            alt="Product Item Back"
            @click="(imageId = 1), changeActive()"
          />
        </div>
      </div>
    </div>
    <div class="product-detail__infomation">
      <div class="information__link">
        <h5>{{ getLinktoProduct(product.categories[0].parent_id) }}</h5>
        <ul class="link__transform">
          <li class="prev" @click="goPrevProduct()">
            <span class="arrow left"></span>
          </li>
          <li class="next" @click="goNextProduct()">
            <span class="arrow right"></span>
          </li>
        </ul>
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
        <button
          @click="addToCart()"
          :disabled="product.quantities == 0"
          class="btn btn__add-to-cart"
        >
          Add to cart
        </button>
      </div>
      <p class="infomation__category">
        Categories:
        <span
          v-if="
            product.categories != undefined &&
            product.categories[0].parent_id != null
          "
          >{{ getParentCategory(product.categories[0].parent_id) }},
        </span>
        <span
          v-if="
            product.categories != undefined &&
            product.categories[0].name != undefined
          "
          >{{ product.categories[0].name }}</span
        >
      </p>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "ProductDetail",
  components: {},
  data() {
    return {
      componentKey: 0,
      isLoadingProduct: false,
      isLoadingProducts: false,
      currentQuantity: 1,
      imageId: 0,
      currentIndex: 0,
      lengthCurrentProducts: 0,
      product: {},
      show: false,
      isActiveFront: true,
      isActiveBack: false,
    };
  },
  async created() {
    await this.getProduct(this.$route.params.productId);
    await this.getSidebar;
    this.currentRoutePath;
    this.outStockProduct();
    this.product = this.productFromStore;
    this.currentIndex = this.products.findIndex(
      (product) => product.id === this.product.id
    );
    this.lengthCurrentProducts = this.products.length;
  },
  computed: {
    ...mapState("PRODUCT", {
      productFromStore: "product",
      products: "products",
      categories: "categories",
      isLoading: "isLoading",
      loaded: "loaded",
      totalAmount: "totalAmount",
      orderId: "orderId",
    }),
    ...mapState("AUTH", {
      isLoggedIn: "isLoggedIn",
      user: "user",
    }),
    ...mapState("ORDER", {
      order: "order",
    }),
    ...mapMutations("PRODUCT", {
      updateCart: "UPDATE_CART",
    }),
    ...mapMutations("ORDER", {
      setUserId: "SET_USER_ID",
      setOrder: "SET_ORDER",
    }),
    currentRoutePath() {
      return this.$route.path;
    },
  },
  methods: {
    ...mapActions("PRODUCT", {
      // Action get product
      getProduct: "getProduct",
      getProducts: "getProducts",
      addProductToCart: "addProductToCart",
    }),
    ...mapActions("ORDER", {
      addProductToCartFromOrderStore: "addProductToCart",
    }),

    // Get Link to product
    getLinktoProduct(categoryId) {
      if (this.product.categories == undefined) {
        let link = "Home / Shop";
        return link;
      } else if (this.product.categories[0].parent_id == null) {
        let link = "Home / Shop / " + this.product.categories[0].name;
        return link;
      }
      let link =
        "Home / Shop / " +
        this.getParentCategory(categoryId) +
        " / " +
        this.product.categories[0].name;
      return link;
    },

    // Get parent category for current category
    getParentCategory(categoryId) {
      const parentCategory = this.categories.find(
        (category) => category.id == categoryId
      );
      return parentCategory.name;
    },
    // Get image from productImages (id = 0 | 1)
    getImage(imageId) {
      if (
        this.product.productImages == null ||
        this.product.productImages[imageId] == null
      ) {
        return undefined;
      } else if (
        this.product.productImages == undefined ||
        this.product.productImages[imageId].image == undefined
      ) {
        this.product.productImages[imageId].image =
          "../../../assets/img/no_image_available.jpg";
        return this.product.productImages[imageId].image;
      } else if (imageId == 1 || imageId == 0) {
        return this.product.productImages[imageId].image;
      }
      return this.product.productImages[0].image;
    },
    // decreasecrease quantities to one if currentQuantity > 0
    decreaseQuantity() {
      if (this.currentQuantity > 1) {
        this.currentQuantity--;
      }
    },
    // increase quantities to one
    increaseQuantity() {
      if (this.currentQuantity < this.product.quantities) {
        this.currentQuantity++;
      }
    },
    outStockProduct() {
      if (this.product.quantities == 0) {
        this.currentQuantity = 0;
      }
    },
    addToCart() {
      if (this.isLoggedIn) {
        this.addProductToCart({
          numberProduct: this.currentQuantity,
          productId: this.product.id,
        });

        // Set Order
        this.addProductToCartFromOrderStore({
          product: this.product,
          numberProduct: this.currentQuantity,
          userId: this.user.id,
        });
      } else {
        this.$alert("Please login to continue add product to your cart");
      }
    },

    // Go to prev product in the same product category
    goPrevProduct() {
      if (this.currentIndex == 0) {
        return;
      }
      const idPrevProduct = this.products[this.currentIndex - 1].id;
      this.$router.push({ params: { productId: idPrevProduct } }).catch(() => {
        console.log("err");
      });
      location.reload();
    },

    // Go to next product in the same product category
    goNextProduct() {
      if (this.currentIndex == this.lengthCurrentProducts - 1) {
        return;
      }
      const idNextProduct = this.products[this.currentIndex + 1].id;
      this.$router.push({ params: { productId: idNextProduct } }).catch(() => {
        console.log("err");
      });
      location.reload();
    },

    // Zoom image
    zoomImage() {
      this.showModal = true;
    },

    // Close modal
    closeModal() {
      this.showModal = false;
    },

    // Change class active
    changeActive() {
      if (this.isActiveFront) {
        this.isActiveBack = true;
        this.isActiveFront = false;
      } else {
        this.isActiveBack = false;
        this.isActiveFront = true;
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
  @media only screen and (max-width: 900px) {
    padding-top: 0;
    grid-template-columns: 1fr;
  }
  img {
    max-width: 100%;
  }
  .product__detail__image {
    @media only screen and (max-width: 900px) {
      margin-bottom: 30px;
    }
    .image__main {
      position: relative;
      margin-bottom: 15px;
      .card__image {
        max-width: 100%;
        height: 51em;
        object-fit: contain;
        &.zoom {
          position: absolute;
          transform: scale(1.5);
          z-index: 1;
          margin: auto;
          object-fit: contain;
          @media only screen and (max-width: 900px) {
            display: none;
          }
        }
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
        @media only screen and (max-width: 900px) {
          display: none;
        }
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
      div:hover,
      .active {
        cursor: pointer;
        border: 2px solid rgb(204, 204, 204);
      }
    }
  }
  .product-detail__infomation {
    .information__link {
      position: relative;
      color: rgb(148, 148, 148);
      @media only screen and (max-width: 900px) {
        position: absolute;
        top: 96px;
      }
      h5 {
        font-size: 1.6em;
        text-transform: uppercase;
        @media only screen and (max-width: 900px) {
          margin-bottom: 30px;
        }
      }
      .link__transform {
        position: absolute;
        right: 10px;
        top: 0;
        @media only screen and (max-width: 900px) {
          right: -102px;
          display: grid;
          grid-template-columns: 80% 20%;
        }
        li {
          list-style: none;
          left: 0;
          width: 28px;
          height: 28px;
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgb(192, 192, 192);
          left: 19px;
          top: -6px;
          &.prev {
            left: -5px;
          }
          &.next {
            left: 39px;
          }
          span {
            position: absolute;
            left: -22px;
            top: 6px;
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