<template>
    <div class="row">
        <div class="col">
            <div class="row">
                <div class="col-3">
                <div class="row"><label>Agua:</label></div>
                <div class="row"><span>(en L)</span></div>
                </div>
                <div class="col-3">
                <b-form-input trim type="number" required value="aaa" v-model="Water"  class="form-control my-2" />
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                <div class="row"><label>Electricidad:</label></div>
                <div class="row"><span>(en KWh)</span></div>
                </div>
                <div class="col-3">
                <b-form-input trim type="number" required class="form-control my-2" />
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                <div class="row"><label>¿Origen Animal?</label></div>
                </div>
                <div class="col-3">
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioAnimalOptions" id="inlineRadioAnimalYes" v-model="isAnimalType" value="isAnimalYes">
                    <label class="form-check-label" for="inlineRadioYes">Sí</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioAnimalOptions" id="inlineRadioAnimalNo" v-model="isAnimalType" value="isAnimalNo">
                    <label class="form-check-label" for="inlineRadioNo">No</label>
                    </div>
                </div>
            </div>
            <div class="row" v-if="isAnimalType === 'isAnimalYes'">
                <div class="col-3">
                <div class="row"><label>Animal</label></div>
                </div>
                <div class="col-3 dropdown">
                            <select v-model="selectedAnimal">
                                <option
                                v-for="(animal, _id) in listAnimals"
                                :value="animal.name"
                                :key="_id"
                                >
                                {{ animal.name }}
                                </option>
                            </select>
                </div>
            </div>
            <div class="row" v-if="isAnimalType === 'isAnimalYes'">
                <div class="col-3">
                <div class="row"><label>Cantidad:</label></div>
                <div class="row"><span>(en Kg)</span></div>
                </div>
                <div class="col-3">
                <b-form-input trim type="number" required class="form-control my-2" />
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                <div class="row"><label>¿Origen Vegetal?</label></div>
                </div>
                <div class="col-3">
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioVegetalOptions" id="inlineRadioVegYes" v-model="isVegetalType" value="isVegetalYes">
                    <label class="form-check-label" for="inlineRadioVegYes">Sí</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioVegetalOptions" id="inlineRadioVegNo" v-model="isVegetalType" value="isVegetalNo">
                    <label class="form-check-label" for="inlineRadioVegNo">No</label>
                    </div>
                </div>
            </div>
            <div class="row" v-if="isVegetalType === 'isVegetalYes'">
                <div class="col-3">
                <div class="row"><label>Abono:</label></div>
                <div class="row"><span>(en Kg)</span></div>
                </div>
                <div class="col-3">
                <b-form-input trim type="number" required class="form-control my-2" />
                </div>
            </div>
            <div class="row" v-if="isVegetalType === 'isVegetalYes'">
                <div class="col-3">
                <div class="row"><label>Pesticidas:</label></div>
                <div class="row"><span>(en Kg)</span></div>
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
    name: 'Procurement',
    data() {
        return {
            Water: '',
            listAnimals: [],
            selectedAnimal: '',
            isAnimalType: null,
            isVegetalType: null
        };
    },
    created() {
        //user is not authorized
        if (localStorage.getItem('token') === null) {
            this.$router.push('/login');
        }
    },
    mounted(){
        this.getAllAnimals();
    },

    methods: {
        isAnimal(event){
            var optionText = event.target.value;
            this.Water = optionText;
        },
        getAllAnimals(){
            axios.get('/getAllAnimals').then(res => {

          this.listAnimals = res.data.message;
          })
        },
    }
}
</script>