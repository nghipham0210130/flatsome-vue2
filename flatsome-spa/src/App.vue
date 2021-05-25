<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
import Home from './views/pages/Home'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style lang="scss">

#app {
  font-family: "Myriad Pro", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

  h2 {
    font-size: 2.4em;
    font-weight: 700;
  }

  h3 {
    font-size: 1.8em;
    font-weight: 700;
  }

  a {
    &:hover {
      cursor: pointer;
    }
  }
  .container {
    margin: 0 auto;
    max-width: 1200px;
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
