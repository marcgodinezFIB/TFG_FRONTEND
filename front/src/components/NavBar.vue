<template>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" :key="$route.fullPath">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">CarbonFootprintScan</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" v-if="isLoggedIn" href="/addproduct">Add product</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" v-if="isLoggedIn" href="/productlist">Product list</a>
                    </li>
                </ul>
            </div>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" v-if="!isLoggedIn" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" v-if="!isLoggedIn" href="/signup">Sign up</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" v-if="isLoggedIn" href="/admintools">Admin Tools</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" v-if="isLoggedIn" @click="logout" href="/login">Logout</a>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
</template>

<script>
import axios from 'axios';
export default {
    name: 'NavBar',
    data() {
        return {
        }
    },
    computed: {
        isLoggedIn() {
            return !!localStorage.getItem('token')
        }
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.go('/login');
        }
    }
}
</script>