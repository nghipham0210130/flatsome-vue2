<template>
  <div class="app__sidebar">
    <nav class="sidebar__nav">
      <ul>
        <li class="nav__title"><h3>Browser</h3></li>
        <li
          class="nav__category"
          v-for="item in rootCategories"
          :key="item.idRootCategory"
        >
          <a>{{ item.idRootCategory }}</a>

          <div v-show="item.hasChild">
            <category-child
              :rootCategory="item.idRootCategory"
            ></category-child>
          </div>
        </li>
        <li class="nav__title"><h3>Filter by color</h3></li>
        <li class="nav__category" v-for="item in colors" :key="item.id">
          <a>{{ item.name }}<span>({{analyticsAmountFollowColorID(item.id)}})</span></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { rootCategories, colors, products } from "../../data/Product";
import CategoryChild from "../components/CategoryChild.vue";

export default {
  name: "AppSidebar",
  components: {
    CategoryChild,
  },
  data() {
    return {
      rootCategories,
      colors,
      products,
    };
  },
  methods: {
    analyticsAmountFollowColorID(idColor) {
      let amountProduct = 0;
      this.products.find(x => {
        if (x.idColor === idColor) {
          amountProduct = amountProduct + x.amountAvailable;
        }
      });
      return amountProduct;
    },
  },
};
</script>

<style lang="scss" scoped>
.app__sidebar {
  display: block;
  float: left;
  .sidebar__nav {
    ul {
      padding-top: 185px;
      li {
        display: flex;
        flex-direction: column;
        text-align: left;
        &.nav__title {
          text-transform: uppercase;
          h3 {
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
        &.nav__category {
          text-transform: capitalize;
          position: relative;
          width: 240px;
          border-bottom: 1px solid rgba(119, 119, 119, 0.5);
          a {
            line-height: 36px;
            color: rgb(52, 73, 99);
            position: relative;
            span {
              color: rgba(119, 119, 119, 0.5);
              font-size: 0.9em;
              position: absolute;
              right: 0;
              top: -2px;
            }
          }
        }
        a {
          &:hover {
            font-weight: 700px;
            color: #000;
          }
        }
      }
    }
  }
}
</style>
