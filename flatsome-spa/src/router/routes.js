import Vue from 'vue';
import VueRouter from 'vue-router';
import ProductList from '../views/components/products/ProductList';
import ProductCategory from '../views/components/products/ProductCategory';
import ProductDetail from '../views/components/products/ProductDetail';
import Checkout from '../views/components/order/Checkout';
import Profile from '../views/components/authentication/Profile';

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
      path: '/Home',
      name: 'homeLink',
      // Change component if have Home page
      component: ProductCategory,
      children: [
      {
        path: 'Shop',
        name: 'shopLink',
        component: ProductCategory,
        children: [
          {
            // Go to product list by category
            path: ':category',
            name: 'productListByCategory',
            props: true,
            component: ProductList,
            children: [
              {
                // Go to product list by sub category
                path: ':subCategory',
                name: 'productListBySubCategory',
                component: ProductList,
                children: [
                  {
                    // Go to product detail follow sub category
                    path: ':productId',
                    name: 'productDetailInSubCategory',
                    props: true,
                    component: ProductDetail,
                  }
                ]
              },
              {
                // Go to product detail follow category
                path: ':productId',
                name: 'productDetail',
                props: true,
                component: ProductDetail,
              }
            ]
          },
        ]
      }
    ]
    },
    // Go to checkout or profile section when logged in
    {
      path: '/:userCurrently/:id',
      name: 'userCurrently',
      children: [
        {
          // Go to checkout 
          path: 'checkout',
          name: 'checkoutLink',
          component: Checkout
        },
        {
          // Go to profile user currently
          path: 'profile',
          name: 'profileLink',
          component: Profile
        }
      ]
    }
  ]
});