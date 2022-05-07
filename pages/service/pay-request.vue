<template>
  <v-container fluid>
    <v-row v-if="!fetchError" align="center" justify="center">
      <v-card class="elevation-2 login-card">
        <v-row align="center" justify="center" style="width: 100%; height: 100%">
          <div>
            <div>
              <p class="font-weight-medium mb-0 text-center" style="font-size: 50px;">
                결제 완료
              </p>
            </div>
            <div class="pb-1">
              <v-row class="justify-space-between pa-6">
                <v-col cols="6" class="text-center title">주문번호</v-col>
                <v-col cols="6" class="text-center title">{{ purchaseId }}</v-col>
                <v-col cols="6" class="text-center title">상품명</v-col>
                <v-col cols="6" class="text-center title">{{ tempPurchaseItem.serviceName }}</v-col>
                <v-col cols="6" class="text-center title">가격</v-col>
                <v-col cols="6" class="text-center title">{{ tempPurchaseItem.price }}</v-col>
                <v-col cols="6" class="text-center title">구매한 보고서 수</v-col>
                <v-col cols="6" class="text-center title">{{ tempPurchaseItem.numReports }}</v-col>
              </v-row>
            </div>
            <div>
              <custom-button
                @submit="goToMain"
                :width="`100%`"
                :color="'primary'"
                :text="`확인`"
                class="mt-2 darken-1"
              />
            </div>
          </div>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import VadaApprovePayment from '../../utils/VadaApprovePayment'
import CustomButton from "../../components/button/CustomButton";

export default {
  name: "pay-request",
  components: {CustomButton},
  async asyncData({ params, $axios, store }) {
    const data = params.data
    console.dir(data)
    try {
      const approvePayment = new VadaApprovePayment(data)
      const responseData = await $axios.post('/api/pg-approve', approvePayment.getAxiosConfig())
      const result = JSON.parse(decodeURIComponent(responseData.data.trim()))
      console.dir(result)
      console.log(`pay-request: paymentResult: ${result}`)

      // THIS SERVICE IS MOCK SERVICE
      // MUST GET SERVICE FROM SERVER USING SERVICE_ID
      const service = store.getters["payment/getTempPurchaseItem"]

      if (result.ReplyCode === '0000') {
        const price = parseInt(result.Amount)
        if (service.price === price) {
          // TODO(SEND RESULT TO SERVER _ IT's SUCCESS TO PURCHASE)
          let payload = {
            serviceId: service.id,
            payload: JSON.stringify(result)
          }
          store.dispatch('payment/purchase', payload).then(
            res => {
              return {
                fetchError: null,
                log: res,
              }
              //this.$auth.setUser(res['user'])
            },
            err => {
              return {
                fetchError: '결제중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요',
                log: null
              }
            }
          )
        } else {
          // ERROR WHEN RESULT AMOUNT AND SAVED SERVICE PRICE NOT MATCHED
          return {
            fetchError: '결제 요청 가격이 올바르지 않습니다. 고객센터에 연락해주시기 바랍니다.',
            log: null
          }
        }
      } else {
        return {
          fetchError: '결제중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요',
          log: null
        }
      }
    } catch (e) {
      return {
        fetchError: '결제중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요',
        log: null
      }
    }
  },
  mounted() {
    if (!!this.fetchError) {
      alert(this.fetchError)
      this.tempPurchaseItem = null
      this.$router.push('/service/fee')
    }
    console.dir(this.log)
  },
  beforeRouteLeave(to, from, next) {
    this.tempPurchaseItem = null
    next()
  },
  destroyed() {
    this.tempPurchaseItem = null
  },
  computed: {
    purchaseId() {
      return this.$route.params['MxIssueNO']
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
  methods: {
    goToMain() {
      this.tempPurchaseItem = null
      this.$router.push('/service/fee')
    }
  }
}
</script>

<style scoped>

</style>
