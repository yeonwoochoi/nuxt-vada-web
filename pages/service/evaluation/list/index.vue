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
                      :disabled="isDownload"
                    />
                    <custom-button
                      :width="`100`"
                      :text="`검색`"
                      @submit="searchData"
                      :is-disable="isDownload"
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
                  item-key="id"
                  :no-data-text="noDataText"
                  :search="search"
                  :custom-filter="customFilter"
                >
                  <template v-slot:top>
                    <v-btn
                      class="elevation-0 mt-4 mb-6"
                      color="primary"
                      @click="downloadSelectedAll"
                      :loading="isDownload"
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
                        <v-col md="6" cols="12" class="pb-0">
                          <span>
                            <em class="mr-1">평가금액</em>
                            {{ item.content.price }}
                          </span>
                        </v-col>
                        <v-col md="6" cols="12" class="pb-0">
                          <span>
                            <em class="mr-1">보고서만료일</em>
                            {{ item.content.expirationDate }}
                          </span>
                        </v-col>
                        <v-col md="6" cols="12" class="pb-0 pb-md-3">
                          <span>
                            <em class="mr-1">등록상태</em>
                            {{ item.content.status }}
                          </span>
                        </v-col>
                      </v-row>
                    </td>
                  </template>
                  <template v-slot:item.detailReport="{item}">
                    <v-btn
                      class="elevation-0 pa-0 no-background-hover"
                      :ripple="false"
                      @click="download(item)"
                      color="transparent"
                      :disabled="isDownload"
                    >
                      <v-icon>mdi-file-download</v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:item.summaryReport="{item}">
                    <v-btn
                      class="elevation-0 pa-0 no-background-hover"
                      :ripple="false"
                      @click="goToSummaryReport(item)"
                      color="transparent"
                      :disabled="isDownload"
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
                      :disabled="isDownload"
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
                      :disabled="isDownload"
                    />
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </template>
        </main-card>
      </v-card>
    </v-row>
    <v-overlay :value="isDownload"/>
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
    return store.dispatch('patent/getEvaluationList').then(
      res => {
        let result = [];
        for (let i = res.length-1; i >= 0; i--) {
          let temp = res[i]
          result.push({
            no: res.length - i,
            id: temp['id'],
            summaryId: temp['summaryId'],
            content: {
              inventionTitle: temp['patent']['items'][0]['inventionTitle'],
              registerNumber: temp['patent']['items'][0]['registerNumber'],
              registerDate: temp['patent']['items'][0]['registerDate'],
              applicationNumber: temp['patent']['items'][0]['applicationNumber'],
              applicantName: temp['patent']['items'][0]['applicantName'],
              personName: '',
              link: $util.getKiprisDoiLink(temp['patent']['items'][0]['applicationNumber']),
              price: '12000 KRW',
              expirationDate: temp['reportExpiredAt'],
              status: temp['patent']['items'][0]['registerStatus']
            }
          })
        }
        return {
          fetchError: null,
          evaluations: result
        }
      },
      err => {
        return {
          fetchError: err,
          evaluations: []
        }
      }
    )
  },
  created() {
    this.$store.commit('setSheetTitle', '평가목록조회')
    this.$store.commit('patent/resetSelectedEval')
    if (!!this.fetchError) {
      this.$errorHandler.showMessage(this.fetchError)
    }
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
        value: 'no',
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
    isDownload: false
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
    goToSummaryReport(item) {
      this.$router.push('/service/evaluation/summary/' + item.summaryId)
    },
    goToDetail({content}) {
      this.$router.push('/service/analysis/' + content.applicationNumber)
    },
    async downloadSelectedAll() {
      if (!this.selected) {
        this.$notifier.showMessage({
          content: '선택한 평가가 없습니다.',
          color: 'error'
        })
        return
      }
      this.isDownload = true;
      for (let i = 0; i < this.selected.length; i++) {
        await this.download(this.selected[i], true)
      }
      this.isDownload = false;
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
    },
    async download(item, isMultiDownload = false) {
      let payload = {
        evaluationId: item.id
      }
      if (!isMultiDownload) this.isDownload = true;
      await this.$store.dispatch('patent/downloadReport', payload).then(
        res => {
          let blob = new Blob([res], {type: "application/pdf"});
          let objectUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = objectUrl;
          link.setAttribute('download', '바다파트너스_평가보고서.pdf');
          document.body.appendChild(link);
          link.click();
          if (!isMultiDownload) this.isDownload = false;
        },
        err => {
          this.$notifier.showMessage({
            content: "보고서 다운 중 오류가 발생했습니다. 다시 시도해주세요.",
            color: 'error'
          })
          if (!isMultiDownload) this.isDownload = false;
        }
      )
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
