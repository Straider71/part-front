import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Toasted from 'vue-toasted';
import 'nprogress/nprogress.css';

const options = {
  position: 'bottom-right',
  duration: 3000,
  theme: 'bubble',
  className: 'app',
};
Vue.use(Toasted, options);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit('SET_USER_DATA', userData);
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout');
          localStorage.removeItem('user');
          location.reload();
        }
        return Promise.reject(error);
      }
    );
  },
  render: h => h(App),
}).$mount('#app');
