import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/pages/Home.vue';
import Login from '../views/components/authentication/Login.vue';
import Register from '../views/components/authentication/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('../views/components/authentication/Profile.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('../views/pages/BoardUser.vue')
    }
  ]
});