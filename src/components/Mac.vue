<template>
  <div class="popup" v-if="openEdit">
    <div class="popup-inner">
      <div v-if="items" class="edit-form mt-3 mx-auto">
        <p class="headline">Edit MAC address</p>

        <v-form ref="form" lazy-validation>
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

          <v-btn color="primary" @click="updateTutorial">
            Update
          </v-btn>
          <v-btn color="light" class="ml-2" to="/Mac" @click="$emit('close')">
            close
          </v-btn>
        </v-form>

        <p v-for="mes in $store.state.message" :key="mes" class="mt-3">
          {{ mes }}
        </p>
      </div>

      <div v-else>
        <p>Please click on a MAC List...</p>
      </div>
    </div>
  </div>
</template>

<script>
import MacDataService from "@/services/MacDataService";

export default {
  name: "Mac",
  props: ["openEdit", "items"],
  emits: ["close"],

  data() {
    return {
      item: null,
      message: "",
    };
  },
  watch: {
    openEdit(newValue) {
      console.log(newValue, "haha");
    },
  },
  methods: {
    getTutorial(id) {
      MacDataService.get(id)
        .then((response) => {
          this.item = response.data;
          this.title = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateTutorial() {
      var formData = new FormData();
      formData.append("id", this.items.id);
      formData.append("mac", this.items.Value);
      formData.append("descr", this.items.Descr);

      console.log("minii update", formData);
      MacDataService.update(formData)
        .then((response) => {
          console.log(response.data);

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
        })
        .catch((e) => {
          console.log(e);
        });
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
