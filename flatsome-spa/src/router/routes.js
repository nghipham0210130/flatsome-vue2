import Vue from "vue";
import VueRouter from "vue-router";
import ProductList from "../views/components/products/ProductList";
import ProductCategory from "../views/components/products/ProductCategory";
import ProductDetail from "../views/components/products/ProductDetail";
import Profile from "../views/components/authentication/Profile";
import Checkout from "../views/components/order/Checkout";
import Shop from "../views/components/products/Shop";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "homeLink",
      component: Shop,
      children: [
        {
          path: "Shop",
          name: "shopLink",
          component: ProductCategory,
        },
        {
          // Go to Product List
          path: "Category/:categoryId",
          name: "productList",
          component: ProductList,
        },
        
      ],
    },
    // Go to Product Detail
    {
      path: "/Product/:productId",
      name: "productDetail",
      component: ProductDetail,
    },
    // Go to checkout or profile section when logged in
    {
      path: "/:userCurrently/:id",
      name: "userCurrently",
      children: [
        {
          // Go to checkout
          path: "checkout",
          name: "checkoutLink",
          component: Checkout,
        },
        {
          // Go to profile user currently
          path: "profile",
          name: "profileLink",
          component: Profile,
        },
      ],
    },
  ],
});
