<template>
<div>
  <b-card>
    <b-tabs pills small card vertical>
      <b-tab title="Añadir tipo de producto">
        <b-card-text>
      <CreateTypeProd/>
        </b-card-text>
      </b-tab>
    <b-tab title="Listado de tipos de producto">
        <b-card-text>
      <TypeProdList/>
        </b-card-text>
      </b-tab> 
    </b-tabs>
  </b-card>
</div>
</template>

<script>
import axios from "axios";
import CreateTypeProd from './CreateTypeProd.vue'
import TypeProdList from './TypeProdList.vue'

export default {
  name: "Foods",
      components: { CreateTypeProd, TypeProdList},
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
