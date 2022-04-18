<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <div class="col-6">
          <b-alert v-if="mensaje != ''" show variant="success">{{
            mensaje
          }}</b-alert>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <label>Nombre:</label>
        </div>
        <div class="col-3">
          <b-form-input
            trim
            type="text"
            required
            value="aaa"
            v-model="name"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <label>Años:</label>
        </div>
        <div class="col-3">
          <b-form-input
            trim
            type="number"
            required
            v-model="years"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <label>Peso:</label>
        </div>
        <div class="col-3">
          <b-form-input
            trim
            type="number"
            required
            v-model="weight"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <label>CO2 por año:</label>
        </div>
        <div class="col-3">
          <b-form-input
            trim
            type="number"
            required
            v-model="CO2PerYear"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <b-button size="sm" variant="outline-secondary" @click="CreateNewAnimal">Crear</b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "CreateAnimal",
  data() {
    return {
      name: "",
      years: "",
      weight: "",
      CO2PerYear: "",
      mensaje: "",
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  methods: {
    CreateNewAnimal() {
      let newAnimal = {
        name: this.name,
        years: this.years,
        weight: this.weight,
        CO2PerYear: this.CO2PerYear,
      };
      axios
        .post("/addAnimal", newAnimal, {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then(
          (res) => {
            this.error = "";
            this.mensaje = "Animal creado";
            this.years = "";
            this.weight = "";
            this.CO2PerYear = "";
            this.name = "";
          },
          (err) => {
            this.error = err.response.data.error;
          }
        );
    },
  },
};
</script>
