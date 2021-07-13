<template>
  <div class="manage__bill__list" :key="componentKey">
    <h4>Bill List</h4>
    <div class="card__header">
      <p>ID</p>
      <p>Name</p>
      <p>Price</p>
      <p>Quantity</p>
      <p>Description</p>
      <p>Action</p>
    </div>
    <div
      class="card__body"
      v-for="(bill, index) in pageOfItems "
      :key="index"
    >
      <p class="bill__index">{{ bill.id }}</p>
      <p class="bill__name">{{ bill.name }}</p>
      <p class="bill__price">{{ bill.price }}</p>
      <p class="bill__quantities">{{ bill.quantities }}</p>
      <p class="bill__description">{{ bill.description | abbreviate }}</p>
      <div class="bill__actions">
        <router-link
          :to="{ name: 'editBill', params: { billId: bill.id } }"
          class="actions__edit"
          >Edit</router-link
        >
        <a href="#" class="actions__delete" @click="deleteBill(bill.id)"
          >Delete</a
        >
      </div>
    </div>
    <div class="cart__footer">
      <jw-pagination :items="bills" @changePage="onChangePage" :styles="customStyles" :labels="customLabels"></jw-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";


const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
};

const customStyles = {
    ul: {
        justifyContent: 'center'
    },
    li: {
        display: 'inline-block',
        border: '2px solid rgb(68, 96, 132)'
    },
    a: {
        color: 'rgb(68, 96, 132)'
    },
};

export default {
  data() {
    return {
      componentKey: 0,
      numberBillPerPage: 68,
      bills: [],
      pageOfItems : [],
      customStyles,
      customLabels,
    };
  },
  async created() {
    await this.getBills();
    this.bills = this.billsFromStore;
  },
  computed: {
    ...mapState("ADMIN", {
      billsFromStore: "bills",
    }),
  },
  mouted() {
    // console.log(this.billsFromStore.length);
  },
  filters: {
    abbreviate(text) {
      return text && text.slice(0, 50);
    },
  },
  methods: {

    ...mapActions("ADMIN", {
      getBillsFromStore: "getBills",
      deleteBillFromStore: "deleteBill",
    }),

    // Get bills
    async getBills() {
      await this.getBillsFromStore(this.billsFromStore.length);
    },

    // Delete Bill by Id
    async deleteBill(id) {
      await this.deleteBillFromStore(id);
      location.reload();
      this.componentKey++;
    },

    // Change page
    onChangePage(pageOfBills) {
      /// update page of items
      this.pageOfItems  = pageOfBills;
    }
  },
  async beforeRouteUpdate(to, from, next) {
    // Set bills null to create new bills (avoid new bills push to current bills)
    this.bills = null;
    next();
  },
};
</script>

<style lang="scss" scoped>
.manage__bill__list {
  font-size: 1.4em;
  h4 {
    font-size: 1.8em;
    font-weight: 600;
  }
  .card__header {
    display: grid;
    grid-template-columns: 5% 20% 10% 10% 30% 25%;
    font-weight: 600;
    column-gap: 5px;
    text-align: center;
    background-color: rgb(68, 96, 132);
    border: 1px solid rgb(0, 0, 0);
  }
  .card__body {
    display: grid;
    grid-template-columns: 5% 20% 10% 10% 30% 20%;
    column-gap: 1%;
    border: 1px solid rgb(0, 0, 0);
    .bill__index,
    .bill__price,
    .bill__quantities,
    .bill__actions {
      text-align: center;
    }
    .bill__actions {
      font-weight: 600;
      margin: auto auto;
      @media only screen and (max-width: 900px) {
        display: flex;
        flex-direction: column;
      }
      .actions__edit {
        color: rgb(23, 92, 23);
        margin-right: 2em;
        @media only screen and (max-width: 900px) {
          margin-right: 0;
          margin-bottom: 1em;
        }
      }
      .actions__delete {
        color: rgb(196, 19, 19);
        @media only screen and (max-width: 900px) {
          margin-bottom: 0;
        }
      }
    }
    &:nth-of-type(2n) {
      background-color: rgb(211, 206, 206);
    }
    :last-child {
      margin-bottom: 30px;;
    }
  }
  .cart__footer {
    margin-top: 30px;
    text-align: center;
    @media only screen and (max-width: 900px) {
      bottom: 0;
    }
  }
}
</style>