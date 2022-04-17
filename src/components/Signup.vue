<template>
    <b-card class="vue-tempalte forms">
        <h3 style="text-align: center;
        margin: 0;
        line-height: 1;
        padding-bottom: 20px;">Sign Up</h3>
    
        <div class="form-group">
            <input type="text" placeholder="Username" v-model="username" class="form-control my-2 form-control-lg" />
        </div>
    
        <div class="form-group">
            <input type="text" placeholder="Email address" v-model="email" class="form-control my-2 form-control-lg"/>
        </div>
    
        <div class="form-group">
            <input type="password" placeholder="Password" v-model="password" class="form-control my-2 form-control-lg"/>
        </div>
        <div class="mt-4">
            <b-button class="btn btn-dark btn-lg btn-block" @click="signUp" style="float:right">Sign Up</b-button>
        </div>
    </b-card>
</template>

<script>
 import axios from 'axios';
 export default {
     data() {
         return {
             username: '',
             email: '',
             password: '',

             error: ''
         }
     },
     methods: {
         signUp() {
             let newUser = {
                 username: this.username,
                 email: this.email,
                 password: this.password
             }
             axios.post('/signup', newUser)
                 .then(res => {
                     this.error = '';
                     this.$router.push('/login');
                 }, err => {
                     this.error = err.response.data.error;
                 })
         }
     }
 };
</script>