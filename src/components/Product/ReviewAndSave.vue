<template>
    <b-tab title="Revisar y guardar" :active="step ===6">
        <b-card-text>
        <div class="row">
            <div class="col-6">
                <div class="row">
                    <span>General Information</span>
                    <hr>
                    <div class="row">
                        <div class="col-3">
                        <label>Nombre:</label>
                        </div>
                        <div class="col-3">
                        <b-form-input trim type="text" disabled v-model="name" class="form-control my-2" />
                        </div>

                        <div class="col-3">
                        <label>Descripcion:</label>
                        </div>
                        <div class="col-3">
                        <b-form-input trim type="text" disabled v-model="description" class="form-control my-2" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                        <label>Origen:</label>
                        </div>
                        <div class="col-3">
                        <b-form-input trim type="text" disabled v-model="origin" class="form-control my-2" />
                        </div>
                        <div class="col-3">
                        <label>Tipo de producto:</label>
                        </div>
                        <div class="col-3">
                        <b-form-input trim type="text" disabled v-model="selectedTypeProd" class="form-control my-2" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <span>Transport</span>
                    <hr>
                    <Transport/>
                </div>
            </div>
        </div>
        </b-card-text>
    </b-tab>
</template>
<script>
import axios from 'axios';
import Transport from './Transport.vue'
import { eventBus } from '../../main'
export default {
    name: 'ReviewAndSave',
    components: {Transport},
    data() {
        return {
            step: 1,
            listRecipients: [],
            selectedRecipient: '',
            name: '',
            description: '',
            origin: ''
        };
    },
    created() {
        //user is not authorized
        if (localStorage.getItem('token') === null) {
            this.$router.push('/login');
        }
        eventBus.$on('changeBasicInfo', (data) => {
            this.name = name
        });
    }
}
</script>