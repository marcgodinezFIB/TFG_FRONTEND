<template>
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
            <tr v-for="(item, index) in rowDataRecipient" :key="item.id">
              <td>{{ item.selectedRecipient.name }}</td>
              <td>{{ item.dimensionsRecipient }}</td>
              <td>
                <b-button @click="deleteRecipient(index)">Eliminar</b-button>
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
import axios from "axios";
export default {
  name: "Waste",
  data() {
    return {
      listRecipients: [],
      selectedRecipient: "",
      recipient: "",
      dimensionsRecipient: "",
      rowDataRecipient: [],
      mensajeRecipient: "",
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.getAllRecipients();
  },

  methods: {
addRecipient() {
      //this.checkInfoRecipient();
      //if (this.mensajeRecipient == "") {
      var newRecipient = {
        selectedRecipient: this.selectedRecipient,
        dimensionsRecipient: this.dimensionsRecipient,
      };
      this.rowDataRecipient.push(newRecipient);
      this.dimensionsRecipient = "";
      this.selectedRecipient = "";
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
  },
};
</script>
