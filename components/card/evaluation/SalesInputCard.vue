<template>
  <v-card flat style="width: 100%; height: fit-content;" class="elevation-0 mt-4 mb-4">
    <v-row align="center" justify="center" class="text-center" style="width: 100%; height: fit-content;">
      <v-col cols="11" class="pt-6 font-weight-bold headline">
        <p>{{title}}</p>
      </v-col>
      <v-col cols="11">
        <div style="width: 100%; display: flex; justify-content: center">
          <v-radio-group v-model="hasSales" row>
            <v-radio :value="true" :label="'매출액 있음'"/>
            <v-radio :value="false" :label="'매출액 없음'"/>
          </v-radio-group>
        </div>
      </v-col>
      <v-expand-transition mode="out-in">
        <v-col cols="11" md="8" v-if="hasSales">
          <div style="display: flex; align-items: center; justify-content: space-around">
            <v-subheader v-if="$vuetify.breakpoint.mdAndUp" class="px-6 pb-6">
              {{recentYear-2 + '년'}}
            </v-subheader>
            <v-text-field
              @keypress="isNumber($event)"
              class="pr-2"
              v-model="salesData.firstRevenue"
              :label="`${recentYear-2}년 매출액`"
              suffix="백만원"
              flat
              outlined
              :rules="[rules.required]"
            />
          </div>
          <div style="display: flex; align-items: center; justify-content: space-around">
            <v-subheader v-if="$vuetify.breakpoint.mdAndUp" class="px-6 pb-6">
              {{recentYear-1 + '년'}}
            </v-subheader>
            <v-text-field
              @keypress="isNumber($event)"
              class="pr-2"
              v-model="salesData.secondRevenue"
              :label="`${recentYear-1}년 매출액`"
              suffix="백만원"
              flat
              outlined
              :rules="[rules.required]"
            />
          </div>
          <div style="display: flex; align-items: center; justify-content: space-around">
            <v-subheader v-if="$vuetify.breakpoint.mdAndUp" class="px-6 pb-6">
              {{recentYear + '년'}}
            </v-subheader>
            <v-text-field
              @keypress="isNumber($event)"
              class="pr-2"
              v-model="salesData.thirdRevenue"
              :label="`${recentYear}년 매출액`"
              suffix="백만원"
              flat
              outlined
              :rules="[rules.required]"
            />
          </div>
          <v-divider class="mb-8"/>
          <div style="display: flex; align-items: center; justify-content: space-around">
            <v-subheader v-if="$vuetify.breakpoint.mdAndUp" class="px-6 pb-6">
              매출액 차지 비중
            </v-subheader>
            <v-text-field
              @keypress="isNumber($event)"
              class="pl-2"
              v-model="salesData.revenueRoyaltyRatio"
              label="매출액 차지 비중"
              suffix="%"
              flat
              outlined
              :rules="[rules.required]"
            >
              <template v-slot:append-outer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-on="on" v-bind="attrs">mdi-information</v-icon>
                  </template>
                  <span>{{ toolTip }}</span>
                </v-tooltip>
              </template>
            </v-text-field>
          </div>
          <div class="text-start">
            <p class="caption font-weight-black">{{precaution}}</p>
          </div>
        </v-col>
      </v-expand-transition>
      <v-col cols="12">
        <div style="display: flex; justify-content: center;" class="mb-4">
          <custom-button
            :width="`200`"
            @submit="goNext"
            :color="'primary'"
            :text="`계속하기`"
            class="darken-1"
          />
          <custom-button
            class="mx-1"
            :width="`${$vuetify.breakpoint.smAndDown ? '49%' : '200'}`"
            @submit="goPrev"
            :color="'primary'"
            :text="`이전으로`"
          />
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import CustomButton from "../../button/CustomButton";
import {mapMutations} from "vuex";
export default {
  name: "SalesInputCard",
  components: {CustomButton},
  data: () => ({
    hasSales: false,
    title: '3개년 매출 여부와 금액을 입력해주세요.',
    salesData: {
      firstRevenue: '',
      secondRevenue: '',
      thirdRevenue: '',
      revenueRoyaltyRatio: '',
    },
    toolTip: '귀사의 매출에서 특허가 차지하는 비중을 입력해주세요.',
    precaution: '＊실제 매출과 다르게 적을 경우 결과가 다르게 나올 수 있습니다.'
  }),
  computed: {
    recentYear() {
      return parseInt(new Date().getFullYear())-1
    },
    rules() {
      return {
        required: value => (!!value || !this.hasSales) || '값을 입력해주세요',
      }
    },
  },
  methods: {
    ...mapMutations("patent", {
      setSalesData: 'setSalesData'
    }),
    goNext() {
      this.$emit('nextStep', 3);
      let result = {
        firstRevenue: -1,
        secondRevenue: -1,
        thirdRevenue: -1,
        revenueRoyaltyRatio: -1,
      }
      if (this.hasSales) {
        result = {
          firstRevenue: parseInt(this.salesData.firstRevenue),
          secondRevenue: parseInt(this.salesData.secondRevenue),
          thirdRevenue: parseInt(this.salesData.thirdRevenue),
          revenueRoyaltyRatio: parseInt(this.salesData.revenueRoyaltyRatio),
        }
      }
      this.setSalesData(result)
    },
    goPrev() {
      this.$emit('prevStep', 3)
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

<style scoped>

</style>
