<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <v-row align="start" justify="space-around" class="mb-6 px-6" style="width: 100%;">
              <v-col cols="12" class="my-6">
                <p class="title font-weight-bold">{{ title }}</p>
              </v-col>

              <v-col cols="12" class="py-2"><v-divider/></v-col>

              <v-col cols="12" sm="2" class="text-sm-center">
                <p class="analysis-header">출원번호(일자)</p>
              </v-col>
              <v-col cols="12" sm="9">
                <p class="analysis-content">{{ applicationInfo }}</p>
              </v-col>

              <v-col cols="12" class="py-2"><v-divider/></v-col>

              <v-col cols="12" sm="2" class="text-sm-center">
                <p class="analysis-header">등록번호(일자)</p>
              </v-col>
              <v-col cols="12" sm="9">
                <p class="analysis-content">{{ registerInfo }}</p>
              </v-col>

              <v-col cols="12" class="py-2"><v-divider/></v-col>

              <!--
              <v-col cols="12" sm="2" class="text-sm-center">
                <p class="analysis-header">권리자명</p>
              </v-col>
              <v-col cols="12" sm="9">
                <p class="analysis-content">{{ lastRightHolderName }}</p>
              </v-col>

              <v-col cols="12" class="py-2"><v-divider/></v-col>
              -->

              <v-col cols="12" sm="2" class="text-sm-center">
                <p class="analysis-header">출원인명</p>
              </v-col>
              <v-col cols="12" sm="9">
                <p class="analysis-content">{{ applicantName }}</p>
              </v-col>

              <v-col cols="12" class="py-2"><v-divider/></v-col>

              <v-col cols="12" sm="2" class="text-sm-center">
                <p class="analysis-header">법적상태</p>
              </v-col>
              <v-col cols="12" sm="9">
                <p class="analysis-content">{{ registerStatus }}</p>
              </v-col>

              <v-col cols="12" class="py-2"><v-divider/></v-col>

              <v-col cols="12" sm="2" class="text-sm-center">
                <p class="analysis-header">PQI 등급</p>
              </v-col>
              <v-col cols="12" sm="9">
                <p class="analysis-content">{{ pqiRank }}</p>
              </v-col>

              <v-col cols="12" class="py-2"><v-divider/></v-col>

              <v-col cols="12" class="mt-10" align="end">
                <custom-button
                  :width="'200'"
                  :text="'목록보기'"
                  @submit="goToSearch"
                />
              </v-col>

              <v-col cols="11" class="text-start mt-12">
                <p class="font-weight-bold title">요약문</p>
              </v-col>
              <v-col cols="11">
                <p class="pa-6 subtitle-2 text-start scroll-y-info-card" v-html="summary" />
              </v-col>

              <v-col cols="11" class="text-start mt-12">
                <p class="font-weight-bold title">대표청구항</p>
              </v-col>
              <v-col cols="11">
                <p class="pa-6 subtitle-2 text-start scroll-y-info-card" v-html="claim" />
              </v-col>

              <v-col cols="11" class="text-start mt-12">
                <p class="font-weight-bold title">대표도면</p>
              </v-col>
              <v-col cols="11" class="my-6">
                <img :src="representativeDrawing" :width="isImgNull ? '250px' : '90%'"/>
              </v-col>

              <v-col cols="12" sm="2" class="text-start mt-12">
                <p class="font-weight-bold title">상세 보기</p>
              </v-col>
              <v-col cols="12" sm="8" class="mt-sm-12">
                <a
                  class="analysis-content"
                  style="font-size: 1.125em; text-decoration: none;"
                  :onClick="`window.open('${link}', '_blank', 'width=1080, height=850')`"
                >
                  {{ link }}
                </a>
              </v-col>
            </v-row>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "../../../components/card/MainCard";
import SimpleDataTable from "../../../components/table/SimpleDataTable";
import CustomButton from "../../../components/button/CustomButton";
export default {
  name: "Analysis",
  components: {CustomButton, SimpleDataTable, MainCard},
  asyncData({params, store}) {
    let baseData = {
      "inventionTitle": "",
      "registerNumber": "",
      "registerDate": "",
      "applicationNumber": "",
      "applicationDate": "",
      "astrtCont": "",
      "applicantName": "",
      "registrationLastRightHolder": "",
      "imagePathInfo": {
        "bigDrawing": "",
        "drawing": ""
      },
      "pqi": "",
      "registerStatus":  [],
      "link": "",
      "claim": []
    }
    if (!params.id) {
      return {
        patentData: baseData,
        fetchError: '해당 특허정보가 없습니다.'
      }
    }
    return store.dispatch('patent/search', {patentNumbers: [params.id]})
      .then(
        res => {
          if (!res || !res[0]["items"] || !res[0]["validatePatent"]) {
            return {
              patentData: baseData,
              fetchError: '해당 특허정보가 없습니다.'
            }
          }
          let targetData = res[0];
          let targetItem = targetData["items"][0]
          return {
            patentData: {
              "inventionTitle": targetItem["inventionTitle"],
              "registerNumber": targetItem["registerNumber"],
              "registerDate": targetItem["registerDate"],
              "applicationNumber": targetItem["applicationNumber"],
              "applicationDate": targetItem["applicationDate"],
              "astrtCont": targetItem["abstractContent"],
              "applicantName": targetItem["applicantName"],
              "registrationLastRightHolder": "",
              "imagePathInfo": {
                "bigDrawing": targetItem["bigDrawing"],
                "drawing": targetItem["drawing"]
              },
              "pqi": targetData["pqiGrade"],
              "registerStatus": targetItem["registerStatus"],
              "claim": targetData["detail"]["claimInfos"]
            },
            fetchError: null
          }
        },
        err => {
          return {
            patentData: baseData,
            fetchError: err
          }
        }
      )
  },
  created() {
    this.$store.commit('setSheetTitle', '특허분석')
    if (!!this.fetchError) {
      this.$notifier.showMessage({
        content: this.fetchError,
        color: 'error'
      })
    }
  },
  data: () => ({
    header: '개별특허분석',
  }),
  computed: {
    title() {
      return this.patentData["inventionTitle"];
    },
    applicationInfo() {
      return `${this.patentData['applicationNumber']} (${this.patentData['applicationDate']})`
    },
    registerInfo() {
      return `${this.patentData['registerNumber']} (${this.patentData['registerDate']})`
    },
    lastRightHolderName() {
      return this.patentData["registrationLastRightHolder"]
    },
    applicantName() {
      return this.patentData["applicantName"];
    },
    pqiRank() {
      return this.patentData["pqi"];
    },
    registerStatus() {
      return this.patentData["registerStatus"]
    },
    summary() {
      return this.patentData["astrtCont"];
    },
    claim() {
      let result = ''
      let claims = this.patentData["claim"];
      for (let i = 0; i < claims.length; i++) {
        result += `${claims[i]["claim"]}\n\n\n`
      }
      return result
    },
    representativeDrawing() {
      if (!!this.patentData.imagePathInfo.bigDrawing) return this.patentData.imagePathInfo.bigDrawing;
      if (!!this.patentData.imagePathInfo.drawing) return this.patentData.imagePathInfo.drawing;
      return require("../../../assets/no_thumbnail.png")
    },
    isImgNull() {
      return !this.patentData.imagePathInfo.bigDrawing && !this.patentData.imagePathInfo.drawing
    },
    link() {
      return this.$util.getKiprisDoiLink(this.patentData["applicationNumber"])
    },
  },
  methods: {
    goToSearch() {
      this.$router.push('/service/search')
    }
  }
}
</script>

<style scoped>
p {
  margin-bottom: 0;
}
.analysis-header {
  font-size: 16px;
  font-weight: 600;
}
.analysis-content {
  font-size: 15px;
}
.scroll-y-info-card {
  border: 1px solid rgba(0, 0, 0, 0.25);
  height: 250px;
  width: 100%;
  overflow-y: scroll;
  white-space: pre-wrap;
}
</style>
