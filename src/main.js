import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export const eventBus = new Vue();


Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'http://footprintscanv00.herokuapp.com/api/';
Vue.config.productionTip = true
//axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')