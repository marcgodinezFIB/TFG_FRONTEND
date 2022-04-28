<template>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" :key="$route.fullPath">
            <div class="container-fluid">
                <img style="height: 40px;width: 40px;" src="../assets/css/arbol1.png"/><a class="navbar-brand" href="/">CarbonFootprintScan</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
            <div class="collapse navbar-collapse " id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" v-if="isLoggedIn" href="/addproduct">Añadir producto</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" v-if="isLoggedIn" href="/productlist">Lista de productos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" v-if="isLoggedIn" href="/foods">Alimentos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" v-if="isLoggedIn" href="/transports">Transportes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" v-if="isLoggedIn" href="/recipients">Envases</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" v-if="isLoggedIn" href="/typeprods">Tipos de productos</a>
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
                        <a class="nav-link" v-if="isLoggedIn" @click="logout" href="/login">Logout</a>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
</template>

<script>
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