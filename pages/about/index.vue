<template>
  <div style="padding: 100px 0;">
    <v-container style="height: fit-content; margin-bottom: 100px;">
      <v-row align="center" justify="center" class="px-6 px-md-0">
        <v-col cols="12" xl="10" class="mb-6 pl-2">
          <p class="font-weight-black ml-1" style="font-size: 11px;">{{ companyPreface }}</p>
          <div class="font-weight-medium text-uppercase my-12" :style="`font-size: ${companyIntroHeaderSize}px; line-height: ${companyIntroHeaderSize-10}px; letter-spacing: 3px;`">
            <p v-for="(text, i) in companyName" :key="`company-about-name-${i}`" v-text="text" />
          </div>
          <div class="my-6 ml-1 font-weight-medium grey--text text--darken-2" style="font-size: 13px">
            <p v-for="(text, j) in companyInfoSummary" :key="`company-info-summary-${j}`" v-text="text" class="mb-0" />
          </div>
        </v-col>
        <v-col cols="12" xl="10">
          <v-img :src="companyImg"/>
        </v-col>
      </v-row>
    </v-container>
    <v-container style="height: fit-content; margin-top: 100px; margin-bottom: 100px; padding: 50px 0;">
      <v-row align="start" :justify="`${isMobile ? 'start' : 'center'}`" :class="`${isMobile ? 'mx-7' : ''}`">
        <v-col cols="10" md="5" xl="4">
          <div class="font-weight-black" :style="`font-size: ${isMobile ? 21 : 25}px; line-height: ${isMobile ? 22 : 30}px;`">
            <p v-for="(text, i) in companyHeaders" :key="`company-about-header-${i}`" v-text="text" />
          </div>
        </v-col>
        <v-col cols="10" md="5" xl="4">
          <ul
            v-for="(item, j) in companyContents"
            :key="`-company-about-content-${j}`"
            class="mb-4 font-weight-medium"
            :style="`font-size: ${isMobile ? 12: 14}px;`"
          >
            <li class="grey--text text--darken-1">{{ item }}</li>
            <p v-if="j === companyContents.length-1" class="mt-6 caption font-weight-black grey--text text--darken-3">{{ companyFooter }}</p>
          </ul>
        </v-col>
      </v-row>
    </v-container>
    <v-container style="height: fit-content;">
      <v-row align="center" :justify="`${isMobile ? 'start' : 'center'}`" :class="`${isMobile ? 'mx-9' : ''}`">
        <v-col v-if="!isMobile" cols="10" md="7" lg="6" xl="5" class="mr-lg-12">
          <v-img :src="techImg" contain/>
        </v-col>
        <v-spacer v-if="breakpoint === 'md'"/>
        <v-col cols="10" md="4" lg="4" xl="3" style="text-align: start" class="ml-lg-12">
          <div
            v-for="(item, i) in techHeaders"
            :key="`tech-header-${i}`"
            :style="`font-size: ${breakpoint === 'xs' ? 23 : 35}px; line-height: ${breakpoint === 'xs' ? 35 : 42}px`"
          >
            <p v-text="item" class="font-weight-black mb-1"/>
          </div>
          <div class="pt-10 ml-1 grey--text font-weight-bold text--darken-1" style="font-size: 0.8em; line-height: 22px;">
            <p v-text="techContent" class="mb-6"/>
          </div>
        </v-col>
        <v-col v-if="isMobile" cols="11">
          <v-img :src="techImg"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "index",
  created() {
    this.$store.commit('setSheetTitle', '기업소개')
  },
  data: () => ({
    companyImg: require('../../assets/about/about_company.png'),
    techImg: require('../../assets/about/about_tech.png'),
    companyPreface: '실시간 기술가치평가 시스템',
    companyName: ['VADA', 'PARTNERS'],
    companyInfoSummary: ['바다파트너스는 데이터에 기반한 Easy-V 1.0을 바탕으로', '고객에게 최고의 가치를 제공합니다.'],
    companyHeaders: ['바다 파트너스는', '실시간 기술가치평가', '전문기관입니다.'],
    companyContents: ['본 평가 시스템은 3개년 매출액 발생 기업을 대상으로 보유특허의 기술가치평가 금액을 사전에 확인할 수 있도록 개발되었습니다.',
      '현재 개발 중인 Easy-V 2.0은 AI기술을 활용해 3개년 매출액이 없는 창업기업의 특허기술 평가, 대학교나 공공연의 특허기술 평가에 활용할 수 있습니다.'
    ],
    techHeaders: ['가치 평가 시스템', 'Easy-V 1.0'],
    techContent: 'Easy-V 1.0(Easy valuation system for your technology)은 개발에 참여한 실무진들의 다년간 평가 노하우를 기반으로 비전문가라도 누구나 쉽게 평가를 진행할 수 있도록 개발되었습니다.',
    companyFooter: 'VADA PARTNERS CO',
  }),
  computed: {
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case "sm": return true;
        case "xs": return true;
        default: return false;
      }
    },
    breakpoint() {
      return this.$vuetify.breakpoint.name
    },
    companyIntroHeaderSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs": return 55;
        case "sm": return 70;
        default: return 80;
      }
    },
  }
}
</script>

<style scoped>
li {
  list-style-type: disc;
  list-style-position: outside;
}
</style>
