<template>
  <div class="submit-form mt-10 mx-auto">
    <p class="headline mx-4">Login</p>

    <div>
      <v-form @submit.prevent="LoginCheck()" ref="form" lazy-validation>
        <v-text-field
        class="mx-4"
          v-model="tutorial.username"
          :rules="[(v) => !!v || 'Нэвтрэх нэрээ оруулна уу']"
          label="Нэвтрэх нэр"
          required
        ></v-text-field>

        <v-text-field
        class="mx-4"
          v-model="tutorial.password"
          :rules="[(v) => !!v || 'Нууц үгээ оруулна уу']"
          :type="'password'"
          label="Нууц үг"
          required
        ></v-text-field>
        <v-row justify="center" >
          <v-col cols="auto">
            <v-btn color="primary" class="login mt-3" type="submit">login</v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" >
          <p class="mt-3">{{ message }}</p>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import MacDataService from "@/services/MacDataService";

export default {
  name: "login",

  data() {
    return {
      message: "",
      tutorial: {
        username: "",
        password: "",
      },
      submitted: false,
    };
  },

  methods: {
    LoginCheck() {
      const formData = new FormData();
      formData.append("username", this.tutorial.username);
      formData.append("password", this.tutorial.password);

      MacDataService.login(formData).then((result) => {
        if (result.data.status === "failed") {
          this.message = "Нэвтрэх нэр эсвэл нууц үг буруу байна!";
        } else {
          localStorage.setItem("user", JSON.stringify(result.data));
          this.$router.push("/Mac");
          this.submitted = true;
          this.$store.commit("login");
        }
      });
    },
  },
  mounted() {
    this.message = "";
    if (localStorage.getItem("user")) {
      this.$router.push("/Mac");
    }
  },
};
</script>

<style>
.submit-form {
  max-width: 400px;
}
.login {
  justify-content: center;
}
</style>
