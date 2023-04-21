<template>
  <div class="popup" v-if="open">
    <v-progress-circular class="loader" v-show="circular" color="primary" indeterminate :size="70"></v-progress-circular>
    <div class="popup-inner" >
      <div class="submit-form mt-3 mx-auto">
        <p class="headline">Add MAC address</p>
        <div>
          <v-form  @submit="saveTutorial" :disabled="circular">
            <v-text-field
              v-model="tutorial.title"
              :rules="[(v) => !!v || 'MAC address is required']"
              label="MAC address"
              required
            ></v-text-field>

            <v-text-field
              v-model="tutorial.description"
              :rules="[(v) => !!v || 'Description is required']"
              label="Description"
              required
            ></v-text-field>

            <v-select
            v-model="tutorial.type"
              label="Choose a type"
              :rules="[(v) => !!v || 'Type is required']"
              :items="['Main', 'TEMP']"
              required
            ></v-select>

            <v-text-field
            v-show="tutorial.type == 'TEMP'"
              v-model="tutorial.duration"
              :rules="[(v) => !!v || 'Duration is required']"
              label="Duration"
              type="date"
            ></v-text-field>

            <v-row justify="center" >
              <v-col cols="auto">
                <v-btn color="primary" type="submit" :disabled="circular">
                  Submit</v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn @click="$emit('close'), refresh()"
                  >Close</v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-row justify="center" >
            <p v-for="mes in $store.state.message" :key="mes" >
              {{ mes }}
            </p>

          </v-row>
        </div>

        <!-- <div v-else>
          <v-card class="mx-auto">
            <v-card-title v-for="mes in message" :key="mes">
              {{ mes }}
            </v-card-title>

            <v-card-subtitle>
              Click the button to add new MAC address.
            </v-card-subtitle>

            <v-card-actions>
              <v-btn color="primary" @click="newTutorial">Add</v-btn>
            </v-card-actions>
          </v-card>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import MacDataService from "@/services/MacDataService";

export default {
  name: "add-mac",
  props: ["open"],
  emits: ["close"],
  data() {
    return {
      tutorial: {
        id: null,
        title: null,
        description: null,
        type: null,
        duration: null,
        descr: null,
      },
      message: "",
      circular: false,
      submitted: false,
    };
  },
  methods: {
    saveTutorial() {
      this.circular = true;
      var formData = new FormData();
      if (this.tutorial.title && this.tutorial.description && this.tutorial.type) {
        formData.append("mac", this.tutorial.title);
        formData.append("descr", this.tutorial.description);
        formData.append("device_status", this.tutorial.type);
      }
      if (this.tutorial.type == "TEMP") {
        formData.append("expire_date", this.tutorial.duration);
      }

      MacDataService.create(formData)
        .then((response) => {
          this.tutorial.id = response.data.id;

          if (response.data.status === "success") {
            this.message = ["Submitted successfully!"];
            this.$store.commit("setmessage", this.message);
          } else {
            this.message = [
              response.data.errors.mac,
              response.data.errors.descr,
            ];
            this.$store.commit("setmessage", this.message);
          }
          // setTimeout(this.tutorial.circular = false, 4000);
          this.circular = false;
          // this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
          this.$store.commit("setmessage", "Хүсэлт_амжилтгүй");
          this.circular = false;
        });
    },

    // newTutorial() {
    //   this.submitted = false;
    //   this.tutorial = {};
    // },
    refresh() {
      this.tutorial = {};
      this.$store.commit("setmessage", []);
    },
  },
  mounted() {
    // this.message = "";
  },
};
</script>

<style>
.submit-form {
  max-width: 400px;
  width: 350px;
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
.loader {
  position: absolute;
  z-index: 100;
}
</style>
