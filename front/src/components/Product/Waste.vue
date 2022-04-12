<template>
    <div class="row">
        <div class="col">
            <div class="row">
                <div class="col-3">
                <div class="row"><label>Tipo de envase</label></div>
                </div>
                <div class="col-3 dropdown">
                            <select v-model="selectedRecipient">
                                <option
                                v-for="(recipient, _id) in listRecipients"
                                :value="recipient.name"
                                :key="_id"
                                >
                                {{ recipient.name }}
                                </option>
                            </select>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                <div class="row"><label>Dimensiones:</label></div>
                <div class="row"><span>(en m3)</span></div>
                </div>
                <div class="col-3">
                <b-form-input trim type="number" required class="form-control my-2" />
                </div>
            </div>
    </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'Waste',
    data() {
        return {
            step: 1,
            listRecipients: [],
            selectedRecipient: ''
        };
    },
    created() {
        //user is not authorized
        if (localStorage.getItem('token') === null) {
            this.$router.push('/login');
        }
    },
    mounted(){
        this.getAllRecipients();
    },

    methods: {
        getAllRecipients(){
            axios.get('/getAllRecipients').then(res => {

          this.listRecipients = res.data.message;
          })
        },
    }
}
</script>