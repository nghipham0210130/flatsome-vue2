<template>
  <div id="app">
    <app-header></app-header>
    <div class="container">
      <app-sidebar></app-sidebar>
      <app-main></app-main>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './views/pages/Header'
import AppSidebar from './views/pages/AppSidebar.vue'
import Main from './views/pages/Main.vue'

export default {
  name: 'App',
  components: {
    appHeader: Header,
    appSidebar: AppSidebar,
    appMain: Main,
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: "Myriad Pro", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 62.5%;
  font-family: 'Myriad Pro', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  h1 {
    font-size: 4.8em;
    font-weight: 700;
  }
  h2 {
    font-size: 2.4em;
    font-weight: 700;
  }
  h3 {
    font-size: 1.8em;
    font-weight: 700;
  }
  h4 {
    font-size: 1.8em;
    font-weight: 600;
  }
  h5 {
    font-size: 1.6em;
    font-weight: 600;
  }
  p {
    font-size: 1.6em;
    font-weight: 400;
  }

  router-view {
    font-size: 60px;
    color: blue; 
    float: right;
  }
  a {
    font-size: 1.6em;
    cursor: pointer;
  }
  .container {
    margin: 0 auto;
    max-width: 1200px;
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
