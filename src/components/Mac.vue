<template>
  <div class="popup" v-if="openEdit">
    
    <v-progress-circular class="loader" v-show="circular" color="primary" indeterminate :size="70"></v-progress-circular>
    <div class="popup-inner">
      <div v-if="items" class="edit-form mt-3 mx-auto">
        <p class="headline">Edit MAC address</p>
        <v-form :disabled="circular">
          <v-text-field
            v-model="items.Value"
            :rules="[(v) => !!v || 'MAC is required']"
            label="MAC"
            required
          ></v-text-field>

          <v-text-field
            v-model="items.Descr"
            :rules="[(v) => !!v || 'Description is required']"
            label="Description"
            required
          ></v-text-field>

          <v-select
            v-model="items.Device_status"
            label="Choose a type"
            :rules="[(v) => !!v || 'Type is required']"
            :items="['Main', 'TEMP']"
            required
          ></v-select>

          <v-text-field
            v-show="items.Device_status == 'TEMP' "
            v-model="expireDate"
            :rules="[(v) => !!v || 'Duration is required']"
            label="Duration"
            required
            type="date"
          ></v-text-field>

          <v-row justify="center" >
            <v-col cols="auto">
              <v-btn color="primary" @click="updateTutorial" :disabled="circular">
                Update
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn  @click="$emit('close'), refresh()">
                close
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-row justify="center" >
          <p v-for="mes in $store.state.message" :key="mes" >
            {{ mes }}
          </p>
        </v-row>
      </div>

      <div v-else>
        <p>Please reload a MAC List...</p>
        <v-row justify="center" >
            <v-btn  @click="$emit('close'), refresh()">
              close
            </v-btn>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import MacDataService from "@/services/MacDataService";
import moment from 'moment';

export default {
  name: "Mac",
  props: ["openEdit", "items"],
  emits: ["close"],

  data() {
    return {
      item: null,
      message: "",
      circular: false,
      expireDate: null
    };
  },

  watch: {
    openEdit() {
      this.expireDate = this.dateFormater(this.items.expire_date)
    },
  },
  methods: {
    getTutorial(id) {
      this.circular = true;
      MacDataService.get(id)
        .then((response) => {
          this.item = response.data;
          this.title = response.data;
          this.circular = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateTutorial() {
      this.message = "";
      this.circular = true;
      var formData = new FormData();
      if (this.items.id && this.items.Value && this.items.Descr && this.items.Device_status) {
        formData.append("id", this.items.id);
        formData.append("mac", this.items.Value);
        formData.append("descr", this.items.Descr);
        formData.append("device_status", this.items.Device_status);
      }
      if (this.items.Device_status == "TEMP") {
        formData.append("expire_date", this.expireDate);
      }

      MacDataService.update(formData)
        .then((response) => {

          if (response.data.status === "success") {
            this.message = ["Updated successfully!"];
            this.$store.commit("setmessage", this.message);
          } else {
            this.message = [
              response.data.errors.mac,
              response.data.errors.descr,
            ];
            this.$store.commit("setmessage", this.message);
          }
          this.circular = false;
        })
        .catch((e) => {
          console.log(e);
          this.$store.commit("setmessage", "Хүсэлт__амжилтгүй");
          this.circular = false;
        });
    },

    refresh() {
      this.message = "";
      this.$store.commit("setmessage", []);
    },

    dateFormater(value) {
      if (value) {
          return moment(String(value)).format('YYYY-MM-DD');
      }
  },
  },



  mounted() {
    // this.message = "";
    this.getTutorial(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 400px;
  width: 350px;
  margin: auto;
}
.popup {
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
}
</style>
