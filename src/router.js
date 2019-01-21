import Vue from 'vue'
import Router from 'vue-router'
import register from './views/register.vue'
import { resolve } from 'q';

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/login.vue')
    },
     {
      path: '/qureyUser',
      name: "qureyUser",
      component: () => import('./views/qureyUser')

    },
     {
      path: '/home',
      name: "home",
      component: resolve=>require(['./views/home'],resolve)

    },
     {
      path: '/layout',
      name: "layout",
      component: resolve=>require(['./views/layout'],resolve)

    },
     {
      path: '*',
      name: "404",
      component: resolve=>require(['./views/404'],resolve)

    }
  ]
})