<template>
<div>
  <b-card>
    <b-tabs pills small card vertical>
      <b-tab title="Añadir transporte">
        <b-card-text>
      <CreateTransport/>
        </b-card-text>
      </b-tab>
      <b-tab title="Lista de transportes">
        <b-card-text>
      <TransportList/>
        </b-card-text>
      </b-tab>
      <b-tab title="Añadir tipo de producto">
        <b-card-text>
      <CreateTypeProd/>
        </b-card-text>
      </b-tab>
      <b-tab title="Añadir animal">
        <b-card-text>
      <CreateAnimal/>
        </b-card-text>
      </b-tab>
      <b-tab title="Añadir vegetal">
        <b-card-text>
      <CreateVegetal/>
        </b-card-text>
      </b-tab>
      <b-tab title="Añadir envase">
        <b-card-text>
      <CreateRecipient/>
        </b-card-text>
      </b-tab>
      <br>
      <b-tab title="Añadir envase">
        <b-card-text>
      <CreateRecipient/>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</div>
</template>
<script>

import axios from 'axios';
import CreateTransport from './AdminTools/CreateTransport.vue'
import TransportList from './AdminTools/TransportList.vue'

import CreateTypeProd from './AdminTools/CreateTypeProd.vue'
import CreateAnimal from './AdminTools/CreateAnimal.vue'
import CreateRecipient from './AdminTools/CreateRecipient.vue'
import CreateVegetal from './AdminTools/CreateVegetal.vue'

export default {
  name: 'AdminTools',
    components: { CreateTransport, CreateTypeProd,CreateAnimal, CreateRecipient,CreateVegetal, TransportList},

data() {
  return { 
  };
},
  created() {
    //user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login');
    }
  }
}
</script>