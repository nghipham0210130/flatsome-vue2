<template>
<div class="home">
    <app-header></app-header>
    
    <div class="container">
      <!-- <app-sidebar></app-sidebar>
      <app-main></app-main> -->
      <!-- <product-detail></product-detail> -->
      <!-- <order-list></order-list> -->
      <order-detail></order-detail>
    </div>
    
</div>
</template>

<script>
import Header from './Header'
// import AppSidebar from './AppSidebar'
// import Main from './Main'
// import ProductDetail from '../components/products/ProductDetail'
// import OrderList from '../components/order/OrderList';
import OrderDetail from '../components/order/OrderDetail';

export default {
  components: {
    appHeader: Header,
    // appSidebar: AppSidebar,
    // appMain: Main,
    // productDetail: ProductDetail,
    // orderList: OrderList,
    orderDetail: OrderDetail,
  }
}
</script>

<style lang="scss" scoped>
</style>