<template>
<div class="home">
    <app-header></app-header>
    
    <div class="container">
      <app-sidebar></app-sidebar>
      <app-main></app-main>
    </div>
    
</div>
</template>

<script>
import Header from './Header'
import AppSidebar from './AppSidebar'
import Main from './Main'

export default {
  components: {
    appHeader: Header,
    appSidebar: AppSidebar,
    appMain: Main,
  }
}
</script>

<style lang="scss" scoped>
</style>