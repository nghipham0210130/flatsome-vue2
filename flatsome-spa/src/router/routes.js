import Vue from "vue";
import VueRouter from "vue-router";

import { Role } from "../_helpers/role";

import ProductList from "../views/components/products/ProductList";
import ProductCategory from "../views/components/products/ProductCategory";
import ProductDetail from "../views/components/products/ProductDetail";
import Profile from "../views/components/authentication/Profile";
import Checkout from "../views/components/order/Checkout";
import OrderDetail from "../views/components/order/OrderDetail";
import OrderList from "../views/components/order/OrderList";
import Shop from "../views/components/products/Shop";

// Router for admin
import LoginAdmin from "../views/components/admin/LoginAdmin";
import Dashboard from "../views/components/admin/Dashboard";
import ManageProduct from "../views/components/admin/ManageProduct/ManageProduct";
import EditProduct from "../views/components/admin/ManageProduct/EditProduct";
import ManageBill from "../views/components/admin/ManageBill";
import ManageUser from "../views/components/admin/ManageUser";
import ManageAdmin from "../views/components/admin/ManageAdmin";

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
            console.log("Entering Product Category", to.params.categoryId);
            next();
          },
        },
      ],
    },
    {
      path: "/error",
      name: "error",
      component: Error,
    },

    // Go to Product Detail
    {
      path: "/Product/:productId",
      name: "productDetail",
      component: ProductDetail,
    },

    // Go to profile user currently
    {
      path: "/Profile",
      name: "profileLink",
      component: Profile,
    },
    // Go to checkout
    {
      path: "/Checkout",
      name: "checkoutLink",
      component: Checkout,
      meta: { requiresAuth: true },
    },
    // Go to Order Detail
    {
      path: "/OrderDetail",
      name: "orderDetailLink",
      component: OrderDetail,
      props: true,
    },
    // Go to Order List
    {
      path: "/OrderList",
      name: "orderListLink",
      component: OrderList,
    },
    // nếu không sẽ chuyển đến trang shop
    { path: "*", redirect: "/Shop" },
    // Go to admin login
    {
      path: "/Admin/Login",
      name: "loginAdminLink",
      component: LoginAdmin,
    },
    {
      path: "/Admin/Dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        authorize: [Role.Admin],
      },
      children: [
        {
          path: "Product",
          name: "manageProduct",
          component: ManageProduct,
          children: [
            {
              path: "Edit/:productId",
              name: "editProduct",
              component: EditProduct,
              props: true,
              // Set  guard on the route definition object
              beforeEnter: (to, from, next) => {
                next();
              },
            },
          ],
        },
        {
          path: "User",
          name: "manageUser",
          component: ManageUser,
        },
        {
          path: "Bill",
          name: "manageBill",
          component: ManageBill,
        },
        {
          path: "Admin",
          name: "manageAdmin",
          component: ManageAdmin,
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
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const currentUser = localStorage.getItem("admin_token");

  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({ path: "/Admin/Login", query: { returnUrl: to.path } });
    }
  }
  next();
});

// Global beforeResolve
router.beforeResolve((to, from, next) => {
  console.log("Global -- beforeResolve - fired. ");
  next();
});

//Global AFTER hooks:
router.afterEach((to, from) => {
  // This fires after each route is entered
  console.log(
    `Global -- afterEach - Just moved from  '${from.path}' to '${to.path}'  `
  );
});

// Register an Error Handler:
router.onError((err) => {
  console.error("Handling this error", err.message);
});
