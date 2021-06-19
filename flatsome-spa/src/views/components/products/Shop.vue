<template>
  <app-main>
    <div class="shop__header">
      <div class="header__nav">
        <router-link :to="{ name: 'homeLink' }" :class="{active: $router.path == '/Home'}">Home</router-link>
        /
        <router-link :to="{ name: 'shopLink' }" :class="{active: $router.path == '/Shop'}"
          >Shop</router-link
        >
        <slot name="header__nav"></slot>
      </div>
      <form>
        <slot name="header__form"></slot>
      </form>
    </div>
    <sidebar></sidebar>
    <transition>
      <keep-alive>
        <router-view ></router-view>
      </keep-alive>
    </transition>
  </app-main>
</template>

<script>
import Sidebar from "./Sidebar";
import Main from "../../pages/Main";

export default {
  components: {
    sidebar: Sidebar,
    appMain: Main,
  },
  data() {
    return {
      isActive: true,
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.shop__header {
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  .header__nav {
    font-size: 2em;
    font-weight: bold;
    text-transform: uppercase;
    color: rgba(119, 119, 119, 0.5);
    a {
      color: rgba(119, 119, 119, 0.5);
      &.active {
        color: rgb(34, 34, 34);
      }
    }
  }
}
</style>