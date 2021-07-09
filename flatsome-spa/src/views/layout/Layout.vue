<template>
  <div class="layout">
    <!-- Header -->
    <app-header></app-header>
    <!-- Main -->
    <main class="container main">
      <!-- Show section follow link -->
      <router-view></router-view>
    </main>
    <!-- Footer -->
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";

export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
  },
};
</script>

<style lang="scss" scoped>
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