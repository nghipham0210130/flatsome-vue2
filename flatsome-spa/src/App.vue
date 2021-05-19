<template>
  <div id="app">
    <appHeader></appHeader>
    <app-sidebar></app-sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './views/pages/Header'
import AppSidebar from './views/pages/AppSidebar.vue'

export default {
  name: 'App',
  components: {
    appHeader: Header,
    appSidebar: AppSidebar
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  background-color: rgb(13,13,13);
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
}
</style>
