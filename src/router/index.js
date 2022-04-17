import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            component: () =>
                import ('../components/Index.vue')
        },
        {
        path: '/signup',
        name: 'signup',
        component: () =>
            import ('../components/Signup.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../components/Login.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        component: () =>
            import ('../components/Profile.vue')
    },
    {
        path: '/addproduct',
        name: 'AddProduct',
        component: () =>
            import ('../components/AddProduct.vue')
    },
    {
        path: '/productlist',
        name: 'ProductList',
        component: () =>
            import ('../components/ProductList.vue')
    },
    {
        path: '/createtransport',
        name: 'CreateTransport',
        component: () =>
            import ('../components/AdminTools/CreateTransport.vue')
    },
    {
        path: '/admintools',
        name: 'AdminTools',
        component: () =>
            import ('../components/AdminTools.vue')
    }
]});

export default routes