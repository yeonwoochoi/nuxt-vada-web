<template>
  <v-app>
    <authentication-view />
  </v-app>
</template>

<script>
import AuthenticationView from "./authentication/view/view";
export default {
  name: "AuthenticationLayout",
  components: {AuthenticationView}
}
</script>

<style scoped>

</style>
