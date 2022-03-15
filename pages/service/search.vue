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
                      @submit="searchByInput"
                    />
                  </v-card-title>
                  <div style="display: flex; align-items: start; justify-content: end;" class="my-2">
                    <div class="filebox mr-2">
                      <label for="searchFile">
                        <v-icon color="green" size="25" style="padding-top: 0.1em">mdi-file-upload</v-icon>
                        업로드
                      </label>
                      <input
                        ref="searchCsvFile"
                        @change="searchByFile"
                        type="file"
                        id="searchFile"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      >
                    </div>
                    <download-button
                      :link="`ai.kunsan.ac.kr:3000/uploads/files-1637042697203.pdf`"
                    >
                      <template>
                        <span>
                          <v-icon>mdi-file-download</v-icon>
                          양식 다운로드
                        </span>
                      </template>
                    </download-button>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-data-table
                  v-model="selected"
                  :headers="searchResultHeaders"
                  :items="sampleData"
                  :items-per-page="itemsPerPage"
                  hide-default-footer
                  :mobile-breakpoint="600"
                  :loading="isLoading"
                  show-select
                  item-key="indexNo"
                >
                  <template v-slot:top>
                    <v-btn
                      class="elevation-0 mt-4 mb-6"
                      color="primary"
                      @click="evaluateSelectedAll"
                    >
                      일괄평가
                    </v-btn>
                  </template>
                  <template v-slot:item.content="{item}">
                    <td class="text-start ellipsis" style="font-size: 13px;">
                      <v-row align="center" justify="start" class="py-4">
                        <v-col cols="12" class="pb-0">
                          <a
                            class="ellipsis"
                            style="font-size: 1.125em; font-weight: 600; text-decoration: none; color: black;"
                            :onClick="`window.open('${item.content.link}', '_blank', 'width=960, height=700')`"
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
                            <em class="mr-1">등록일</em>
                            {{ item.content.registerDate }}
                          </span>
                        </v-col>
                        <v-col md="6" cols="12" class="pb-0 pb-md-3">
                          <span>
                            <em class="mr-1">출원인</em>
                            {{ item.content.applicantName }}
                          </span>
                        </v-col>
                        <v-col md="6" cols="12" class="">
                          <span>
                            <em class="mr-1">권리자명</em>
                            {{ item.content.personName }}
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
                    >
                      <v-icon>mdi-note-check</v-icon>
                      상세보기
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
                      @input="changePage"
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
  data: () => ({
    header: '특허검색',
    searchData: [],
    nonce: 1,
    search: null,
    chipColor: 'grey lighten-3',
    searchFile: null,
    currentPage: 1,
    itemsPerPage: 10,
    totalPage: 1,
    //TODO (특허검색): 전체 페이지 수 서버 통신해 받기
    isLoading: false,
    selected: [],
    searchResultHeaders: [
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
    //TODO (특허검색): 서버로 받기.. 임시 data
    sampleData: [
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
          link: 'http://kpat.kipris.or.kr/kpat/biblioa.do?method=biblioFrame&applno=1020160148671&index=0&start=fulltext&openPageId=View03'
        }
      },
      {
        indexNo: 2,
        content: {
          inventionTitle: '에스트로겐 수용체 억제제로서의 벤조티오펜 유도체',
          registerNumber: '10-2016-7002876',
          registerDate: '1987/07/11',
          applicationNumber: '1020147002912',
          applicantName: '글락소스미스클라인 인털렉츄얼 프로퍼티 디벨로프먼트 리미티드',
          personName: '글락소스미스클라인 인털렉츄얼 프로퍼티 디벨로프먼트 리미티드',
          link: 'http://kpat.kipris.or.kr/kpat/biblioa.do?method=biblioFrame&applno=1020207007034&index=0&start=fulltext&openPageId=View03'
        }
      },
    ]
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

    },
    // Excel File 로 검색했을 때
    searchByFile(event) {
      console.dir(event.target.files[0])
    },
    // 자체 사이트 상세보기
    showDetails(item) {
      this.$router.push('analysis/'+item.indexNo)
    },
    // 개별 평가
    evaluateIndividual(item) {
      console.dir(item)
    },
    // 일괄 평가
    evaluateSelectedAll() {
      console.dir(this.selected)
    },
    changePage() {
      console.dir(`page: ${this.currentPage}`)
    }
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
