<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card v-if="!fetchError" style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <v-row  align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
              <v-col cols="12" class="mt-6">
                <vertical-header-table
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
import ksicList from "../../../../data/ksic.json";

export default {
  name: "evaluationSummary",
  components: {CustomButton, VerticalHeaderTable, MainCard},
  asyncData({params, store, redirect}) {
    let initSummaryData = {
      expirationDate: '',
      targetPatent: '',
      techLife: '',
      cashFlow: '',
      royaltyRate: '',
      industrialCode: '',
      enterpriseType: '',
      discountRate: '',
      techPrice: ''
    }
    if (!params.id) {
      redirect('/service/evaluation/list')
      return;
    }
    return store.dispatch('patent/getEvaluationSummary', params.id).then(
      res => {
        if (!res) {
          return {
            fetchError: '해당 특허 평가 요약 보고서가 존재하지 않습니다.',
            summaryData: initSummaryData
          }
        }
        else {
          let expirationDate = res['reportExpiredAt'].split('T')[0]
          let code = res['industryCode']
          let ksic = ksicList.find(v => v.code === code)
          let result = {
            expirationDate: expirationDate,
            targetPatent: res['patentNumber'],
            techLife: parseInt(res['techLifeTime']),
            cashFlow: parseInt(res['cashFlowPeriod']),
            royaltyRate: res['royaltyRate'],
            industrialCode: !ksic ? code : `${ksic.code} ${ksic.title}`,
            enterpriseType: res['companySize'],
            discountRate: res['discountRate'],
            techPrice: parseInt(res['companyValue']).toLocaleString(),
          }
          return {
            fetchError: null,
            summaryData: result
          }
        }
      },
      err => {
        return {
          fetchError: err,
          summaryData: initSummaryData
        }
      }
    )
  },
  mounted() {
    this.$store.commit('setSheetTitle', '특허평가')
    if (!!this.fetchError) {
      alert(this.fetchError)
      this.$router.push('/service/evaluation/list')
    }
  },

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
  }),
  computed: {
    summaryContent() {
      return [{
        price: '12000 KRW',
        expirationDate: this.expirationDate,
        purpose: '평가용도 : 기술 가치금액 참고용',
        targetPatent: this.targetPatent,
        techLife: this.techLife + this.cashFlow,
        royaltyRate: this.royaltyRate,
        discountRate: this.discountRate,
        techPrice: this.techPrice
      }]
    },

    expirationDate() {
      let sample = this.summaryData.expirationDate
      return !sample ? '' : `<span class="light-blue--text">${this.summaryData.expirationDate}</span>`
    },

    targetPatent() {
      let sample = this.summaryData.targetPatent
      let result = `평가대상 특허 : 등록 ${!sample ? '' : '1'}건\n`
      result += `\n<span class="mb-0 light-blue--text">${sample}</span>`
      return result
    },

    techLife() {
      let sample = this.summaryData.techLife
      return `기술의 경제적 수명 : <span class="light-blue--text">${sample}</span>년\n`
    },

    cashFlow() {
      let sample = this.summaryData.cashFlow
      return `현금흐름 추정기간 : <span class="light-blue--text">${sample}</span>`
    },

    royaltyRate() {
      let sample = this.summaryData.royaltyRate
      return `매출액 추정 : 직접 추정 (시장 점유율법)\n로열티 : 업종별 상관행법 X 로열티율 조정계수 = <span class="light-blue--text">${sample}</span>`
    },

    discountRate() {
      return `할인율 : <span class="light-blue--text">${this.summaryData.discountRate}</span>\n업종 : <span class="light-blue--text">${this.summaryData.industrialCode}</span>\n기업분류 : <span class="light-blue--text">${this.summaryData.enterpriseType}</span>`
    },

    techPrice() {
      return `기술가치 = <span class="light-blue--text">${this.summaryData.techPrice}</span> 백만원`
    },
  },
  methods: {
    goToSearch() {
      this.$router.push('/service/evaluation/list')
    }
  },
}
</script>

<style scoped>

</style>
