<template>
<div>
  <b-card>
    <b-tabs pills small card vertical>
      <b-tab title="Añadir envase">
        <b-card-text>
      <CreateRecipient/>
        </b-card-text>
      </b-tab>
    <b-tab title="Listado de envases">
        <b-card-text>
      <RecipientList/>
        </b-card-text>
      </b-tab> 
    </b-tabs>
  </b-card>
</div>
</template>

<script>
import axios from "axios";
import CreateRecipient from './CreateRecipient.vue'
import RecipientList from './RecipientList.vue'

export default {
  name: "Recipients",
      components: { CreateRecipient, RecipientList},
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
