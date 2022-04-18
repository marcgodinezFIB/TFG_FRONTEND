<template>
  <div class="row">
    <div class="col">
      <table class="table">
        <thead v-if="rowData.length">
          <th scope="col">Transport</th>
          <th scope="col">Capacity</th>
          <th scope="col">Distance</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in rowData" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.distance }}</td>
            <td>{{ item.capacity }}</td>
            <td>
              <b-button size="sm" variant="outline-danger" @click="deleteTransport(item, index)">Eliminar</b-button>
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
  name: "TransportList",
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
    this.getAllTransports();
  },
  methods: {
    getAllTransports() {
      axios.get("/getAllTransports").then((res) => {
        this.rowData = res.data.message;
      });
      this.rowData.forEach((element) => {
        this.rowData.push(element);
      });
    },
    deleteTransport(item, index) {
      axios.delete("/removetransport/" + item._id , {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
      this.rowData.splice(index, 1);
    },
  },
};
</script>
