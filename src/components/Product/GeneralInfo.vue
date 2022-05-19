<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <div class="col-3">
          <label>Nombre:</label>
        </div>
        <div class="col-3">
          <b-form-input
            trim
            type="text"
            required
            v-model="productName"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <label>Descripcion:</label>
        </div>
        <div class="col-3">
          <b-form-input
            trim
            type="text"
            required
            v-model="productDescription"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <label>Origen:</label>
        </div>
        <div class="col-3">
          <b-form-input
            trim
            type="text"
            required
            v-model="productOrigin"
            class="form-control my-2"
          />
        </div>
      </div>
      <div class="row cascading-dropdown">
        <div class="col-3">
          <label>Tipo de producto:</label>
        </div>
        <div class="col-3 dropdown">
          <select v-model="selectedTypeProd">
            <option
              v-for="(typeprod, _id) in listTypeProd"
              :value="typeprod.name"
              :key="_id"
            >
              {{ typeprod.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6" style="text-align: end">
          <b-button variant="outline-secondary" @click="NextStep">Guardar y continuar</b-button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <b-alert v-if="mensajeGeneralInfo != ''" show variant="danger">{{
            mensajeGeneralInfo
          }}</b-alert>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { eventBus } from "../../main";

export default {
  name: "GeneralInfo",
  props: {
    basicInfo: {
      productName: String,
      productDescription: String,
      productOrigin: String,
    },
  },
  data() {
    return {
      listTypeProd: [],
      selectedTypeProd: "",
      mensajeGeneralInfo: "",
      productName: "",
      productDescription: "",
      productOrigin: "",
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.getAllTypesProd();
  },
  methods: {
    getAllTypesProd() {
      axios.get("/getAllTypeProd").then((res) => {
        this.listTypeProd = res.data.message;
      });
    },
    checkInfo(step) {
      if (step == 1)
        if (
          this.productName == "" ||
          this.productDescription == "" ||
          this.productOrigin == "" ||
          this.selectedTypeProd == ""
        )
          this.mensajeGeneralInfo = "Todos los campos son obligatorios";
        else this.mensajeGeneralInfo = "";
    },
  },
};
</script>
