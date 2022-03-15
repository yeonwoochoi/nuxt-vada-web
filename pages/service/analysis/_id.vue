<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
              <v-col cols="12">

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
export default {
  name: "_id",
  components: {SimpleDataTable, MainCard},
  asyncData({params, query}) {
    return {
      id: params.id,
    };
  },
  // 정수 값만 param으로 받음.
  validate({params}) {
    return /^\d+$/.test(params.id);
  },
  data: () => ({
    header: '개별특허분석',
    // TODO (개별특허분석): 임시 데이터
    tableContent: [
      {
        "indexNo": 1,
        "inventionTitle": "발명의명칭(한글)",
        "registerNumber": "등록번호",
        "registerDate": "등록일자",
        "applicationNumber": "출원번호",
        "applicationDate": "출원일자",
        "astrtCont": "초록",
        "applicantName": "출원인",
        "imagePathInfo": {
          "docName": "파일명",
          "largePath": "큰 이미지 경로",
          "path": "이미지 경로"
        },
        "pqi": "A",
        "inventorInfoArray": [
          {
            "name": "배중선",
            "engName": "BAE,Joung Sun",
            "code": "15424623",
            "address": "경기 수원시 팔달구 화서동 우람아파트\n**동 ***호",
            "country": "대한민국"
          }
        ],
        "link": "키프리스 링크",
        "claim": ["청구항1", "청구항2"]
      },
      {
        "indexNo": 1,
        "inventionTitle": "ABS계 수지 분체의 제조방법 및 표면특성이 향상된 ABS계 수지 조성물의 제조방법",
        "registerNumber": "1021305690000",
        "registerDate": "2020.06.30",
        "applicationNumber": "1020160148671",
        "applicationDate": "2016.11.09",
        "astrtCont": "본 발명은 ABS계 수지 분체의 제조방법 및 표면특성이 향상된 ABS계 수지 조성물의 제조방법에 관한 것으로, 보다 상세하게는 유화중합으로 제조된 ABS계 수지 라텍스에 산(acid) 응집제를 투입하여 응집시키는 산응집 단계; 상기 산응집된 슬러리를 숙성시키는 숙성 단계; 상기 숙성된 슬러리에 염기(base)를 투입하여 pH를 8 내지 12로 조절하는 염기처리 단계; 및 상기 염기처리된 슬러리를 1 내지 3회 탈수한 다음, 건조하여 ABS계 수지 분체를 수득하는 단계;를 포함하고, 상기 ABS계 수지 분체는 잔류 유화제 함량이 5,000ppm 이하이고, 산-프리(acid-free)인 것을 특징으로 하는 ABS계 수지 분체의 제조방법 및 이를 포함하여 표면특성이 향상된 ABS계 수지 조성물의 제조방법에 관한 것이다.",
        "applicantName": "주식회사 엘지화학",
        "imagePathInfo": {
          "docName": "ent_image/PT_R/10",
          "largePath": "http://plus.kipris.or.kr/patent_image/PT_R/1020080025578/1020080025578.jpg",
          "path": "http://plus.kipris.or.kr/patent_image/PT/1020080025578/1020080025578.jpg"
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
    ],
  }),
  methods: {

  }
}
</script>

<style scoped>

</style>
