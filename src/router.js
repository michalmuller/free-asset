import Vue from 'vue';
import Router from 'vue-router';
//--------- VIEWS ---------
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Upload from './views/Upload.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
    },
    {
      path: '*',
      name: '404',
      component: Home,
    },
  ],
});
