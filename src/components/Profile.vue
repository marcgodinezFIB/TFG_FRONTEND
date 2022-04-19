<template>
  <b-card class="vue-template forms">
    <div class="row">
      <div class="col">
        <h3>{{ username }}</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>{{ email }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>{{ role }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>{{ signupdate }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col"></div>
    </div>
  </b-card>
</template>
<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      username: "",
      email: "",
      role: "",
      signupdate: "",
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    axios
      .get("/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.username = res.data.user.username;
        this.email = res.data.user.email;
        this.role = res.data.user.role;        
      });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
