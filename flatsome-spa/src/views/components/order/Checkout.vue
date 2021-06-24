<template>
  <div class="checkout">
    <div class="checkout__process">
      <div class="shopping__cart active">
        <span class="">1</span>
        Shopping cart
      </div>
      <div class="checkout__details">
        <span>2</span>
        Checkout details
      </div>
      <div class="order__complete">
        <span>3</span>
        Order complete
      </div>
    </div>
    <div class="checkout__cart">
      <div class="checkout__cart__item">
        <div class="item__list">
          <div class="title">
            <p class="title__product">Product</p>
            <p class="title__price">Price</p>
            <p class="title__quantity">Quantity</p>
            <p class="title__subtotal">Subtotal</p>
          </div>
          <div v-if="products != null">
            <div class="body" v-for="(data, index) in products" :key="index">
              <div class="product__image" v-if="data != null">
                <font-awesome-icon
                  class="image__icon"
                  icon="times-circle"
                  @click="deleteProductOfCart(index)"
                />
                <img v-if="getImage(index) != undefined" :src="getImage(index)" alt="" />
                <span class="image__name">{{ data.product.name }}</span>
              </div>
              <div class="product__price" v-if="data != null">${{ data.product.price }},00</div>
              <div class="product__quantity" v-if="data != null">
                <span class="minus" @click="decreaseQuantity(index)">-</span>
                <input
                  type="text"
                  :value="getCurrentQuantity(index)"
                  inputmode="numberic"
                />
                <span class="plus" @click="increaseQuantity(index)">+</span>
              </div>
              <div class="product__subtotal" v-if="data != null">${{ getSubTotal(index) }},00</div>
            </div>
          </div>
          <div class="footer">
            <button
              class="footer__continue__shopping"
              @click="continueShopping()"
            >
              <font-awesome-icon icon="long-arrow-alt-left" />
              continue shopping
            </button>
            <button
              class="footer__update__cart"
              @click="
                resetCart;
                updateCart();
              "
            >
              update cart
            </button>
          </div>
        </div>
        <div class="checkout__cart__recommend"></div>
      </div>
      <div class="checkout__cart__item">
        <div class="item__totals">
          <p class="title">Cart totals</p>
          <div class="subtotal">
            <p class="subtotal__title">Subtotal</p>
            <p class="subtotal__value">${{ totalAmount }},00</p>
          </div>
          <div class="shipping">
            <p class="shipping__title">Shipping</p>
            <div class="shipping__value">
              <p class="shipping__value">
                Enter your address to view shipping options.
              </p>
              <a href="#" class="caculate">Calculate shipping</a>
            </div>
          </div>
          <div class="total">
            <p class="total__title">Total</p>
            <p class="total__value">${{ totalAmount }},00</p>
          </div>
        </div>
        <button class="checkout__cart__proceed" @click="proceedToCheckout()">Proceed to checkout</button>
        <div class="checkout__cart__coupon">
          <label class="coupon__title" for>
            <font-awesome-icon icon="tag" class="icon__tag" /> Coupon
          </label>
          <input v-model="coupon" type="text" class="coupon__input" placeholder="Coupon code" />
          <button :disabled="coupon==null" type="button" class="coupon__button" @click="applyCoupon()">Apply coupon</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  name: "Checkout",
  components: {},
  data() {
    return {
      products: [],
      currentQuantity: 0,
      updateAction: false,
      coupon: "",
    };
  },
  created() {
    if (this.orders != null) {
      this.products = this.orders;
    }
  },
  computed: {
    ...mapState("PRODUCT", {
      totalAmount: "totalAmount",
      totalNumberProduct: "numberProduct",
    }),
    ...mapState("ORDER", {
      orders: "orders",
    }),
    ...mapGetters("ORDER", {
      getOrders: "getOrders",
    }),
    ...mapMutations("PRODUCT", {
      resetCart: "RESET_CART",
    }),
  },
  methods: {
    ...mapActions("ORDER", {
      changeProductToCart: "changeProductToCart",
      deleteProductOfCart: "deleteProductOfCart",
      applyCouponFromStore: "applyCoupon",
    }),
    ...mapActions("PRODUCT", {
      changeProductFromProductStore: "changeProductToCart",
    }),
    // Click button continue shopping to come back shop
    continueShopping() {
      this.$router.push({ name: "shopLink" });
    },
    // Get Image
    getImage(index) {
      if (this.products[index] == null || this.products[index].product.productImages[0] == null ) {
        return undefined;
      }
      if (this.products[index].product.productImages[0].image == undefined) {
        this.products[index].product.productImages[0].image =
          "../../../assets/img/no_image_available.jpg";
        return this.products[index].product.productImages[0].image;
      }
      return this.products[index].product.productImages[0].image;
    },
    // Get sub category
    getSubTotal(id) {
      if (this.products[id] != null && this.products != null) {
        let total =
          this.products[id].numberProduct * this.products[id].product.price;
        return total;
      }
    },
    // Get current quantities of product
    getCurrentQuantity(id) {
      if (this.products[id] != null && this.products != null) {
        let currentQuantity = this.products[id].numberProduct;
        return currentQuantity;
      }
    },
    // decreasecrease quantities to one if currentQuantity > 0
    decreaseQuantity(id) {
      if (this.products[id].numberProduct > 1) {
        this.products[id].numberProduct--;
      }
    },
    // increase quantities to one
    increaseQuantity(id) {
      if (
        this.products[id].numberProduct < this.products[id].product.quantities
      ) {
        this.products[id].numberProduct++;
      }
    },
    // Update cart
    updateCart() {
      if(this.products != null) {
        this.products.forEach((data, index) => {
        this.changeProductToCart({
          index: index,
          numberProduct: data.numberProduct,
        });
        this.changeProductFromProductStore({
          numberProduct: data.numberProduct,
          total: data.numberProduct * data.product.price,
        });
        console.log(this.totalNumberProduct);
      });
      }
    },
    // Trans to order detail
    proceedToCheckout() {
      this.$router.push({name: "orderDetailLink"});
    },
    applyCoupon() {
      this.applyCouponFromStore(this.coupon);
    }
  },
  async beforeRouteUpdate(to, from, next) {
    // Set products null to create new products (avoid new products push to current products)
    this.products = null;
    this.products = this.orders;
    next();
  },
};
</script>
<style lang="scss" scoped>
.checkout {
  padding-top: 69px;
  @media only screen and (max-width: 900px) {
    padding-top: 15px;
  }
  .checkout__process {
    font-size: 2.4em;
    color: rgb(204, 204, 204);
    text-transform: uppercase;
    display: flex;
    margin-bottom: 50px;
    margin-left: 130px;
    @media only screen and (max-width: 900px) {
      font-size: 1.6em;
      margin-left: 30px;
    }
    > div:not(:last-child) {
      margin-right: 100px;
      @media only screen and (max-width: 900px) {
        margin-right: 50px;
      }
      &::after {
        content: "";
        border: solid rgb(204, 204, 204);
        border-width: 0 0.1em 0.1em 0;
        display: inline-block;
        padding: 0.15em;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        position: absolute;
        top: 35%;
        right: -1em;
      }
    }
    div {
      position: relative;
      &:hover,
      &.active {
        cursor: pointer;
        color: rgb(0, 0, 0);
        span {
          background: rgb(210, 110, 75);
        }
      }
    }
    span {
      font-size: 0.8em;
      color: rgb(251, 251, 251);
      text-align: justify;
      text-align-last: center;
      width: 1.5em;
      height: 1.5em;
      background: rgb(204, 204, 204);
      border-radius: 50%;
      position: absolute;
      top: 0.2em;
      left: -2em;
    }
  }
  .checkout__cart {
    display: grid;
    grid-template-columns: 60% 40%;
    font-size: 1.6em;
    @media only screen and (max-width: 900px) {
      grid-template-columns: 1fr;
    }
    .checkout__cart__item:not(:last-child) {
      // padding-right: 30px;
      border-right: 1px solid rgb(204, 204, 204);
      margin-right: 30px;
      @media only screen and (max-width: 900px) {
        border-right: none;
        margin-right: 0;
      }
    }
    .checkout__cart__item {
      @media only screen and (max-width: 900px) {
        margin-bottom: 50px;
      }
      .title {
        p {
          margin-bottom: 0;
        }
        font-weight: 600;
        color: rgb(129, 128, 128);
        border-bottom: 2px solid rgb(204, 204, 204);
        margin-bottom: 20px;
      }
      .item__list {
        .title {
          display: grid;
          grid-template-columns: 50% 15% 20% 15%;
          @media only screen and (max-width: 900px) {
            grid-template-columns: 80% 20%;
          }
          p:not(:first-child, :last-child) {
            @media only screen and (max-width: 900px) {
              display: none;
            }
          }
          p:last-child {
            text-align: right;
          }
        }
        .body {
          display: grid;
          grid-template-columns: 50% 15% 20% 15%;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgb(204, 204, 204);
          @media only screen and (max-width: 900px) {
            grid-template-columns: 80% 20%;
            padding-right: 0;
            &:nth-child(n) {
              text-align: right;
            }
          }

          p:last-child {
            text-align: right;
          }
          div {
            margin-top: auto;
            margin-bottom: auto;
            &:last-child {
              text-align: right;
              font-weight: 600;
            }
          }
          .product__image {
            display: flex;
            justify-content: space-between;
            img {
              max-width: 40%;
              height: 120px;
              margin-right: 5px;
            }
            img,
            span,
            .image__icon {
              margin-top: auto;
              margin-bottom: auto;
            }
            .image__icon {
              margin-right: 5px;
              &:hover {
                cursor: pointer;
              }
            }
            .image__name {
              margin-right: 5px;
              color: rgb(69, 89, 113);
              @media only screen and (max-width: 900px) {
                text-align: left;
              }
            }
          }
          .product__price {
            font-weight: 600;
          }
          .product__quantity {
            margin-right: 20px;
            span {
              cursor: pointer;
              &.minus,
              &.plus {
                width: 20px;
                height: 40px;
                background: #f2f2f2;
                padding: 8px 5px;
                border: 1px solid #ddd;
                display: inline-block;
                vertical-align: middle;
                text-align: center;
                @media only screen and (max-width: 900px) {
                  height: 30px;
                  padding: 3px 2px;
                }
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
              @media only screen and (max-width: 900px) {
                height: 30px;
                width: 30px;
                text-align: center;
                font-size: 1.2em;
              }
            }
          }
        }
        .footer {
          font-size: 1em;
          @media only screen and (max-width: 900px) {
            font-size: .8em;
            display: flex;
            justify-content: space-between;
          }
          .footer__continue__shopping {
            text-transform: uppercase;
            font-weight: 600;
            color: rgb(68, 96, 132);
            background-color: transparent;
            border-color: rgb(68, 96, 132);
            margin-right: 20px;
            padding: 10px 30px;
            @media only screen and (max-width: 900px) {
              padding: 6px 15px;
              margin-right: 0;
            }
          }
          .footer__update__cart {
            text-transform: uppercase;
            font-weight: 600;
            color: rgb(255, 255, 255);
            background-color: rgb(143, 160, 181);
            border: none;
            padding: 10px 30px;
            @media only screen and (max-width: 900px) {
              padding: 8px 15px;
              justify-content: right;
            }
            // add active when change product of cart
            &:hover,
            &.active {
              background-color: rgb(51, 86, 129);
            }
          }
        }
      }
      .item__totals {
        color: rgb(129, 128, 128);
        margin-bottom: 30px;
        div {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          &:not(:last-child) {
            border-bottom: 1px solid rgb(204, 204, 204);
          }
          p:nth-child(even) {
            color: rgb(0, 0, 0);
            font-weight: 600;
          }
          &.shipping {
            div {
              border: none;
              &.shipping__value {
                flex-direction: column;
                text-align: right;
                a {
                  color: rgb(55, 76, 101);
                }
              }
            }
          }
          &.total {
            border-bottom: 2px solid rgb(204, 204, 204);
          }
        }
      }
      .checkout__cart__proceed {
        width: 100%;
        color: rgb(255, 255, 255);
        text-transform: uppercase;
        font-size: 1em;
        font-weight: 600;
        background-color: rgb(210, 110, 75);
        border: none;
        padding-top: 8px;
        padding-bottom: 8px;
        margin-bottom: 30px;
      }
      .checkout__cart__coupon {
        display: flex;
        flex-direction: column;
        .coupon__title {
          font-weight: 500;
          border-bottom: 2px solid rgb(204, 204, 204);
          padding-bottom: 20px;
          margin-bottom: 20px;
          .icon__tag {
            transform: scaleX(-1);
            color: rgb(204, 204, 204);
            width: 1em;
            margin-right: 3px;
          }
        }
        .coupon__input {
          width: 100%;
          font-size: 1em;
          padding-left: 10px;
          padding-top: 8px;
          padding-bottom: 8px;
          margin-bottom: 20px;
          border: 1px solid rgb(204, 204, 204);
        }
        .coupon__button {
          @extend .coupon__input;
          background-color: rgb(249, 249, 249);
          &:hover {
            cursor: pointer;
            background-color: rgb(181, 181, 181);
          }
        }
      }
    }
  }
}
</style>

