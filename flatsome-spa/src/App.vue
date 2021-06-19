<template>
  <div id="app">
    <app-layout>
    </app-layout>
  </div>
</template>

<script>
import Layout from './views/pages/Layout'


export default {
  name: 'App',
  components: {
    appLayout: Layout,
  }
}
</script>

<style lang="scss">

#app {
  font-family: "Myriad Pro", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(0,0,0);
  font-size: 62.5%;
  font-family: 'Myriad Pro', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  body {
    margin: 0;
  }
  h1 {
    font-size: 4.8em;
    font-weight: 700;
  }

  h3 {
    font-size: 1.8em;
    font-weight: 700;
  }

  a {
    text-decoration: none;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
