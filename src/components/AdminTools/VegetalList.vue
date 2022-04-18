<template>
  <div class="row">
    <div class="col">
      <table class="table">
        <thead v-if="rowData.length">
          <th scope="col">Vegetal</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in rowData" :key="item.id">
            <td>{{ item.name }}</td>

            <td>
              <b-button size="sm" variant="outline-danger" @click="deleteVegetal(item, index)">Eliminar</b-button>
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
  name: "VegetalList",
  data() {
    return {
      rowData: [],
      mensajeVegetal: "",
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.getAllVegetals();
  },
  methods: {
    getAllVegetals() {
      axios.get("/getAllVegetals").then((res) => {
        this.rowData = res.data.message;
      });
      this.rowData.forEach((element) => {
        this.rowData.push(element);
      });
    },
    deleteVegetal(item, index) {
      axios.delete("/removeVegetal/" + item._id , {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
      this.rowData.splice(index, 1);
    },
  },
};
</script>
