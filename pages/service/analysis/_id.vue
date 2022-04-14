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

              <v-col cols="12" sm="2" class="text-sm-center pb-0">
                <p class="analysis-header">출원번호(일자)</p>
              </v-col>
              <v-col cols="12" sm="9">
                <p class="analysis-content">{{ applicationInfo }}</p>
              </v-col>

              <v-col cols="12" class="py-2"><v-divider/></v-col>

              <v-col cols="12" sm="2" class="text-sm-center pb-0">
                <p class="analysis-header">등록번호(일자)</p>
              </v-col>
              <v-col cols="12" sm="9">
                <p class="analysis-content">{{ registerInfo }}</p>
              </v-col>

              <v-col cols="12" class="py-2"><v-divider/></v-col>

              <v-col cols="12" sm="2" class="text-sm-center pb-0">
                <p class="analysis-header">권리자명</p>
              </v-col>
              <v-col cols="12" sm="9">
                <p class="analysis-content">{{ lastRightHolderName }}</p>
              </v-col>

              <v-col cols="12" class="py-2"><v-divider/></v-col>

              <v-col cols="12" sm="2" class="text-sm-center pb-0">
                <p class="analysis-header">출원인명</p>
              </v-col>
              <v-col cols="12" sm="9">
                <p class="analysis-content">{{ applicantName }}</p>
              </v-col>

              <v-col cols="12" class="py-2"><v-divider/></v-col>

              <v-col cols="12" sm="2" class="text-sm-center pb-0">
                <p class="analysis-header">PQI 등급</p>
              </v-col>
              <v-col cols="12" sm="9">
                <p class="analysis-content">{{ pqiRank }}</p>
              </v-col>

              <v-col cols="12" class="py-2"><v-divider/></v-col>

              <v-col cols="12" sm="2" class="text-sm-center pb-0">
                <p class="analysis-header">발명자</p>
              </v-col>
              <v-col cols="12" sm="9">
                <p class="analysis-content">{{ inventors }}</p>
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
                <p class="font-weight-bold title">대표청구권</p>
              </v-col>
              <v-col cols="11">
                <p class="pa-6 subtitle-2 text-start scroll-y-info-card" v-html="claim" />
              </v-col>

              <v-col cols="11" class="text-start mt-12">
                <p class="font-weight-bold title">대표도면</p>
              </v-col>
              <v-col cols="11" class="my-6">
                <img :src="representativeDrawing.path" width="90%" :alt="representativeDrawing.name"/>
              </v-col>

              <v-col cols="12" sm="2" class="text-start mt-12">
                <p class="font-weight-bold title">키프리스 링크</p>
              </v-col>
              <v-col cols="12" sm="8" class="mt-sm-12">
                <a
                  class="analysis-content"
                  style="font-size: 1.125em; text-decoration: none;"
                  :onClick="`window.open('${link}', '_blank', 'width=960, height=700')`"
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
  created() {
    this.$store.commit('setSheetTitle', '특허분석')
  },
  asyncData({params}) {
    return {
      idx: params.id,
    };
  },
  // 정수 값만 param으로 받음.
  validate({params}) {
    return /^\d+$/.test(params.id);
  },
  data: () => ({
    header: '개별특허분석',
    sampleData: {
      "indexNo": 1,
      "inventionTitle": "ABS계 수지 분체의 제조방법 및 표면특성이 향상된 ABS계 수지 조성물의 제조방법",
      "registerNumber": "1021305690000",
      "registerDate": "2020.06.30",
      "applicationNumber": "1020160148671",
      "applicationDate": "2016.11.09",
      "astrtCont": "본 발명은 ABS계 수지 분체의 제조방법 및 표면특성이 향상된 ABS계 수지 조성물의 제조방법에 관한 것으로, 보다 상세하게는 유화중합으로 제조된 ABS계 수지 라텍스에 산(acid) 응집제를 투입하여 응집시키는 산응집 단계; 상기 산응집된 슬러리를 숙성시키는 숙성 단계; 상기 숙성된 슬러리에 염기(base)를 투입하여 pH를 8 내지 12로 조절하는 염기처리 단계; 및 상기 염기처리된 슬러리를 1 내지 3회 탈수한 다음, 건조하여 ABS계 수지 분체를 수득하는 단계;를 포함하고, 상기 ABS계 수지 분체는 잔류 유화제 함량이 5,000ppm 이하이고, 산-프리(acid-free)인 것을 특징으로 하는 ABS계 수지 분체의 제조방법 및 이를 포함하여 표면특성이 향상된 ABS계 수지 조성물의 제조방법에 관한 것이다.",
      "applicantName": "주식회사 엘지화학",
      "registrationLastRightHolderInfo": {
        "lastRightHolderNumber": "419980143540",
        "lastRightHolderName": "민철기",
        "lastRightHolderAddress": "경기도 고양시 덕양구",
        "lastRightHolderCountry": "대한민국",
      },
      "imagePathInfo": {
        "docName": "ent_image/PT_R/10",
        "largePath": "http://kpat.kipris.or.kr/kpat/remoteFile.do?method=bigFrontDraw&applno=1020160148671",
        "path": "http://kpat.kipris.or.kr/kpat/remoteFile.do?method=bigFrontDraw&applno=1020160148671"
      },
      "pqi": "A",
      "inventorInfoArray":  [
        {
          "name": "배중선",
          "engName": "BAE,Joung Sun",
          "code": "15424623",
          "address": "경기 수원시 팔달구 화서동 우람아파트\n**동 ***호",
          "country": "대한민국"
        },
        {
          "name": "최연우",
          "engName": "CHOI,Yeon Woo",
          "code": "936362783",
          "address": "전라북도 전주시 덕진구 인후동 1가",
          "country": "대한민국"
        }
      ],
      "link": "http://kpat.kipris.or.kr/kpat/biblioa.do?method=biblioFrame&applno=1020160148671&index=0&start=fulltext&openPageId=View03",
      "claim": [
        "고무 중합체, 방향족 비닐 화합물 및 비닐 시안 화합물을 유화중합하여 제조된 ABS계 수지 라텍스에 산(acid)\n응집제를 투입하여 응집시키는 산응집 단계; 상기 산응집된 슬러리를 숙성시키는 숙성 단계; 상기 숙성된 슬러\n리에 염기(base)를 투입하여 pH를 8 내지 12로 조절하는 염기처리 단계; 및 상기 염기처리된 슬러리를 탈수한\n다음, 건조하여 ABS계 수지 분체를 수득하는 수지 분체 수득 단계;를 포함하되,\n상기 ABS계 수지 분체는 잔류 유화제 함량이 5,000ppm 이하이고, 산-프리(acid-fee)이며,\n상기 산응집된 슬러리의 pH는 2.5 내지 4 이고,\n상기 수지 분체의 함수율은 0.1 내지 0.5 중량%인 것을 특징으로 하는 ABS계 수지 분체의 제조방법.",
        "제 1항에 있어서,\n상기 염기처리 단계는 30 내지 90℃의 온도에서 수행되는 것을 특징으로 하는 ABS계 수지 분체의 제조방법.",
        "제 1항에 있어서,\n상기 염기는 수산화나트륨, 수산화칼륨, 수산화암모늄, 탄산나트륨 및 탄산수소나트륨으로 이루어지는 군으로부\n터 선택된 1종 이상인 것을 특징으로 하는 ABS계 수지 분체의 제조방법.",
        "제 3항에 있어서,\n상기 염기는 농도 0.01 내지 5M(몰농도)의 수용액인 것을 특징으로 하는 ABS계 수지 분체의 제조방법.",
        "제 1항에 있어서,\n상기 산응집 단계는, 상기 ABS계 수지 라텍스 100 중량부(고형분 기준)에 대하여 상기 산 응집제를 0.5 내지\n4.0 중량부로 투입하는 것을 특징으로 하는 ABS계 수지 분체의 제조방법.",
        "제 1항에 있어서,\n상기 산응집 단계는 60 내지 90 ℃의 온도에서 수행되는 것을 특징으로 하는 ABS계 수지 분체의 제조방법.",
        "제 1항에 있어서,\n상기 산 응집제는 황산, 염산, 질산, 인산, 포름산 및 초산으로 이루어지는 군으로부터 선택된 1종 이상인 것을\n특징으로 하는 ABS계 수지 분체의 제조방법.",
        "제 7항에 있어서,\n상기 산 응집제는 농도 0.01 내지 1.0M(몰농도)의 수용액인 것을 특징으로 하는 ABS계 수지 분체의 제조방법.",
        "삭제",
        "제 1항에 있어서,\n상기 숙성 단계는 80 내지 140℃의 온도에서 수행되는 것을 특징으로 하는 ABS계 수지 분체의 제조방법",
        "제 1항에 있어서,\n상기 ABS계 수지 분체는 하기 수학식 1로 산출된 가열감량이 0.4 중량% 이하인 것을 특징으로 하는 ABS계 수지\n분체의 제조방법.\n[수학식 1]\n가열감량(중량%) = [1 - (250℃에서 60분 방치 후 무게)]/(시료의 초기 무게) X 100"
      ]
    }
  }),
  computed: {
    title() {
      return this.sampleData.inventionTitle;
    },
    applicationInfo() {
      return `${this.sampleData['applicationNumber']}(${this.sampleData['applicationDate']})`
    },
    registerInfo() {
      return `${this.sampleData['registerNumber']}(${this.sampleData['registerDate']})`
    },
    lastRightHolderName() {
      return this.sampleData.registrationLastRightHolderInfo.lastRightHolderName
    },
    applicantName() {
      return this.sampleData.applicantName;
    },
    pqiRank() {
      return this.sampleData.pqi;
    },
    inventors() {
      let result = ''
      let inventors = this.sampleData.inventorInfoArray;
      for (let i = 0; i < inventors.length; i++) {
        result += inventors[i].name
        if (i+1 < inventors.length) {
          result += ', '
        }
      }
      return result
    },
    summary() {
      return this.sampleData.astrtCont;
    },
    claim() {
      let result = ''
      let claims = this.sampleData.claim;
      for (let i = 0; i < claims.length; i++) {
        result += `<p class="font-weight-bold subtitle-1">청구항${i+1}</p>${claims[i]}\n\n\n`
      }
      return result
    },
    representativeDrawing() {
      return {
        path: this.sampleData.imagePathInfo.largePath,
        name: this.sampleData.imagePathInfo.docName
      };
    },
    link() {
      return this.sampleData.link
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
