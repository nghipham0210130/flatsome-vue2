<template>
  <div class="order-list">
    <h2 class="order-list__title">Order List</h2>
    <div class="order-list__item title">
      <p>ID</p>
      <p>Date Delivery</p>
      <p>Description</p>
      <p>Price</p>
      <p>Delivery status</p>
    </div>
    <div class="order-list__item" v-for="(data, index) in oderList" :key="index">
      <p class="item__id">{{index + 1}}</p>
      <p class="item__date-delivery-expected">{{data.date}}</p>
      <p class="item__description">
        {{data.orders[0].product.description}}
      </p>
      <p class="item__price">${{data.totalAmount}},00</p>
      <p class="item__delivery-status">Successful delivery</p>
    </div>
  </div>
</template>

<script>
import { mapState} from "vuex";
export default {
  name: "OrderList",
  data() {
    return{
        oderList: [],
    };
  },
  created() {
      this.oderList = this.orderListFromStore.filter(data => {
          if(data.orders[0] != null) {
              if(data.orders[0].userId === this.userFromStore.id) {
                  return data;
              }
          }
      });
  },
  mounted() {
      console.log(this.oderList);
      console.log(this.userFromStore.id);
  },
  computed: {
    ...mapState("AUTH", {
      userFromStore: "user",
    }),
    ...mapState("ORDER", {
      orderListFromStore: "orderList",
    }),
  },
};
</script>
<style lang="scss" scoped>
.order-list {
  display: flex;
  flex-wrap: wrap;
  font-size: 1.4em;
  h2 {
    color: rgb(16, 46, 143);
    margin-bottom: 36px;
    font-weight: 600;
  }
  .order-list__item {
    border: 1px solid rgb(131, 131, 131);
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    height: 82px;
    display: grid;
    grid-template-columns: 10% 10% 52% 10% 10%;
    column-gap: 2%;
    &.title {
      font-weight: bold;
      color: rgb(0, 117, 232);
    }
    p {
      margin: auto 0;
    }
    .item__id {
      color: rgb(0, 117, 232);
    }
  }
  .order-list__item:not(:last-child) {
    border-bottom: none;
  }
}
</style>