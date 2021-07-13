<template>
  <div class="order__detail">
    <h2>Order Detail</h2>
    <div class="product__list" v-for="(data, index) in products" :key="index">
      <div class="product">
        <div class="product__info">
          <img :src="getImage(index)" alt="Image product" />
          <div class="infor__description">
            <p>{{ data.product.description | abbreviate  }}</p>
            <p>x {{ data.numberProduct }}</p>
          </div>
        </div>
        <p class="product__amount">${{ getSubTotal(index) }},00</p>
      </div>
    </div>
    <div class="payment">
      <div class="payment__subtotal">
        <p class="subtotal__title">SubTotal</p>
        <span>${{ totalAmount }},00</span>
      </div>
      <div class="payment__shipping">
        <p class="shipping__title">Shipping</p>
        <span>${{ getShipping() }},00</span>
      </div>
      <div class="payment__freeship">
        <p class="freeship__title">Freeship</p>
        <span>${{ getFreeship() }},00</span>
      </div>
      <div class="payment__voucher">
        <p class="voucher__title">Voucher From Shop</p>
        <span>${{ getVoucher() }},00</span>
      </div>
      <div class="payment__total">
        <p class="subtotal__title">SubTotal</p>
        <span>${{ getTotalPayment() }},00</span>
      </div>
    </div>
    <button type="button" class="btn" @click="cancelThisOrder()">
        Delete order
      </button>
    <div class="button__group">
      <button type="button" class="btn btn--gray" @click="backToCart()">
        Back to cart
      </button>
      <button type="button" class="btn btn--orange" @click="addToOrderList()">
        Payment
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "orderDetail",
  data() {
    return {
      products: [],
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
      orderList: "orderList",
      coupon: "coupon",
    }),
    ...mapMutations("PRODUCT", {
      resetCart: "RESET_CART",
    }),
  },
  filters: {
    abbreviate(text) {
      return text && text.slice(0, 50);
    },
  },
  methods: {
    ...mapActions("ORDER", {
      addToOrderListFromStore: "addToOrderList",
      cancelThisOrderFromStore: "cancelThisOrder",
    }),
    getShipping() {
      return 0;
    },
    getFreeship() {
      return 0;
    },
    getVoucher() {
      return -this.coupon;
    },
    getTotalPayment() {
      return (
        this.totalAmount +
        this.getShipping() +
        this.getFreeship() +
        this.getVoucher()
      );
    },
    // Get Image
    getImage(index) {
      if (
        this.products[index] == null ||
        this.products[index].product.productImages[0] == null
      ) {
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
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`;
      return date;
    },
    // Action add orders to order list
    addToOrderList() {
      this.addToOrderListFromStore({
        orders: this.orders,
        totalAmount: this.totalAmount,
        coupon: this.coupon,
        date: this.currentDate(),
      });
      this.resetCart;
      this.$router.push({
        name: "productCategoryLink",
      });
    },
    // Action cancel this order
    cancelThisOrder() {
      this.cancelThisOrderFromStore();
      this.resetCart;
      this.$router.push({
        name: "productCategoryLink",
      });
    },
    backToCart() {
      this.$router.push({name: "checkoutLink"});
    }
  },
};
</script>

<style lang="scss" scoped>
.order__detail {
  h2 {
    font-weight: 600;
    color: rgb(9, 8, 59);
    text-transform: uppercase;
    margin-bottom: 65px;
    margin-left: 20px;
    @media only screen and (max-width: 900px) {
      margin-bottom: 20px;
    }
  }
  .product__list {
    font-size: 1.4em;
    div {
      width: 100%;
      border-bottom: 1px solid rgb(204, 204, 204);
    }
    .product {
      display: grid;
      grid-template-columns: 80% 20%;
      grid-template-rows: 200px;
      @media only screen and (max-width: 900px) {
        grid-template-rows: 150px;
      }
      div {
        border-bottom: none;
      }
      .product__info {
        display: flex;
        margin-top: 20px;
        margin-bottom: 20px;
        img {
          width: 150px;
          max-height: 100%;
          object-fit: cover;
          margin-left: 20px;
          margin-right: 20px;
        }
        .infor__description {
          width: 100%;
        }
      }
      .product__amount {
        font-weight: 600;
        color: rgb(246, 66, 47);
        text-align: right;
        margin-top: auto;
        margin-bottom: auto;
      }
    }
  }
  .payment {
    margin-bottom: 30px;
    div {
      font-size: 1.6em;
      text-align: center;
      border-bottom: 1px solid rgb(204, 204, 204);
      display: grid;
      grid-template-columns: 80% 20%;
      text-align: right;
      @media only screen and (max-width: 900px) {
        font-size: 1.4em;
      }
      &:not(:last-child) {
        line-height: 40px;
      }
      &:last-child {
        line-height: 55px;
        span {
          font-size: 2em;
          color: rgb(246, 66, 47);
          @media only screen and (max-width: 900px) {
            font-size: 1.6em;
          }
        }
      }
      p {
        margin-bottom: 0;
        padding-right: 20px;
        border-right: 1px solid rgb(204, 204, 204);
      }
    }
  }
  .button__group {
    float: right;
      button {
        font-size: 2em;
        text-transform: uppercase;
        padding: 10px 15px;
        border: none;
        color: rgb(255, 255, 255);
        @media only screen and (max-width: 900px) {
          font-size: 1.6em;
          padding: 6px 8px;
        }
        &:hover {
          opacity: 0.8;
        }
        &.btn--orange {
          background-color: rgb(246, 66, 47);
        }
        &.btn--gray {
          background-color: rgb(80, 77, 77);
          margin-right: 10px;
        }
      }
  }

}
</style>