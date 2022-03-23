import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
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
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router