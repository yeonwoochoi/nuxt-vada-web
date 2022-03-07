<template>
  <v-row align="center" justify="center" class="mb-6 pl-6" style="width: 100%;">
    <v-col cols="6" align="start" class="py-0 pl-4">
      <p class="subtitle-2 my-0">전체 {{ contentCount }}</p>
    </v-col>
    <v-col cols="6" align="end" class="py-0">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            outlined
            v-bind="attrs"
            v-on="on"
            class="elevation-0"
            style="max-width: 110px; max-height: 30px; border: rgb(200, 200, 200) 0.01em solid; background-color: transparent"
          >
            {{ currentSortBy }}
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
            v-for="(item, index) in sortableItems"
            :key="index"
            @click="changeSortBy(item)"
          >
            <v-list-item-title class="caption">{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
    <v-col cols="12">
      <v-data-table
        v-if="isMobile"
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
            v-model="currentPage"
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
            v-model="currentPage"
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
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              v-bind="attrs"
              v-on="on"
              class="elevation-0 mr-4 mt-1 text-start"
              style="min-width: 80px; height: 100%; border: rgb(200, 200, 200) 0.05em solid; background-color: transparent"
            >
              {{ searchBy }}
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              v-for="(item, index) in searchableItems"
              :key="index"
              @click="changeSearchBy(item)"
            >
              <v-list-item-title class="caption">{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
    }
  },
  created() {
    this.init();
  },
  data: () => ({
    // query에 들어있는 값, server에 request 변수에 최종적으로 넣어줄 값
    search: '',
    // v-model로 검색 input field에 binding될 값
    // 합치면 오류뜨길래 일부러 분리함.
    searchInputText: '',
    sortBy: '',
    searchBy: '',
    currentPage: 1,
    itemsPerPage: 10,
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
    // 말 그대로 v-menu에 들어갈 button text array
    sortableItems: [],
    // sortableItems 중에 하나를 누르면 이 Ref를 참조해 header 값을 찾아내고 이를 통해 value들을 분류함
    sortableItemsRef: [
      {
        view: '최신순',
        value: 'no'
      },
      {
        view: '업데이트순',
        value: 'created_at'
      },
      {
        view: '조회순',
        value: 'view_count'
      },
    ],
    searchableItems: [],
    searchableItemsRef: [
      {
        view: '제목',
        value: 'title'
      },
      {
        view: '내용',
        value: 'content'
      },
      {
        view: '작성자',
        value: 'author'
      },
    ],
    noDataText: 'There is no data',
  }),
  computed: {
    currentPath() {
      return this.$router.currentRoute.path;
    },
    currentSortBy() {
      return this.sortableItemsRef.find(v => v.value === this.sortBy).view;
    },
    isMobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
      }
    },
    contentCount() {
      return this.tableContents.length;
    }
  },
  methods: {
    // 초기 설정
    init() {
      // v-menu 에서 sortBy 되는 Header만 추려서 v-menu list에 등록하는 과정
      // 최신순 (no) 업데이트순 (created_at) 조회순 (view_count)
      let result = [];
      if (this.headers) {
        for (let i = 0; i < this.headers.length; i++) {
          let sortableItem = this.sortableItemsRef.find(v => v.value === this.headers[i].value);
          if (sortableItem) {
            result.push(sortableItem.view);
          }
        }
      }
      this.sortableItems = result;


      // 검색 범위 설정할 때, 검색 가능한 Header만 추려서 설정
      result = [];
      result.push('전체')
      for (let i = 0; i < this.searchableItemsRef.length; i++) {
        result.push(this.searchableItemsRef[i].view)
      }
      this.searchableItems = result;
      this.searchBy = this.searchableItems[0];


      // query에 있는 검색 조건, page 등을 받아옴
      this.currentPage = parseInt(this.$route.query.page)
      this.sortBy = this.$route.query.board_list_sort
      this.itemsPerPage = parseInt(this.$route.query.items_per_page)

      if (this.$route.query.keyword) {
        this.search = this.$route.query.keyword
        let searchBy = this.$route.query.target;
        if (searchBy === 'total') {
          this.searchBy = '전체'
        } else {
          this.searchBy = this.searchableItemsRef.find(v => v.value === searchBy).view;
        }
        this.searchInputText = this.search
      } else {
        this.search = '';
        this.searchInputText = this.search;
        this.searchBy = '전체';
      }
    },

    // query 값 중 page 값이 바뀌면 호출됨
    changePage() {
      let searchBy = this.searchBy === '전체' ? 'total' : this.searchableItemsRef.find(v => v.view === this.searchBy).value
      this.$router.push({
        path: this.currentPath,
        query: {
          page: this.currentPage,
          board_list_sort: this.sortBy,
          items_per_page: this.itemsPerPage,
          keyword: this.search,
          target: searchBy
        }
      }).catch(err => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
          err.name !== 'NavigationDuplicated' &&
          !err.message.includes('Avoided redundant navigation to current location')
        ) { throw err }
      });
    },

    // query 값 중 sortBy 값이 바뀌면 호출됨
    changeSortBy(sortBy) {
      let targetVal = this.sortableItemsRef.find(v => v.view === sortBy).value
      let target = this.headers.find(h => h.value === targetVal);

      if (!target) {
        this.sortBy = 'no'
      }
      else {
        this.sortBy = targetVal
      }

      this.$router.push({
        path: this.currentPath,
        query: {
          page: 1,
          board_list_sort: this.sortBy,
          items_per_page: this.itemsPerPage
        }
      }).catch(err => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
          err.name !== 'NavigationDuplicated' &&
          !err.message.includes('Avoided redundant navigation to current location')
        ) { throw err }
      });
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
      let searchBy = this.searchBy === '전체' ? 'total' : this.searchableItemsRef.find(v => v.view === this.searchBy).value
      this.currentPage = 1;
      this.$router.push({
        path: this.currentPath,
        query: {
          page: this.currentPage,
          board_list_sort: this.sortBy,
          items_per_page: this.itemsPerPage,
          keyword: this.search,
          target: searchBy
        }
      }).catch(err => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
          err.name !== 'NavigationDuplicated' &&
          !err.message.includes('Avoided redundant navigation to current location')
        ) { throw err }
      });
    },

    // news content 중 하나 눌렀을 때
    onClickContent(item){
      let content_id = this.tableContents.find(v => v.no === item.no).idx;
      this.$router.push({
        path: `${this.currentPath}/content`,
        query: {
          uid: content_id
        }
      }).catch(err => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
          err.name !== 'NavigationDuplicated' &&
          !err.message.includes('Avoided redundant navigation to current location')
        ) { throw err }
      });
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
