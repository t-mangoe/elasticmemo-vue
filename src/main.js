import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'

Vue.config.productionTip = false

// document.addEventListener('DOMContentLoaded', function () {
//   M.AutoInit();
// });

new Vue({
  render: h => h(App),
}).$mount('#app')