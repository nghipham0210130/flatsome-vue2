import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/pages/Home';
import ProductList from '../views/components/products/ProductList'
import ProductCategory from '../views/components/products/ProductCategory'

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'default',
      component: ProductCategory
    },
    {
      path: '/home',
      name: 'homeLink',
      component: ProductCategory
    },
    {
      path: '/home/shop',
      name: 'shopLink',
      component: ProductCategory
    },
    {
      path: '/home/shop/product-list',
      name: 'productListLink',
      component: ProductList,
    },
    // {
    //   path: '/profile',
    //   name: 'profile',
    //   // lazy-loaded
    //   component: () => import('../views/components/authentication/Profile.vue')
    // },
    // {
    //   path: '/user',
    //   name: 'user',
    //   // lazy-loaded
    //   component: () => import('../views/pages/BoardUser.vue')
    // },
  ]
});