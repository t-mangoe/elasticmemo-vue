import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
// import axios from 'axios'

Vue.config.productionTip = false

// document.addEventListener('DOMContentLoaded', function () {
//   M.AutoInit();
// });

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')