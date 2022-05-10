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
                    <v-combobox
                      v-model="searchData"
                      :filter="filter"
                      :hide-no-data="!search"
                      :search-input.sync="search"
                      hide-selected
                      label="특허/출원번호를 입력해주세요."
                      hide-details
                      multiple
                      small-chips
                      solo
                      class="pr-sm-4 my-2"
                      @keypress="isNumber($event)"
                    >
                      <template v-slot:no-data>
                        <v-list-item>
                          <span class="subtitle-1">Enter 키를 누르면 추가됩니다.</span>
                          <v-chip
                            :color="chipColor"
                            label
                            small
                            class="ml-2"
                          >
                            {{ search }}
                          </v-chip>
                        </v-list-item>
                      </template>
                      <template v-slot:selection="{attrs, item, parent, selected}">
                        <v-chip
                          v-if="item === Object(item)"
                          v-bind="attrs"
                          :color="chipColor"
                          :input-value="selected"
                          label
                          small
                        >
                          <span class="pr-2">
                            {{item.text}}
                          </span>
                          <v-icon
                            small
                            @click="parent.selectItem(item)"
                          >
                            $delete
                          </v-icon>
                        </v-chip>
                      </template>
                    </v-combobox>
                    <custom-button
                      :width="`100`"
                      :text="`검색`"
                      class="my-4"
                      @submit="searchByInput"
                      :loading="searchLoading"
                    />
                  </v-card-title>
                  <div style="display: flex; align-items: start; justify-content: end;" class="my-2">
                    <div class="filebox mr-2">
                      <label for="searchFile" style="font-size: 14px">
                        <v-icon color="green" size="25">mdi-file-upload</v-icon>
                        업로드
                      </label>
                      <input
                        ref="searchCsvFile"
                        @change="searchByFile"
                        type="file"
                        id="searchFile"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        :disabled="searchLoading"
                      >
                    </div>
                    <button
                      type="button"
                      class="no-background-hover elevation-0 mx-2 subtitle-2 font-weight-bold"
                      @click="downloadTemplateFile"
                      style="background-color: transparent; color: #666666; height: fit-content"
                      :disabled="searchLoading"
                    >
                      <span>
                          <v-icon>mdi-file-download</v-icon>
                          양식 다운로드
                        </span>
                    </button>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-data-table
                  v-model="selected"
                  :headers="searchResultHeaders"
                  :items="searchResults"
                  :items-per-page="itemsPerPage"
                  :page.sync="currentPage"
                  hide-default-footer
                  @page-count="totalPage = $event"
                  :mobile-breakpoint="600"
                  :loading="searchLoading"
                  :show-select="false"
                  item-key="indexNo"
                  :no-data-text="noDataText"
                >
                  <template v-slot:item.content="{item}">
                    <td class="text-start ellipsis" style="font-size: 13px;">
                      <v-row align="center" justify="start" class="py-4">
                        <v-col cols="12" class="pb-0">
                          <a
                            class="ellipsis"
                            style="font-size: 1.125em; font-weight: 600; text-decoration: none; color: black;"
                            :onClick="`window.open('${$util.getKiprisDoiLink(item.content.applicationNumber)}', '_blank', 'width=1080, height=850')`"
                          >
                            {{ item.content.inventionTitle }}
                          </a>
                        </v-col>
                        <v-col lg="3" md="4" cols="12" class="pb-0">
                          <span>
                            <em class="mr-1">출원번호</em>
                            {{ item.content.applicationNumber }}
                          </span>
                        </v-col>
                        <v-col lg="3" md="4" cols="12" class="pb-0">
                          <span>
                            <em class="mr-1">등록번호</em>
                            {{ item.content.registerNumber }}
                          </span>
                        </v-col>
                        <v-col lg="3" md="4" cols="12" class="pb-0">
                          <span>
                            <em class="mr-1">등록일자</em>
                            {{ item.content.registerDate }}
                          </span>
                        </v-col>
                        <v-col md="6" cols="12" class="pb-0 pb-md-3">
                          <span>
                            <em class="mr-1">출원일자</em>
                            {{ item.content.applicantName }}
                          </span>
                        </v-col>
                        <v-col md="6" cols="12" class="">
                          <span>
                            <em class="mr-1">출원인</em>
                            {{ item.content.applicantName }}
                          </span>
                        </v-col>
                      </v-row>
                    </td>
                  </template>
                  <template v-slot:item.evaluation="{item}">
                    <v-btn
                      class="elevation-0 pa-0 no-background-hover"
                      :ripple="false"
                      @click="evaluateIndividual(item)"
                      color="transparent"
                    >
                      <v-icon>mdi-note-check</v-icon>
                      평가
                    </v-btn>
                  </template>
                  <template v-slot:item.detail="{item}">
                    <v-btn
                      class="elevation-0 pa-0 no-background-hover"
                      :ripple="false"
                      @click="showDetails(item)"
                      color="transparent"
                      :loading="item.loading"
                    >
                      <v-icon>mdi-note-check</v-icon>
                      상세보기
                    </v-btn>
                  </template>
                  <template v-slot:footer>
                    <v-pagination
                      v-if="searchResults.length > 0"
                      v-model="currentPage"
                      :length="totalPage"
                      total-visible="10"
                      prev-icon="mdi-menu-left"
                      next-icon="mdi-menu-right"
                      class="mt-6"
                      :disabled="searchLoading"
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
import MainCard from "../../components/card/MainCard";
import CustomButton from "../../components/button/CustomButton";
import DownloadButton from "../../components/button/DownloadButton";
export default {
  name: "search",
  components: {DownloadButton, CustomButton, MainCard},
  created() {
    this.$store.commit('setSheetTitle', '특허검색')
  },
  data: () => ({
    header: '특허검색',
    searchData: [],
    nonce: 1,
    search: null,
    chipColor: 'grey lighten-3',
    searchFile: null,
    currentPage: 1,
    totalPage: 0,
    itemsPerPage: 5,
    selected: [],
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
        filterable: false,
        value: 'content',
      },
      {
        text: '평가하기',
        align: 'start',
        sortable: false,
        filterable: false,
        value: 'evaluation'
      },
      {
        text: '상세보기',
        align: 'start',
        sortable: false,
        filterable: false,
        value: 'detail',
      },
    ],
    searchResults: [],
    noDataText: '',
    searchLoading: false,
  }),
  watch: {
    searchData (val, prev) {
      if (val.length === prev.length) return
      this.searchData = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: 'grey'
          }
          this.nonce++
        }
        return v
      })
    },
  },
  methods: {
    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },
    // Input field 로 검색했을 때
    searchByInput() {
      let validSearchData = []
      if (this.searchData.length > 0) {
        for (let i = 0; i < this.searchData.length; i++) {
          let tempPatentNumber = this.searchData[i].text
          if (this.searchData[i].text.length === 9) {
            tempPatentNumber = `${this.searchData[i].text}0000`
          }
          if (this.$util.validatePatentNumber(tempPatentNumber)) {
            validSearchData.push(tempPatentNumber)
          }
        }
      }
      else {
        this.$notifier.showMessage({
          content: '검색어를 입력해주십시오.',
          color: 'error'
        })
        return;
      }
      this.searchLoading = true;
      this.$store.dispatch('patent/search', {patentNumbers: validSearchData})
        .then(
          res => {
            let result = []
            for (let i = 0; i < res.length; i++) {
              if (!res[i]['items'] || !res[i]['validatePatent']) continue
              result.push({
                indexNo: i+1,
                content: {
                  inventionTitle: res[i]['items'][0]['inventionTitle'],
                  registerNumber: res[i]['items'][0]['registerNumber'],
                  registerDate: res[i]['items'][0]['registerDate'].replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'),
                  applicationNumber: res[i]['applicationNumber'],
                  applicantName: res[i]['items'][0]['applicantName'],
                  applicationDate: res[i]['items'][0]['applicationDate'],
                },
                loading: false
              })
            }
            if (result.length === 0) {
              this.noDataText = '검색결과 없음'
            }
            this.searchResults = result
            this.searchLoading = false;
          },
          err => {
            this.$errorHandler.showMessage(err)
            this.noDataText = '검색결과 없음'
            this.searchLoading = false;
          }
        )
    },
    // Excel File 로 검색했을 때
    searchByFile(event) {
      this.searchLoading = true;
      let form = new FormData();
      form.append("patentNumbers", event.target.files[0])
      this.$store.dispatch('patent/searchByCsv', form)
        .then(
          res => {
            let result = []
            for (let i = 0; i < res.length; i++) {
              if (!res[i]['items'] || !res[i]['validatePatent']) continue
              result.push({
                indexNo: i+1,
                content: {
                  inventionTitle: res[i]['items'][0]['inventionTitle'],
                  registerNumber: res[i]['items'][0]['registerNumber'],
                  registerDate: res[i]['items'][0]['registerDate'].replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'),
                  applicationNumber: res[i]['applicationNumber'],
                  applicantName: res[i]['items'][0]['applicantName'],
                  applicationDate: res[i]['items'][0]['applicationDate'],
                },
                loading: false
              })
            }
            if (result.length === 0) {
              this.noDataText = '검색결과 없음'
            }
            this.searchResults = result
            this.searchLoading = false;
          },
          err => {
            this.$errorHandler.showMessage(err)
            this.noDataText = '검색결과 없음'
            this.searchLoading = false;
          }
        )
    },
    // 자체 사이트 상세보기
    showDetails(item) {
      for (let i = 0; i < this.searchResults.length; i++) {
        this.searchResults[i].loading = false
      }
      item.loading = true;
      let routeData = this.$router.resolve('analysis/'+item.content.applicationNumber);
      window.open(routeData.href, '_blank');
      item.loading = false;
    },
    // 개별 평가
    evaluateIndividual(item) {
      this.$store.commit('patent/setPatentNumber', item.content.applicationNumber);
      this.$router.push('/service/evaluation')
    },
    downloadTemplateFile() {
      this.$store.dispatch('patent/downloadTemplateFile', 'MultiPatent').then(
        res => {
          let blob = new Blob([res], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = objectUrl;
          link.setAttribute('download', '바다파트너스_다중입력양식.xls');
          document.body.appendChild(link);
          link.click();
        },
        err => {
          this.$errorHandler.showMessage(err)
        }
      )
    },
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  }
}
</script>

<style scoped>
.filebox label {
  display: inline-block;
  color: #666666;
  font-size: 15px;
  font-weight: bold;
  line-height: normal;
  vertical-align: middle;
  background-color: transparent;
  cursor: pointer;
}

.filebox input[type="file"] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip:rect(0,0,0,0);
  border: 0;
}

.content-grey-font {
  font-family: "Roboto", sans-serif;
  font-weight: normal;
  color: rgba(1, 1, 1, 0.55);
  white-space: pre-wrap;
}

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
