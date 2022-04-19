<template>
  <b-card class="vue-template forms">
    <h3
      style="
        text-align: center;
        margin: 0;
        line-height: 1;
        padding-bottom: 20px;
      "
    >
      Login
    </h3>

    <b-alert v-if="mensaje != ''" show variant="danger">{{ mensaje }}</b-alert>
    <div class="row">
      <div class="col">
        <b-input-group
          ><b-input-group-prepend>
            <span class="form-control my-2"
              ><i class="fa fa-user fa-lg"></i
            ></span> </b-input-group-prepend
          ><b-form-input
            trim
            type="text"
            required
            class="form-control my-2"
            placeholder="Email"
            v-model="email"
        /></b-input-group>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-input-group
          ><b-input-group-prepend>
            <span class="form-control my-2"
              ><i class="fa fa-lock fa-lg"></i
            ></span> </b-input-group-prepend
          ><b-form-input
            trim
            type="password"
            class="form-control my-2"
            placeholder="Password"
            v-model="password"
        /></b-input-group>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group mt-2" style="text-align: center">
          <b-button
            variant="outline-secondary"
            class="btn btn-block"
            @click="login"
            >Acceder</b-button
          >
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      mensaje: "",
    };
  },
  mounted() {
    this.checkUser();
  },
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password,
      };
      axios.post("/login", user).then(
        (res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            this.$router.push("/");
          }
        },
        (err) => {
          this.mensaje = err.response.data.message;
        }
      );
    },
    checkUser() {
      if (localStorage.getItem("token")) this.$router.push("/profile");
    },
  },
};
</script>
