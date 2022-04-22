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
          <label>Tipo de alimento:</label>
        </div>
        <div class="col-3 dropdown">
          <select v-model="selectedTypeFood">
            <option
              v-for="(typefood, _id) in listTypeFood"
              :value="typefood.name"
              :key="_id"
            >
              {{ typefood.name }}
            </option>
          </select>
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
            v-model="name"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <label>gCo2 por Kg:</label>
        </div>
        <div class="col-3">
          <b-form-input
            trim
            type="number"
            required
            v-model="CO2PerKg"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <b-button
            size="sm"
            variant="outline-secondary"
            @click="CreateNewFood"
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
  name: "CreateFood",
  data() {
    return {
      name: "",
      selectedTypeFood: "",
      listTypeFood: [],
      CO2PerKg: "",
      mensaje: "",
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.getAllTypesFood();
  },
  methods: {
    getAllTypesFood() {
      axios.get("/getAllTypeProds").then((res) => {
        this.listTypeFood = res.data.message;
      });
    },
    CreateNewFood() {
      let newFood = {
        name: this.name,
        foodType: this.selectedTypeFood,
        CO2PerKg: this.CO2PerKg,
      };
      axios
        .post("/addFood", newFood, {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then(
          (res) => {
            this.error = "";
            this.mensaje = "Alimento creado";
            this.selectedTypeFood = "";
            this.CO2PerKg = "";
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
