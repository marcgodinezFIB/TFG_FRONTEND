<template>
  <div>
    <b-card>
      <b-tabs pills small card vertical>
        <b-tab title="Información general" :active="step === 1">
          <b-card-text>
            <div class="row">
              <div class="col">
                <div class="row">
                  <div class="col-3">
                    <label>Nombre:</label>
                  </div>
                  <div class="col-3">
                    <b-form-input
                      trim
                      type="text"
                      required
                      v-model="productName"
                      class="form-control my-2"
                      :disabled="isDisabled"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <label>Descripcion:</label>
                  </div>
                  <div class="col-3">
                    <b-form-input
                      trim
                      type="text"
                      required
                      v-model="productDescription"
                      class="form-control my-2"
                      :disabled="isDisabled"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <label>Origen:</label>
                  </div>
                  <div class="col-3">
                    <b-form-input
                      trim
                      type="text"
                      required
                      v-model="productOrigin"
                      class="form-control my-2"
                      :disabled="isDisabled"
                    />
                  </div>
                </div>
                <div class="row cascading-dropdown">
                  <div class="col-3">
                    <label>Tipo de producto:</label>
                  </div>
                  <div class="col-3 dropdown">
                    <select v-model="selectedTypeProd">
                      <option
                        v-for="(typeprod, _id) in listTypeProd"
                        :value="typeprod.name"
                        :key="_id"
                      >
                        {{ typeprod.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-6" style="text-align: end">
                    <b-button-group
                      ><b-button
                        size="sm"
                        variant="outline-secondary"
                        @click="EditStep1"
                        >Editar</b-button
                      >
                      <b-button
                        size="sm"
                        variant="outline-secondary"
                        @click="NextStep1"
                        >Guardar y continuar</b-button
                      ></b-button-group
                    >
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-6">
                    <b-alert
                      v-if="mensajeGeneralInfo != ''"
                      show
                      variant="danger"
                      >{{ mensajeGeneralInfo }}</b-alert
                    >
                  </div>
                </div>
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="Producción" :disabled="disabledTab2" :active="step === 2">
          <b-card-text>
            <div class="row">
              <div class="col-6">
                <div class="row">
                  <div class="col-6">
                    <div class="row"><label>Agua:</label></div>
                    <div class="row"><span>(en L)</span></div>
                  </div>
                  <div class="col-6">
                    <b-form-input
                      trim
                      type="number"
                      required
                      :disabled="isDisabledProcurement"
                      value="aaa"
                      v-model="Water"
                      class="form-control my-2"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="row"><label>Electricidad:</label></div>
                    <div class="row"><span>(en KWh)</span></div>
                  </div>
                  <div class="col-6">
                    <b-form-input
                      trim
                      type="number"
                      required
                      :disabled="isDisabledProcurement"
                      v-model="Electricity"
                      class="form-control my-2"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="row"><label>¿Origen Animal?</label></div>
                  </div>
                  <div class="col-6">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        :disabled="isDisabledProcurement"
                        name="inlineRadioAnimalOptions"
                        id="inlineRadioAnimalYes"
                        v-model="isAnimalType"
                        value="isAnimalYes"
                      />
                      <label class="form-check-label" for="inlineRadioYes"
                        >Sí</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        :disabled="isDisabledProcurement"
                        name="inlineRadioAnimalOptions"
                        id="inlineRadioAnimalNo"
                        v-model="isAnimalType"
                        value="isAnimalNo"
                      />
                      <label class="form-check-label" for="inlineRadioNo"
                        >No</label
                      >
                    </div>
                  </div>
                </div>
                <div class="row" v-if="isAnimalType === 'isAnimalYes'">
                  <div class="col-6">
                    <div class="row"><label>Animal</label></div>
                  </div>
                  <div class="col-3 dropdown">
                    <select v-model="selectedAnimal">
                      <option
                        v-for="(animal, _id) in listAnimals"
                        :value="animal"
                        :disabled="isDisabledProcurement"
                        :key="_id"
                        :class="{ 'input--error': !animal }"
                      >
                        {{ animal.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-3">
                    <b-button size="sm" variant="outline-secondary" @click="addAnimal"
                      >Add</b-button
                    >
                  </div>
                </div>
                <div class="row" v-if="isAnimalType === 'isAnimalYes'">
                  <div class="col-6">
                    <div class="row"><label>Cantidad:</label></div>
                    <div class="row"><span>(en Kg)</span></div>
                  </div>
                  <div class="col-6">
                    <b-form-input
                      trim
                      type="number"
                      required
                      :disabled="isDisabledProcurement"
                      v-model="quantityAnimal"
                      class="form-control my-2"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <div class="row"><label>¿Origen Vegetal?</label></div>
                  </div>
                  <div class="col-6">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        :disabled="isDisabledProcurement"
                        name="inlineRadioVegetalOptions"
                        id="inlineRadioVegYes"
                        v-model="isVegetalType"
                        value="isVegetalYes"
                      />
                      <label class="form-check-label" for="inlineRadioVegYes"
                        >Sí</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        :disabled="isDisabledProcurement"
                        name="inlineRadioVegetalOptions"
                        id="inlineRadioVegNo"
                        v-model="isVegetalType"
                        value="isVegetalNo"
                      />
                      <label class="form-check-label" for="inlineRadioVegNo"
                        >No</label
                      >
                    </div>
                  </div>
                </div>
                <div class="row" v-if="isVegetalType === 'isVegetalYes'">
                  <div class="col-6">
                    <div class="row"><label>Vegetal</label></div>
                  </div>
                  <div class="col-3 dropdown">
                    <select v-model="selectedVegetal">
                      <option
                        v-for="(vegetal, _id) in listVegetals"
                        :value="vegetal"
                        :key="_id"
                        :disabled="isDisabledProcurement"
                      >
                        {{ vegetal.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-3">
                    <b-button size="sm" variant="outline-secondary" @click="addVegetal"
                      >Add</b-button
                    >
                  </div>
                </div>
                <div class="row" v-if="isVegetalType === 'isVegetalYes'">
                  <div class="col-6">
                    <div class="row"><label>Abono:</label></div>
                    <div class="row"><span>(en Kg)</span></div>
                  </div>
                  <div class="col-6">
                    <b-form-input
                      trim
                      type="number"
                      :disabled="isDisabledProcurement"
                      v-model="fertilizerVegetal"
                      required
                      class="form-control my-2"
                    />
                  </div>
                </div>
                <div class="row" v-if="isVegetalType === 'isVegetalYes'">
                  <div class="col-6">
                    <div class="row"><label>Pesticidas:</label></div>
                    <div class="row"><span>(en Kg)</span></div>
                  </div>
                  <div class="col-6">
                    <b-form-input
                      trim
                      type="number"
                      required
                      :disabled="isDisabledProcurement"
                      v-model="pesticideVegetal"
                      class="form-control my-2"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <b-alert
                      v-if="mensajeProcurement != ''"
                      show
                      variant="danger"
                      >{{ mensajeProcurement }}</b-alert
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <b-alert v-if="mensajeAnimal != ''" show variant="danger">{{
                      mensajeAnimal
                    }}</b-alert>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <b-alert
                      v-if="mensajeVegetal != ''"
                      show
                      variant="danger"
                      >{{ mensajeVegetal }}</b-alert
                    >
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div id="table">
                  <table class="table">
                    <thead v-if="rowDataAnimal.length">
                      <th scope="col">Name</th>
                      <th scope="col">Cantidad (en Kg)</th>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in rowDataAnimal" :key="item.id">
                        <td>{{ item.selectedAnimal.name }}</td>
                        <td>{{ item.quantityAnimal }}</td>
                        <td>
                          <b-button size="sm"
                            variant="outline-danger"
                            @click="deleteAnimal(index)"
                            >Eliminar</b-button
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div id="table">
                  <table class="table">
                    <thead v-if="rowDataVegetal.length">
                      <th scope="col">Name</th>
                      <th scope="col">Abono (en Kg)</th>
                      <th scope="col">Pesticidas (en Kg)</th>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in rowDataVegetal"
                        :key="item.id"
                      >
                        <td>{{ item.selectedVegetal.name }}</td>
                        <td>{{ item.fertilizerVegetal }}</td>
                        <td>{{ item.pesticideVegetal }}</td>
                        <td>
                          <b-button size="sm"
                            variant="outline-danger"
                            @click="deleteVegetal(index)"
                            >Eliminar</b-button
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-6" style="text-align: end">
                  <b-button-group
                    ><b-button
                      size="sm"
                      variant="outline-secondary"
                      @click="EditStep2"
                      >Editar</b-button
                    >
                    <b-button
                      size="sm"
                      variant="outline-secondary"
                      @click="NextStep2"
                      >Guardar y continuar</b-button
                    ></b-button-group
                  >
                </div>
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="Transporte" :disabled="disabledTab3" :active="step === 3">
          <b-card-text>
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
                        :value="transport"
                        :key="_id"
                        :disabled="isDisabledTransport"
                      >
                        {{ transport.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 my-2">
                    <div class="row"><label>Capacidad</label></div>
                    <div class="row">
                      <span v-if="maxCapacity != ''"
                        >(max: {{ maxCapacity }})</span
                      >
                    </div>
                  </div>
                  <div class="col-6">
                    <input
                      type="number"
                      v-model="capacity"
                      :disabled="isDisabledTransport"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 my-2">
                    <div class="row"><label>Distancia</label></div>
                    <div class="row">
                      <span v-if="maxDistance !== ''"
                        >(max: {{ maxDistance }})</span
                      >
                    </div>
                  </div>
                  <div class="col-6 my-2">
                    <input
                      type="number"
                      v-model="distance"
                      :disabled="isDisabledTransport"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="row" style="text-align: end">
                  <div class="col">
                    <b-button size="sm"
                      variant="outline-secondary"
                      :disabled="isDisabledTransport"
                      @click="addTransport"
                      >Add</b-button
                    >
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col">
                    <b-alert
                      v-if="mensajeTransport != ''"
                      show
                      variant="danger"
                      :disabled="isDisabledTransport"
                      >{{ mensajeTransport }}</b-alert
                    >
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
                      <tr v-for="(item, index) in rowData" :key="item.id">
                        <td>{{ item.selectedTransport.name }}</td>
                        <td>{{ item.distance }}</td>
                        <td>{{ item.capacity }}</td>
                        <td>
                          <b-button size="sm"
                            variant="outline-danger"
                            @click="deleteTransport(index)"
                            >Eliminar</b-button
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6" style="text-align: end">
                <b-button-group
                  ><b-button
                    size="sm"
                    variant="outline-secondary"
                    @click="EditStep3"
                    >Editar</b-button
                  >
                  <b-button
                    size="sm"
                    variant="outline-secondary"
                    @click="NextStep3"
                    >Guardar y continuar</b-button
                  ></b-button-group
                >
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="Residuos" :disabled="disabledTab4" :active="step === 4">
          <b-card-text>
            <div class="row">
              <div class="col-6">
                <div class="row">
                  <div class="col-3">
                    <div class="row"><label>Tipo de envase</label></div>
                  </div>
                  <div class="col-3 dropdown">
                    <select v-model="selectedRecipient">
                      <option
                        v-for="(recipient, _id) in listRecipients"
                        :value="recipient"
                        :key="_id"
                        :disabled="isDisabledRecipient"
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
                    <b-form-input
                      trim
                      type="number"
                      required
                      v-model="dimensionsRecipient"
                      :disabled="isDisabledRecipient"
                      class="form-control my-2"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <b-button size="sm" variant="outline-secondary" @click="addRecipient"
                      >Add</b-button
                    >
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div id="table">
                  <table class="table">
                    <thead v-if="rowDataRecipient.length">
                      <th scope="col">Recipient</th>
                      <th scope="col">Dimensions</th>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in rowDataRecipient"
                        :key="item.id"
                      >
                        <td>{{ item.selectedRecipient.name }}</td>
                        <td>{{ item.dimensionsRecipient }}</td>
                        <td>
                          <b-button size="sm"
                            variant="outline-danger"
                            @click="deleteRecipient(index)"
                            >Eliminar</b-button
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col">
                  <b-alert
                    v-if="mensajeRecipient != ''"
                    show
                    variant="danger"
                    >{{ mensajeRecipient }}</b-alert
                  >
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6" style="text-align: end">
                <b-button-group
                  ><b-button
                    size="sm"
                    variant="outline-secondary"
                    @click="EditStep4"
                    >Editar</b-button
                  >
                  <b-button
                    size="sm"
                    variant="outline-secondary"
                    @click="NextStep4"
                    >Guardar y continuar</b-button
                  ></b-button-group
                >
              </div>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab
          title="Revisar y guardar"
          :disabled="disabledTab5"
          :active="step === 5"
        >
          <b-card-text>
            <div class="row">
              <div class="col-6">
                <div class="row">
                  <span>General Information</span>
                  <hr />
                  <div class="row">
                    <div class="col-3">
                      <label>Nombre:</label>
                    </div>
                    <div class="col-9">
                      <b-form-input
                        trim
                        type="text"
                        disabled
                        v-model="productName"
                        class="form-control my-2"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3">
                      <label>Descripcion:</label>
                    </div>
                    <div class="col-9">
                      <b-form-input
                        trim
                        type="text"
                        disabled
                        v-model="productDescription"
                        class="form-control my-2"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3">
                      <label>Origen:</label>
                    </div>
                    <div class="col-9">
                      <b-form-input
                        trim
                        type="text"
                        disabled
                        v-model="productOrigin"
                        class="form-control my-2"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3">
                      <label>Tipo de producto:</label>
                    </div>
                    <div class="col-9">
                      <b-form-input
                        trim
                        type="text"
                        disabled
                        v-model="selectedTypeProd"
                        class="form-control my-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row" v-if="rowData.length">
                  <span>Transporte</span>
                  <hr />
                </div>
                <div id="table">
                  <table class="table mt-2">
                    <thead v-if="rowData.length">
                      <th scope="col">Transport</th>
                      <th scope="col">Capacity</th>
                      <th scope="col">Distance</th>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in rowData" :key="item.id">
                        <td>{{ item.selectedTransport.name }}</td>
                        <td>{{ item.distance }}</td>
                        <td>{{ item.capacity }}</td>
                        <td>
                          <b-button size="sm"
                            variant="outline-danger"
                            @click="deleteTransport(index)"
                            >Eliminar</b-button
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="row" v-if="rowDataRecipient.length">
                  <span>Envases</span>
                  <hr />
                </div>
                <div id="table">
                  <table class="table mt-2">
                    <thead v-if="rowDataRecipient.length">
                      <th scope="col">Recipient</th>
                      <th scope="col">Dimensions</th>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in rowDataRecipient"
                        :key="item.id"
                      >
                        <td>{{ item.selectedRecipient.name }}</td>
                        <td>{{ item.dimensionsRecipient }}</td>
                        <td>
                          <b-button size="sm"
                            variant="outline-danger"
                            @click="deleteRecipient(index)"
                            >Eliminar</b-button
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row">
                <span>Obtención</span>
                <hr />
              </div>
              <div class="row">
                <div class="col-3">
                  <div class="row"><label>Agua:</label></div>
                  <div class="row"><span>(en L)</span></div>
                </div>
                <div class="col-9">
                  <b-form-input
                    trim
                    type="number"
                    required
                    disabled
                    v-model="Water"
                    class="form-control my-2"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-3">
                  <div class="row"><label>Electricidad:</label></div>
                  <div class="row"><span>(en KWh)</span></div>
                </div>
                <div class="col-9">
                  <b-form-input
                    trim
                    type="number"
                    disabled
                    v-model="Electricity"
                    class="form-control my-2"
                  />
                </div>
              </div>
              <div class="row">
                <table class="table">
                  <thead v-if="rowDataAnimal.length">
                    <th scope="col">Name</th>
                    <th scope="col">Cantidad (en Kg)</th>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in rowDataAnimal" :key="item.id">
                      <td>{{ item.selectedAnimal.name }}</td>
                      <td>{{ item.quantityAnimal }}</td>
                      <td>
                        <b-button size="sm"
                          variant="outline-danger"
                          @click="deleteAnimal(index)"
                          >Eliminar</b-button
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="table">
                <table class="table">
                  <thead v-if="rowDataVegetal.length">
                    <th scope="col">Name</th>
                    <th scope="col">Abono (en Kg)</th>
                    <th scope="col">Pesticidas (en Kg)</th>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in rowDataVegetal" :key="item.id">
                      <td>{{ item.selectedVegetal.name }}</td>
                      <td>{{ item.fertilizerVegetal }}</td>
                      <td>{{ item.pesticideVegetal }}</td>
                      <td>
                        <b-button size="sm"
                          variant="outline-danger"
                          @click="deleteVegetal(index)"
                          >Eliminar</b-button
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div >
              <b-button variant="outline-secondary" size="sm" style="text-align: end;" @click="addNewProduct"
                >Guardar producto</b-button
              >
            </div>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AddProduct",
  data() {
    return {
      step: 1,
      isDisabled: false,
      isDisabledProcurement: false,
      isDisabledTransport: false,
      isDisabledRecipient: false,
      disabledTab2: true,
      disabledTab3: true,
      disabledTab4: true,
      disabledTab5: true,

      listTypeProd: [],
      selectedTypeProd: "",
      mensajeGeneralInfo: "",
      productName: "",
      productDescription: "",
      productOrigin: "",

      Water: "",
      Electricity: "",
      listAnimals: [],
      idAnimal: "",
      selectedAnimal: "",
      quantityAnimal: "",
      isAnimalType: null,
      isVegetalType: null,
      rowDataAnimal: [],
      mensajeAnimal: "",
      listVegetals: [],
      selectedVegetal: "",
      fertilizerVegetal: "",
      pesticideVegetal: "",
      rowDataVegetal: [],
      mensajeVegetal: "",
      mensajeProcurement: "",

      listTransports: [],
      selectedTransport: "",
      transport: "",
      capacity: "",
      distance: "",
      maxDistance: "",
      maxCapacity: "",
      rowData: [],
      mensajeTransport: "",

      listRecipients: [],
      selectedRecipient: "",
      recipient: "",
      dimensionsRecipient: "",
      rowDataRecipient: [],
      mensajeRecipient: "",

      animalInstances: [],
      vegetalInstances: [],
      transportInstances: [],
      recipientInstances: [],
    };
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.getAllTypesProd();
    this.getAllAnimals();
    this.getAllVegetals();
    this.getAllTransports();
    this.getAllRecipients();
  },
  methods: {
    getAllTypesProd() {
      axios.get("/getAllTypeProd").then((res) => {
        this.listTypeProd = res.data.message;
      });
    },
    checkGeneralInfo() {
      if (
        this.productName == "" ||
        this.productDescription == "" ||
        this.productOrigin == "" ||
        this.selectedTypeProd == ""
      )
        this.mensajeGeneralInfo = "Todos los campos son obligatorios";
      else this.mensajeGeneralInfo = "";
    },
    NextStep1() {
      this.checkGeneralInfo();
      if (this.mensajeGeneralInfo == "") {
        this.isDisabled = true;
        this.disabledTab2 = false;
        this.step = this.step + 1;
      }
    },
    EditStep1() {
      this.isDisabled = false;
    },
    NextStep2() {
      this.checkProcurementInfo();
      if (this.mensajeProcurement == "") {
        this.isDisabledProcurement = true;
        this.disabledTab3 = false;
        this.step = this.step + 1;
      }
    },
    EditStep2() {
      this.isDisabledProcurement = false;
    },
    NextStep3() {
      this.isDisabledTransport = true;
      this.disabledTab4 = false;
      this.step = this.step + 1;
      this.mensajeTransport = "";
    },
    EditStep3() {
      this.isDisabledTransport = false;
    },
    NextStep4() {
      this.step = this.step + 1;
      this.disabledTab5 = false;
    },
    checkProcurementInfo() {
      if (this.Water == "" || this.Electricity == "")
        this.mensajeProcurement = "Todos los campos son obligatorios";
      else this.mensajeProcurement = "";
    },
    checkInfoAnimal() {
      if (this.selectedAnimal == "" || this.quantityAnimal == "")
        this.mensajeAnimal = "Todos los campos del animal son obligatorios";
      else this.mensajeAnimal = "";
    },
    checkInfoVegetal() {
      if (
        this.selectedVegetal == "" ||
        this.pesticideVegetal == "" ||
        this.fertilizerVegetal == ""
      )
        this.mensajeVegetal = "Todos los campos del vegetal son obligatorios";
      else this.mensajeVegetal = "";
    },
    checkInfoTransportAdded() {
      if (
        this.selectedTransport.name == "" ||
        this.capacity == "" ||
        this.distance == ""
      )
        this.mensajeTransport =
          "Todos los campos del transporte son obligatorios";
      else if (
        this.capacity >= this.maxCapacity ||
        this.distance >= this.maxDistance
      )
        this.mensajeTransport = "Comprueba los valores máximos";
    },
    checkInfoRecipient() {
      if (this.selectedRecipient == "" || this.dimensionsRecipient == "")
        this.mensajeRecipient = "Todos los campos del envase son obligatorios";
      else this.mensajeRecipient = "";
    },
    deleteVegetal(index) {
      this.rowDataVegetal.splice(index, 1);
      this.vegetalInstances.splice(index, 1);
    },
    getAllVegetals() {
      axios.get("/getAllVegetals").then((res) => {
        this.listVegetals = res.data.message;
      });
    },
    isAnimal(event) {
      var optionText = event.target.value;
      this.Water = optionText;
    },
    getAllAnimals() {
      axios.get("/getAllAnimals").then((res) => {
        this.listAnimals = res.data.message;
      });
    },
    deleteTransport(index) {
      this.rowData.splice(index, 1);
      this.transportInstances.splice(index, 1);
    },
    getAllTransports() {
      axios.get("/getAllTransports").then((res) => {
        this.listTransports = res.data.message;
      });
    },
    getMaxParams() {
      this.getMaxDistance();
      this.getMaxCapacity();
    },
    getMaxDistance() {
      this.maxDistance = this.listTransports.find(
        (x) => x.name == this.selectedTransport.name
      ).distance;
    },
    getMaxCapacity() {
      this.maxCapacity = this.listTransports.find(
        (x) => x.name == this.selectedTransport.name
      ).capacity;
    },
    deleteRecipient(index) {
      this.rowDataRecipient.splice(index, 1);
      this.recipientInstances.splice(index, 1);
    },
    getAllRecipients() {
      axios.get("/getAllRecipients").then((res) => {
        this.listRecipients = res.data.message;
      });
    },
    deleteAnimal(index) {
      this.rowDataAnimal.splice(index, 1);
      this.animalInstances.splice(index, 1);
    },
    addAnimal() {
      this.checkInfoAnimal();
      if (this.mensajeAnimal == "") {
        var newAnimal = {
          selectedAnimal: this.selectedAnimal,
          quantityAnimal: this.quantityAnimal,
        };
        this.rowDataAnimal.push(newAnimal);
        this.createAnimalInstances(newAnimal);
        this.selectedAnimal = "";
        this.quantityAnimal = "";
      }
    },
    createAnimalInstances(newAnimal) {
      let newAnimalInstance = {
        animal: newAnimal.selectedAnimal,
        quantity: newAnimal.quantityAnimal,
      };
      axios
        .post("/addAnimalInstance", newAnimalInstance, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(
          (res) => {
            this.error = "";
            this.mensaje = "Producto creado";
            this.name = "";
            this.animalInstances.push(newAnimalInstance);
          },
          (err) => {
            this.error = err.response.data.error;
          }
        );
    },
    addVegetal() {
      this.checkInfoVegetal();
      if (this.mensajeVegetal == "") {
        var newVegetal = {
          selectedVegetal: this.selectedVegetal,
          fertilizerVegetal: this.fertilizerVegetal,
          pesticideVegetal: this.pesticideVegetal,
        };
        this.rowDataVegetal.push(newVegetal);
        this.createVegetalInstances(newVegetal);

        this.fertilizerVegetal = "";
        this.pesticideVegetal = "";
      }
    },
    createVegetalInstances(newVegetal) {
      let newVegetalInstance = {
        vegetal: newVegetal.selectedVegetal,
        pesticide: newVegetal.pesticideVegetal,
        fertilizer: newVegetal.fertilizerVegetal,
      };
      axios
        .post("/addVegetalInstance", newVegetalInstance, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(
          (res) => {
            this.error = "";
            this.mensaje = "Producto creado";
            this.name = "";
            this.vegetalInstances.push(newVegetalInstance);
          },
          (err) => {
            this.error = err.response.data.error;
          }
        );
    },
    addTransport() {
      this.checkInfoTransportAdded();
      if (this.mensajeTransport == "") {
        var newTransport = {
          selectedTransport: this.selectedTransport,
          capacity: this.capacity,
          distance: this.distance,
        };
        this.rowData.push(newTransport);
        this.createTransportInstances(newTransport);
        this.selectedTransport = "";
        this.capacity = "";
        this.distance = "";
      }
    },
    createTransportInstances(newTransport) {
      let newTransportInstance = {
        transport: newTransport.selectedTransport,
        capacity: newTransport.capacity,
        distance: newTransport.distance,
      };
      axios
        .post("/addTransportInstance", newTransportInstance, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(
          (res) => {
            this.error = "";
            this.mensaje = "Producto creado";
            this.name = "";
            this.transportInstances.push(newTransportInstance);
          },
          (err) => {
            this.error = err.response.data.error;
          }
        );
    },
    addRecipient() {
      this.checkInfoRecipient();
      if (this.mensajeRecipient == "") {
        var newRecipient = {
          selectedRecipient: this.selectedRecipient,
          dimensionsRecipient: this.dimensionsRecipient,
        };
        this.rowDataRecipient.push(newRecipient);
        this.createRecipientInstances(newRecipient);

        this.dimensionsRecipient = "";
      }
    },
    createRecipientInstances(newRecipient) {
      let newRecipientInstance = {
        recipient: newRecipient.selectedRecipient,
        dimensions: newRecipient.dimensionsRecipient,
      };
      axios
        .post("/addRecipientInstance", newRecipientInstance, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(
          (res) => {
            this.error = "";
            this.mensaje = "Producto creado";
            this.name = "";
            this.recipientInstances.push(newRecipientInstance);
          },
          (err) => {
            this.error = err.response.data.error;
          }
        );
    },
    addNewProduct() {
      let newProduct = {
        //General info
        name: this.productName,
        description: this.productDescription,
        origin: this.productOrigin,
        typeProd: this.typeProd, //o Id?
        //Procurement
        water: this.Water,
        electricity: this.Electricity,
        //crear las AnimalInstances
        animals: this.animalInstances,
        //crear las VegetalInstances
        vegetals: this.vegetalInstances,
        //crear las TransportInstances
        transports: this.transportInstances,
        //crear las WasteInstances
        recipients: this.recipientInstances,
      };
      axios
        .post("/addProduct", newProduct, {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then(
          (res) => {
            this.error = "";
            this.mensaje = "Producto creado";
            this.$router.push("/productlist");
          },
          (err) => {
            this.error = err.response.data.error;
          }
        );
    },
  },
};
</script>
<style scoped>
.input--error {
  border-color: red;
}
</style>
