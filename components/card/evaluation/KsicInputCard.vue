<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-4 mb-4">
    <v-row align="center" justify="center" style="width: 100%; height: 100%;">
      <v-col cols="11" class="text-center pt-6 font-weight-bold headline">
        <p>{{title}}</p>
      </v-col>
      <v-col cols="11" class="text-center pt-6 font-weight-bold subtitle-1">
        <p>{{subtitle}}</p>
      </v-col>
      <v-col cols="11" md="8" class="pb-0">
        <v-radio-group v-model="isValidCode" row>
          <v-radio :value="true" label="확인"/>
          <v-radio :value="false" label="수정"/>
        </v-radio-group>
      </v-col>
      <v-col cols="11" md="8" class="pb-0">
        <v-select
          v-model="classification"
          outlined
          filled
          :items="classificationItems"
        />
      </v-col>
      <div style="display: flex;" class="mt-6 mb-4">
        <custom-button
          :loading="value"
          class="mx-1 darken-1"
          :width="`${$vuetify.breakpoint.smAndDown ? '49%' : '200'}`"
          @submit="goNext"
          :color="'primary'"
          :text="`계속하기`"
        />
        <custom-button
          class="mx-1"
          :width="`${$vuetify.breakpoint.smAndDown ? '49%' : '200'}`"
          @submit="goPrev"
          :color="'primary'"
          :text="`이전으로`"
        />
      </div>
    </v-row>
  </v-card>
</template>

<script>
import CustomButton from "../../button/CustomButton";
export default {
  name: "KsicInputCard",
  components: {CustomButton},
  props: {
    value: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    title: '산업분류코드(KSIC)를 확인해주세요',
    subtitle: '수정하시겠습니까?',
    isValidCode: true,
    classification: '',
    sampleData: [
      { code: 'A01', title: '농업'},
      { code: 'A02', title: '임업'},
      { code: 'A03', title: '어업'},
      { code: 'B05', title: '석탄, 원유 및 천연가스 광업'},
      { code: 'B06', title: '금속 광업'},
      { code: 'B07', title: '비금속광물 광업;연료용 제외'},
      { code: 'B08', title: '광업 지원 서비스업'},
      { code: 'C10', title: '식료품 제조업'},
      { code: 'C11', title: '음료 제조업'},
      { code: 'C12', title: '담배 제조업'},
      { code: 'C13', title: '섬유제품 제조업; 의복제외'},
      { code: 'C14', title: '의복, 의복액세서리 및 모피제품 제조업'},
      { code: 'C15', title: '가죽, 가방 및 신발 제조업'},
      { code: 'C16', title: '목재 및 나무제품 제조업;가구제외'},
      { code: 'C17', title: '펄프, 종이 및 종이제품 제조업'},
      { code: 'C18', title: '인쇄 및 기록매체 복제업'},
      { code: 'C19', title: '코크스, 연탄 및 석유정제품 제조업'},
      { code: 'C20', title: '화학물질 및 화학제품 제조업;의약품 제외'},
      { code: 'C21', title: '의료용 물질 및 의약품 제조업'},
      { code: 'C22', title: '고무제품 및 플라스틱제품 제조업'},
      { code: 'C23', title: '비금속 광물제품 제조업'},
      { code: 'C24', title: '1차 금속 제조업'},
      { code: 'C25', title: '금속가공제품 제조업;기계 및 가구 제외'},
      { code: 'C26', title: '전자부품, 컴퓨터, 영상, 음향 및 통신장비 제조업'},
      { code: 'C27', title: '의료, 정밀, 광학기기 및 시계 제조업'},
      { code: 'C28', title: '전기장비 제조업'},
      { code: 'C29', title: '기타 기계 및 장비 제조업'},
      { code: 'C30', title: '자동차 및 트레일러 제조업'},
      { code: 'C31', title: '기타 운송장비 제조업'},
      { code: 'C32', title: '가구 제조업'},
      { code: 'C33', title: '기타 제품 제조업'},
      { code: 'C34', title: '산업용 기계 및 장비 수리업'},
      { code: 'D35', title: '전기, 가스, 증기 및 공기조절 공급업'},
      { code: 'E36', title: '수도업'},
      { code: 'E37', title: '하수, 폐수 및 분뇨 처리업'},
      { code: 'E38', title: '폐기물 수집운반, 처리 및 원료재생업'},
      { code: 'E39', title: '환경 정화 및 복원업'},
      { code: 'F41', title: '종합 건설업'},
      { code: 'F42', title: '전문직별 공사업'},
      { code: 'G45', title: '자동차 및 부품 판매업'},
      { code: 'G46', title: '도매 및 상품중개업'},
      { code: 'G47', title: '소매업; 자동차 제외'},
      { code: 'H49', title: '육상운송 및 파이프라인 운송업'},
      { code: 'H50', title: '수상 운송업'},
      { code: 'H51', title: '항공 운송업'},
      { code: 'H52', title: '창고 및 운송관련 서비스업'},
      { code: 'I55', title: '숙박업'},
      { code: 'I56', title: '음식점 및 주점업'},
      { code: 'J581', title: '서적, 잡지 및 기타 인쇄물 출판업'},
      { code: 'J582', title: '소프트웨어 개발 및 공급업'},
      { code: 'J59', title: '영상·오디오 기록물 제작 및 배급업'},
      { code: 'J60', title: '방송업'},
      { code: 'J61', title: '통신업'},
      { code: 'J62', title: '컴퓨터 프로그래밍, 시스템 통합 및 관리업'},
      { code: 'J63', title: '정보서비스업'},
      { code: 'K64', title: '금융업'},
      { code: 'K65', title: '보험 및 연금업'},
      { code: 'K66', title: '금융 및 보험 관련 서비스업'},
      { code: 'L68', title: '부동산업'},
      { code: 'M70', title: '연구개발업'},
      { code: 'M71', title: '전문서비스업'},
      { code: 'M72', title: '건축기술, 엔지니어링 및 기타 과학기술 서비스업'},
      { code: 'M73', title: '기타 전문, 과학 및 기술 서비스업'},
      { code: 'N74', title: '사업시설 관리 및 조경 서비스업'},
      { code: 'N75', title: '사업지원 서비스업'},
      { code: 'N76', title: '임대업'},
      { code: 'O84', title: '공공행정, 국방 및 사회보장 행정'},
      { code: 'P85', title: '교육 서비스업'},
      { code: 'Q86', title: '보건업'},
      { code: 'Q87', title: '사회복지 서비스업'},
      { code: 'R90', title: '창작, 예술 및 여가관련 서비스업'},
      { code: 'R91', title: '스포츠 및 오락관련 서비스업'},
      { code: 'S94', title: '협회 및 단체'},
      { code: 'S95', title: '수리업'},
      { code: 'S96', title: '기타 개인 서비스업'},
    ],
    classificationItems: [],
  }),
  methods: {
    goNext() {
      this.$emit('nextStep', 4);
    },
    goPrev() {
      this.$emit('prevStep', 4)
    },
    fetchData() {
      let result = [];
      for (let i = 0; i < this.sampleData.length; i++) {
        let temp = this.sampleData[i];
        result.push(`${temp.code} ${temp.title}`)
      }
      this.classificationItems = result;
      this.classification =  this.classificationItems[0]
      this.loading = false;
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped>

</style>
