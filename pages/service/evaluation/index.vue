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
                        <sales-input-card @nextStep="nextStep" />
                      </v-form>
                      <v-form v-if="n.step === 2" ref="stepForm" v-model="n.valid" lazy-validation>
                        <patent-number-input-card @nextStep="nextStep" @prevStep="prevStep"/>
                      </v-form>
                      <validation-observer v-if="n.step === 3" ref="stepForm">
                        <v-form>
                          <ksic-input-card @nextStep="nextStep" @prevStep="prevStep" v-model="loading"/>
                        </v-form>
                      </validation-observer>
                      <validation-observer v-if="n.step === 4" ref="stepForm">
                        <v-form>
                          <business-scale-input-card @nextStep="nextStep" @prevStep="prevStep"/>
                        </v-form>
                      </validation-observer>
                      <v-form v-if="n.step === 5" ref="stepForm" v-model="n.valid" lazy-validation>
                        <result-summary-card
                          :download-link="`ai.kunsan.ac.kr:3000/uploads/files-1637042697203.pdf`"
                          :summary-data="sampleSummaryData"
                          :is-loading="(loading || currentStep !== 5)"
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
import PatentNumberInputCard from "../../../components/card/evaluation/PatentNumberInputCard";
import CompanyLogoBtn from "../../../components/button/CompanyLogoBtn";
import BusinessScaleInputCard from "../../../components/card/evaluation/BusinessScaleInputCard";
import KsicInputCard from "../../../components/card/evaluation/KsicInputCard";
import ResultSummaryCard from "../../../components/card/evaluation/ResultSummaryCard";
export default {
  name: "evaluation",
  components: {
    ResultSummaryCard,
    KsicInputCard,
    BusinessScaleInputCard, CompanyLogoBtn, PatentNumberInputCard, SalesInputCard, MainCard},
  created() {
    this.$store.commit('setSheetTitle', '특허평가')
  },
  data: () => ({
    header: '특허 평가',
    currentStep: 1,
    steps: [
      { step: 1, header: '3년 매출액', valid: true, errorMsg: '모든 값을 입력해야 다음 단계로 진행 가능합니다.' },
      { step: 2, header: '특허 번호', valid: true, errorMsg: '유효한 특허번호를 입력해주십시오.' },
      { step: 3, header: '산업분류코드', valid: true, errorMsg: '산업분류코드를 선택해 주셔야 다음 단계로 진행 가능합니다.' },
      { step: 4, header: '기업 규모', valid: true, errorMsg: '기업 규모를 선택해 주셔야 다음 단계로 진행 가능합니다.' },
      { step: 5, header: '분석 결과 요약', valid: true, errorMsg: '' },
    ],
    lastStep: 5,
    loading: false,
    sampleSummaryData: null
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
    async nextStep(step) {
      let index = step-1;
      this.steps[index].valid = false
      let v = await this.$refs.stepForm[index].validate();
      if (v) {
        this.steps[index].valid = true
        if (!this.isLastStep) {
          //this.currentStep = step + 1
          this.fetchSummaryData(step, () => {
            this.currentStep = step + 1;
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
    fetchSummaryData(prevStep, callback) {
      if (parseInt(prevStep + 1) < this.lastStep) {
        callback();
        return;
      }
      this.loading = true
      setTimeout(() => {
        let randomNumber = Math.floor(Math.random() * 10000) + 1;
        this.sampleSummaryData =  {
          targetPatentList: [
            'KR 10-0107367',
          ],
          techLife: 9,
          cashFlowFrom: '2020',
          cashFlowTo: '2028',
          loyalty: '3.15',
          discountRate: '10.85',
          industrialCode: '기타 기계 및 장비 제조업 (C29)',
          enterpriseType: '비상장 창업기업',
          techPriceFrom: randomNumber,
          techPriceTo: randomNumber + 1,
        }
        this.loading = false
        callback();
      }, 3000)
    },
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
