import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueMasonry from 'vue-masonry-css'

// import './registerServiceWorker';
require('./firebase/firebaseInit');

Vue.config.productionTip = false;
Vue.use(VueMasonry);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
