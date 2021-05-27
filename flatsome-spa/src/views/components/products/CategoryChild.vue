<template>
  <div class="category__child">
    <!-- Show arrow icon when root category have child category -->
    <div v-if="!isShowCategoryChild" class="category__child--hidden">
      <span @click="showCategoryChild()" class="arrow down"></span>
    </div>
    <!-- Show category child when click arrow icon of root category -->
    <div v-if="isShowCategoryChild" class="category__child--show">
      <span @click="showCategoryChild()" class="arrow up"></span>
      <ul>
        <!-- Show list category child of root category -->
        <div v-for="item in categories" :key="item.idCategory">
          <li v-if="item.rootCategory === rootCategory">
            <a><router-link to="/home/shop/product-list">{{ item.idCategory }}</router-link></a>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { categories } from "../../../models/Product";

export default {
  props: ["rootCategory"],
  data() {
    return {
      isShowCategoryChild: false,
      categories,
    };
  },
  methods: {
    // Change status show category child when click arrow icon
    showCategoryChild: function() {
      this.isShowCategoryChild = !this.isShowCategoryChild;
    },
  },
};
</script>

<style lang="scss" scoped>
// style arrow icon
span {
  position: absolute;
  right: 3px;
  top: 15px;
  &.arrow {
    width: 2px;
    height: 2px;
    border: solid rgb(184, 184, 184);
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 2px;
    &:hover {
      cursor: pointer;
    }
    &.up {
      transform: rotate(-135deg);
      -webkit-transform: rotate(-135deg);
    }
    &.down {
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
    }
  }
}
// Style category child
ul {
  padding: 0;
  padding-bottom: 10px;
  li {
    list-style: none;
    padding-left: 20px;
    line-height: 29px;
    height: 29px;
    position: relative;
    &::before {
      content: "";
      height: 29px;
      border: 1px solid rgba(221, 221, 221);
      position: absolute;
      top: 0;
      left: 4px;
    }
    a {
      font-size: 1.4em;
      color: rgb(52, 73, 99);
      &:hover {
        font-weight: 700px;
        color: #000;
      }
    }
  }
}
</style>
