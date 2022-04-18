<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="height:fit-content;" class="elevation-0" :width="`${$vuetify.breakpoint.mdAndUp ? '1100px' : '100%'}`">
        <main-card :header="header">
          <template v-slot:body>
            <v-row align="center" justify="center" class="ma-0">
              <v-card style="width: 100%; height: fit-content;">
                <v-stepper v-model="currentStep" alt-labels class="pb-4 elevation-0">
                  <v-stepper-header class="elevation-0" style="border-bottom: 1px lightgrey solid">
                    <template v-for="n in steps">
                      <v-stepper-step
                        :key="`${n.step}-step`"
                        :complete="isStepComplete(n.step)"
                        :step="n.step"
                        :rules="[value => !!n.valid]"
                        :color="stepStatus(n.step)"
                      >
                        {{ n.header }}
                      </v-stepper-step>
                      <v-divider
                        v-if="n.step < steps.length"
                        :key="`divider-${n.step}`"
                      />
                    </template>
                  </v-stepper-header>
                  <v-stepper-items>
                    <v-stepper-content
                      v-for="n in steps"
                      :key="`${n.step}-content`"
                      :step="n.step"
                    >
                      <v-form v-if="n.step === 1" ref="stepForm" v-model="n.valid" lazy-validation>
                        <patent-info-input-card @nextStep="nextStep"/>
                      </v-form>
                      <validation-observer v-if="n.step === 2" ref="stepForm">
                        <v-form>
                          <ksic-input-card @nextStep="nextStep" @prevStep="prevStep" ref="ksicRef"/>
                        </v-form>
                      </validation-observer>
                      <v-form v-if="n.step === 3" ref="stepForm" v-model="n.valid" lazy-validation>
                        <sales-input-card @nextStep="nextStep" @prevStep="prevStep"/>
                      </v-form>
                      <validation-observer v-if="n.step === 4" ref="stepForm">
                        <v-form>
                          <business-scale-input-card @nextStep="nextStep" @prevStep="prevStep"/>
                        </v-form>
                      </validation-observer>
                      <v-form v-if="n.step === 5" ref="stepForm" v-model="n.valid" lazy-validation>
                        <result-summary-card
                          :download-link="`ai.kunsan.ac.kr:3000/uploads/files-1637042697203.pdf`"
                          :summary-data="summaryData"
                        />
                      </v-form>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-card>
            </v-row>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>

</template>

<script>
import MainCard from "../../../components/card/MainCard";
import SalesInputCard from "../../../components/card/evaluation/SalesInputCard";
import PatentInfoInputCard from "../../../components/card/evaluation/PatentInfoInputCard";
import CompanyLogoBtn from "../../../components/button/CompanyLogoBtn";
import BusinessScaleInputCard from "../../../components/card/evaluation/BusinessScaleInputCard";
import KsicInputCard from "../../../components/card/evaluation/KsicInputCard";
import ResultSummaryCard from "../../../components/card/evaluation/ResultSummaryCard";
import mapper from "../../../data/ipcKsicMapper.json";
import ksicList from "../../../data/ksic.json";


export default {
  name: "evaluation",
  components: {ResultSummaryCard, KsicInputCard, BusinessScaleInputCard, CompanyLogoBtn, PatentInfoInputCard, SalesInputCard, MainCard},
  created() {
    this.$store.commit('patent/resetEvalData')
    this.$store.commit('setSheetTitle', '특허평가')
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('patent/resetTempEvalData')
    next()
  },
  data: () => ({
    header: '특허 평가',
    currentStep: 1,
    steps: [
      { step: 1, header: '특허 번호', valid: true, errorMsg: '유효한 특허번호를 입력해주십시오.' },
      { step: 2, header: '산업분류코드', valid: true, errorMsg: '산업분류코드를 선택해 주셔야 다음 단계로 진행 가능합니다.' },
      { step: 3, header: '3년 매출액', valid: true, errorMsg: '모든 값을 입력해야 다음 단계로 진행 가능합니다.' },
      { step: 4, header: '기업 규모', valid: true, errorMsg: '기업 규모를 선택해 주셔야 다음 단계로 진행 가능합니다.' },
      { step: 5, header: '분석 결과 요약', valid: true, errorMsg: '' },
    ],
    lastStep: 5,
    loading: false,
    summaryData: null,
    ksic: {},
  }),
  computed: {
    isLastStep() {
      return this.currentStep === this.lastStep
    },
  },
  methods: {
    isStepComplete(step) {
      return this.currentStep > step;
    },
    prevStep(step) {
      if (this.currentStep > 1) {
        this.currentStep = step - 1
      }
    },
    async nextStep(currentStep, callback = null) {
      let index = currentStep-1;
      this.steps[index].valid = false
      let v = await this.$refs.stepForm[index].validate();
      if (v) {
        this.steps[index].valid = true
        if (!this.isLastStep) {
          await this.fetchData(currentStep, (hasError = false) => {
            if (!hasError) {
              this.currentStep = currentStep + 1;
            }
            if (!!callback) {
              callback();
            }
          })
        }
        else {
          await this.$router.push('/')
        }
      }
      else {
        alert(this.steps[index].errorMsg)
      }
    },
    stepStatus(step) {
      return this.currentStep > step ? 'green' : 'blue'
    },

    // 다음 step으로 넘어가기전 다음 step에 필요한 data를 미리 fetch 시키는 method
    async fetchData(prevStep, callback) {
      // 나머지 step
      if (parseInt(prevStep + 1) < this.lastStep) {

        // 2번째 (index = 1) step 에서 fetchData 호출
        if (prevStep === 1) {
          let patentNumber = this.$store.getters["patent/getTempEvalData"].patentNumber
          await this.$store.dispatch('patent/getIpcCode', {patentNumbers: [patentNumber]}).then(
            res => {
              if (!res) {
                this.$notifier.showMessage({
                  content: '유효하지 않은 특허번호입니다.',
                  color: 'error'
                })
                callback(true)
              }
              else {
                let target = mapper.find(v => v.ipc === res).ksic;
                let ksic = ksicList.find(v => v.code === target)
                this.$store.commit('patent/setKsic', ksic)
                this.$refs.ksicRef[0].fetchData();
                callback();
              }
            },
            err => {
              this.$notifier.showMessage({
                content: err,
                color: 'error'
              })
              callback(true)
            }
          )
          return;
        }

        callback();
        return;
      }

      // 마지막 step (요약문 fetch data)
      // evaluate 진행
      await this.$store.dispatch('patent/evaluate').then(
        res => {
          let randomNumber = Math.floor(Math.random() * 10000) + 1;
          let inputData = this.$store.getters["patent/getTempEvalData"]
          let currentYear = parseInt(new Date().getFullYear())
          this.summaryData =  {
            targetPatentList: [
              'KR ' + inputData.patentNumber,
            ],
            techLife: res['cashFlowResult']['techLifeTime'],
            cashFlowFrom: currentYear,
            cashFlowTo: currentYear + res['cashFlowResult']['cashFlowPeriod'] - 1,
            royalty: res['royaltyRateResult']['finalRoyaltyRate'] * 100,
            discountRate: res['discountRateResult']['discountRateSum'],
            industrialCode: `${inputData.ksic.title} (${inputData.ksic.code})`,
            enterpriseType: inputData.businessScale.original,
            techPriceFrom: randomNumber,
            techPriceTo: randomNumber + 1,
          }
          callback();
        },
        err => {
          this.$notifier.showMessage({
            content: err,
            color: 'error'
          })
          callback(true);
        }
      )
    },
  },
}
</script>

<style scoped>

</style>
