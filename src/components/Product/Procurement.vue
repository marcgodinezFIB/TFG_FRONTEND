<template>
<div class="row">
              <div class="col-6">
                <div class="row">
                  <div class="col-6">
                    <div class="row"><label>Agua:</label></div>
                    <div class="row"><span>(en L)</span></div>
                  </div>
                  <div class="col-6">
                    <b-form-input
                      trim
                      type="number"
                      required
                      value="aaa"
                      v-model="Water"
                      class="form-control my-2"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="row"><label>Electricidad:</label></div>
                    <div class="row"><span>(en KWh)</span></div>
                  </div>
                  <div class="col-6">
                    <b-form-input
                      trim
                      type="number"
                      required
                      v-model="Electricity"
                      class="form-control my-2"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="row"><label>¿Origen Animal?</label></div>
                  </div>
                  <div class="col-6">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioAnimalOptions"
                        id="inlineRadioAnimalYes"
                        v-model="isAnimalType"
                        value="isAnimalYes"
                      />
                      <label class="form-check-label" for="inlineRadioYes"
                        >Sí</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioAnimalOptions"
                        id="inlineRadioAnimalNo"
                        v-model="isAnimalType"
                        value="isAnimalNo"
                      />
                      <label class="form-check-label" for="inlineRadioNo"
                        >No</label
                      >
                    </div>
                  </div>
                </div>
                <div class="row" v-if="isAnimalType === 'isAnimalYes'">
                  <div class="col-6">
                    <div class="row"><label>Animal</label></div>
                  </div>
                  <div class="col-3 dropdown">
                    <select v-model="selectedAnimal">
                      <option
                        v-for="(animal, _id) in listAnimals"
                        :value="animal"
                        :key="_id"
                      >
                        {{ animal.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-3">
                    <b-button @click="addAnimal">Add</b-button>
                  </div>
                </div>
                <div class="row" v-if="isAnimalType === 'isAnimalYes'">
                  <div class="col-6">
                    <div class="row"><label>Cantidad:</label></div>
                    <div class="row"><span>(en Kg)</span></div>
                  </div>
                  <div class="col-6">
                    <b-form-input
                      trim
                      type="number"
                      required
                      v-model="quantityAnimal"
                      class="form-control my-2"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="row"><label>¿Origen Vegetal?</label></div>
                  </div>
                  <div class="col-6">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioVegetalOptions"
                        id="inlineRadioVegYes"
                        v-model="isVegetalType"
                        value="isVegetalYes"
                      />
                      <label class="form-check-label" for="inlineRadioVegYes"
                        >Sí</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioVegetalOptions"
                        id="inlineRadioVegNo"
                        v-model="isVegetalType"
                        value="isVegetalNo"
                      />
                      <label class="form-check-label" for="inlineRadioVegNo"
                        >No</label
                      >
                    </div>
                  </div>
                </div>
                <div class="row" v-if="isVegetalType === 'isVegetalYes'">
                  <div class="col-6">
                    <div class="row"><label>Vegetal</label></div>
                  </div>
                  <div class="col-3 dropdown">
                    <select v-model="selectedVegetal">
                      <option
                        v-for="(vegetal, _id) in listVegetals"
                        :value="vegetal"
                        :key="_id"
                      >
                        {{ vegetal.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-3">
                    <b-button @click="addVegetal">Add</b-button>
                  </div>
                </div>
                <div class="row" v-if="isVegetalType === 'isVegetalYes'">
                  <div class="col-6">
                    <div class="row"><label>Abono:</label></div>
                    <div class="row"><span>(en Kg)</span></div>
                  </div>
                  <div class="col-6">
                    <b-form-input
                      trim
                      type="number"
                      v-model="fertilizerVegetal"
                      required
                      class="form-control my-2"
                    />
                  </div>
                </div>
                <div class="row" v-if="isVegetalType === 'isVegetalYes'">
                  <div class="col-6">
                    <div class="row"><label>Pesticidas:</label></div>
                    <div class="row"><span>(en Kg)</span></div>
                  </div>
                  <div class="col-6">
                    <b-form-input
                      trim
                      type="number"
                      required
                      v-model="pesticideVegetal"
                      class="form-control my-2"
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col">
                    <b-alert v-if="mensajeAnimal != ''" show variant="danger">{{
                      mensajeAnimal
                    }}</b-alert>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div id="table">
                  <table class="table">
                    <thead v-if="rowDataAnimal.length">
                      <th scope="col">Name</th>
                      <th scope="col">Cantidad (en Kg)</th>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in rowDataAnimal" :key="item.id">
                        <td>{{ item.selectedAnimal.name }}</td>
                        <td>{{ item.quantityAnimal }}</td>
                        <td>
                          <b-button @click="deleteAnimal(index)"
                            >Eliminar</b-button
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div id="table">
                  <table class="table">
                    <thead v-if="rowDataVegetal.length">
                      <th scope="col">Name</th>
                      <th scope="col">Abono (en Kg)</th>
                      <th scope="col">Pesticidas (en Kg)</th>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in rowDataVegetal"
                        :key="item.id"
                      >
                        <td>{{ item.selectedVegetal.name }}</td>
                        <td>{{ item.fertilizerVegetal }}</td>
                        <td>{{ item.pesticideVegetal }}</td>
                        <td>
                          <b-button @click="deleteVegetal(index)"
                            >Eliminar</b-button
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-6" style="text-align: end">
                  <b-button @click="NextStep">Guardar y continuar</b-button>
                </div>
              </div>
            </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'Procurement',
    data() {
        return {
            Water: "",
      Electricity: "",
      listAnimals: [],
      idAnimal: "",
      selectedAnimal: "",
      quantityAnimal: "",
      isAnimalType: null,
      isVegetalType: null,
      rowDataAnimal: [],
      mensajeAnimal: "",
      listVegetals: [],
      selectedVegetal: "",
      fertilizerVegetal: "",
      pesticideVegetal: "",
      rowDataVegetal: [],
      mensajeVegetal: "",
        };
    },
    created() {
        //user is not authorized
        if (localStorage.getItem('token') === null) {
            this.$router.push('/login');
        }
    },
    mounted(){
        this.getAllAnimals();
        this.getAllVegetals();
    },

    methods: {
addAnimal() {
      this.checkInfoAnimal();
      if (this.mensajeAnimal == "") {
        var newAnimal = {
          selectedAnimal: this.selectedAnimal,
          quantityAnimal: this.quantityAnimal,
        };
        this.rowDataAnimal.push(newAnimal);
        this.selectedAnimal = "";
        this.quantityAnimal = "";
      }
    },
    checkInfoAnimal() {
      //if(this.selectedTransport == '' || this.capacity == '' || this.distance == '') this.mensajeTransport = 'Todos los campos son obligatorios'
      //else if(this.capacity >= this.maxCapacity || this.distance >= this.maxDistance) this.mensajeTransport = 'Comprueba los valores máximos'
    },
    deleteAnimal(index) {
      this.rowDataAnimal.splice(index, 1);
    },
    addVegetal() {
      this.checkInfoVegetal();
      if (this.mensajeVegetal == "") {
        var newVegetal = {
          selectedVegetal: this.selectedVegetal,
          fertilizerVegetal: this.fertilizerVegetal,
          pesticideVegetal: this.pesticideVegetal,
        };
        this.rowDataVegetal.push(newVegetal);
        this.fertilizerVegetal = "";
        this.pesticideVegetal = "";
      }
    },
    checkInfoVegetal() {
      //if(this.selectedTransport == '' || this.capacity == '' || this.distance == '') this.mensajeTransport = 'Todos los campos son obligatorios'
      //else if(this.capacity >= this.maxCapacity || this.distance >= this.maxDistance) this.mensajeTransport = 'Comprueba los valores máximos'
    },
    deleteVegetal(index) {
      this.rowDataVegetal.splice(index, 1);
    },
    getAllVegetals() {
      axios.get("/getAllVegetals").then((res) => {
        this.listVegetals = res.data.message;
      });
    },
    isAnimal(event) {
      var optionText = event.target.value;
      this.Water = optionText;
    },
    getAllAnimals() {
      axios.get("/getAllAnimals").then((res) => {
        this.listAnimals = res.data.message;
      });
    },
    }
}
</script>