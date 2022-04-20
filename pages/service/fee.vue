<template>
  <v-container fluid>
    <v-row align="center" justify="center">
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
                    <simple-data-table
                      :table-header="incidentPlanHeader"
                      :table-content="incidentPlanData"
                    />
                  </div>
                  <div class="my-12">
                    <v-card-title class="font-weight-medium mb-4 pr-0" style="font-size: 25px;">
                      • 연간 요금제
                    </v-card-title>
                    <simple-data-table
                      :table-header="annualPlanHeader"
                      :table-content="annualPlanData"
                    />
                  </div>
                  <div class="mt-12" style="display: flex; justify-content: end">
                    <v-btn
                      x-large
                      class="elevation-0"
                      color="primary"
                      @click="goToApplyPlanView"
                    >
                      신청하기
                    </v-btn>
                  </div>
                </v-card>
                <v-card v-else class="elevation-0 px-md-12 px-6 py-12" style="background-color: #F5F5F5; width: 100%">
                  <v-container fluid>
                    <v-row align="center" justify="start">
                      <v-col cols="2" v-if="$vuetify.breakpoint.mdAndUp" align-self="start">
                        <v-subheader>요금제선택</v-subheader>
                      </v-col>
                      <v-col cols="12" md="9" class="pt-1 mb-4">
                        <v-radio-group v-model="planType" row>
                          <v-radio value="incident" label="건별 요금제"/>
                          <v-radio value="annual" label="연간 요금제"/>
                        </v-radio-group>
                      </v-col>
                      <v-col cols="2" v-if="$vuetify.breakpoint.mdAndUp && !isAnnualPlan" align-self="start">
                        <v-subheader>건별 요금제</v-subheader>
                      </v-col>
                      <v-col cols="12" md="9" v-if="!isAnnualPlan" class="pt-2">
                        <v-text-field
                          @keypress="isNumber($event)"
                          v-model="incidentPlanCount"
                          label="신청건수"
                          suffix="건"
                          flat
                          outlined
                        />
                      </v-col>
                      <v-col cols="2" v-if="$vuetify.breakpoint.mdAndUp && isAnnualPlan" align-self="start">
                        <v-subheader>연간 요금제</v-subheader>
                      </v-col>
                      <v-col cols="12" md="9" v-if="isAnnualPlan" class="pt-1">
                        <v-radio-group v-model="annualPlanYear">
                          <v-radio value="1" label="1년"/>
                          <v-radio value="2" label="2년"/>
                          <v-radio value="3" label="3년"/>
                          <v-radio value="4" label="4년"/>
                          <v-radio value="5" label="5년"/>
                        </v-radio-group>
                      </v-col>
                      <v-col cols="12">
                        <v-divider/>
                      </v-col>
                      <v-col cols="2" align-self="start" v-if="$vuetify.breakpoint.mdAndUp">
                        <v-subheader>이용요금</v-subheader>
                      </v-col>
                      <v-col cols="12" md="9">
                        <p class="mb-0 title"><strong class="mr-1">{{ totalPrice.toLocaleString() }}</strong>원</p>
                      </v-col>
                      <v-col cols="12">
                        <div class="mt-4" style="display: flex; justify-content: end">
                          <v-btn
                            x-large
                            class="elevation-0"
                            color="primary"
                            @click="applyPlan"
                          >
                            신청하기
                          </v-btn>
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
  </v-container>
</template>

<script>
import MainCard from "../../components/card/MainCard";
import SimpleDataTable from "../../components/table/SimpleDataTable";
import CustomButton from "../../components/button/CustomButton";
export default {
  name: "fee",
  auth: false,
  components: {CustomButton, SimpleDataTable, MainCard},
  created() {
    this.$store.commit('setSheetTitle', '요금안내')
  },
  data: () => ({
    header: '요금안내',
    incidentPlanHeader: [
      {
        text: '유형',
        value: 'type',
        sortable: false,
        align: 'center'
      },
      {
        text: '가치평가 수',
        value: 'number',
        sortable: false,
        align: 'center'
      },
      {
        text: '가격(부가세 포함)',
        value: 'price',
        sortable: false,
        align: 'center'
      },
    ],
    incidentPlanData: [
      {
        type: 'VADA1',
        number: 1,
        price: '200,000'
      },
      {
        type: 'VADA2',
        number: 5,
        price: '800,000'
      },
    ],
    annualPlanHeader: [
      {
        text: '유형',
        value: 'type',
        sortable: false,
        align: 'center'
      },
      {
        text: '기간',
        value: 'period',
        sortable: false,
        align: 'center'
      },
      {
        text: '가격(부가세 포함)',
        value: 'price',
        sortable: false,
        align: 'center'
      },
    ],
    annualPlanData: [
      {
        type: 'VADA1',
        period: '1년',
        price: '1,000,000'
      },
      {
        type: 'VADA2',
        period: '2년',
        price: '1,800,000'
      },
      {
        type: 'VADA3',
        period: '3년',
        price: '2,500,000'
      },
      {
        type: 'VADA4',
        period: '4년',
        price: '3,200,000'
      },
    ],
    isPurchasing: false,
    planType: 'incident',
    incidentPlanCount: '',
    annualPlanYear: '1',

    // TODO: 가격 정해지면 그때 ㄱㄱ.. 아니면 서버 통신 하던가
    incidentPrice: 10000,
    annualPrice: 100000,
  }),
  computed: {
    isAnnualPlan() {
      return this.planType === 'annual'
    },
    totalPrice() {
      if (this.isAnnualPlan) {
        let year = parseInt(this.annualPlanYear)
        return year * this.annualPrice
      }
      else {
        let count = !this.incidentPlanCount ? 0 : parseInt(this.incidentPlanCount)
        return count * this.incidentPrice
      }
    }
  },
  methods : {
    goToApplyPlanView() {
      if (!this.$auth.loggedIn) {
        this.$router.push('/membership/login')
        return;
      }
      this.isPurchasing = true;
    },
    applyPlan() {
      let payload = {
        type: this.planType,
        price: this.totalPrice,
        incidentPlan: !this.isAnnualPlan ? parseInt(this.incidentPlanCount) : null,
        annualPlan: this.isAnnualPlan ? parseInt(this.annualPlanYear) : null
      }
      console.log(payload)
      // TODO 결제 모듈 연동
    },
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  }
}
</script>

<style lang="scss">
tbody {
  tr:hover {
    background-color: transparent !important;
  }
}
</style>
