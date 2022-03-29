<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-4 mb-4">
    <v-row align="center" justify="center" style="width: 100%; height: 100%;">
      <v-col cols="11" class="text-center pt-6 font-weight-bold headline">
        <p>{{title}}</p>
      </v-col>
      <v-col cols="11" class="mt-1 mb-3">
        <vertical-header-table
          v-if="!isLoading"
          :table-header="summaryHeader"
          :table-items="summaryContent"
        />
      </v-col>
      <div style="display: flex;" class="mt-6 mb-4">
        <download-button
          class="mx-1"
          :link="downloadLink"
        >
          <custom-button
            class="mx-1 darken-1"
            :link="downloadLink"
            :width="`${$vuetify.breakpoint.smAndDown ? '49%' : '200'}`"
            :color="'primary'"
            :text="`구매하기`"
            style="min-width: 140px;"
          />
        </download-button>
        <custom-button
          class="mx-1"
          :width="`${$vuetify.breakpoint.smAndDown ? '49%' : '200'}`"
          :color="'primary'"
          :text="`메인으로`"
          @submit="$router.push('/')"
        />
      </div>
    </v-row>
  </v-card>
</template>

<script>
import CustomButton from "../../button/CustomButton";
import DownloadButton from "../../button/DownloadButton";
import VerticalHeaderTable from "../../table/VerticalHeaderTable";

export default {
  name: "ResultSummaryCard",
  components: {VerticalHeaderTable, DownloadButton, CustomButton},
  props: {
    downloadLink: {
      type: String,
    },
    summaryData: {
      type: Object,
      default: () => { return {} }
    },
    isLoading: {
      type: Boolean,
      default: () => true
    }
  },
  data: () => ({
    title: '요약 보고서',
    summaryHeader: [
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
        value: 'loyaltyRate',
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

    loyaltyRate() {
      let sample = this.summaryData.loyalty
      return `매출액 추정 : 직접 추정 (시장 점유율법)\n로열티 : 업종별 상관행법 X 로열티율 조정계수 = <span class="light-blue--text">${sample}%</span>`
    },

    discountRate() {
      return `할인율 : <span class="light-blue--text">${this.summaryData.discountRate}%</span>\n업종 : <span class="light-blue--text">${this.summaryData.industrialCode}</span>\n기업분류 : <span class="light-blue--text">${this.summaryData.enterpriseType}</span>`
    },

    techPrice() {
      return `기술가치 = <span class="light-blue--text">${this.summaryData.techPriceFrom} ~ ${this.summaryData.techPriceTo}</span> 백만원 (구매를 하지 않은 경우 임의의 수가 생성됩니다.)`
    },

    summaryContent() {
      return [
        {
          purpose: '평가용도 : 기술 가치금액 참고용',
          targetPatent: this.targetPatent,
          techLife: this.techLife + this.cashFlow,
          loyaltyRate: this.loyaltyRate,
          discountRate: this.discountRate,
          techPrice: this.techPrice
        }
      ]
    }
  },
  methods: {

  },
}
</script>

<style scoped>

</style>
