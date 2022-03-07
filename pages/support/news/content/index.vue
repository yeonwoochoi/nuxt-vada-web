<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <news-board-content-card :path="returnPath" />
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "../../../../components/card/MainCard";
import NewsBoardContentCard from "../../../../components/card/news/NewsBoardContentCard";
import {mapState} from "vuex";

export default {
  name: "index",
  components: {MainCard, NewsBoardContentCard},
  data: () => ({
    header: 'News',
  }),
  computed: {
    ...mapState({
      drawerItems: 'drawerItems'
    }),
    returnPath() {
      return this.drawerItems[4].link
    }
  }
}
</script>

<style scoped>

</style>
