import Vue from "vue";
import VueRouter from "vue-router";
import ProductList from "../views/components/products/ProductList";
import ProductCategory from "../views/components/products/ProductCategory";
import ProductDetail from "../views/components/products/ProductDetail";
import Profile from "../views/components/authentication/Profile";
import Checkout from "../views/components/order/Checkout";
import Shop from "../views/components/products/Shop";

Vue.use(VueRouter);

/*================================================
            Per-route Guards
================================================*/

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "homeLink",
      component: Shop,
      children: [
        {
          path: "/Shop",
          name: "shopLink",
          component: ProductCategory,
        },
        {
          // Go to Product List
          path: "Category/:categoryId",
          name: "productList",
          component: ProductList,
          props: true,
          // Set  guard on the route definition object
          beforeEnter: (to, from, next) => {
            console.log("Entering Product Category", to.params.categoryId)
            next()
          }
        },
        
      ],
    },
    {
      path: "/error",
      name: "error",
      component: Error
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

/*================================================
            Global Guards
================================================*/

// Global BEFORE hooks
router.beforeEach((to, from, next) => {

  // re-route
  if (to.path === "/foo") {
    next("/")
  }
  else if (to.path === "/error") {
    const err = new Error("My Error Message")
    next(err)
  }
  else {
    next()
  }
})

// Global beforeResolve
router.beforeResolve((to, from, next) => {
  console.log("Global -- beforeResolve - fired. ")
  next()
})

//Global AFTER hooks:
router.afterEach((to, from) => {
  // This fires after each route is entered
  console.log(  `Global -- afterEach - Just moved from  '${from.path}' to '${to.path}'  `)
})

// Register an Error Handler:
router.onError(err => {
  console.error("Handling this error", err.message)
})

