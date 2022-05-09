<template>
  <v-container fluid>
    <v-dialog v-model="showPurchasePopup" max-width="564" persistent>
      <v-card color="white">
        <iframe width="564" height="604" id="frame" :src="iframeSrc" @load="onLoadIframe"/>
      </v-card>
    </v-dialog>
    <v-row v-if="!purchaseDone" align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
              <v-col cols="12">
                <v-card v-if="!isPurchasing" class="elevation-0 px-md-12 px-6 py-12" style="background-color: #F5F5F5; width: 100%">
                  <div class="mb-12">
                    <v-card-title class="font-weight-medium mb-4 pr-0" style="font-size: 25px;">
                      • 건별 요금제
                    </v-card-title>
                    <v-data-table
                      :headers="planHeaders"
                      :items="planItems"
                      hide-default-footer
                      class="text-center"
                      :mobile-breakpoint="0"
                      style="width: 100%; height: fit-content; background-color: white; border: rgba(0,0,0,0.12) 1px solid"
                    >
                      <template v-slot:item.price="{item}">
                        {{item.price.toLocaleString()}}
                      </template>
                    </v-data-table>
                  </div>
                  <div class="mt-12" style="display: flex; justify-content: end">
                    <v-btn
                      x-large
                      class="elevation-0"
                      color="primary"
                      @click="goToTermsOfPurchase"
                      :disabled="!$auth.loggedIn"
                    >
                      신청하기
                    </v-btn>
                  </div>
                </v-card>
                <v-card v-else class="elevation-0 px-md-12 px-6 py-16" style="background-color: #F5F5F5; width: 100%">
                  <v-container fluid>
                    <v-row align="center" justify="center" class="mb-16 mt-2">
                      <v-col cols="12" class="pb-0">
                        <form id="fdPay">
                          <input type="hidden" name="PAYDATA" id="PAYDATA" :value="payloadData" />
                        </form>
                        <div>
                          <p class="font-weight-bold headline text-center mb-16">건별 요금제</p>
                          <div style="display: flex; align-items: center; justify-content: space-between">
                            <p class="subtitle-1 font-weight-bold mb-0 ml-2 red--text">* 구매하고자 하는 상품을 골라주세요.</p>
                            <p class="caption mb-0 mr-2">(단위: 원)</p>
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12">
                        <v-data-table
                          v-model="selected"
                          :headers="planHeaders"
                          :items="planItems"
                          single-select
                          show-select
                          item-key="id"
                          class="elevation-0"
                          hide-default-footer
                          disable-filtering
                          disable-sort
                          style="width: 100%; height: fit-content; background-color: white; border: rgba(0,0,0,0.12) 1px solid"
                        >
                          <template v-slot:item.price="{item}">
                            {{item.price.toLocaleString()}}
                          </template>
                        </v-data-table>
                      </v-col>
                    </v-row>
                    <v-row align="center" justify="center" class="mt-16">
                      <v-col cols="12">
                        <p class="font-weight-bold headline text-center">구매 약관</p>
                      </v-col>
                      <v-col cols="12" class="mt-4">
                        <div v-for="(v, i) in termsOfPurchase" :key="`terms-of-purchase-${i}`" :class="`${i === 0 ? 'mb-12' : ''}`">
                          <p class="subtitle-1 font-weight-bold">{{v.title}}</p>
                          <p v-for="(c, j) in v.content" :key="`terms-of-purchase-${i}-${j}`" class="subtitle-2 ml-2">{{c}}</p>
                        </div>
                      </v-col>
                      <v-col cols="12" align-self="center">
                        <v-checkbox v-model="termsOfPurchaseAgreement" :label="termsOfPurchaseAgreementComment"/>
                      </v-col>
                      <v-col cols="12">
                        <div class="mt-4" style="display: flex; justify-content: end">
                          <v-dialog
                            v-model="showAlert"
                            max-width="350"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                x-large
                                class="elevation-0"
                                color="primary"
                                @click="showAlert = !showAlert"
                                :disabled="!termsOfPurchaseAgreement || selected.length <= 0 || showAlert"
                              >
                                결제하기
                              </v-btn>
                            </template>
                            <confirmation-dialog
                              @cancel="showAlert = false"
                              @ok="onClickPurchase"
                              title="구매 확인"
                            >
                              <template>
                                <v-row align="center" justify="center" v-if="selected.length > 0">
                                  <v-col cols="7" class="pb-0">
                                    <v-subheader>유형</v-subheader>
                                  </v-col>
                                  <v-col cols="5" class="pb-0">
                                    <p class="mb-0 font-weight-bold">{{selected[0]['name']}}</p>
                                  </v-col>
                                  <v-col cols="7" class="py-0">
                                    <v-subheader>가치평가 수</v-subheader>
                                  </v-col>
                                  <v-col cols="5" class="py-0">
                                    <p class="mb-0 font-weight-bold">{{selected[0]['numReports']}}</p>
                                  </v-col>
                                  <v-col cols="7" class="pt-0">
                                    <v-subheader>가격(부가세포함)</v-subheader>
                                  </v-col>
                                  <v-col cols="5" class="pt-0">
                                    <p class="mb-0 font-weight-bold">{{selected[0]['price'].toLocaleString()}}</p>
                                  </v-col>
                                  <v-col cols="12">
                                    <p class="font-weight-black mb-0 text-center">결제하시겠습니까?</p>
                                  </v-col>
                                </v-row>
                              </template>
                            </confirmation-dialog>
                          </v-dialog>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </main-card>
      </v-card>
    </v-row>
    <v-row v-else-if="purchaseSuccess" align="center" justify="center">
      <v-card class="elevation-2 login-card">
        <v-row align="center" justify="center" style="width: 100%; height: 100%" class="py-12">
          <v-col cols="12">
            <p class="font-weight-medium mb-0 text-center" style="font-size: 50px;">
              결제 완료
            </p>
          </v-col>
          <v-col cols="12">
            <v-row class="justify-space-between pa-6">
              <v-col cols="6" class="text-center title">주문번호</v-col>
              <v-col cols="6" class="text-center title">{{ purchaseId }}</v-col>
              <v-col cols="6" class="text-center title">상품명</v-col>
              <v-col cols="6" class="text-center title">{{ tempPurchaseItem.serviceName }}</v-col>
              <v-col cols="6" class="text-center title">가격</v-col>
              <v-col cols="6" class="text-center title">{{ tempPurchaseItem.price.toLocaleString() }}</v-col>
              <v-col cols="6" class="text-center title">구매한 보고서 수</v-col>
              <v-col cols="6" class="text-center title">{{ tempPurchaseItem.numReports }}</v-col>
            </v-row>
          </v-col>
          <custom-button
            @submit="$router.go(0)"
            :width="`200px`"
            :color="'primary'"
            :text="`확인`"
            class="mt-2 darken-1"
          />
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "../../components/card/MainCard";
import SimpleDataTable from "../../components/table/SimpleDataTable";
import CustomButton from "../../components/button/CustomButton";
import ConfirmationDialog from "../../components/dialogue/ConfirmationDialog";
import VadaRequestPayment from "../../utils/VadaRequestPayment";
import VadaApprovePayment from "@/utils/VadaApprovePayment";

export default {
  name: "fee",
  auth: false,
  components: {ConfirmationDialog, CustomButton, SimpleDataTable, MainCard},
  asyncData({store}) {
    return store.dispatch("payment/readAllPlan").then(
      res => {
        return {
          planItems: res.sort((a,b) => a.price - b.price),
          fetchError: null
        }
      },
      err => {
        return {
          planItems: [],
          fetchError: err
        }
      }
    )
  },
  created() {
    this.$store.commit('setSheetTitle', '이용신청')
    if (!!this.fetchError) {
      this.$errorHandler.showMessage(this.fetchError)
    }
  },
  mounted() {
    window.addEventListener('message', event => {
      this.onIframeMessage(event)
    })
  },
  beforeDestroy() {
    window.removeEventListener('message', event => {
      this.onIframeMessage(event)
    })
    this.onResetPurchase()
  },
  beforeRouteLeave(to, from, next) {
    this.onResetPurchase()
    next()
  },
  data: () => ({
    isPurchasing: false,
    incidentPlanCount: '',

    termsOfPurchase: [
      {
        'title': '제 17 조 (이용요금 및 요금의 납입방법 등)',
        'content': [
          '① 바다파트너스에서 제공하는 서비스 중 사이트상에 고지된 금액은 그 고지된 금액을 확정금액으로 한다.',
          '② 바다파트너스가 제공하는 서비스에 대한 대금지급방법은 아래 항목을 이용 할 수 있다. 전자결제를 통한 신용카드결제 전자결제를 통한 계좌이체결제 바다파트너스와 서비스 이용가입자가 서로 합의한 기타 결제방법',
          '③ 이용요금 납입책임자는 서비스 이용가입자를 원칙으로 한다. 다만, 바다파트너스가 인정하는 경우에는 타인을 이용요금 납입책임자로 할 수 있다.',
          '④ 위 제③항의 규정에 의한 이용요금 납입책임자는 이용자가 바다파트너스에 대하여 부담하는 서비스 이용요금 등 약관에 따른 모든 채무를 이용자와 연대하여 바다파트너스에 납입하여야 한다.',
        ]
      },
      {
        'title': '제 18 조 (PARTNERS 요금제 이용기간 및 연장)',
        'content': [
          '① PARTNERS 요금제의 이용 기간은 계약 체결일로부터 12개월로 한다.',
          '② 이용기간 만료일 1개월 이내 상호 별도의 서면 의사표시를 하여 바다파트너스가 이용요금의 납입을 확인 후 연간회원의 이용기간 연장을 승인할 수 있다.'
        ]
      }
    ],
    termsOfPurchaseAgreementComment: '상기 구매 약관을 모두 읽어보었으며 이에 동의합니다.',
    termsOfPurchaseAgreement: false,

    selected: [],

    planHeaders: [
      {
        text: '요금제명',
        value: 'name',
        align: 'center'
      },
      {
        text: '보고서 수',
        value: 'numReports',
        align: 'center'
      },
      {
        text: '가격',
        value: 'price',
        align: 'center'
      },
    ],
    showAlert: false,
    showPurchasePopup: false,

    iframeSrc: '',
    tempPaymentObj: null,
    paymentObj: null,
    payloadData: null,
    purchaseSuccess: false,
    paymentLog: null,
    purchaseId: '',
    purchaseDone: false,
  }),
  computed: {
    header() {
      return this.isPurchasing ? "이용신청" : "요금안내"
    },
    selectedItem() {
      return {
        'id': this.selected[0]['id'],
        'serviceName': this.selected[0]['name'],
        'numReports': parseInt(this.selected[0]['numReports']),
        'price': parseInt(this.selected[0]['price'])
      }
    },
    tempPurchaseItem: {
      get () {
        return this.$store.getters['payment/getTempPurchaseItem']
      },
      set (value) {
        return this.$store.commit('payment/setTempPurchaseItem', value)
      }
    },
  },
  methods : {
    goToTermsOfPurchase() {
      if (!this.$auth.loggedIn) {
        this.$router.push('/membership/login')
        return;
      }
      else if (this.$auth.user['roles'].includes("ROLE_ENTERPRISE_MANAGER_USER") || this.$auth.user['roles'].includes("ROLE_ENTERPRISE_USER")) {
        this.$notifier.showMessage({
          content: "기업회원은 문의하기를 통해 포인트를 충전할 수 있습니다.",
          color: 'info'
        })
        return
      }
      this.isPurchasing = true;
    },

    onClickPurchase() {
      document.getElementsByTagName("body")[0].className = "non-scroll"
      const payment = new VadaRequestPayment(this.selectedItem)
      this.tempPurchaseItem = this.selectedItem
      this.payloadData = payment.getPayload()
      this.paymentObj = payment
      this.iframeSrc = process.env.PG_PAYMENT_URL
      this.showPurchasePopup = true
    },

    onResetPurchase() {
      document.body.removeAttribute("class", "non-scroll");
      this.iframeSrc = ""
      this.showPurchasePopup = false
      this.payloadData = null
      this.paymentObj = null
      this.tempPurchaseItem = null
      this.selected = []
      this.termsOfPurchaseAgreement = false
    },

    payResult: function (rtnCode, rtnMsg, fdTid) {
      this.showPurchasePopup = false;

      if (rtnCode === '0000') {
        const data = {
          'MxID': this.paymentObj.paymentData.MxID,
          'MxIssueNO': this.paymentObj.paymentData.MxIssueNO,
          'FDTid': fdTid,
          'Amount': this.paymentObj.paymentData.Amount,
          'ServiceId': this.paymentObj.paymentData.ServiceId
        }
        this.processApproveData(data)
      } else {
        alert(`인증 실패[${rtnCode}(${rtnMsg})]`)
        this.onResetPurchase()
      }
    },

    async processApproveData(data) {
      try {
        document.body.removeAttribute("class", "non-scroll");
        this.purchaseDone = true
        this.purchaseSuccess = false
        const approvePayment = new VadaApprovePayment(data)

        this.$store.dispatch('payment/purchase', {
          serviceId: this.selectedItem.id,
          formData: approvePayment.createFormData()
        }).then(
          res => {
            this.purchaseId = data['MxIssueNO']
            this.purchaseSuccess = true
            this.$auth.setUser(res['user'])
            this.paymentLog = res['paymentLog']
          },
          err => {
            alert('결제중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요')
          }
        )
      } catch (e) {
        alert('결제중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요')
        //this.$router.go(0)
      }
    },

    /**
     * PG 리스폰스 데이터 핸들러
     * rtncode: 결과 코드
     * rtnmsg: 결과 메세지
     * fdtid: 결제 요청 Transaction
     * @param event
     */
    onIframeMessage: function (event) {
      if (typeof event.data !== "string") return // CHECK EVENT DATA IS STRING
      if (!event.data.includes('rtncode')) return // CHECK EVENT DATA CONTAINS RTNCODE
      const data = JSON.parse(event.data);

      const { rtncode, rtnmsg, fdtid } = data;
      this.payResult(rtncode, rtnmsg, fdtid)
    },

    onLoadIframe() {
      document.getElementById('frame').contentDocument.location.reload(true);
    }
  }
}
</script>

<style lang="scss">
tbody {
  tr:hover {
    background-color: transparent !important;
  }
}
.non-scroll {
  position: fixed;
  overflow-x: hidden;
  overflow-y: hidden;
}
.login-card {
  border-radius: 5px;
  border: 1px solid rgba(0.06, 0.13, 0.25, 0.25);
  width: 800px;
  height: 500px;
}
</style>
