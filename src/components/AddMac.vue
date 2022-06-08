<template>
  <div class="popup" v-if="open">
    <div class="popup-inner">
      <div class="submit-form mt-3 mx-auto">
        <p class="headline">Add MAC address</p>

        <div>
          <v-form ref="form" lazy-validation @submit="saveTutorial">
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
            <v-btn color="primary" class="mt-3" type="submit">Submit</v-btn>
            <v-btn class="mt-3 ml-3" @click="$emit('close'), refresh()"
              >Close</v-btn
            >
          </v-form>
          <p v-for="mes in $store.state.message" :key="mes" class="mt-3">
            {{ mes }}
          </p>
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
      message: "",
      tutorial: {
        id: null,
        title: null,
        description: "",
        descr: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveTutorial() {
      var formData = new FormData();
      formData.append("mac", this.tutorial.title);
      formData.append("descr", this.tutorial.description);

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
          // this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
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
</style>
