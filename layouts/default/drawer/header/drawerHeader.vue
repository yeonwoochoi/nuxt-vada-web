<template>
  <v-list-item>
    <v-list-item-avatar size="70" class="my-4">
      <v-img contain :src="companyLogo"/>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="text-h7 font-weight-medium my-1">
        {{ company.toUpperCase() }}
      </v-list-item-title>
      <v-list-item-subtitle>
        Vuetify {{version}}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DrawerHeader",
  computed: {
    ...mapState({
      company: "company",
      companyLogo: "companyWhiteLogo",
      version: 'vuetifyVersion'
    })
  }
}
</script>

<style scoped>

</style>
