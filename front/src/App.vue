<template>
    <div class="vue-template">
        <NavBar :key="$route.fullPath"></NavBar>
        <!-- Navigation -->
        <!-- Main -->
        <div class="App">
            <div>
                <div>
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

import axios from 'axios';
export default {
    
    data() {
        return {}
    },
    components: { NavBar },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.go('/login');
        }
    }
}
</script>