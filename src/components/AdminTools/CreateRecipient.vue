<template>
<div class="row">
        <div class="col">
        <div class="row">
                <div class="col-6">
                    <b-alert v-if="mensaje != '' " show variant="success">{{mensaje}}</b-alert>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                <label>Nombre:</label>
                </div>
                <div class="col-3">
                <b-form-input trim type="text" required value="aaa" v-model="name" class="form-control my-2" />
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                <label>CO2 por m3:</label>
                </div>
                <div class="col-3">
                <b-form-input trim type="number" required v-model="CO2Perm3" class="form-control my-2" />
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <b-button size="sm" variant="outline-secondary" @click="CreateNewRecipient">Crear</b-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios';

export default {
  name: 'CreateRecipient',
data() {
  return {
            name: '',
            CO2Perm3: '',
            mensaje: ''
        };
},
  created() {
    //user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login');
    }
  },
  methods: {
    CreateNewRecipient() {
    let newRecipient = {
        name: this.name,
        CO2Perm3: this.CO2Perm3
    }
    axios.post('/addRecipient',newRecipient, {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
        .then(res => {
            this.error = '';
            this.mensaje = 'Envase creado'
            this.CO2Perm3 = ''
            this.name = ''
        }, err => {
            this.error = err.response.data.error;
        })
}
  }
}
</script>