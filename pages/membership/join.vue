<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card class="sign-up-card">
        <v-stepper v-model="currentStep" alt-labels class="pb-4">
          <v-stepper-header>
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
                <sign-up-agreement-card />
              </v-form>
              <v-form v-if="n.step === 2" ref="stepForm" v-model="n.valid" lazy-validation>
                <sign-up-user-type-card @setUserType="setUserType" />
              </v-form>
              <v-form v-if="n.step === 3" ref="stepForm" v-model="n.valid" lazy-validation>
                <sign-up-user-info-input-card />
              </v-form>
              <v-form v-if="n.step === 4" ref="stepForm" v-model="n.valid" lazy-validation>
                <sign-up-done-card />
              </v-form>


              <div style="display: flex;" class="ml-12">
                <v-btn
                  color="primary"
                  @click="validate(n.step)"
                  :disabled="!n.valid"
                >
                  {{ `${isLastStep ? '메인으로' : '계속하기'}` }}
                </v-btn>

                <v-btn
                  text
                  v-if="currentStep > 1"
                  @click="prevStep(n.step)"
                >
                  이전으로
                </v-btn>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import SignUpAgreementCard from "../../components/card/sign-up/SignUpAgreementCard";
import SignUpUserTypeCard from "../../components/card/sign-up/SignUpUserTypeCard";
import SignUpUserInfoInputCard from "../../components/card/sign-up/SignUpUserInfoInputCard";
import SignUpDoneCard from "../../components/card/sign-up/SignUpDoneCard";
export default {
  name: "join",
  components: {SignUpDoneCard, SignUpUserInfoInputCard, SignUpUserTypeCard, SignUpAgreementCard},
  data: () => ({
    currentStep: 1,
    steps: [
      { step: 1, header: '회원가입 동의', valid: true },
      { step: 2, header: '회원유형 확인', valid: true },
      { step: 3, header: '회원정보 입력', valid: true },
      { step: 4, header: '회원가입 완료', valid: true },
    ],
    lastStep: 4,
    userType: '',
  }),
  computed: {
    isLastStep() {
      return this.currentStep === this.lastStep
    },
  },
  methods: {
    isStepComplete(step) {
      // TODO (Signup): 각 Step 완료되었는지 확인하는 code (ex. 약관 모두 동의 여부0
      return this.currentStep > step;
    },
    nextStep(n) {
      if (!this.isLastStep) {
        this.currentStep = n + 1
      }
      else {
        this.$router.push('/')
      }
    },
    prevStep(n) {
      if (this.currentStep > 1) {
        this.currentStep = n - 1
      }
    },
    validate(n) {
      let index = n-1;
      this.steps[index].valid = false
      let v = this.$refs.stepForm[index].validate()
      if (v) {
        this.steps[index].valid = true
        this.nextStep(n)
      }
    },
    stepStatus(step) {
      return this.currentStep > step ? 'green' : 'blue'
    },
    setUserType(val) {
      this.userType = val
    }
  }
}
</script>

<style scoped>
 .sign-up-card {
   width: 1100px;
   height: fit-content;
 }
</style>
