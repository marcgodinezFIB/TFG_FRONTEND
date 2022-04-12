<template>
<div class="row">
    <div class="col-6">
        <div class="row">
            <div class="col-6">
                <label>Transporte:</label>
            </div>
            <div class="col-6 my-2">
                <select v-model="selectedTransport" @change="getMaxParams">
                            <option
                            v-for="(transport, _id) in listTransports"
                            :value="transport.name"
                            :key="_id"
                            >
                            {{ transport.name }}
                            </option>
                        </select>
            </div>
        </div>
        <div class="row">
            <div class="col-6 my-2">
                <div class="row"><label>Capacidad</label></div>
                <div class="row"><span  v-if="maxCapacity != '' " >(max: {{maxCapacity}})</span></div>
            </div>
            <div class="col-6">
                <input type="number" v-model="capacity" class="form-control" />
            </div>
        </div>
        <div class="row">
            <div class="col-6 my-2">
                <div class="row"><label>Distancia</label></div>
                <div class="row"><span  v-if="maxDistance !== '' ">(max: {{maxDistance}})</span></div>
            </div>
            <div class="col-6 my-2">
                <input type="number" v-model="distance" class="form-control" />
            </div>
        </div>
        <div class="row" style="text-align: end">
            <div class="col">
                <b-button @click="addTransport">Add</b-button>
            </div>
        </div>
        <div class="row mt-3">
                <div class="col">
                    <b-alert v-if="mensaje != ''" show variant="danger">{{mensaje}}</b-alert>
                </div>
        </div>
    </div>
    <div class="col-6">
        <div id="table">
            <table class="table">
                <thead v-if="rowData.length">
                    <th scope="col">Transport</th>
                    <th scope="col">Capacity</th>
                    <th scope="col">Distance</th>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in rowData" :key="item.id">
                        <td>{{ item.selectedTransport }}</td>
                        <td>{{ item.distance }}</td>
                        <td>{{ item.capacity }}</td>
                        <td>
                            <b-button @click="deleteTransport(index)">Eliminar</b-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>
<script>





import axios from 'axios';
export default {
  name: 'Transport',
data() {
  return {
    listTransports: [],
    selectedTransport: '',
    step: 1,
    transport: '',
    capacity: '',
    distance: '',
    maxDistance: '',
    maxCapacity: '',
    rowData: [],
    mensaje: ''
  };
},
  created() {
    //user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login');
    }
  },
  mounted(){
      this.getAllTransports();
  },
  methods: {
      addTransport(){
          this.checkInfo();
          if(this.mensaje == ''){
              var newTransport = {
                selectedTransport: this.selectedTransport,
                capacity: this.capacity,
                distance: this.distance
                }
                this.rowData.push(newTransport);
                this.selectedTransport = '';
                this.capacity = '';
                this.distance = '';
          }
          
      },
        checkInfo(){
            if(this.selectedTransport == '' || this.capacity == '' || this.distance == '') this.mensaje = 'Todos los campos son obligatorios'
            else if(this.capacity >= this.maxCapacity || this.distance >= this.maxDistance) this.mensaje = 'Comprueba los valores máximos'
        },
        deleteTransport(index){
          this.rowData.splice(index, 1);
      },
      getAllTransports(){
      axios.get('/getAllTransports').then(res => {

          this.listTransports = res.data.message;
          })
        },
        getMaxParams(){
            this.getMaxDistance();
            this.getMaxCapacity();
        },
        getMaxDistance(){
            this.maxDistance = this.listTransports.find(x => x.name == this.selectedTransport).distance;

        },
        getMaxCapacity(){
            this.maxCapacity = this.listTransports.find(x => x.name == this.selectedTransport).capacity            
        }
    }
}
</script>