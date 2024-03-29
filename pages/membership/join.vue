<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card class="sign-up-card">
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
                <sign-up-agreement-card @nextStep="nextStep" />
              </v-form>
              <v-form v-if="n.step === 2" ref="stepForm" v-model="n.valid" lazy-validation>
                <sign-up-user-type-card @setUserType="setUserType" @nextStep="nextStep" @prevStep="prevStep"/>
              </v-form>
              <validation-observer v-if="n.step === 3" ref="stepForm">
                <v-form>
                  <sign-up-user-info-input-card
                    :user-type="userType"
                    @submit="submit"
                    @prevStep="prevStep"
                    @sendCode="sendEmailAuthCode"
                    @checkCode="checkEmailAuthCode"
                    @download="downloadFile"
                  />
                </v-form>
              </validation-observer>
              <v-form v-if="n.step === 4" ref="stepForm" v-model="n.valid" lazy-validation>
                <sign-up-done-card :user-type="userType" @nextStep="nextStep"/>
              </v-form>
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
import {ValidationObserver} from "vee-validate";


export default {
  name: "join",
  auth: false,
  components: {ValidationObserver, SignUpDoneCard, SignUpUserInfoInputCard, SignUpUserTypeCard, SignUpAgreementCard},
  asyncData({store,redirect}) {
    if(store.$auth.loggedIn) {
      redirect('/')
    }
  },
  created() {
    this.$store.commit('setSheetTitle', '회원가입')
  },
  data: () => ({
    currentStep: 1,
    steps: [
      { step: 1, header: '회원가입 동의', valid: true, errorMsg: '모든 약관에 동의 하셔야 다음 단계로 진행 가능합니다.' },
      { step: 2, header: '회원유형 확인', valid: true, errorMsg: '회원 유형을 선택 하셔야 다음 단계로 진행 가능합니다.' },
      { step: 3, header: '회원정보 입력', valid: true, errorMsg: '입력한 정보를 확인해 주세요' },
      { step: 4, header: '회원가입 완료', valid: true, errorMsg: '' },
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
        this.$notifier.showMessage({
          content: this.steps[index].errorMsg,
          color: "error"
        })
      }
    },
    async submit(params) {
      let currentStep = 3;
      let index = currentStep - 1;
      this.steps[index].valid = false
      let v = await this.$refs.stepForm[index].validate();
      if (v) {
        this.steps[index].valid = true
        if (params.isPrivate) {
          this.$store.dispatch("user/createPrivateUser", params.data).then(
            res => {
              this.currentStep = currentStep + 1;
            },
            err => {
              this.$errorHandler.showMessage(err)
            }
          )
        }
        else {
          this.$store.dispatch("user/createEnterpriseUser", params.data).then(
            res => {
              this.currentStep = currentStep + 1;
            },
            err => {
              this.$errorHandler.showMessage(err)
            }
          )
        }
      }
      else {
        this.$notifier.showMessage({
          content: params.errorMsg,
          color: "error"
        })
      }
    },
    async sendEmailAuthCode(email, callback) {
      let param = {
        email: email,
        type: 'Register'
      }
      await this.$store.dispatch('user/sendEmailAuthCode', param).then(
        res => {
          this.$notifier.showMessage({
            content: '인증번호가 전송되었습니다.',
            color: 'success'
          })
          callback(true)
        },
        err => {
          this.$errorHandler.showMessage(err)
          callback(false)
        }
      )
    },
    async checkEmailAuthCode(email, code, callback) {
      let param = {
        email: email,
        code: code
      }
      await this.$store.dispatch('user/validateEmailAuthCode', param).then(
        res => {
          callback(true)
          this.$notifier.showMessage({
            content: '인증이 완료되었습니다.',
            color: 'success'
          })
        },
        err => {
          callback(false)
          this.$errorHandler.showMessage(err)
        }
      )
    },
    stepStatus(step) {
      return this.currentStep > step ? 'green' : 'blue'
    },
    setUserType(val) {
      this.userType = val
    },
    downloadFile() {
      this.$store.dispatch('patent/downloadTemplateFile', 'IpEmailPair').then(
        res => {
          let blob = new Blob([res], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = objectUrl;
          link.setAttribute('download', '바다파트너스_기업가입신청양식.xls');
          document.body.appendChild(link);
          link.click();
        },
        err => {
          this.$errorHandler.showMessage(err)
        }
      )
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
