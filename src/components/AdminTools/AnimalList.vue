<template>
  <div class="row">
    <div class="col">
      <table class="table">
        <thead v-if="rowData.length">
          <th scope="col">Animal</th>
          <th scope="col">Years</th>
          <th scope="col">Weight</th>
          <th scope="col">CO2PerYear</th>

        </thead>
        <tbody>
          <tr v-for="(item, index) in rowData" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.years }}</td>
            <td>{{ item.weight }}</td>
            <td>{{ item.CO2PerYear }}</td>
            <td>
              <b-button size="sm" variant="outline-danger" @click="deleteAnimal(item, index)">Eliminar</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AnimalList",
  data() {
    return {
      rowData: [],
      mensajeTransport: "",
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.getAllAnimals();
  },
  methods: {
    getAllAnimals() {
      axios.get("/getAllAnimals").then((res) => {
        this.rowData = res.data.message;
      });
      this.rowData.forEach((element) => {
        this.rowData.push(element);
      });
    },
    deleteTransport(item, index) {
      axios.delete("/removeanimal/" + item._id , {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
      this.rowData.splice(index, 1);
    },
  },
};
</script>
