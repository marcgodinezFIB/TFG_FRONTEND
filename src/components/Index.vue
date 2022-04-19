<template>
  <b-card class="vue-template forms-index">
    <h3
      style="
        text-align: center;
        margin: 0;
        line-height: 1;
        padding-bottom: 20px;
      "
    >
      <img style="height: 80px; width: 80px" src="../assets/css/arbol1.png" />
    </h3>
    <div class="row">
      <div class="col">
        <h3 style="text-align: center">Carbon Footprint Scan</h3>
      </div>
    </div>
    <div class="row">
      <div class="col" style="text-align: center">
        <a> Calcula la huella de carbono que generan tus productos. </a>
      </div>
      
    </div>

    <div class="row mt-5">
      <hr />
      <div class="col-6" style="text-align: center">
        <div class="row">
          <div class="col">
            <h6><a style="font-size: 12px">Objetivo</a></h6>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <a style="font-size: 12px"
              >La herramienta trata de concienciar tanto a consumidores como
              empresas a tener en cuenta la huella ecológica que generan los
              productos.</a
            >
          </div>
        </div>
      </div>
      <div class="col-6" style="text-align: center">
        <div class="row">
          <div class="col">
            <h6><a style="font-size: 12px">Sobre la iniciativa</a></h6>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <a style="font-size: 12px"
              >La iniciativa ha sido desarrollada como Proyecto final de Grado y
              los valores que encontrarán en la herramienta son ejemplos.</a
            >
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Index",
  data() {
    return {
      email: "",
      password: "",
      mensaje: "",
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token");
    },
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
  },
};
</script>
