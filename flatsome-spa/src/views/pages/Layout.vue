<template>
  <div class="layout">
    <!-- Header -->
    <app-header></app-header>
    <!-- Main -->
    <app-main class="container main">
      <!-- Show section follow link -->
      <router-view></router-view>
    </app-main>
    <!-- Footer -->
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

export default {
  components: {
    appHeader: Header,
    appMain: Main,
    appFooter: Footer,
  },
};
</script>

<style lang="scss" scoped>
.layout {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.container {
  margin: 0 auto;
  max-width: 1200px;
  padding-left: 15px;
  padding-right: 15px;
}

.main {
  padding-top: 116px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 50px;
  min-height: calc(100vh - 210px);
}
</style>