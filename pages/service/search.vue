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
                  :header="searchResultHeaders"
                  :items="sampleData"
                  :items-per-page="itemsPerPage"
                  hide-default-footer
                  :mobile-breakpoint="960"
                  :loading="isLoading"
                  show-select
                  item-key="indexNo"
                >
                  <template v-slot:top>
                    <v-btn
                      class="elevation-0"
                      color="primary"
                      @click="evaluateSelectedAll"
                    >
                      일괄평가
                    </v-btn>
                  </template>
                  <template v-slot:item.content="{item}">
                    <td class="text-start ellipsis" @click="showDetailsInKipris(item)" style="cursor:pointer; max-width: 400px; font-size: 13px;">
                      <div class="ellipsis font-weight-medium">
                        {{ item['inventionTitle'] }}
                      </div>
                      <div class="pt-1">
                        <div style="display: flex; height: fit-content; overflow-x: hidden; text-overflow: ellipsis" class="content-grey-font caption">
                          <p class="my-0 mr-2" style="white-space: nowrap">{{ item['applicationNumber'] }}</p>
                          <p class="my-0 mr-2"><v-divider vertical/></p>
                          <p class="my-0 mr-2" style="white-space: nowrap">{{ item['registerNumber'] }}</p>
                          <p class="my-0 mr-2"><v-divider vertical/></p>
                          <p class="my-0 mr-2" style="white-space: nowrap">{{ item['registerDate'] }}</p>
                        </div>
                        <div style="display: flex; height: fit-content; overflow-x: hidden; text-overflow: ellipsis" class="content-grey-font caption">
                          <p class="my-0 mr-2" style="white-space: nowrap">{{ item['applicantName'] }}</p>
                          <p class="my-0 mr-2"><v-divider vertical/></p>
                          <p class="my-0 mr-2" style="white-space: nowrap">{{ item['personName'] }}</p>
                        </div>
                      </div>
                    </td>
                  </template>
                  <template v-slot:item.evaluation="{item}">
                    <v-btn
                      class="elevation-0"
                      @click="evaluateIndividual(item)"
                      color="transparent"
                    >
                      <v-icon>mdi-note-check</v-icon>
                      평가
                    </v-btn>
                  </template>
                  <template v-slot:item.detail="{item}">
                    <v-btn
                      class="elevation-0"
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
    currentPage: 1,
    itemsPerPage: 10,
    //TODO (특허검색): 전체 페이지 수 서버 통신해 받기
    totalPage: 1,
    isLoading: false,
    selected: [],
    //TODO (특허검색): 서버로 받기.. 임시 data
    sampleData: [
      {
        indexNo: 1,
        inventionTitle: '이미지센서 셀, 상기 이미지센서 셀들을 복수 개 구비하는 이미지센서 어레이를 구비하는 이미지센서 및\n' +
          '                    상기 이미지센서를 구비하는 카메라시스템(Image sensor cell, image sensor including image\n' +
          '                    sensor array including plurality of the image sensor cells and camera\n' +
          '                    system including the image sensor)',
        registerNumber: '1019870006388',
        registerDate: '1987/07/11',
        applicationNumber: '1020147002912',
        applicantName: '삼성전자주식회사',
        personName: '권리자명',
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
    // 키프리스 상세보기
    showDetailsInKipris(item) {
      console.dir(item)
    },
    // 자체 사이트 상세보기
    showDetails(item) {
      console.dir(item)
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

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
