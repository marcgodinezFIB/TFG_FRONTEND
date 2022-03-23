<template>
    <div class="vue-tempalte">
        <form @submit="signUp">
            <h3>Sign Up</h3>

            <div class="form-group">
                <label>Username</label>
                <input type="text" v-model="user.displayName" class="form-control form-control-lg"/>
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" v-model="user.email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="user.password" class="form-control form-control-lg" />
            </div>
            <div class="mt-4">
                <button type="submit" class="btn btn-dark btn-lg btn-block" @click="signUp" style="float:right">Sign Up</button>
            </div>
        </form>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';
class User {
    constructor(displayName,email,password){
        this.displayName = displayName,
        this.email = email,
        this.password = password
    }
}
    export default {
  data() {
    return { user: new User()
    };
  },
  methods: {
    async signUp() {
      try {
        const newuser = this.user
        const response = await AuthService.signUp(newuser);
        console.log(response)
        this.msg = response.msg;
      } catch (error) {
        this.msg = error
        
      }
    }
  }
};
</script>