<template>
<div>
  <b-card>
    <b-tabs pills small card vertical>
      <b-tab title="Añadir transporte">
        <b-card-text>
      <CreateTransport/>
        </b-card-text>
      </b-tab>
    <b-tab title="Listado de transportes">
        <b-card-text>
      <TransportList/>
        </b-card-text>
      </b-tab> 
    </b-tabs>
  </b-card>
</div>
</template>

<script>
import axios from "axios";
import CreateTransport from './CreateTransport.vue'
import TransportList from './TransportList.vue'

export default {
  name: "Transports",
      components: { CreateTransport, TransportList},
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
