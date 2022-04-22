<template>
  <div class="row">
    <div class="col">
      <table class="table">
        <thead v-if="rowData.length">
          <th scope="col">Tipo de alimento</th>
          <th scope="col">Nombre</th>
          <th scope="col">CO2PerKg</th>

        </thead>
        <tbody>
          <tr v-for="(item, index) in rowData" :key="item.id">
            <td>{{ item.foodType }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.CO2PerKg }}</td>
            <td>
              <b-button size="sm" variant="outline-danger" @click="deleteFood(item, index)">Eliminar</b-button>
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
  name: "FoodList",
  data() {
    return {
      rowData: [],
      mensajeFood: "",
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.getAllFoods();
  },
  methods: {
    getAllFoods() {
      axios.get("/getAllFoods").then((res) => {
        this.rowData = res.data.message;
      });
      this.rowData.forEach((element) => {
        this.rowData.push(element);
      });
    },
    deleteFood(item, index) {
      axios.delete("/removeFood/" + item._id , {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
      this.rowData.splice(index, 1);
    },
  },
};
</script>
