<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Ordenar por campo"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">Ascendiente</option>
              <option :value="true">Descendiente</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filtrar"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Escribe para buscar"
            ></b-form-input>

            <b-input-group-append>
              <b-button size="sm" variant="outline-secondary" :disabled="!filter" @click="filter = ''"
                >Limpiar</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
      <template #cell(actions)="row">
        <b-button-group>
          <b-button
            variant="outline-danger"
            size="sm"
            @click="deleteProduct(row.item, row.index)"
          >
            Delete product
          </b-button></b-button-group
        >
      </template>
    </b-table>
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      ok-only
      @hide="resetInfoModal"
    >
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      items: [],
      fields: [
        {
          key: "name",
          label: "name",
          sortable: true,
          sortDirection: "desc",
          class: "text-center",
        },
        {
          key: "description",
          label: "Description",
          sortable: true,
          class: "text-center",
        },
        {
          key: "origin",
          label: "Origin",
          sortable: true,
          class: "text-center",
        },
        {
          key: "CO2Food",
          label: "CO2Food",
          sortable: true,
          class: "text-center",
        },
        {
          key: "CO2Water",
          label: "CO2Water",
          sortable: true,
          class: "text-center",
        },
        {
          key: "CO2Electricity",
          label: "CO2Electricity",
          sortable: true,
          class: "text-center",
        },
        {
          key: "CO2Procurement",
          label: "CO2Procurement",
          sortable: true,
          class: "text-center",
        },
        {
          key: "CO2Transport",
          label: "CO2Transport",
          sortable: true,
          class: "text-center",
        },
        {
          key: "CO2Recipient",
          label: "CO2Recipient",
          sortable: true,
          class: "text-center",
        },
        {
          key: "CO2Total",
          label: "CO2Total",
          sortable: true,
          class: "text-center",
        },
        { key: "actions", label: "" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      infoModal2: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    // Set the initial number of items
    this.getAllProducts();
    this.totalRows = this.items.length;
  },
  methods: {
    info(item, button) {
      this.infoModal.title = item.name;
      this.infoModal.content = "<h3>" +item.name + "</h3>"
      this.infoModal.content += item.description
      //this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },

    getAllProducts() {
      axios.get("/getAllProducts").then((res) => {
        this.items = res.data.message;
      });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    deleteProduct(item, index) {
      if (confirm("You want to delete that item?")) {
        axios.delete("/removeproduct/" + item._id, {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        });
        this.items.splice(index, 1);
      }
    },
  },
};
</script>
