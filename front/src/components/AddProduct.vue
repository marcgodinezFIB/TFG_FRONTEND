<template>
  <div>
    <b-card>
      <b-tabs pills small card vertical>
        <b-tab title="Información general" :active="step === 1">
          <b-card-text>
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
                    <b-button @click="NextStep">Guardar y continuar</b-button>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-6">
                    <b-alert
                      v-if="mensajeGeneralInfo != ''"
                      show
                      variant="danger"
                      >{{ mensajeGeneralInfo }}</b-alert
                    >
                  </div>
                </div>
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="Obtención" :active="step === 2">
          <b-card-text>
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
          </b-card-text>
        </b-tab>
        <b-tab title="Elaboración" :active="step === 3">
          <b-card-text>
            <div class="row mt-3">
              <div class="col-6" style="text-align: end">
                <b-button @click="NextStep">Guardar y continuar</b-button>
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="Transporte" :active="step === 4">
          <b-card-text>
            <div class="row">
              <div class="col-6">
                <div class="row">
                  <div class="col-6">
                    <label>Transporte:</label>
                  </div>
                  <div class="col-6 my-2">
                    <select v-model="selectedTransport" @change="getMaxParams">
                      <option
                        v-for="(transport, _id) in listTransports"
                        :value="transport"
                        :key="_id"
                      >
                        {{ transport.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 my-2">
                    <div class="row"><label>Capacidad</label></div>
                    <div class="row">
                      <span v-if="maxCapacity != ''"
                        >(max: {{ maxCapacity }})</span
                      >
                    </div>
                  </div>
                  <div class="col-6">
                    <input
                      type="number"
                      v-model="capacity"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 my-2">
                    <div class="row"><label>Distancia</label></div>
                    <div class="row">
                      <span v-if="maxDistance !== ''"
                        >(max: {{ maxDistance }})</span
                      >
                    </div>
                  </div>
                  <div class="col-6 my-2">
                    <input
                      type="number"
                      v-model="distance"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="row" style="text-align: end">
                  <div class="col">
                    <b-button @click="addTransport">Add</b-button>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col">
                    <b-alert
                      v-if="mensajeTransport != ''"
                      show
                      variant="danger"
                      >{{ mensajeTransport }}</b-alert
                    >
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div id="table">
                  <table class="table">
                    <thead v-if="rowData.length">
                      <th scope="col">Transport</th>
                      <th scope="col">Capacity</th>
                      <th scope="col">Distance</th>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in rowData" :key="item.id">
                        <td>{{ item.selectedTransport.name }}</td>
                        <td>{{ item.distance }}</td>
                        <td>{{ item.capacity }}</td>
                        <td>
                          <b-button @click="deleteTransport(index)"
                            >Eliminar</b-button
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col" style="text-align: end">
                <b-button @click="NextStep">Guardar y continuar</b-button>
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="Residuos" :active="step === 5">
          <b-card-text>
            <div class="row">
              <div class="col-6">
                <div class="row">
                  <div class="col-3">
                    <div class="row"><label>Tipo de envase</label></div>
                  </div>
                  <div class="col-3 dropdown">
                    <select v-model="selectedRecipient">
                      <option
                        v-for="(recipient, _id) in listRecipients"
                        :value="recipient"
                        :key="_id"
                      >
                        {{ recipient.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <div class="row"><label>Dimensiones:</label></div>
                    <div class="row"><span>(en m3)</span></div>
                  </div>
                  <div class="col-3">
                    <b-form-input
                      trim
                      type="number"
                      required
                      v-model="dimensionsRecipient"
                      class="form-control my-2"
                    />
                  </div>
                </div>
                <div class="row">
                  <!--style="text-align: end"> -->
                  <div class="col">
                    <b-button @click="addRecipient">Add</b-button>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div id="table">
                  <table class="table">
                    <thead v-if="rowDataRecipient.length">
                      <th scope="col">Recipient</th>
                      <th scope="col">Dimensions</th>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in rowDataRecipient"
                        :key="item.id"
                      >
                        <td>{{ item.selectedRecipient.name }}</td>
                        <td>{{ item.dimensionsRecipient }}</td>
                        <td>
                          <b-button @click="deleteRecipient(index)"
                            >Eliminar</b-button
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6" style="text-align: end">
                <b-button @click="NextStep">Guardar y continuar</b-button>
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="Revisar y guardar" :active="step === 6">
          <b-card-text>
            <div class="row">
              <div class="col-6">
                <div class="row">
                  <span>General Information</span>
                  <hr />
                  <div class="row">
                    <div class="col-3">
                      <label>Nombre:</label>
                    </div>
                    <div class="col-3">
                      <b-form-input
                        trim
                        type="text"
                        disabled
                        v-model="productName"
                        class="form-control my-2"
                      />
                    </div>

                    <div class="col-3">
                      <label>Descripcion:</label>
                    </div>
                    <div class="col-3">
                      <b-form-input
                        trim
                        type="text"
                        disabled
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
                        disabled
                        v-model="productOrigin"
                        class="form-control my-2"
                      />
                    </div>
                    <div class="col-3">
                      <label>Tipo de producto:</label>
                    </div>
                    <div class="col-3">
                      <b-form-input
                        trim
                        type="text"
                        disabled
                        v-model="selectedTypeProd"
                        class="form-control my-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row">
                  <span>Transporte</span>
                  <hr />
                </div>
                <div id="table">
                  <table class="table">
                    <thead v-if="rowData.length">
                      <th scope="col">Transport</th>
                      <th scope="col">Capacity</th>
                      <th scope="col">Distance</th>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in rowData" :key="item.id">
                        <td>{{ item.selectedTransport.name }}</td>
                        <td>{{ item.distance }}</td>
                        <td>{{ item.capacity }}</td>
                        <td>
                          <b-button @click="deleteTransport(index)"
                            >Eliminar</b-button
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row">
                <span>Envases</span>
                <hr />
              </div>
                <div id="table">
                  <table class="table">
                    <thead v-if="rowDataRecipient.length">
                      <th scope="col">Recipient</th>
                      <th scope="col">Dimensions</th>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in rowDataRecipient"
                        :key="item.id"
                      >
                        <td>{{ item.selectedRecipient.name }}</td>
                        <td>{{ item.dimensionsRecipient }}</td>
                        <td>
                          <b-button @click="deleteRecipient(index)"
                            >Eliminar</b-button
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row">
                <span>Obtención</span>
                <hr />
              </div>
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
                    disabled
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
                    disabled
                    v-model="Electricity"
                    class="form-control my-2"
                  />
                </div>
              </div>
              <div class="row">
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
                    <tr v-for="(item, index) in rowDataVegetal" :key="item.id">
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
            <div>
              <b-button @click="addNewProduct"
                          >Guardar producto</b-button
                        >
              </div>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AddProduct",
  data() {
    return {
      step: 1,
      listTypeProd: [],
      selectedTypeProd: "",
      mensajeGeneralInfo: "",
      productName: "",
      productDescription: "",
      productOrigin: "",

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

      listTransports: [],
      selectedTransport: "",
      transport: "",
      capacity: "",
      distance: "",
      maxDistance: "",
      maxCapacity: "",
      rowData: [],
      mensajeTransport: "",

      listRecipients: [],
      selectedRecipient: "",
      recipient: "",
      dimensionsRecipient: "",
      rowDataRecipient: [],
      mensajeRecipient: "",

      animalInstances: [],
      vegetalInstances: [],
      transportlInstances: [],
      recipientInstances: []
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
    this.getAllAnimals();
    this.getAllVegetals();
    this.getAllTransports();
    this.getAllRecipients();
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
    NextStep(step) {
      //this.checkGeneralInfo(step);
      this.step = this.step + 1;
    },
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
    addTransport() {
      this.checkInfoTransport();
      if (this.mensajeTransport == "") {
        var newTransport = {
          selectedTransport: this.selectedTransport,
          capacity: this.capacity,
          distance: this.distance,
        };
        this.rowData.push(newTransport);
        this.selectedTransport = "";
        this.capacity = "";
        this.distance = "";
      }
    },
    checkInfoTransport() {
      if (
        this.selectedTransport.name == "" ||
        this.capacity == "" ||
        this.distance == ""
      )
        this.mensajeTransport = "Todos los campos son obligatorios";
      else if (
        this.capacity >= this.maxCapacity ||
        this.distance >= this.maxDistance
      )
        this.mensajeTransport = "Comprueba los valores máximos";
    },
    deleteTransport(index) {
      this.rowData.splice(index, 1);
    },
    getAllTransports() {
      axios.get("/getAllTransports").then((res) => {
        this.listTransports = res.data.message;
      });
    },
    getMaxParams() {
      this.getMaxDistance();
      this.getMaxCapacity();
    },
    getMaxDistance() {
      this.maxDistance = this.listTransports.find(
        (x) => x.name == this.selectedTransport.name
      ).distance;
    },
    getMaxCapacity() {
      this.maxCapacity = this.listTransports.find(
        (x) => x.name == this.selectedTransport.name
      ).capacity;
    },
    addRecipient() {
      //this.checkInfoRecipient();
      //if (this.mensajeRecipient == "") {
      var newRecipient = {
        selectedRecipient: this.selectedRecipient,
        dimensionsRecipient: this.dimensionsRecipient,
      };
      this.rowDataRecipient.push(newRecipient);
      this.dimensionsRecipient = "";
      //}
    },
    checkInfoRecipient() {
      //if(this.selectedTransport == '' || this.capacity == '' || this.distance == '') this.mensajeTransport = 'Todos los campos son obligatorios'
      //else if(this.capacity >= this.maxCapacity || this.distance >= this.maxDistance) this.mensajeTransport = 'Comprueba los valores máximos'
    },
    deleteRecipient(index) {
      this.rowDataRecipient.splice(index, 1);
    },
    getAllRecipients() {
      axios.get("/getAllRecipients").then((res) => {
        this.listRecipients = res.data.message;
      });
    },
    createAnimalInstances(){
      this.rowDataAnimal.forEach(element => {
        let newAnimalInstance = {
          animal: element.selectedAnimal,
          quantity: element.quantityAnimal

        }
        axios.post('/addAnimalInstance',newAnimalInstance, {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
        .then(res => {
            this.error = '';
            this.mensaje = 'Producto creado'
            this.name = ''
        }, err => {
            this.error = err.response.data.error;
        })
      });
    },
    createVegetalInstances(){
      this.rowDataVegetal.forEach(element => {
        let newVegetalInstance = {
          vegetal: element.selectedVegetal,
          pesticide: element.pesticideVegetal,
          fertilizer: element.fertilizerVegetal
        }
        axios.post('/addVegetalInstance',newVegetalInstance, {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
        .then(res => {
            this.error = '';
            this.mensaje = 'Producto creado'
            this.name = ''
        }, err => {
            this.error = err.response.data.error;
        })
      });
    },
    createTransportInstances(){
      this.rowData.forEach(element => {
        let newTransportInstance = {
          transport: element.selectedTransport,
          capacity: element.capacity,
          distance: element.distance
        }
        axios.post('/addTransportInstance',newTransportInstance, {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
        .then(res => {
            this.error = '';
            this.mensaje = 'Producto creado'
            this.name = ''
        }, err => {
            this.error = err.response.data.error;
        })
      });

    },
    createRecipientInstances(){
      this.rowDataRecipient.forEach(element => {
        let newRecipientInstance = {
          recipient: element.selectedRecipient,
          dimensions: element.dimensionsRecipient,
        }
        axios.post('/addRecipientInstance',newRecipientInstance, {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
        .then(res => {
            this.error = '';
            this.mensaje = 'Producto creado'
            this.name = ''
        }, err => {
            this.error = err.response.data.error;
        })
      });
    },
    addNewProduct(){
      this.animalInstances = this.createAnimalInstances();
      this.vegetalInstances = this.createVegetalInstances();
      this.transportlInstances = this.createTransportInstances();
      this.recipientInstances = this.createRecipientInstances();

      let newProduct = {
        //General info
        name: this.productName,
        description: this.productDescription,
        origin: this.productOrigin,
        typeProd: this.typeProd, //o Id?
        //Procurement
        water: this.Water,
        electricity: this.electricity,
        //crear las AnimalInstances
        animals: this.animalInstances,
        //crear las VegetalInstances
        vegetals: this.vegetalInstances,
        //crear las TransportInstances
        //transports: this.rowData,
        //crear las WasteInstances
        //recipients: this.rowDataRecipient,
      }
      axios.post('/addProduct',newProduct, {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
      .then(res => {
            this.error = '';
            this.mensaje = 'Producto creado'
            this.name = ''
        }, err => {
            this.error = err.response.data.error;
        })

    },
        CreateNewVegetal() {
    let newVegetal = {
        name: this.name,
        }
    axios.post('/addVegetal',newVegetal, {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
        .then(res => {
            this.error = '';
            this.mensaje = 'Vegetal creado'
            this.name = ''
        }, err => {
            this.error = err.response.data.error;
        })
}
  },
};
</script>
