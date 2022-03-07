<template>
  <v-footer
      app
      absolute
      padless
      color="rgb(0,33,69)"
      style="height: fit-content"
  >
    <v-container v-if="!isMobile">
      <v-row justify="space-around" align="center" class="my-4">
        <v-col cols="6" align="start">
          <CompanyLogoBtn :logo-src="companyLogo" :logo-height="150"/>
        </v-col>
        <v-col cos="6" align="end">
          <v-btn
            v-for="(item, i) in footerBtnInfo"
            :key="i"
            :to="item.link"
            class="elevation-0 white--text no-background-hover"
            style="background-color: transparent"
          >
            {{ item.text }}
          </v-btn>
        </v-col>
        <v-col cols="12">
          <div v-for="info in companyInfo" :key="info" class="white--text caption">
            {{info}}
          </div>
        </v-col>
      </v-row>
    </v-container>
    <mobile v-else/>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex'
import CompanyLogoBtn from "../../../components/CompanyLogoBtn";
import Mobile from "./mobile";

export default {
  name: "DefaultFooter",
  components: {Mobile, CompanyLogoBtn},
  data:()=>({
    companyInfo: [
      '(06235) 서울특별시 강남구 테헤란로 132, 한독타워 11층 (역삼동) │ Tel : 02 3475-7807 │ E-mail : vadapartners@gmail.com │\n',
      '법인명 : 주식회사바다파트너스 │ 대표자 : 김유신 │ 사업자번호 : 325-88-01847\n',
      '통신판매업 신고번호 : 2021-서울강남-01370호\n',
      'COPYRIGHT 바다파트너스 2020. ALL RIGHTS RESERVED.',
    ]
  }),
  computed: {
    ...mapState({
      companyLogo: 'companyWhiteLogo',
      footerBtnInfo: 'footerBtnInfo',
      copyright: 'copyright'
    }),
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
      }
    }
  }
}
</script>

<style scoped>
.no-background-hover::before {
  background-color: transparent !important;
}
</style>
