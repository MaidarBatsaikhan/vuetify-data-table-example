<template>
  <v-row
    class="list px-3 mx-auto tw-w-[100%] sm:tw-w-[100%] md:tw-w-[100%] lg:tw-w-[85%]"
  >
    <AddMac :open="open" @close="open = false" />
    <Mac :openEdit="openEdit" :items="editItem" @close="openEdit = false" />

    <div v-if="delete_pop" class="popup">
      <div class="popup-inner">
        <div class="tw-flex">
          MAC:
          <p class="ml-2 tw-font-bold">{{ this.value }}</p>
        </div>
        <v-btn color="error" @click="deleteTutorial(), (delete_pop = false)">
          delete
        </v-btn>
        <v-btn class="ml-4" @click="delete_pop = false">
          cancel
        </v-btn>
      </div>
    </div>

    <v-col cols="12" md="8">
      <v-text-field
        v-model="Username"
        label="Search by MAC or Description"
      ></v-text-field>
    </v-col>

    <v-col cols="12" md="4" class="mt-2">
      <v-btn small @click="searchTitle">
        Search
      </v-btn>
      <v-btn class="success ml-8" @click="open = true">
        add
      </v-btn>
    </v-col>
    <v-col cols="12" sm="12">
      <v-progress-linear indeterminate v-show="lineLoader"></v-progress-linear>
      <v-card class="mx-auto" tile>
        <v-card-title>List</v-card-title>

        
        <!-- disable-pagination -->
        <v-data-table
          :headers="headers"
          :items="tutorials"
          :hide-default-footer="false"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editTutorial(item)"
              >mdi-pencil</v-icon
            >
            <v-icon
              small
              @click="
                ((id = item.id), (value = item.Value)), (delete_pop = true)
              "
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import MacDataService from "@/services/MacDataService";
import AddMac from "./AddMac.vue";
import Mac from "./Mac.vue";
export default {
  components: {
    AddMac,
    Mac,
  },
  name: "mac-list",
  data() {
    return {
      lineLoader: false,
      delete_pop: false,
      id: null,
      value: null,
      open: false,
      editItem: null,
      openEdit: false,
      tutorials: [],
      Username: "",
      headers: [
        { text: "ID", align: "start", sortable: false, value: "ID" },
        { text: "Username", value: "Username", sortable: false },
        { text: "Attribute", value: "Attribute", sortable: false },
        { text: "OP", value: "op", sortable: false },
        { text: "Type", value: "Device_status", sortable: false },
        { text: "Duration", value: "expire_date", sortable: false },
        { text: "Value", value: "Value", sortable: false },
        { text: "Description", value: "Descr", sortable: false },
        { text: "Action", value: "actions", sortable: false },
      ],
    };
  },
  created: function() {
    if (!localStorage.getItem("user")) {
      this.$router.push("/");
    } else {
      this.refreshList();
    }
  },
  methods: {
    retrieveTutorials() {
      this.lineLoader = true;
      MacDataService.getAll()
        .then((response) => {
          this.tutorials = response.data.list.map(this.getDisplayTutorial);
          this.lineLoader = false;
        })
        .catch((e) => {
          console.log(e);
          this.lineLoader = false;
        });
    },

    refreshList() {
      this.retrieveTutorials();
    },

    searchTitle() {
      this.lineLoader = true;
      MacDataService.findByTitle(this.Username)
        .then((response) => {
          this.tutorials = response.data.list.map(this.getDisplayTutorial);  
        })
        .catch((e) => {
          console.log(e);
          this.lineLoader = false;
        }).finally(() => {
          this.lineLoader = false;
        });
    },

    editTutorial(item) {
      this.$store.commit("setmessage", []);
      this.openEdit = true;
      this.editItem = item;

      // this.$router.push({
      //   params: { id: items.id, items },
      //   name: "tutorial-details",
      //   // props: { item: item },
      // });
    },
    deleteTutorial() {
      this.lineLoader = true;
      var formData = new FormData();
      formData.append("id", this.id);
      MacDataService.delete(formData)
        .then(() => {
          this.lineLoader = false;
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
          this.lineLoader = false;
        });
    },

    getDisplayTutorial(mac) {
      return {
        id: mac.id,
        ID: mac.id.length > 30 ? mac.id.substr(0, 30) + "..." : mac.id,
        Username:
          mac.username.length > 30
            ? mac.username.substr(0, 30) + "..."
            : mac.username,
        Attribute:
          mac.attribute.length > 30
            ? mac.attribute.substr(0, 30) + "..."
            : mac.attribute,
        op: mac.op.length > 30 ? mac.op.substr(0, 30) + "..." : mac.op,
        Value:
          mac.value.length > 30 
            ? mac.value.substr(0, 30) + "..." 
            : mac.value,
        Descr: mac.descr,
        expire_date: mac.expire_date,
        Device_status: mac.Device_status,
        // Expire_date: 
        //   mac.expire_date.length > 30
        //       ? mac.expire_date.substr(0, 15) + "..."
        //       : mac.expire_date,
      };
    },
  },
};
</script>

<style>
/* .list {
  max-width: 70%;
} */
/* .popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-inner {
  border-radius: 8px;
  position: relative;
  background-color: #fff;
  padding: 24px;
} */
</style>
