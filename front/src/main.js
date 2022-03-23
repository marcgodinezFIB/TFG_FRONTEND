import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'http://localhost:3000/api/';
Vue.config.productionTip = false
    //axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')