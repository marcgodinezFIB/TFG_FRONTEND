<template>

  <div class="row mt-4" >
    <div class="col-6" style="width: 50%; height: 50%; float: left">
      <div class="row">
        <span>Información general</span>
        <hr />
        <div class="row">
          <div class="col-3">
            <label>Nombre:</label>
          </div>
          <div class="col-9">
            <b-form-input
              trim
              type="text"
              disabled
              v-model="productName"
              class="form-control my-2"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <label>Descripcion:</label>
          </div>
          <div class="col-9">
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
          <div class="col-9">
            <b-form-input
              trim
              type="text"
              disabled
              v-model="productOrigin"
              class="form-control my-2"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <div class="row">
              <label>Agua:</label>
            </div>
            <div class="row">
              <a>(en L)</a>
            </div>
          </div>
          <div class="col-4">
            <b-form-input
              trim
              type="text"
              disabled
              v-model="Electricity"
              class="form-control my-2"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <div class="row">
              <label>Electricidad:</label>
            </div>
            <div class="row">
              <a>(en KWh)</a>
            </div>
          </div>
          <div class="col-4">
            <b-form-input
              trim
              type="text"
              disabled
              v-model="Water"
              class="form-control my-2"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-6" style="width: 50%; height: 50%; float: left">
      <div class="row" v-if="rowData.length">
        <span>Transporte</span>
        <hr />
      </div>
      <div id="table">
        <table class="table mt-2">
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
                  >Eliminar</b-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-6" style="width: 50%; height: 50%; float: left">
      <div class="row" v-if="rowDataFood.length">
        <span>Alimento</span>
        <hr />
      </div>
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
                  >Eliminar</b-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="col-6" style="width: 50%; height: 50%; float: left">
      <div class="row" v-if="rowDataRecipient.length">
        <span>Envases</span>
        <hr />
      </div>
      <div id="table">
        <table class="table mt-2">
          <thead v-if="rowDataRecipient.length">
            <th scope="col">Recipient</th>
            <th scope="col">Dimensions</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in rowDataRecipient" :key="item.id">
              <td>{{ item.selectedRecipient.name }}</td>
              <td>{{ item.dimensionsRecipient }}</td>
              <td>
                <b-button
                  size="sm"
                  variant="outline-danger"
                  @click="deleteRecipient(index)"
                  >Eliminar</b-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "ViewProduct",
  data() {
    return {


      listTypeProd: [],
      mensajeGeneralInfo: "",
      productName: "",
      productDescription: "",
      productOrigin: "",
      productType: "",
      productQuantity: "",
      //image: "",

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
  },
  mounted() {
    this.getAllTypesProd();

    this.getAllTransports();
    this.getAllRecipients();
    this.getAllFoodTypes();
    this.getAllFoods();
  },
  methods: {
    loadProduct() {
      if (this.$route.query.id != "") {
        axios.get("getProduct/" + this.$route.query.id).then((res) => {

          //hide save buttons if not edit
          this.NextStep1();
          //GeneralInfo
          this.isDisabled = true;
          this.productName = res.data.product.name;
          this.productDescription = res.data.product.description;
          this.productOrigin = res.data.product.origin;
          this.productType = res.data.product.description;
          this.productQuantity = res.data.product.quantity;

          //Produccion
          this.isDisabledProcurement = true;
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

          //Transport
          for (var j = 0; j < res.data.product.transport.length; ++j) {
            var auxTransport = {
              selectedTransport: res.data.product.transport[j].transport,
              capacity: res.data.product.transport[j].capacity,
              distance: res.data.product.transport[j].distance,
            };
            this.rowData.push(auxTransport);
          }

          //Recipient
          for (var k = 0; k < res.data.product.recipient.length; ++k) {
            var auxRecipient = {
              selectedRecipient: res.data.product.recipient[k].recipient,
              dimensionsRecipient: res.data.product.recipient[k].dimensions,
            };
            this.rowDataRecipient.push(auxRecipient);
          }
        });
      }
    },
    getAllTypesProd() {
      axios.get("/getAllTypeProd").then((res) => {
        this.listTypeProd = res.data.message;
      });
    },
    changeFoodType(typeFood) {
      this.getAllFoodsByTypeProd(typeFood);
    },
    checkGeneralInfo() {
      if (
        this.productName == "" ||
        this.productDescription == "" ||
        this.productOrigin == "" ||
        this.productType == "" ||
        this.productQuantity == ""
      )
        this.mensajeGeneralInfo = "Todos los campos son obligatorios";
      else this.mensajeGeneralInfo = "";
    },
    NextStep1() {
      this.checkGeneralInfo();
      if (this.mensajeGeneralInfo == "") {
        this.isDisabled = true;
        this.disabledTab2 = false;
        this.step = this.step + 1;
      }
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
      // const formData = new FormData();
      // formData.append("file", this.image);
      let newProduct = {
        //General info
        name: this.productName,
        description: this.productDescription,
        origin: this.productOrigin,
        productQuantity: this.productQuantity,
        typeProd: this.productType, //o Id?
        //image: formData,
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
      axios
        .post("/addProduct", newProduct, {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then(
          (res) => {
            this.error = "";
            this.mensaje = "Producto creado";
            this.$router.push("/productlist");
          },
          (err) => {
            this.error = err.response.data.error;
          }
        );
    },
  },
};
</script>
