<template>
  <section class="app__sidebar">
    <nav class="sidebar__nav">
      <ul>
        <!-- Filter by category -->
        <li class="nav__title"><h3>Browser</h3></li>
        <li
          class="nav__category"
          v-for="category in categories"
          :key="category.id"
          :class="{ active: category.id == selected }"
          @click.capture="selected = category.id; showSubCategory();"
        >
          <router-link
            :to="{
              name: 'productList',
              params: { categoryId: category.id },
            }"
            replace
            :categoryId="category.id"
            :key="category.id"
            >{{ category.name }}
          <!-- Show component category-child when have category child -->
          <div v-show="category.subCategory.length !== 0">
            <category-child
              :isShow="isShow"
              :selected="category.id"
              :subCategory="category.subCategory"
            ></category-child>
          </div></router-link>
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
import { mapState, mapActions } from "vuex";

import CategoryChild from "../components/CategoryChild.vue";

export default {
  name: "Sidebar",
  components: {
    CategoryChild,
  },
  data() {
    return {
      hasSubCategory: false,
      selected: undefined,
      isShow: false,
      checkSelected: null,
    };
  },
  async created() {
    await this.getSidebar;
  },
  computed: {
    ...mapState("PRODUCT", {
      // Get status open of modal login from store
      categories: "categories",
      productCategoryId: "productCategoryId",
    }),
    ...mapActions("PRODUCT", {
      getSidebar: "getSidebar",
    })
  },
  methods: {
    showSubCategory() {
      this.isShow = true;
    },
    changeShow() {
      this.isShow = false;
    },
    // // analysis amount product follow input idColor
    // amountProductByColorID(idColor) {
    //   let amountProduct = 0;
    //   this.products.find(x => {`
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
  @media only screen and (max-width: 900px) {
    display: none;
  }
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
