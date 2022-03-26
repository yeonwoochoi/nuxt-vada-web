<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>

          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>

</template>

<script>
import MainCard from "../../components/card/MainCard";
export default {
  name: "evaluation",
  components: {MainCard},
  data: () => ({
    header: '특허평가',

  })
}
</script>

<style scoped>

</style>
