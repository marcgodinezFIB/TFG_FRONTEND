<template>
<div>
  <b-card>
    <b-tabs pills small card vertical>
      <b-tab title="Alimentos">
        <b-card-text>
      <Food/>
        </b-card-text>
      </b-tab>
      <b-tab title="Añadir alimento">
        <b-card-text>
      <CreateFood/>
        </b-card-text>
      </b-tab>
      <b-tab title="Lista de alimentos">
        <b-card-text>
      <FoodList/>
        </b-card-text>
      </b-tab>
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
      <b-tab title="Lista de tipo de productos">
        <b-card-text>
      <TypeProdList/>
        </b-card-text>
      </b-tab>
      <b-tab title="Añadir envase">
        <b-card-text>
      <CreateRecipient/>
        </b-card-text>
      </b-tab>
      <br>
      <b-tab title="Lista de envases">
        <b-card-text>
      <RecipientList/>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</div>
</template>
<script>

import axios from 'axios';

import CreateFood from './AdminTools/CreateFood.vue'
import FoodList from './AdminTools/FoodList.vue'

import CreateTransport from './AdminTools/CreateTransport.vue'
import TransportList from './AdminTools/TransportList.vue'
import TypeProdList from './AdminTools/TypeProdList.vue'
import RecipientList from './AdminTools/RecipientList.vue'

import CreateTypeProd from './AdminTools/CreateTypeProd.vue'
import CreateRecipient from './AdminTools/CreateRecipient.vue'

export default {
  name: 'AdminTools',
    components: { CreateFood, FoodList, CreateTransport, CreateTypeProd, CreateRecipient, TransportList, TypeProdList, RecipientList},

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