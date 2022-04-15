<template>
  <div>
    <b-table :fields="fields" :items="listProd"> </b-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      listProd: [],
      fields: [
        {
          key: "name",
          label: "Name",
        },
        {
          key: "description",
          label: "Description",
        },
        {
          key: "origin",
          label: "Origin",
        },
        {
          key: "water",
          label: "Water",
        },
        {
          key: "electricity",
          label: "Electricity",
        },
        {
          key: "animal",
          label: "Animals",
        },
        {
          key: "vegetal",
          label: "Vegetals",
        },
        {
          key: "transport",
          label: "Transports",
        },
        {
          key: "recipient",
          label: "Recipients",
        },
      ],
    };
  },
  mounted() {
    this.getAllProducts();
  },
  methods: {
    getAllProducts() {
      axios.get("/getAllProducts").then((res) => {
        this.listProd = res.data.message;
      });
    },
  },
};
</script>
