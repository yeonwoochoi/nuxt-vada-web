<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="height:fit-content;" class="elevation-0" :width="`${$vuetify.breakpoint.mdAndUp ? '1100px' : '100%'}`">
        <main-card :header="header">
          <template v-slot:body>
            <v-row align="center" justify="start">
              <p class="subtitle-2 font-weight-regular pl-6 mb-6">특허 평가는 <span class="title font-weight-black pl-1">{{lastDataUpdatedAt}}</span>까지 등록된 특허만 가능합니다.</p>
            </v-row>
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
                          @purchaseReport="purchase"
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
    <v-overlay :value="downloadingReport">
      <p class="white--text font-weight-black headline text-center">보고서 생성 중입니다</p>
      <p class="white--text font-weight-black headline text-center pl-1">잠시만 기다려주세요</p>
      <div class="mt-6" style="display: flex; justify-content: center;">
        <v-progress-circular
          indeterminate
          color="white"
        />
      </div>
    </v-overlay>
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
  asyncData({store}) {
    return store.dispatch('patent/getDataLastUpdatedAt').then(
      res => {
        let date = res.split('T')[0].split('-');
        return {
          fetchError: null,
          lastDataUpdatedAt: `${date[0]}년 ${date[1]}월 ${date[2]}일`
        }
      },
      err => {
        return {
          fetchError: err,
          lastDataUpdatedAt: null
        }
      }
    )
  },
  created() {
    this.$store.commit('patent/resetEvalData')
    this.$store.commit('setSheetTitle', '특허평가')
    if (!!this.fetchError) {
      this.$errorHandler.showMessage(this.fetchError)
    }
    this.downloadingReport = false;
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isPurchase && this.isLastStep) {
      this.removeReport(() => {
        this.$store.commit('patent/resetTempEvalData')
        next()
      })
    }
    else {
      this.$store.commit('patent/resetTempEvalData')
      next()
    }
  },
  destroyed() {
    if (!this.isPurchase && this.isLastStep) {
      this.removeReport(() => {
        this.$store.commit('patent/resetTempEvalData')
      })
      return;
    }
    this.$store.commit('patent/resetTempEvalData')
  },
  data: () => ({
    header: '특허평가',
    currentStep: 1,
    steps: [
      { step: 1, header: '특허 번호', valid: true, errorMsg: '유효한 특허번호를 입력해주십시오.' },
      { step: 2, header: '산업분류코드', valid: true, errorMsg: '산업분류코드를 선택해 주셔야 다음 단계로 진행 가능합니다.' },
      { step: 3, header: '3년 매출액', valid: true, errorMsg: '모든 값을 입력해야 다음 단계로 진행 가능합니다.' },
      { step: 4, header: '기업 규모', valid: true, errorMsg: '기업 규모를 선택해 주셔야 다음 단계로 진행 가능합니다.' },
      { step: 5, header: '분석 결과 요약', valid: true, errorMsg: '' },
    ],
    lastStep: 5,
    summaryData: null,
    ksic: {},
    isPurchase: false,
    isRemoving: false,
    downloadingReport: false
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
              this.$errorHandler.showMessage(err)
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
          if (!res) {
            this.$notifier.showMessage({
              content: '특허 평가 결과 데이터가 없습니다.',
              color: 'error'
            })
            callback(true);
            return;
          }
          let randomNumber = Math.floor(Math.random() * 10000) + 1;
          let inputData = this.$store.getters["patent/getTempEvalData"]
          this.summaryData =  {
            id: res['id'],
            reportExpiredAt: res['reportExpiredAt'],
            targetPatentList: [
              res['patentNumber'],
            ],
            cashFlowPeriod: res['cashFlowPeriod'],
            techLifeTime: res['techLifeTime'],
            royaltyRate: res['royaltyRate'],
            discountRate: res['discountRate'],
            industryCode: `${inputData.ksic.title} (${inputData.ksic.code})`,
            companySize: res['companySize'],
            companyValue: randomNumber
          }
          callback();
        },
        err => {
          if (parseInt(err.code) === 10 && parseInt(err['subCode']) >= 10002 && parseInt(err['subCode']) <= 10010) {
            this.$notifier.showMessage({
              content: "특허 평가를 위한 데이터가 아직 준비되지 않았습니다.",
              color: 'info'
            })
          }
          else {
            this.$errorHandler.showMessage(err)
          }
          callback(true);
        }
      )
    },

    async purchase(summaryId, callback) {
      let body = {
        summaryId: summaryId
      }
      if (this.downloadingReport) {
        this.$errorHandler.showMessage('보고서를 생성 및 변환하고 있는 중입니다.')
        return
      }
      this.downloadingReport = true;
      await this.$store.dispatch('patent/purchaseReport', body).then(
        res => {
          let blob = new Blob([res], {type: "application/pdf"});
          let objectUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = objectUrl;
          link.setAttribute('download', `바다파트너스_평가보고서_${this.summaryData.targetPatentList[0]}_${this.$util.toStringByFormatting('_')}.pdf`);
          document.body.appendChild(link);
          link.click();
          this.isPurchase = true;
          this.downloadingReport = false;
          callback(true, "구매 완료되었습니다.")
        },
        err => {
          this.isPurchase = false;
          this.downloadingReport = false;
          callback(false, (err.code === 1 && err.subCode === 1010) ? '포인트가 부족합니다.' : '구매 처리 중 오류가 발생했습니다.')
        }
      )
    },

    async removeReport (callback) {
      if (this.isRemoving) return;
      this.isRemoving = true;
      if (!this.isPurchase) {
        this.$store.dispatch('patent/removeReport', this.summaryData.id).then(
          res => {
            this.isRemoving = false;
            callback()
          },
          err => {
            this.isRemoving = false;
            this.$errorHandler.showMessage(err)
          }
        )
      }
      else {
        this.isRemoving = false;
        callback()
      }
    }
  },
}
</script>

<style scoped>

</style>
