<template>
  <div class="manage__bill">
    <div class="manage__bill__nav">
      <button type="button" class="nav__manage" @click="changeShow(0)">
        Manage Bill
      </button>
      <button type="button" class="nav__add" @click="changeShow(1)">
        Add Bill
      </button>
    </div>
    <router-view></router-view>
    <bill-list v-show="showList" :key="componentKey"></bill-list>
    <add-bill v-show="showAdd"></add-bill>
  </div>
</template>

<script>
import BillList from "./BillList";
import AddBill from "./AddBill";

export default {
  name: "manageBill",
  components: {
    billList: BillList,
    addBill: AddBill,
  },
  data() {
    return {
      componentKey: 0,
      showList: false,
      showAdd: false,
    };
  },
  created() {
    this.showList = true;
  },
  methods: {
    changeShow(index) {
      if (index == 0) {
        this.showList = true;
        this.showAdd = false;
      } else {
        this.showList = false;
        this.showAdd = true;
      }
      this.componentKey++;
    },
  },
};
</script>
<style lang="scss" scoped>
.manage__bill {
  margin-left: 60px;
  @media only screen and (max-width: 900px) {
    margin-left: 0;
  }
  .manage__bill__nav {
    padding-top: 20px;
    margin-bottom: 60px;
    @media only screen and (max-width: 900px) {
      padding-top: 0;
    }
    button {
      font-size: 2em;
      background-color: rgb(105, 108, 112);
      color: rgb(251, 251, 251);
      padding: 10px 15px;
      &:not(:last-child) {
        margin-right: 30px;
      }
      &:hover {
        cursor: pointer;
      }
      @media only screen and (max-width: 900px) {
        font-size: 1.6em;
      }
    }
  }
}
</style>