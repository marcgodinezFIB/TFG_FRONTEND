<template>
<div>
  <b-card>
    <b-tabs pills small card vertical>
      <b-tab title="Añadir alimento">
        <b-card-text>
      <CreateFood/>
        </b-card-text>
      </b-tab>
    <b-tab title="Listado de alimentos">
        <b-card-text>
      <FoodList/>
        </b-card-text>
      </b-tab> 
    </b-tabs>
  </b-card>
</div>
</template>

<script>
import axios from "axios";
import CreateFood from './CreateFood.vue'
import FoodList from './FoodList.vue'

export default {
  name: "Foods",
      components: { CreateFood, FoodList},
  data() {
    return {
      
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
};
</script>
