<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-4 mb-4">
    <v-row align="center" justify="center" style="width: 100%; height: 100%;">
      <v-col cols="11" class="text-center pt-6 font-weight-bold headline">
        <p>{{title}}</p>
      </v-col>
      <v-col cols="11" class="mt-1 mb-3">
        <vertical-header-table
          v-if="!!summaryData"
          :table-header="summaryHeader"
          :table-items="summaryContent"
        />
      </v-col>
      <div style="display: flex;" class="mt-6 mb-4">
        <v-dialog
          v-model="isPurchaseDialogOpen"
          max-width="350"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              x-large
              v-on="on"
              v-bind="attrs"
              color="primary"
              :width="`${$vuetify.breakpoint.smAndDown ? '49%' : '200'}`"
              :disabled="isDownload"
              height="52px"
              class="mx-1 darken-1 font-weight-bold"
              style="letter-spacing: 1px; text-transform: none;"
            >
              구매하기
            </v-btn>
          </template>
          <confirmation-dialog
            @cancel="isPurchaseDialogOpen = false"
            @ok="purchase"
            :title="purchaseDialogTitle"
            :comment="purchaseDialogContent"
          />
        </v-dialog>
        <custom-button
          class="mx-1"
          :width="`${$vuetify.breakpoint.smAndDown ? '49%' : '200'}`"
          :color="'primary'"
          :text="`메인으로`"
          @submit="$router.push('/')"
          :is-disable="isDownload"
        />
      </div>
    </v-row>
  </v-card>
</template>

<script>
import CustomButton from "../../button/CustomButton";
import VerticalHeaderTable from "../../table/VerticalHeaderTable";
import ConfirmationDialog from "../../dialogue/ConfirmationDialog";
import {mapGetters} from "vuex";

export default {
  name: "ResultSummaryCard",
  components: {ConfirmationDialog, VerticalHeaderTable, CustomButton},
  props: {
    summaryData: {
      type: Object,
      default: () => { return {} }
    },
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
    isDownload: false,
    isPurchaseDialogOpen: false,
    purchaseDialogTitle: '특허평가 보고서 구매',
  }),
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    }),
    purchaseDialogContent() {
      if (this.isEnterpriseUser) {
        return `<p class="font-weight-bold subtitle-1">포인트: ${this.userInfo['leftReport']}</p><p class="font-weight-bold subtitle-1">이용권 만료일: ${this.userInfo['enterprisePass']}</p>이용권이 있는 경우를 제외하곤, 보고서 구매시 포인트가 차감됩니다. 정말 구매하시겠습니까?`
      }
      else {
        return `<p class="font-weight-bold subtitle-1">포인트: ${this.userInfo['leftReport']}</p>보고서 구매시, 포인트가 차감됩니다. 정말 구매하시겠습니까?`
      }
    },
    isEnterpriseUser() {
      if (!this.$auth.loggedIn) {
        return false
      }
      return this.$auth.user['roles'].includes("ROLE_ENTERPRISE_MANAGER_USER") || this.$auth.user['roles'].includes("ROLE_ENTERPRISE_USER")
    },
    targetPatent() {
      let sample = this.summaryData.targetPatentList
      let result = `평가대상 특허 : 등록 ${sample.length}건`
      for (let i = 0; i < sample.length; i++) {
        let temp = sample[i];
        result += `\n<span class="mb-0 light-blue--text">${temp}</span>`
      }
      return result
    },

    techLife() {
      // TODO: Sample
      let sample = this.summaryData.techLifeTime
      return `기술의 경제적 수명 : <span class="light-blue--text">${sample}</span>년\n`
    },

    cashFlow() {
      let sample = this.summaryData.cashFlowPeriod
      return `현금흐름 추정기간 : <span class="light-blue--text">${sample}</span>`
    },

    royaltyRate() {
      let sample = this.summaryData.royaltyRate
      return `매출액 추정 : 직접 추정 (시장 점유율법)\n로열티 : 업종별 상관행법 X 로열티율 조정계수 = <span class="light-blue--text">${sample}</span>`
    },

    discountRate() {
      return `할인율 : <span class="light-blue--text">${this.summaryData.discountRate}</span>\n업종 : <span class="light-blue--text">${this.summaryData.industryCode}</span>\n기업분류 : <span class="light-blue--text">${this.summaryData.companySize}</span>`
    },

    techPrice() {
      return `<span class="light-blue--text">${this.summaryData.companyValue}</span> 백만원 (구매를 하지 않은 경우 임의의 수가 생성됩니다.)`
    },

    summaryContent() {
      return [
        {
          purpose: '평가용도 : 기술 가치금액 참고용',
          targetPatent: this.targetPatent,
          techLife: this.techLife + this.cashFlow,
          royaltyRate: this.royaltyRate,
          discountRate: this.discountRate,
          techPrice: this.techPrice
        }
      ]
    },
  },
  watch: {
    isPurchaseDialogOpen: {
      handler: function(val, oldVal) {
        if (val) {
          this.fetchPointData()
        }
      },
      deep: true
    }
  },
  methods: {
    async purchase() {
      this.isDownload = true;
      this.isPurchaseDialogOpen = false
      await this.$emit('purchaseReport', this.summaryData.id, (success, msg) => {
        this.isDownload = false;
        alert(msg)
        if (success) {
          location.href = '/service/evaluation/list'
        }
        else {
          this.$router.push('/service/fee')
        }
      })
    },
    fetchPointData() {
      this.$store.dispatch('refreshPointData')
    }
  }
}
</script>

<style scoped>

</style>
