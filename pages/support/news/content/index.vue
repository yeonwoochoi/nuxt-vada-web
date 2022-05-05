<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <news-board-content-card :path="returnPath" :contents="newsContent" />
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "../../../../components/card/MainCard";
import NewsBoardContentCard from "../../../../components/card/news/NewsBoardContentCard";

export default {
  name: "index",
  auth: false,
  components: {MainCard, NewsBoardContentCard},
  asyncData({store, query}) {
    return store.dispatch('news/readByIndex', query.uid).then(
      res => {
        let time = !res.updatedAt ? res.createdAt : res.updatedAt
        let created_at = time.split('T')[0]
        let result = {
          title: res.title,
          content: res.content,
          created_at: created_at,
          view_count: res.view
        }

        return {
          newsContent: result
        }
      },
      err => {
        this.$errorHandler.showMessage(err)
      }
    )
  },
  created() {
    this.$store.commit('setSheetTitle', '공지사항')
    let uid = this.$route.query.uid
    this.$store.dispatch('news/addViewCount', uid).then(
      (res) => {},
      err => {
        this.$errorHandler.showMessage(err)
      }
    )
  },
  data: () => ({
    header: '공지사항',
  }),
  computed: {
    returnPath() {
      return '/support/news'
    }
  }
}
</script>

<style scoped>

</style>
