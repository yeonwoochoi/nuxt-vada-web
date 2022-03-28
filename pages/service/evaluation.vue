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
                          <business-scale-input-card @nextStep="nextStep" @prevStep="prevStep"/>
                        </v-form>
                      </validation-observer>
                      <validation-observer v-if="n.step === 4" ref="stepForm">
                        <v-form>
                          <industrial-classification-input-card @nextStep="nextStep" @prevStep="prevStep"/>
                        </v-form>
                      </validation-observer>
                      <v-form v-if="n.step === 5" ref="stepForm" v-model="n.valid" lazy-validation>
                        <result-summary-card :download-link="`ai.kunsan.ac.kr:3000/uploads/files-1637042697203.pdf`"/>
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
import MainCard from "../../components/card/MainCard";
import SalesInputCard from "../../components/card/evaluation/SalesInputCard";
import PatentNumberInputCard from "../../components/card/evaluation/PatentNumberInputCard";
import CompanyLogoBtn from "../../components/button/CompanyLogoBtn";
import BusinessScaleInputCard from "../../components/card/evaluation/BusinessScaleInputCard";
import IndustrialClassificationInputCard from "../../components/card/evaluation/IndustrialClassificationInputCard";
import ResultSummaryCard from "../../components/card/evaluation/ResultSummaryCard";
export default {
  name: "evaluation",
  components: {
    ResultSummaryCard,
    IndustrialClassificationInputCard,
    BusinessScaleInputCard, CompanyLogoBtn, PatentNumberInputCard, SalesInputCard, MainCard},
  data: () => ({
    header: '특허 평가',
    currentStep: 1,
    steps: [
      { step: 1, header: '3년 매출액', valid: true, errorMsg: '모든 약관에 동의 하셔야 다음 단계로 진행 가능합니다.' },
      { step: 2, header: '특허 번호', valid: true, errorMsg: '유효한 특허번호를 입력해주십시오.' },
      { step: 3, header: '기업 규모', valid: true, errorMsg: '기업 규모를 선택해 주셔야 다음 단계로 진행 가능합니다.' },
      { step: 4, header: '산업분류코드', valid: true, errorMsg: '산업분류코드를 선택해 주셔야 다음 단계로 진행 가능합니다.' },
      { step: 5, header: '분석 결과 요약', valid: true, errorMsg: '' },
    ],
    lastStep: 5,
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
          this.currentStep = step + 1
        }
        else {
          await this.$router.push('/')
        }
      }
      else {
        alert(this.steps[index].errorMsg)
      }
    },
    async submit(params, errorMsg) {
      let currentStep = 3;
      let index = currentStep - 1;
      this.steps[index].valid = false
      let v = await this.$refs.stepForm[index].validate();
      if (v) {
        this.steps[index].valid = true
        setTimeout(() => {
          this.currentStep = currentStep + 1;
        }, 3000)
      }
      else {
        alert(errorMsg)
      }
    },
    stepStatus(step) {
      return this.currentStep > step ? 'green' : 'blue'
    },
  }
}
</script>

<style scoped>

</style>
