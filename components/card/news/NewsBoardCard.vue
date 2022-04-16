<template>
  <v-row align="center" justify="center" class="mb-6 pl-6" style="width: 100%;">
    <v-col cols="12" align="start" class="py-0 pl-4">
      <p class="subtitle-2 my-0">전체 {{ contentCount }}</p>
    </v-col>
    <v-col cols="12">
      <v-data-table
        v-if="$vuetify.breakpoint.smAndDown"
        :header="headers"
        :items="tableContents"
        :items-per-page="itemsPerPage"
        hide-default-footer
        :mobile-breakpoint="960"
        :loading="isLoading"
      >
        <template v-slot:item="{item}">
          <tr style="background-color: transparent">
            <div class="pa-4" @click="onClickContent(item)" style="cursor:pointer;">
              <p class="font-weight-bold subtitle-1" style="width: 100%">
                {{ item['title'] }}
              </p>
              <div style="display: flex; height: fit-content; overflow-x: hidden; text-overflow: ellipsis" class="content-grey-font caption">
                <p class="my-0 mr-2 ellipsis" style="white-space: nowrap; max-width: 130px;">{{ item['author'] }}</p>
                <p class="my-0 mr-2"><v-divider vertical/></p>
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
            :length="totalPage"
            total-visible="10"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            class="mt-6"
            @input="changePage"
          />
        </template>
      </v-data-table>
      <v-data-table
        v-else
        :headers="headers"
        :items="tableContents"
        :items-per-page="itemsPerPage"
        hide-default-footer
        @click:row="onClickContent"
        :loading="isLoading"
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
            :length="totalPage"
            total-visible="10"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            class="mt-6"
            @input="changePage"
          />
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="12" sm="10" md="8" xl="6" class="mt-4 mb-12">
      <div style="display: flex; justify-content: center; height: 30px;">
        <v-text-field
          v-model="searchInputText"
          label="Search"
          single-line
          hide-details
          clearable
          class="pt-0 mt-0"
        >
        </v-text-field>
        <v-btn
          class="elevation-0 ml-3 button-border-grey"
          style="background-color: #F5F5F5"
          outlined
          @click="onClickSearchBtn"
        >
          검색
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "NewsBoardCard",
  props: {
    tableContents: {
      type: Array,
      default: () => []
    },
    totalPage: {
      type: Number,
      default: () => 1
    },
    isLoading: {
      type: Boolean,
      default: () => false
    },
    itemsPerPage: {
      type: Number,
      default: () => 10
    },
    currentPage: {
      type: String,
      default: () => '1'
    },
    keyword: {
      type: String,
      default: () => ''
    },
  },
  mounted() {
    this.init();
  },
  data: () => ({
    search: '',
    searchInputText: '',
    sortBy: 'no',
    searchBy: '전체',
    page: 1,
    sortDesc: true,
    headers: [
      {
        text: 'No',
        align: 'center',
        sortable: false,
        filterable: false,
        value: 'no',
        width: '5%'
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
        text: 'Writer',
        align: 'center',
        sortable: false,
        filterable: false,
        value: 'author',
        width: '100px'
      },
      {
        text: 'Date',
        align: 'center',
        sortable: false,
        filterable: false,
        value: 'created_at',
        width: '120px'
      },
      {
        text: 'Views',
        align: 'center',
        sortable: false,
        filterable: false,
        value: 'view_count',
      },
    ],
    noDataText: 'There is no data',
  }),
  computed: {
    currentPath() {
      return this.$router.currentRoute.path;
    },
    contentCount() {
      return this.tableContents.length;
    }
  },
  methods: {
    init() {
      this.page = parseInt(this.currentPage)
      this.search = !this.keyword ? '' : this.keyword;
      this.searchInputText = this.search
    },
    // query 값 중 page 값이 바뀌면 호출됨
    changePage() {
      let query = !this.search
        ? { page: this.page }
        : { page: this.page, keyword: this.search};
      this.$router.push({
        path: this.currentPath,
        query: query
      })
    },
    // searchBy v-menu 누르면 호출됨
    // 위에 sortBy나 page 값이 바뀌는 것과 다르게 검색하기 버튼을 누르지 않으면,
    // 따로 router push 할 필요가 없으니 그냥 searchBy만 바꿔주는 것임.
    changeSearchBy(searchBy) {
      this.searchBy = searchBy;
    },
    // 검색 버튼 눌렀을 때
    onClickSearchBtn () {
      this.search = this.searchInputText
      this.page = 1;
      this.$router.push({
        path: this.currentPath,
        query: {
          page: this.page,
          keyword: this.search,
        }
      })
    },
    // news content 중 하나 눌렀을 때
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
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content-grey-font {
  font-family: "Roboto", sans-serif;
  font-weight: normal;
  color: rgba(1, 1, 1, 0.55);
  white-space: pre-wrap;
}
.button-border-grey {
  border: rgb(150, 150, 150) 0.01em solid;
}
</style>
