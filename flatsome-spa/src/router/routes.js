import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

// Pages for User
import ProductList from "../views/pages/ProductList";
import ProductCategory from "../views/pages/ProductCategory";
import ProductDetail from "../views/pages/ProductDetail";
import Profile from "../views/pages/Profile";
import Checkout from "../views/pages/Checkout";
import OrderDetail from "../views/pages/OrderDetail";
import OrderList from "../views/pages/OrderList";
import Home from "../views/pages/Home";
import Shop from "../views/pages/Shop";

// Pages for Admin 
import LoginAdmin from "../views/pages/LoginAdmin";
import Dashboard from "../views/pages/Dashboard";

import ManageProduct from "../views/components/admin/ManageProduct/ManageProduct";
import EditProduct from "../views/components/admin/ManageProduct/EditProduct";

import ManageBill from "../views/components/admin/ManageBill/ManageBill";
import EditBill from "../views/components/admin/ManageBill/EditBill";

import ManageUser from "../views/components/admin/ManageUser/ManageUser";
import EditUser from "../views/components/admin/ManageUser/EditUser";

import ManageAdmin from "../views/components/admin/ManageAdmin/ManageAdmin";
import EditAdmin from "../views/components/admin/ManageAdmin/EditAdmin";

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
      component: Home,
    },
    {
      path: "/Shop",
      component: Shop,
      children: [
        {
          path: "/Shop",
          name: "productCategoryLink",
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

    // Default page to redirect
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
        requiresAuth: true,
      },
      children: [
        {
          path: "Product",
          name: "manageProduct",
          component: ManageProduct,
        },
        {
          path: "EditProduct/:productId",
          name: "editProduct",
          component: EditProduct,
          props: true,
          // Set  guard on the route definition object
          beforeEnter: (to, from, next) => {
            next();
          },
        },
        {
          path: "User",
          name: "manageUser",
          component: ManageUser,
        },
        {
          path: "EditUser/:userId",
          name: "editUser",
          component: EditUser,
          props: true,
          // Set  guard on the route definition object
          beforeEnter: (to, from, next) => {
            next();
          },
        },
        {
          path: "Bill",
          name: "manageBill",
          component: ManageBill,
        },
        {
          path: "BillProduct/:billId",
          name: "editBill",
          component: EditBill,
          props: true,
          // Set  guard on the route definition object
          beforeEnter: (to, from, next) => {
            next();
          },
        },
        {
          path: "Admin",
          name: "manageAdmin",
          component: ManageAdmin,
        },
        {
          path: "AdminProduct/:adminId",
          name: "editAdmin",
          component: EditAdmin,
          props: true,
          // Set  guard on the route definition object
          beforeEnter: (to, from, next) => {
            next();
          },
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
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["ADMIN/authenticated"]) {
      next();
      return;
    }
    next("/Admin/Login");
  } else {
    next();
  }
});

// // Global beforeResolve
// router.beforeResolve((to, from, next) => {
//   console.log("Global -- beforeResolve - fired. ");
//   next();
// });

// //Global AFTER hooks:
// router.afterEach((to, from) => {
//   // This fires after each route is entered
//   console.log(
//     `Global -- afterEach - Just moved from  '${from.path}' to '${to.path}'  `
//   );
// });

// // Register an Error Handler:
// router.onError((err) => {
//   console.error("Handling this error", err.message);
// });
