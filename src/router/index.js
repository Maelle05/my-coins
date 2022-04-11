import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import store from "../store/index"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/registration/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/registration/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import('../views/Profil.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/profil/update',
    name: 'Profil Update',
    component: () => import('../views/update/UpdateProfil.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/profil/update/sign-in-info',
    name: 'Profil Update Mdp Mail',
    component: () => import('../views/update/UpdateMailMdp.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/Categories.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/categories/create',
    name: 'Create Categorie',
    component: () => import('../views/create/CreateCat.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/categories/update/:id',
    name: 'Update Categorie',
    component: () => import('../views/update/UpdateCat.vue'),
    meta: {
      authRequired: true,
    },
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (firebase.auth().currentUser) {
      next();
    } else {
      next({
        path: '/',
      });
    }
  } else {
    next();
  }
  const url = to.path
  store.dispatch("updateUrl", url);
});

export default router
