<template>
  <div class="edit__bill" v-if="bill!=null" :key="componentKey">
    <h2 class="title">Edit Bill</h2>
    <form id="changeBillForm" @submit.prevent="changeBillForm">
      <div class="info__name"> 
        <label for="nameBill">Name</label>
        <br />
        <input
          type="text"
          id="nameBill"
          name="nameBill"
          v-model="bill.name"
        />
      </div>
      <div class="info__price">
        <label for="priceBill">Price</label>
        <br />
        <input
          type="text"
          id="priceBill"
          name="priceBill"
          v-model="bill.price"
        />
      </div>
      <div class="info__quantities">
        <label for="quantitiesBill">Quantity</label>
        <br />
        <input
          type="text"
          id="quantitiesBill"
          name="quantitiesBill"
          v-model="bill.quantities"
        />
      </div>
      <div class="info__description">
        <label for="descriptionBill">Description</label>
        <br />
        <input
          type="text"
          id="descriptionBill"
          name="descriptionBill"
          v-model="bill.description"
        />
      </div>
      <div class="btn__group">
        <button type="button" class="btn__group__cancel" @click="backToBillList()">
        Previous
      </button>
        <button type="button" class="btn__group__edit" @click.prevent="saveChangeBill()">
        SAVE
      </button>
      </div>  
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "editBill",
  props: ["billId"],
  data() {
    return {
        componentKey: 0,
        name: "",
        price: "",
        quantities: "",
        description: "",
        categories: [],
        image: [],
        bill: null,
    };
  },
  async created() {
    await this.getBill();
    this.bill = this.billFromStore;
  },
  computed: {
      ...mapGetters("ADMIN", {
          billFromStore: "getBill",
      })
  },
  methods: {
      ...mapActions("ADMIN",
      {
          editBillFromStore: "editBill",
          getBillFromStore: "getBill",
      }),
      // Set get bill from store to access bill edit bill chose
      async getBill() {
          await this.getBillFromStore(this.billId);
      },
      // Save change bill
      async saveChangeBill() {
        let formData = new FormData();
        formData.append("name", this.bill.name);
        formData.append("price", this.bill.price);
        formData.append("quantities", this.bill.quantities);
        formData.append("description", this.bill.description);
        formData.append("categories", this.bill.categories);
        formData.append("image", this.bill.image);
        console.log(formData, this.bill);
        
        await this.editBillFromStore({billId: this.billId, payload: formData});
        this.componentKey++;
      },

      // Cancel edit and back to bill list
      backToBillList() {
        this.$router.push({ name: "manageBill" });
      },

  },
   // Set guard on the component options object:
  beforeRouteLeave(to, from, next) {
    next();
  },
  /* Called when this component is reused.
  Here we have a chance to update the component since mounted()
  and other life-cycle hooks won't be called when a component is reused.
  */
  async beforeRouteUpdate(to, from, next) {
    // Set bill null to create new bill (avoid new bill push to current bill)
    this.bill = null;
      await this.getBillFromStore(this.billId);
      this.bill = this.billFromStore;
    next();
  },
};
</script>

<style lang="scss" scoped>
.edit__bill {   
  padding-top: 120px;
  padding-right: 15px;
  margin-left: 30px;
  width: 100%;
  @media only screen and (max-width: 900px) {
    padding-top: 0;
    margin-left: 0;
  }
  h2 {
    font-size: 2em;
    font-weight: 600;
    color: rgb(125, 125, 125);
    margin-bottom: 30px;
  }
  div {
    margin-bottom: 20px;
    label {
      font-size: 1.4em;
      font-weight: 600;
      margin-bottom: 8px;
    }
    input {
      width: calc(100% - 24px);
      padding: 10px;
      font-size: 1.4em;
    }
    &.info__note {
      color: rgb(125, 125, 125);
      font-size: 1.4em;
    }
  }
  .btn__group {
    text-align: center;
    button {
      color: rgb(255, 255, 255);
      font-size: 1.6em;
      font-weight: 500;
      margin-bottom: 30px;
      padding: 10px 15px;
      border: none;
    }
    .btn__group__cancel {
      background-color: rgb(73, 70, 70);
       margin-right: 20px;
      
    }
    .btn__group__edit {
      background-color: rgb(41, 140, 178);
    }
  }
}
</style>