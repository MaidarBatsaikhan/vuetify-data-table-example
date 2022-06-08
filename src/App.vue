<template>
  <v-app>
    <div>
      <v-app-bar app dark>
        <div class="tw-flex tw-justify-between tw-w-full">
          <div class="tw-flex">
            <div class="d-flex align-center mr-4 h7" color="secondary">
              <img class="tw-h-[35px]" alt="logo" :src="getURL()" />
            </div>

            <!-- <v-btn v-if="isloggedin" to="/Mac" text>
              MAC List
            </v-btn> -->

            <!-- <v-btn v-if="isloggedin" to="/add" text>
              Add
            </v-btn> -->
          </div>
          <!-- {{ $store.state.is_logged_in }} -->
          <!-- <button @click="toggle">test</button> -->
          <v-btn
            v-if="$store.state.is_logged_in"
            text
            class="mr-0"
            @click.prevent="logOut"
          >
            Logout
          </v-btn>
        </div>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<script>
// import store from "./store";

export default {
  name: "app",
  // setup() {
  //   return {
  //     store };
  // },

  data() {
    return {
      isloggedin: false,
      imgPath: require("@/assets/unitel.png"),
    };
  },

  methods: {
    getURL() {
      return this.imgPath;
    },
    storageListener() {
      if (localStorage.getItem("user")) {
        // this.isloggedin = true;
        // this.$store.commit("login");
      }
    },
    logOut() {
      localStorage.removeItem("user");
      this.$router.push("/");
      this.isloggedin = false;
      this.$store.commit("logout");
    },
    // toggle() {
    //   if (this.$store.state.is_logged_in == "yes") this.$store.commit("logout");
    //   else this.$store.commit("login");
    // },
  },
  beforeDestroy() {
    document.removeEventListener("storage", this.storageListener);
  },
  mounted() {
    document.addEventListener("storage", this.storageListener);
    if (localStorage.getItem("user")) {
      this.isloggedin = true;
      this.$store.commit("login");
    }
  },
};
</script>
