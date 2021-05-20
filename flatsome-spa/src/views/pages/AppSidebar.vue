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
          <category-child :rootCategory="item.idRootCategory"></category-child>
        </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { rootCategories } from "../../data/Product";
import CategoryChild from '../components/CategoryChild.vue';

export default {
  name: "AppSidebar",
  components: {
      CategoryChild
  },
  data() {
    return {
      rootCategories,
    };
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
          position: relative;
          width: 240px;
          border-bottom: 1px solid rgba(119, 119, 119, 0.5);
          a {
            line-height: 36px;
            color: rgb(52, 73, 99);
          }
        }
      }
    }
  }
}
</style>
