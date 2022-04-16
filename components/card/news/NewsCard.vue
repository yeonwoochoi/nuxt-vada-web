<template>
  <v-row align="center" justify="center" class="mb-6 pl-6" style="width: 100%;">
    <v-col cols="12" align="start" class="py-0 pl-4">
      <p class="subtitle-2 my-0">전체 {{ contentCount }}</p>
    </v-col>
    <v-col cols="12">
      <v-data-table
        v-if="$vuetify.breakpoint.smAndDown"
        :headers="headers"
        :items="tableContents"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        hide-default-footer
        @page-count="pageCount = $event"
        :mobile-breakpoint="960"
      >
        <template v-slot:item="{item}">
          <tr style="background-color: transparent">
            <div class="pa-4" @click="onClickContent(item)" style="cursor:pointer;">
              <p class="font-weight-bold subtitle-1" style="width: 100%">
                {{ item['title'] }}
              </p>
              <div style="display: flex; height: fit-content; overflow-x: hidden; text-overflow: ellipsis" class="content-grey-font caption">
                <p class="my-0 mr-2" style="white-space: nowrap">{{ item['created_at'] }}</p>
                <p class="my-0 mr-2"><v-divider vertical/></p>
                <p class="my-0 mr-2" style="white-space: nowrap">{{ item['view_count'] }}</p>
              </div>
            </div>
            <v-divider/>
          </tr>
        </template>
        <template v-slot:footer>
          <v-pagination
            v-model="page"
            :length="pageCount"
          />
        </template>
      </v-data-table>
      <v-data-table
        v-else
        :headers="headers"
        :items="tableContents"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        hide-default-footer
        @page-count="pageCount = $event"
        @click:row="onClickContent"
        :no-data-text="noDataText"
      >
        <template v-slot:item.title="{ item }">
          <td class="text-start ellipsis" style="cursor: pointer; max-width: 400px; font-size: 13px;">
            <div class="ellipsis font-weight-medium">
              {{ item.title }}
            </div>
          </td>
        </template>
        <template v-slot:footer>
          <v-pagination
            v-model="page"
            :length="pageCount"
          ></v-pagination>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "NewsCard",
  props: {
    tableContents: {
      type: Array,
      default: () => []
    },
  },
  data: () => ({
    page: 1,
    pageCount: 0,
    headers: [
      {
        text: 'No',
        align: 'center',
        sortable: false,
        filterable: false,
        value: 'no',
        width: '12%'
      },
      {
        text: 'Title',
        align: 'start',
        sortable: false,
        filterable: false,
        value: 'title',
      },
      {
        text: 'Content',
        align: ' d-none',
        sortable: false,
        filterable: true,
        value: 'content',
      },
      {
        text: 'Date',
        align: 'center',
        sortable: false,
        filterable: false,
        value: 'created_at',
        width: '20%'
      },
      {
        text: 'Views',
        align: 'center',
        sortable: false,
        filterable: false,
        value: 'view_count',
        width: '12%'
      },
    ],
    noDataText: 'There is no data',
  }),
  computed: {
    ...mapState('news', {
      itemsPerPage: "itemsPerPage"
    }),
    currentPath() {
      return this.$router.currentRoute.path
    },
    contentCount() {
      return this.tableContents.length
    }
  },
  methods: {
    onClickContent(item){
      let content_id = this.tableContents.find(v => v.no === item.no).idx;
      this.$router.push({
        path: `${this.currentPath}/content`,
        query: {
          uid: content_id
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
