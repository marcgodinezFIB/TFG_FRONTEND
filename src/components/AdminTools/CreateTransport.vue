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
          <label>Capacidad:</label>
        </div>
        <div class="col-3">
          <b-form-input
            trim
            type="number"
            required
            v-model="capacity"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <label>Distancia máxima:</label>
        </div>
        <div class="col-3">
          <b-form-input
            trim
            type="number"
            required
            v-model="distance"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <label>CO2 por Km:</label>
        </div>
        <div class="col-3">
          <b-form-input
            trim
            type="number"
            required
            v-model="CO2PerKm"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <b-button size="sm" variant="outline-secondary" @click="CreateNewTransport"
            >Crear</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "CreateTransport",
  data() {
    return {
      name: "",
      capacity: "",
      distance: "",
      CO2PerKm: "",
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
    CreateNewTransport() {
      let newTransport = {
        name: this.name,
        capacity: this.capacity,
        distance: this.distance,
        CO2PerKm: this.CO2PerKm,
      };
      axios
        .post("/addTransport", newTransport, {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then(
          (res) => {
            this.error = "";
            this.mensaje = "Transporte creado";
            this.capacity = "";
            this.distance = "";
            this.CO2PerKm = "";
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
