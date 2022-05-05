<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <v-card
              flat
              style="width: 100%; height: fit-content; display: flex; justify-content: center"
            >
              <v-data-table
                :headers="headers"
                :items="contents"
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                :items-per-page="contents.length"
                mobile-breakpoint="0"
                item-key="id"
                show-expand
                hide-default-header
                hide-default-footer
                class='row-height-100 table-border'
                style="width: 97%;"
              >
                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length">
                    <v-card flat width="100%" height="fit-content" style="background-color: rgb(245, 245, 245);" class="py-8 px-6">
                      <pre class="card-content" v-html="`${item.data.answer}`"/>
                    </v-card>
                  </td>
                </template>
                <template v-slot:item.data="{item}">
                  <td class="text-start">
                    <div class="font-weight-bold subtitle-1 mt-1 mb-0 ml-6">
                      {{item.data.title}}
                    </div>
                  </td>
                </template>
              </v-data-table>
            </v-card>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "../../../components/card/MainCard";
export default {
  name: "index",
  auth: false,
  components: {MainCard},
  asyncData({store}) {
    return store.dispatch('faq/readAll').then(
      res => {
        let result = []
        for (let i = 0; i < res.length; i++) {
          let faq = res[i]
          result.push({
            id: faq['id'],
            data: {
              title: faq['title'],
              answer: faq['content']
            }
          })
        }
        return {
          contents: result,
          fetchError: null
        }
      },
      err => {
        return {
          contents: [],
          fetchError: err
        }
      }
    )
  },
  created() {
    this.$store.commit('setSheetTitle', 'FAQ')
    if (!!this.fetchError) {
      this.$errorHandler.showMessage(this.fetchError)
    }
  },
  data: () => ({
    header: '자주 묻는 질문',
    headers: [
      {
        text: '내용',
        value: 'data',
        align: 'center'
      },
      {
        text: '',
        value: 'data-table-expand',
      },
    ],
    expanded: [],
    singleExpand: false,
  })
}
</script>

<style scoped>
.v-data-table__expanded.v-data-table__expanded__content {
  box-shadow: none !important;
  background-color: rgb(245, 245, 245);
}

.table-border {
  border-top: #e5e5e5 1px solid;
  border-bottom: #e5e5e5 1px solid;
}

.card-content {
  white-space: pre-wrap;
  overflow: auto;
}

.v-data-table.row-height-100 td {
  height: 100px !important;
}
</style>
