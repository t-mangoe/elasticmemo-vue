import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import TagAdministrator from "./components/TagAdministrator.js";
// import axios from 'axios'

Vue.config.productionTip = false;
Vue.prototype.$tagAdmin = new TagAdministrator();
// document.addEventListener('DOMContentLoaded', function () {
//   M.AutoInit();
// });

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')