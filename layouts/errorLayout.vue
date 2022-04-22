<template>
  <v-app>
    <v-container class="full-size" fluid>
      <v-row align="center" justify="center" class="full-size">
        <Nuxt/>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "errorLayout",
}
</script>

<style scoped>
.full-size {
  width: 100%;
  height: 100%;
}
</style>
