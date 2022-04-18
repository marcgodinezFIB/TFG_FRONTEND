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
                <div class="col-6">
                    <b-button size="sm" variant="outline-secondary" @click="CreateNewVegetal">Crear</b-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios';

export default {
  name: 'CreateVegetal',
data() {
  return {
            name: '',
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
    CreateNewVegetal() {
    let newVegetal = {
        name: this.name,
        }
    axios.post('/addVegetal',newVegetal, {headers: { authorization: "Bearer " + localStorage.getItem('token')}})
        .then(res => {
            this.error = '';
            this.mensaje = 'Vegetal creado'
            this.name = ''
        }, err => {
            this.error = err.response.data.error;
        })
}
  }
}
</script>