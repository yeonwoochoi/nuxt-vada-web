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
  auth: false,
  components: {MainCard, NewsBoardContentCard},
  created() {
    this.$store.commit('setSheetTitle', '공지사항')
  },
  data: () => ({
    header: 'News',
  }),
  computed: {
    ...mapState({
      drawerItems: 'drawerItems'
    }),
    returnPath() {
      return this.drawerItems[3].link
    }
  }
}
</script>

<style scoped>

</style>
