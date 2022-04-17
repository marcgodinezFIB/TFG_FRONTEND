<template>
    <b-card class="vue-template forms">
        <h3 style="text-align: center;
        margin: 0;
        line-height: 1;
        padding-bottom: 20px;">Login</h3>

        <b-alert v-if="mensaje != '' " show variant="danger">{{mensaje}}</b-alert>
        <div class="form-group">
            <b-form-input trim type="text" required class="form-control my-2" placeholder="Email" v-model="email" />
        </div>
        <div class="form-group">
        <b-form-input trim type="password" class="form-control my-2" placeholder="Password" v-model="password" />
        </div>
        <b-button class="btn btn-dark btn-lg btn-block" @click="login" style="float:right">Acceder</b-button>
    </b-card>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            mensaje: ''
        }
    },
    mounted() {
        this.checkUser();
    },
    methods: {
        login() {
            let user = {
                email: this.email,
                password: this.password
            }
            axios.post('/login', user)
                .then(res => {
                    if (res.status === 200) {
                        localStorage.setItem('token', res.data.token);
                        this.$router.push('/');
                    }
                }, err => {
                    this.mensaje = err.response.data.message
                })
        },
        checkUser() {
            if (localStorage.getItem('token')) this.$router.push('/profile')
        }
    }
}
</script>