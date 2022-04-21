<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
              <v-col cols="12">
                <v-card class="elevation-0 px-md-12 px-6 py-12" style="background-color: #F5F5F5; width: 100%; height: fit-content">
                  <v-card-title>
                    <v-text-field
                      v-model="tempSearch"
                      label="검색"
                      outlined
                      hide-details
                      class="pr-sm-4 my-2"
                    />
                    <custom-button
                      :width="`100`"
                      :text="`검색`"
                      @submit="searchData"
                    />
                  </v-card-title>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-data-table
                  v-model="selected"
                  :headers="searchResultHeaders"
                  :items="evaluations"
                  :items-per-page="itemsPerPage"
                  :page.sync="currentPage"
                  hide-default-footer
                  @page-count="totalPage = $event"
                  :mobile-breakpoint="600"
                  show-select
                  item-key="content.applicationNumber"
                  :no-data-text="noDataText"
                  :search="search"
                  :custom-filter="customFilter"
                >
                  <template v-slot:top>
                    <v-btn
                      class="elevation-0 mt-4 mb-6"
                      color="primary"
                      @click="downloadSelectedAll"
                    >
                      보고서다운
                    </v-btn>
                  </template>
                  <template v-slot:item.content="{item}">
                    <td class="text-start ellipsis" style="font-size: 13px;">
                      <v-row align="center" justify="start" class="py-4">
                        <v-col cols="12" class="pb-0">
                          <a
                            class="ellipsis"
                            style="font-size: 1.125em; font-weight: 600; text-decoration: none; color: black;"
                            :onClick="`window.open('${item.content.link}', '_blank', 'width=1080, height=850')`"
                          >
                            {{ item.content.inventionTitle }}
                          </a>
                        </v-col>
                        <v-col md="6" cols="12" class="pb-0">
                          <span>
                            <em class="mr-1">출원번호</em>
                            {{ item.content.applicationNumber }}
                          </span>
                        </v-col>
                        <v-col md="6" cols="12" class="pb-0">
                          <span>
                            <em class="mr-1">출원인</em>
                            {{ item.content.applicantName }}
                          </span>
                        </v-col>
                        <v-col md="6" cols="12" class="pb-0 pb-md-3">
                          <span>
                            <em class="mr-1">평가금액</em>
                            {{ item.content.price }}
                          </span>
                        </v-col>
                        <v-col md="6" cols="12" class="pb-0 pb-md-3">
                          <span>
                            <em class="mr-1">보고서만료일</em>
                            {{ item.content.expirationDate }}
                          </span>
                        </v-col>
                      </v-row>
                    </td>
                  </template>
                  <template v-slot:item.detailReport="{item}">
                    <download-button
                      :link="item.content.detailReportLink"
                    >
                      <template v-slot:default>
                        <v-icon color="black">mdi-file-download</v-icon>
                      </template>
                    </download-button>
                  </template>
                  <template v-slot:item.summaryReport="{item}">
                    <v-btn
                      class="elevation-0 pa-0 no-background-hover"
                      :ripple="false"
                      @click="goToSummaryReport(item)"
                      color="transparent"
                    >
                      <v-icon>mdi-note-text</v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:item.detail="{item}">
                    <v-btn
                      class="elevation-0 pa-0 no-background-hover"
                      :ripple="false"
                      @click="goToDetail(item)"
                      color="transparent"
                    >
                      <v-icon>mdi-chart-box</v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:footer>
                    <v-pagination
                      v-model="currentPage"
                      :length="totalPage"
                      total-visible="10"
                      prev-icon="mdi-menu-left"
                      next-icon="mdi-menu-right"
                      class="mt-6"
                    />
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "../../../../components/card/MainCard";
import DownloadButton from "../../../../components/button/DownloadButton";
import CustomButton from "../../../../components/button/CustomButton";

export default {
  name: "evaluationList",
  components: {CustomButton, DownloadButton, MainCard},
  asyncData({ store, $util }) {
    return {
      evaluations: [
        {
          indexNo: 1,
          content: {
            inventionTitle: '이미지센서 셀, 상기 이미지센서 셀들을 복수 개 구비하는 이미지센서 어레이를 구비하는 이미지센서 및\n' +
              '                    상기 이미지센서를 구비하는 카메라시스템(Image sensor cell, image sensor including image\n' +
              '                    sensor array including plurality of the image sensor cells and camera\n' +
              '                    system including the image sensor)',
            registerNumber: '1019870006388',
            registerDate: '1987/07/11',
            applicationNumber: '1020147002912',
            applicantName: '삼성전자주식회사',
            personName: '권리자명',
            link: $util.getKiprisDoiLink('1020147002912'),
            detailReportLink: `ai.kunsan.ac.kr:3000/uploads/files-1637042697203.pdf`,
            price: '10000 KRW',
            expirationDate: '2021-03-30 ~ 2022-03-30',
          }
        },
        {
          indexNo: 2,
          content: {
            inventionTitle: '에스트로겐 수용체 억제제로서의 벤조티오펜 유도체',
            registerNumber: '10-2016-7002876',
            registerDate: '1987/07/11',
            applicationNumber: '1020167002876',
            applicantName: '글락소스미스클라인 인털렉츄얼 프로퍼티 디벨로프먼트 리미티드',
            personName: '글락소스미스클라인 인털렉츄얼 프로퍼티 디벨로프먼트 리미티드',
            link: $util.getKiprisDoiLink('1020147002912'),
            detailReportLink: `ai.kunsan.ac.kr:3000/uploads/files-1637042697203.pdf`,
            price: '12000 KRW',
            expirationDate: '2022-02-15 ~ 2023-02-15',
          }
        },
      ]
    }
  },
  created() {
    this.$store.commit('setSheetTitle', '평가목록조회')
    this.$store.commit('patent/resetSelectedEval')
  },
  data: () => ({
    header: '평가결과조회',
    tempSearch: '',
    search: '',
    currentPage: 1,
    itemsPerPage: 5,
    totalPage: 0,
    noDataText: '',
    searchResultHeaders: [
      {
        text: 'No',
        align: 'center',
        sortable: false,
        filterable: false,
        value: 'indexNo',
        width: '7%'
      },
      {
        text: '내용',
        align: 'start',
        sortable: false,
        value: 'content',
      },
      {
        text: '보고서다운',
        align: 'center',
        sortable: false,
        filterable: false,
        width: '96px',
        value: 'detailReport'
      },
      {
        text: '요약보고서',
        align: 'center',
        sortable: false,
        filterable: false,
        value: 'summaryReport'
      },
      {
        text: '상세보기',
        align: 'center',
        sortable: false,
        filterable: false,
        value: 'detail',
      },
    ],
  }),
  computed: {
    selected: {
      get () {
        return this.$store.getters['patent/getSelectedEval']
      },
      set (value) {
        return this.$store.commit('patent/setSelectedEval', value)
      }
    },
    currentPath() {
      return this.$router.currentRoute.path;
    },
  },
  methods: {
    goToSummaryReport({content}) {
      // TODO: summary Id 로 바꾸기
      this.$router.push('/service/evaluation/summary/' + content.applicationNumber)
    },
    goToDetail({content}) {
      this.$router.push('/service/analysis/' + content.applicationNumber)
    },
    changePage() {
      let query = { page: this.currentPage }
      if (!!this.search) query.keyword = this.search;
      this.$router.push({
        path: this.currentPath,
        query: query
      })
    },
    downloadSelectedAll() {
      console.dir(this.selected)
      console.dir(this.selected.length)
    },
    searchData() {
      this.search = this.tempSearch
      this.noDataText = !!this.search ? '검색결과 없음' : ''
    },
    customFilter(items, search, filter) {
      if (!search || !items) return items;
      if (items.inventionTitle.includes(search) || items.registerNumber.includes(search) || items.applicationNumber.includes(search) || items.applicantName.includes(search)) {
        return items;
      }
      return null
    }
  },
}
</script>

<style scoped>
.no-background-hover::before {
  background-color: transparent !important;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
}

p {
  margin-bottom: 0;
}

em {
  font-size: 0.95em;
  display: inline-block;
  background-color: #e5e5e5;
  margin-right: 0.25em;
  padding: 0 0.4em;
  border-radius: 20px;
  text-align: center;
  width: fit-content;
  font-style: normal;
}
</style>
