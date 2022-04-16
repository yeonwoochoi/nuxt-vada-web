<template>
  <v-app>
    <authentication-view />
    <snackbar/>
  </v-app>
</template>

<script>
import AuthenticationView from "./authentication/view/view";
import Snackbar from "../components/snackbar/Snackbar";
export default {
  name: "AuthenticationLayout",
  components: {Snackbar, AuthenticationView}
}
</script>

<style scoped>

</style>
