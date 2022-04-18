<template>
  <div class="row">
    <div class="col">
      <table class="table">
        <thead v-if="rowData.length">
          <th scope="col">Recipient</th>
          <th scope="col">CO2Perm3</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in rowData" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.CO2Perm3 }}</td>
            <td>
              <b-button size="sm" variant="outline-danger" @click="deleteRecipient(item, index)">Eliminar</b-button>
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
  name: "RecipientList",
  data() {
    return {
      rowData: [],
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
    getAllRecipients() {
      axios.get("/getAllRecipients").then((res) => {
        this.rowData = res.data.message;
      });
      this.rowData.forEach((element) => {
        this.rowData.push(element);
      });
    },
    deleteRecipient(item, index) {
      axios.delete("/removeRecipient/" + item._id , {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
      this.rowData.splice(index, 1);
    },
  },
};
</script>
