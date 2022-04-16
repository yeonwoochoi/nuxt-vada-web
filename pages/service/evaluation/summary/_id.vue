<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
              <v-col cols="12" class="mt-6">
                <vertical-header-table
                  v-if="!isLoading"
                  :table-header="summaryHeader"
                  :table-items="summaryContent"
                  :is-blur="false"
                />
              </v-col>
              <v-col cols="12" class="mt-4" align="end">
                <custom-button
                  :width="'200'"
                  :text="'목록보기'"
                  @submit="goToSearch"
                />
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
import VerticalHeaderTable from "../../../../components/table/VerticalHeaderTable";
import CustomButton from "../../../../components/button/CustomButton";
export default {
  name: "evaluationSummary",
  components: {CustomButton, VerticalHeaderTable, MainCard},
  created() {
    this.$store.commit('setSheetTitle', '특허평가')
  },
  asyncData({params}) {
    return {
      idx: params.id,
    };
  },
  /*
  // 정수 값만 param으로 받음.
  validate({params}) {
    return /^\d+$/.test(params.id);
  },
  */
  data: () => ({
    header: "요약보고서",
    title: '',
    summaryHeader: [
      {
        text: '평가 금액',
        value: 'price',
      },
      {
        text: '보고서 만료일',
        value: 'expirationDate',
      },
      {
        text: '평가의 목적',
        value: 'purpose',
      },
      {
        text: '평가대상특허',
        value: 'targetPatent',
      },
      {
        text: '기술의 경제적\n수명 산정',
        value: 'techLife',
      },
      {
        text: '로열티율',
        value: 'royaltyRate',
      },
      {
        text: '할인율',
        value: 'discountRate',
      },
      {
        text: '기술가치',
        value: 'techPrice',
      },
    ],
    summaryData: [],
    summaryContent: [],
    isLoading: true,
  }),
  computed: {
    targetPatent() {
      let sample = this.summaryData.targetPatentList
      let result = `평가대상 특허 : 등록 ${sample.length}건\n`
      for (let i = 0; i < sample.length; i++) {
        let temp = sample[i];
        result += `\n<span class="mb-0 light-blue--text">${temp}</span>`
      }
      return result
    },

    techLife() {
      // TODO: Sample
      let sample = this.summaryData.techLife
      return `기술의 경제적 수명 : <span class="light-blue--text">${sample}</span>년\n`
    },

    cashFlow() {
      let sample = this.summaryData
      return `현금흐름 추정기간 : <span class="light-blue--text">${sample.cashFlowFrom} ~ ${sample.cashFlowTo}</span>`
    },

    royaltyRate() {
      let sample = this.summaryData.royalty
      return `매출액 추정 : 직접 추정 (시장 점유율법)\n로열티 : 업종별 상관행법 X 로열티율 조정계수 = <span class="light-blue--text">${sample}%</span>`
    },

    discountRate() {
      return `할인율 : <span class="light-blue--text">${this.summaryData.discountRate}%</span>\n업종 : <span class="light-blue--text">${this.summaryData.industrialCode}</span>\n기업분류 : <span class="light-blue--text">${this.summaryData.enterpriseType}</span>`
    },

    techPrice() {
      return `기술가치 = <span class="light-blue--text">${this.summaryData.techPriceFrom} ~ ${this.summaryData.techPriceTo}</span> 백만원`
    },
  },
  methods: {
    fetchData() {
      setTimeout(() => {
        this.summaryData = {
          inventionTitle: 'ABS계 수지 분체의 제조방법 및 표면특성이 향상된 ABS계 수지 조성물의 제조방법',
          price: '12000 KRW',
          expirationDate: '2021-03-21 ~ 2022-03-23',
          targetPatentList: [
            'KR 10-0107367',
          ],
          techLife: 9,
          cashFlowFrom: '2020',
          cashFlowTo: '2028',
          royalty: '3.15',
          discountRate: '10.85',
          industrialCode: '기타 기계 및 장비 제조업 (C29)',
          enterpriseType: '비상장 창업기업',
          techPriceFrom: '14328',
          techPriceTo: '14328',
        }
        this.summaryContent = [
          {
            inventionTitle: this.summaryData.inventionTitle,
            price: this.summaryData.price,
            expirationDate: this.summaryData.expirationDate,
            purpose: '평가용도 : 기술 가치금액 참고용',
            targetPatent: this.targetPatent,
            techLife: this.techLife + this.cashFlow,
            royaltyRate: this.royaltyRate,
            discountRate: this.discountRate,
            techPrice: this.techPrice
          }
        ]
        this.isLoading = false
      }, 100)
    },
    goToSearch() {
      this.$router.push('/service/evaluation/list')
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped>

</style>
