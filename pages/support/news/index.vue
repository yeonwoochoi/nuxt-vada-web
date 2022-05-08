<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <news-card
              :table-contents="newsData"
            />
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

import MainCard from "../../../components/card/MainCard";
import NewsCard from "../../../components/card/news/NewsCard";

export default {
  name: "index",
  auth: false,
  components: {NewsCard, MainCard},
  asyncData({store}) {
    return store.dispatch('news/readAll').then(
      res => {
        let result = []
        for (let i = res.length-1; i >= 0; i--) {
          let item = res[i]
          let time = item.updatedAt.split('T')[0]
          let created_at = time.split('T')[0]
          result.push({
            no: res.length-i,
            idx: item.id,
            title: item.title,
            content: item.content,
            created_at: created_at,
            view_count: item.view
          })
        }
        return {
          newsData: result,
          totalPage: Math.ceil(result.length / store.state["news/itemsPerPage"]),
          fetchError: null
        }
      },
      err => {
        return {
          newsData: [],
          totalPage: 1,
          fetchError: err
        }
      }
    )
  },
  created() {
    this.$store.commit('setSheetTitle', '공지사항')
    if (!!this.fetchError) {
      this.$errorHandler.showMessage(this.fetchError)
    }
  },
  data: () => ({
    header: '공지사항',
  }),
}
</script>

<style scoped>
</style>
