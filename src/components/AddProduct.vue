<template>
  <div>
    <b-card>
          <b-card-text>
            <div class="row">
                  <p style="background-color: #55a359; border-radius: 25px; color: black; font-size: x-large;text-align-last: center;">Información general</p>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="row">
                  <div class="col-2">
                    <img v-if="this.image != null && this.imagepreview == null" style="width:200px; height:150px" id= "loadImage" v-bind:src="'http://localhost:3000/uploads/' + this.image">
                  </div>
                </div>
                <div class="row">
                  <div class="col-2">
                    <img v-if="this.imagepreview != null" style="width:200px; height:150px" id= "loadImage" :src="this.imagepreview" >
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label>Imagen del producto:</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <input type="file" id ="image" @change="uploadFile">
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col">
                    <b-button-group
                      ><b-button
                    variant="outline-secondary"
                    size="sm"
                    style="text-align: end"
                    @click="attachImage"
                    :disabled="isDisabled"
                    >Guardar imagen</b-button
                  >
                      <b-button
                        size="sm"
                        variant="outline-danger"
                        @click="deleteImage"
                        :disabled="isDisabled"
                        >Eliminar imagen</b-button
                      ></b-button-group
                    >
                    
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="row">
                  <div class="col">
                    <label>Nombre:</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <b-form-input
                      trim
                      type="text"
                      required
                      v-model="productName"
                      class="form-control my-2"
                      :disabled="isDisabled"
                    />
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col">
                    <label>Descripción:</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <b-form-input
                      trim
                      type="text"
                      required
                      v-model="productDescription"
                      class="form-control my-2"
                      :disabled="isDisabled"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label>Agua: (en L)</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                     <b-form-input
                      trim
                      type="number"
                      required
                      :disabled="isDisabled"
                      value=""
                      v-model="Water"
                      class="form-control my-2"
                    />
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col">
                    <label>Distancia total:</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                     <b-form-input
                      trim
                      type="number"
                      required
                      :disabled="true"
                      value=""
                      v-model="totalDistance"
                      class="form-control my-2"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="row">
                  <div class="col">
                    <label>Origen:</label>
                  </div>
                </div>
                <div class="col">
                  <div class="row mt-2">
                    <div>
                        <select class="form-select"
                        v-model="country"
                        @change="changeCountry(country.code)"
                        >
                        <option
                          v-for="(country, _id) in listCountries"
                          :value="country"
                          :disabled="isDisabled"
                          :key="_id"
                        >
                          {{ country.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div>
                        <select class="form-select"
                        v-model="state"
                        @change="changeState(country.code,state.iso)"
                        >
                        <option
                          v-for="(state, _id) in listStates"
                          :value="state"
                          :disabled="isDisabled"
                          :key="_id"
                        >
                          {{ state.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div v-if="this.$route.query.id == null" class="row mt-2">
                    <div>
                        <select class="form-select"
                        v-model="city"
                        @change="changeOrigin(city)"
                        >
                        <option
                          v-for="(city, _id) in listCities"
                          :value="city"
                          :disabled="isDisabled"
                          :key="_id"
                        >
                          {{ city.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div v-if="this.$route.query.id != null" class="row mt-2">
                    <div>
                        <select class="form-select"
                        v-model="city"
                        @change="changeOrigin(city)"
                        >
                        <option
                          v-for="(city, _id) in listCities"
                          :value="city"
                          :disabled="isDisabled"
                          :key="_id"
                        >
                          {{ city.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col-6">
                    <div class="row"><label>Cantidad: (en Kg)</label></div>
                  </div>
                  <div class="col-6">
                    <label>Tipo de producto:</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <b-form-input
                      trim
                      type="number"
                      required
                      v-model="productQuantity"
                      class="form-control my-2"
                      :disabled="isDisabled"
                    />
                  </div>
                  <div class="col">
                    <div class="mt-2">
                    <div>
                    <select class="form-select"
                      v-model="productType"
                      @change="changeFoodType(productType.name)"
                    >
                      <option
                        v-for="(foodtype, _id) in listFoodTypes"
                        :value="foodtype"
                        :disabled="isDisabled"
                        :key="_id"
                      >
                        {{ foodtype.name }}
                      </option>
                    </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label>Electricidad: (en kWh)</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                     <b-form-input
                      trim
                      type="number"
                      required
                      :disabled="isDisabled"
                      value=""
                      v-model="Electricity"
                      class="form-control my-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-4">
              <p style="background-color: #55a359; border-radius: 25px; color: black; font-size: x-large;text-align-last: center;">Alimentos</p>
              <div class="row">
                  <div class="col-6">
                    <div class="row"><label>Alimento</label></div>
                  </div>

                  <div class="col dropdown">
                    <select class="form-select"
                      v-model="selectedFoodType"
                      @change="changeFoodType(selectedFoodType.name)"
                    >
                      <option
                        v-for="(foodtype, _id) in listFoodTypes"
                        :value="foodtype"
                        :disabled="isDisabled"
                        :key="_id"
                      >
                        {{ foodtype.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-6"></div>
                  <div class="col dropdown">
                    <select class="form-select" v-model="selectedFood">
                      <option
                        v-for="(item, _id) in listFoods"
                        :value="item"
                        :disabled="isDisabled"
                        :key="_id"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="row"><label>Cantidad:</label></div>
                    <div class="row"><span>(en Kg)</span></div>
                  </div>
                  <div class="col-6">
                    <b-form-input
                      trim
                      type="number"
                      required
                      :disabled="isDisabled"
                      v-model="quantityFood"
                      class="form-control my-2"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col" style="text-align: end">
                    <b-button
                      size="sm"
                      variant="outline-secondary"
                      @click="addFood"
                      :disabled="isDisabled"
                      >Añadir</b-button
                    >
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col">
                    <b-alert
                      v-if="mensajeProcurement != ''"
                      show
                      variant="danger"
                      >{{ mensajeProcurement }}</b-alert
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <b-alert v-if="mensajeFood != ''" show variant="danger">{{
                      mensajeFood
                    }}</b-alert>
                  </div>
                </div>
            </div>
            <div class="col-4">
              <p style="background-color: #55a359; border-radius: 25px; color: black; font-size: x-large;text-align-last: center;">Transportes</p>
              <div class="row">
                <div class="col">
                  <div class="row">
                    <div class="col-6">
                      <label>Transportes</label>
                    </div>
                    <div class="col-6 my-2">
                      <select class="form-select" v-model="selectedTransport" @change="getMaxParams">
                        <option
                          v-for="(transport, _id) in listTransports"
                          :value="transport"
                          :key="_id"
                          :disabled="isDisabled"
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
                        :disabled="isDisabled"
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
                        :disabled="isDisabled"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="row" style="text-align: end">
                    <div class="col">
                      <b-button
                        size="sm"
                        variant="outline-secondary"
                        :disabled="isDisabled"
                        @click="addTransport"
                        >Añadir</b-button
                      >
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col">
                      <b-alert
                        v-if="mensajeTransport != ''"
                        show
                        variant="danger"
                        :disabled="isDisabled"
                        >{{ mensajeTransport }}</b-alert
                      >
                    </div>
                  </div>
                </div>
          </div>
        </div>
            <div class="col-4">
              <p style="background-color: #55a359; border-radius: 25px; color: black; font-size: x-large;text-align-last: center;">Residuos</p>
              <div class="row">
                <div class="col">
                  <div class="row">
                    <div class="col-6">
                      <div class="row"><label>Tipo de envase</label></div>
                    </div>
                    <div class="col-6 dropdown">
                      <select 
                      class="form-select"
                      v-model="selectedRecipient">
                        <option
                          v-for="(recipient, _id) in listRecipients"
                          :value="recipient"
                          :key="_id"
                          :disabled="isDisabled"
                        >
                          {{ recipient.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-6">
                      <div class="row"><label>Dimensiones:</label></div>
                      <div class="row"><span>(en m3)</span></div>
                    </div>
                    <div class="col-6">
                      <b-form-input
                        trim
                        type="number"
                        required
                        v-model="dimensionsRecipient"
                        :disabled="isDisabled"
                        class="form-control my-2"
                      />
                    </div>
                  </div>
                  <div class="row mt-2" style="text-align: end">
                    <div class="col">
                      <b-button
                        size="sm"
                        variant="outline-secondary"
                        @click="addRecipient"
                        :disabled="isDisabled"
                        >Añadir</b-button
                      >
                    </div>
                  </div>
                </div>
              <div class="row mt-3">
                <div class="col">
                  <b-alert
                    v-if="mensajeRecipient != ''"
                    show
                    variant="danger"
                    >{{ mensajeRecipient }}</b-alert
                  >
                </div>
              </div>
            </div>
            </div>
          </div>
          <div class="row">
            <hr>
            <div class="col-4">
              <p v-if="rowDataFood.length" style="background-color: #55a359; border-radius: 25px; color: black; font-size: x-large;text-align-last: center;">Tabla de Alimentos</p>
              <div id="table">
                  <table class="table">
                    <thead v-if="rowDataFood.length">
                      <th scope="col">Name</th>
                      <th scope="col">Cantidad (en Kg)</th>
                      <th scope="col">CO2 por kg</th>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in rowDataFood" :key="item.id">
                        <td>{{ item.selectedFood.name }}</td>
                        <td>{{ item.quantityFood }}</td>
                        <td>{{ item.selectedFood.CO2PerKg }}</td>
                        <td>
                          <b-button
                            size="sm"
                            variant="outline-danger"
                            @click="deleteFood(index)"
                            :disabled="isDisabled"
                            >Eliminar</b-button
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
            <div class="col-4">
              <p v-if="rowData.length" style="background-color: #55a359; border-radius: 25px; color: black; font-size: x-large;text-align-last: center;">Tabla de Transportes</p>
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
                            <b-button
                              size="sm"
                              variant="outline-danger"
                              @click="deleteTransport(index)"
                              :disabled="isDisabled"
                              >Eliminar</b-button
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
            </div>
            <div class="col-4">
              <p v-if="rowDataRecipient.length" style="background-color: #55a359; border-radius: 25px; color: black; font-size: x-large;text-align-last: center;">Tabla de residuos</p>
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
                          <b-button
                            size="sm"
                            variant="outline-danger"
                            @click="deleteRecipient(index)"
                            :disabled="isDisabled"
                            >Eliminar</b-button
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
            <div class="row mt-4">
              <div class="col" style="text-align: end">
                <b-button-group
                  >
                  <b-button
                    variant="outline-secondary"
                    size="sm"
                    style="text-align: end"
                    @click="addNewProduct"
                    :disabled="isDisabled"
                    >Guardar producto</b-button
                  ></b-button-group>
              </div>
            </div>
          <div class="row mt-3">
                  <div class="col">
                    <b-alert
                      v-if="mensajeGeneralInfo != ''"
                      show
                      variant="danger"
                      >{{ mensajeGeneralInfo }}</b-alert
                    >
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col">
                    <b-alert
                      v-if="mensajeDistancias != ''"
                      show
                      variant="danger"
                      >{{ mensajeDistancias }}</b-alert
                    >
                  </div>
                </div>
        </b-card-text>
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
      isDisabled: false,
      
      listTypeProd: [],
      mensajeGeneralInfo: "",
      productName: "",
      productDescription: "",
      latitudeOrigin: "",
      longitudeOrigin: "",
      country: "",
      listCountries: [],
      state: "",
      listStates: [],
      city: "",
      listCities: [],
      // city: "",
      // cityList:[],

      productType: "",
      productQuantity: "",
      image: null,
      imagepreview: null,

      totalDistance: "",
      mensajeDistancias: "",
      Water: "",
      Electricity: "",
      listFoodTypes: [],
      listFoods: [],
      idFood: "",
      selectedFood: "",
      selectedFoodType: "",
      quantityFood: "",
      rowDataFood: [],
      mensajeFood: "",

      mensajeProcurement: "",

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

      foodInstances: [],
      transportInstances: [],
      recipientInstances: [],
    };
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
    this.loadProduct();
    this.getImage();
  },
  mounted() {
    this.getAllTypesProd();

    this.getAllTransports();
    this.getAllRecipients();
    this.getAllFoodTypes();
    this.getAllFoods();
    this.getAllCountries();
  },
  methods: {
    deleteImage(){
      this.image = null
      this.imagepreview = null
    },
    uploadFile(event){
      this.image = event.target.files[0];
      this.imagepreview = URL.createObjectURL(this.image);
      //this.imagename = this.image.name
    },
    getImage(){
      if(this.image == null){
        document.getElementById("image").hidden = true;
      }
    },
    attachImage(){
        const formData = new FormData();
        formData.append('image', this.image,this.image.name);
        axios
        .post("/saveimage/", formData,
          {headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          }}).then(
          (res) => {
            this.error = "";
          },
          (err) => {
            this.error = err.response.data.error;
          }
        );
    },
    loadCountry(countryName){
      axios.get("/getCountryByCode/"+ countryName).then((res) => {
        this.country = res.data.message;
      });

    },
    loadState(countryName, stateISO){
      this.getAllStatesByCountry(countryName)
      axios.get("/getStateByISO/"+ countryName + "/" + stateISO).then((res) => {
        this.state = res.data.message;
      });
    },
    loadCity(countryName, stateISO,cityName){
      this.getAllCitiesByState(countryName,stateISO)
      axios.get("/getCityByName/"+  countryName + "/" + stateISO + "/" + cityName).then((res) => {
        var x = res.data.message;
        this.city = res.data.message;
      });
    },

    loadProduct() {
      if (this.$route.query.id != null) {
        axios.get("getProduct/" + this.$route.query.id).then((res) => {
          if(this.$route.query.v != "1")this.isDisabled = false;
          else this.isDisabled = true;
          //GeneralInfo
          this.productName = res.data.product.name;
          this.productDescription = res.data.product.description;
          this.loadCountry(res.data.product.originCountry);
          this.loadState(res.data.product.originCountry, res.data.product.originState);
          //this.city = res.data.product.originCity;
          this.loadCity(res.data.product.originCountry, res.data.product.originState,res.data.product.originCity);
          this.totalDistance = res.data.product.totalDistance;
          this.originCountry = res.data.product.originCountry;


          this.productType = res.data.product.typeProd;
          this.productQuantity = res.data.product.quantity;
          this.image = res.data.product.image
          //Produccion
          this.Water = res.data.product.water;
          this.Electricity = res.data.product.electricity;
          //Food
          for (var i = 0; i < res.data.product.foods.length; ++i) {
            var auxFood = {
              selectedFood: res.data.product.foods[i].food,
              quantityFood: res.data.product.foods[i].quantity,
              CO2PerKg: res.data.product.foods[i].CO2PerKg,
            };
            this.rowDataFood.push(auxFood);
          }
          //disabled selects foods

          //Transport
          for (var j = 0; j < res.data.product.transport.length; ++j) {
            var auxTransport = {
              selectedTransport: res.data.product.transport[j].transport,
              capacity: res.data.product.transport[j].capacity,
              distance: res.data.product.transport[j].distance,
            };
            this.rowData.push(auxTransport);
          }
          //disabled selects transport

          //Recipient
          for (var k = 0; k < res.data.product.recipient.length; ++k) {
            var auxRecipient = {
              selectedRecipient: res.data.product.recipient[k].recipient,
              dimensionsRecipient: res.data.product.recipient[k].dimensions,
            };
            this.rowDataRecipient.push(auxRecipient);
          }
          //disabled selects recipients
        });
      }
    },
    getAllTypesProd() {
      axios.get("/getAllTypeProd").then((res) => {
        this.listTypeProd = res.data.message;
      });
    },
    getAllCountries() {
      axios.get("/getAllCountries").then((res) => {
        this.listCountries = res.data.message;
      });
    },
    getAllStatesByCountry(country){
      axios.get("/getallStatesBycountry/" + country).then((res) => {
        this.listStates = res.data.message;
      });
    },
    getAllCitiesByState(country,state){
      axios.get("/getAllCitiesByState/" + country + "/" + state).then((res) => {
        this.listCities = res.data.message;
      });
    },
    changeOrigin(city){
      this.latitudeOrigin = city.latitude;
      this.longitudeOrigin = city.longitude;
      this.totalDistance = this.calcCrow(this.latitudeOrigin,this.longitudeOrigin,41.3879,2.16992).toFixed(3);
 
    },
    changeCountry(country){
      this.getAllStatesByCountry(country);
    },
    changeState(country,state){
      this.getAllCitiesByState(country,state);
    },
    calcCrow(latitude1, longitude1, latitude2, longitude2) 
    {
      var R = 6371; // km
      var dLat = this.toRad(latitude2-latitude1);
      var dLon = this.toRad(longitude2-longitude1);
      var lat1 = this.toRad(latitude1);
      var lat2 = this.toRad(latitude2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    },
    toRad(Value) {
        return Value * Math.PI / 180;
    },

    changeFoodType(typeFood) {
      this.getAllFoodsByTypeProd(typeFood);
    },
    checkGeneralInfo() {
      if (
        this.productName == "" ||
        this.productDescription == "" ||
        this.city == "" ||
        this.productType == "" ||
        this.productQuantity == ""
      )
        this.mensajeGeneralInfo = "Todos los campos son obligatorios";
      else this.mensajeGeneralInfo = "";
    },
    checkDistance(){
      var distanceTransport = this.transportInstances
      var auxDistance = 0;
      for(var i = 0; i < distanceTransport.length; ++i){
        auxDistance = auxDistance + parseInt(distanceTransport[i].distance);
      }
      if(auxDistance < this.totalDistance){
        this.mensajeDistancias = "La distancia de los transportes debe ser mayor o igual a la distancia entre la ciudades origen y destino."
      }
      else this.mensajeDistancias = ""
    },
    checkProcurementInfo() {
      if (this.Water == "" || this.Electricity == "")
        this.mensajeProcurement = "Todos los campos son obligatorios";
      else this.mensajeProcurement = "";
    },
    checkInfoTransportAdded() {
      if (
        this.selectedTransport.name == "" ||
        this.capacity == "" ||
        this.distance == ""
      )
        this.mensajeTransport =
          "Todos los campos del Transportes son obligatorios";
      else if (
        this.capacity >= this.maxCapacity ||
        this.distance >= this.maxDistance
      )
        this.mensajeTransport = "Comprueba los valores máximos";
        else this.mensajeTransport = ""
    },
    checkInfoRecipient() {
      if (this.selectedRecipient == "" || this.dimensionsRecipient == "")
        this.mensajeRecipient = "Todos los campos del envase son obligatorios";
      else this.mensajeRecipient = "";
    },
    checkInfoFood() {
      if (this.selectedFood == "" || this.quantityFood == "")
        this.mensajeFood = "Todos los campos del alimento son obligatorios";
      else this.mensajeFood = "";
    },
    getAllFoodTypes() {
      axios.get("/getAllTypeProd").then((res) => {
        this.listFoodTypes = res.data.message;
      });
    },
    getAllFoodsByTypeProd(typeFood) {
      axios.get("/getAllFoodsByTypeProd/" + typeFood).then((res) => {
        this.listFoods = res.data.message;
      });
    },

    getAllFoods() {
      axios.get("/getAllFoods").then((res) => {
        this.listFoods = res.data.message;
      });
    },
    deleteTransport(index) {
      this.rowData.splice(index, 1);
      this.transportInstances.splice(index, 1);
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
    deleteFood(index) {
      this.foodInstances.splice(index, 1);
      this.rowDataFood.splice(index, 1);
    },
    addFood() {
      this.checkInfoFood();
      if (this.mensajeFood == "") {
        var newFood = {
          selectedFood: this.selectedFood,
          quantityFood: this.quantityFood,
          CO2PerKg: this.CO2PerKg,
        };
        this.rowDataFood.push(newFood);
        this.createFoodInstances(newFood);
        this.selectedFoodType = "";
        this.selectedFood = "";
        this.quantityFood = "";
      }
    },
    createFoodInstances(newFood) {
      let newFoodInstance = {
        food: newFood.selectedFood,
        quantity: newFood.quantityFood,
      };
      axios
        .post("/addFoodInstance", newFoodInstance, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(
          (res) => {
            this.error = "";
            this.mensaje = "Alimento creado";
            this.name = "";
            this.foodInstances.push(newFoodInstance);
          },
          (err) => {
            this.error = err.response.data.error;
          }
        );
    },
    deleteRecipient(index) {
      this.rowDataRecipient.splice(index, 1);
      this.recipientInstances.splice(index, 1);
    },
    getAllRecipients() {
      axios.get("/getAllRecipients").then((res) => {
        this.listRecipients = res.data.message;
      });
    },
    addTransport() {
      this.checkInfoTransportAdded();
      if (this.mensajeTransport == "") {
        var newTransport = {
          selectedTransport: this.selectedTransport,
          capacity: this.capacity,
          distance: this.distance,
        };
        this.rowData.push(newTransport);
        this.createTransportInstances(newTransport);
        this.selectedTransport = "";
        this.capacity = "";
        this.distance = "";
      }
    },
    createTransportInstances(newTransport) {
      let newTransportInstance = {
        transport: newTransport.selectedTransport,
        capacity: newTransport.capacity,
        distance: newTransport.distance,
      };
      axios
        .post("/addTransportInstance", newTransportInstance, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(
          (res) => {
            this.error = "";
            this.mensaje = "Producto creado";
            this.name = "";
            this.transportInstances.push(newTransportInstance);
          },
          (err) => {
            this.error = err.response.data.error;
          }
        );
    },
    addRecipient() {
      this.checkInfoRecipient();
      if (this.mensajeRecipient == "") {
        var newRecipient = {
          selectedRecipient: this.selectedRecipient,
          dimensionsRecipient: this.dimensionsRecipient,
        };
        this.rowDataRecipient.push(newRecipient);
        this.createRecipientInstances(newRecipient);

        this.dimensionsRecipient = "";
      }
    },
    createRecipientInstances(newRecipient) {
      let newRecipientInstance = {
        recipient: newRecipient.selectedRecipient,
        dimensions: newRecipient.dimensionsRecipient,
      };
      axios
        .post("/addRecipientInstance", newRecipientInstance, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(
          (res) => {
            this.error = "";
            this.mensaje = "Producto creado";
            this.name = "";
            this.recipientInstances.push(newRecipientInstance);
          },
          (err) => {
            this.error = err.response.data.error;
          }
        );
    },
    addNewProduct() {
      this.checkDistance();
      if(this.mensajeDistancias == ""){
      var imageName = ""
      if(this.image != null)
      imageName = this.image.name;
      let newProduct = {
        //General info
        name: this.productName,
        description: this.productDescription,
        originCountry: this.country.code,
        originState: this.state.iso,
        originCity: this.city.name,
        totalDistance: this.totalDistance,
        latitudeOrigin: this.latitudeOrigin,
        longitudeOrigin: this.longitudeOrigin,
        quantity: this.productQuantity,
        type: this.productType.name, //o Id?
        image: imageName,
        //Procurement
        water: this.Water,
        electricity: this.Electricity,
        //crear las FoodInstances
        foods: this.foodInstances,

        //crear las TransportInstances
        transports: this.transportInstances,
        //crear las WasteInstances
        recipients: this.recipientInstances,
      };
      if (this.$route.query.id != null) {
        //sobreescribir producto
        axios.post("/editProduct/" + this.$route.query.id, newProduct, {
          headers: { authorization: "Bearer " + localStorage.getItem("token")},
        })
        .then(
          (res) => {
            console.log(res);
            this.error = "";
            this.mensaje = "Producto creado";
            this.$router.push("/productlist");
          },
          (err) => {
            this.error = err.response.data.error;
          })
      }
      else{
      axios
        .post("/addProduct", newProduct, {
          headers: { authorization: "Bearer " + localStorage.getItem("token")},
        })
        .then(
          (res) => {
            console.log(res);
            this.error = "";
            this.mensaje = "Producto creado";
            this.$router.push("/productlist");
          },
          (err) => {
            this.error = err.response.data.error;
          }
        );
      }
    }
    },
  },
};
</script>
<style scoped>
.input--error {
  border-color: red;
}
  *{
  font-family: "Roboto";

}
</style>
