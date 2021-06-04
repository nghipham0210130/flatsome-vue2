<template>
  <section class="app__sidebar">
    <nav class="sidebar__nav">
      <ul>
        <!-- Filter by category -->
        <li class="nav__title"><h3>Browser</h3></li>
        <li
          class="nav__category"
          v-for="item in categoies"
          :key="item.id"
          :class="{ active: item.id == selected }"
          @click="selected = item.id"
        >
          <router-link
            :to="{
              name: 'productListByCategory',
              params: { category: item.name },
            }"
            >{{ item.name }}</router-link
          >
          <!-- Show component category-child when have category child -->
          <div v-show="item.subCategory.length !== 0">
            <category-child :subCategory="item.subCategory"></category-child>
            <!-- <category-child
              :subCategory="item.subCategory"
              :selected="selected"
              :isShow="isShow"
            ></category-child> -->
          </div>
        </li>
        <br />
        <!-- Filter by color -->
        <li class="nav__title"><h3>Filter by color</h3></li>
        <!-- <li class="nav__category" v-for="item in colors" :key="item.id">
          <a>{{ item.name }}<span>({{amountProductByColorID(item.id)}})</span></a>
        </li> -->
        <!-- Filter by price -->
      </ul>
    </nav>
  </section>
</template>

<script>
import CategoryChild from "./CategoryChild.vue";
import { RepositoryFactory } from "../../../repositories/RepositoryFactory";
const ProductsRepository = RepositoryFactory.get("products");

export default {
  name: "Sidebar",
  components: {
    CategoryChild,
  },
  data() {
    return {
      isLoading: false,
      categoies: null,
      hasSubCategory: false,
      selected: undefined,
      // isShow: false,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    // fetch data
    async fetch() {
      this.isLoading = true;
      const { data } = await ProductsRepository.getSidebar();
      this.isLoading = false;
      this.categoies = data.data;
    },
    // showSubCategory() {
    //   this.isShow = !this.isShow;
    //   console.log(this.isShow);
    // }
    // // analysis amount product follow input idColor
    // amountProductByColorID(idColor) {
    //   let amountProduct = 0;
    //   this.products.find(x => {
    //     if (x.idColor === idColor) {
    //       amountProduct = amountProduct + x.amountAvailable;
    //     }
    //   });
    //   return amountProduct;
    // },
  },
};
</script>

<style lang="scss" scoped>
.app__sidebar {
  display: block;
  float: left;
  margin-right: 30px;
  .sidebar__nav {
    ul {
      padding: 0;
      li {
        display: flex;
        flex-direction: column;
        text-align: left;
        line-height: 40px;
        // Style nav titile
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
        // Style category
        &.nav__category {
          text-transform: capitalize;
          position: relative;
          width: 240px;
          border-bottom: 1px solid rgba(119, 119, 119, 0.5);
          &.active {
            a {
              color: #000;
            }
          }
          a {
            font-size: 2em;
            line-height: 36px;
            color: rgb(41, 58, 80);
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
