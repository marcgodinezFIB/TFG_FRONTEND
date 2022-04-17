<template>
  <div>
    <h1>username:{{ username }}</h1>
    <a>email: {{ email }}</a>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'Profile',
  data() {
    return {
      username: '',
      email: '',
    }
  },
  created() {
    //user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login');
    }
  },
  mounted() {
    axios.get('/profile', { headers: { token: localStorage.getItem('token')}})
      .then(res => {
        this.username = res.data.user.username;
        this.email = res.data.user.email;
      })
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    }
  }
}
</script>