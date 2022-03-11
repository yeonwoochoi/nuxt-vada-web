<template>
  <div>
    <v-container style="height: fit-content; margin-bottom: 100px; padding: 0px 50px 50px;">
      <v-row align="center" :justify="`${isMobile ? 'start' : 'center'}`" :class="`${isMobile ? 'mx-9' : ''}`">
        <v-col cols="12" lg="5" xl="4" style="text-align: start">
          <div :style="`font-size: ${breakpoint === 'xs' ? 29 : 36}px; line-height: 45px`">
            <p class="font-weight-medium mb-1">{{ companyIntroHeader1 }}</p>
            <p class="font-weight-black">{{ companyIntroHeader2 }}</p>
          </div>
          <div class="my-6 ml-1">
            <div
              v-for="(item, i) in companyIntroContents"
              :key="`company-content-${i}`"
              class="font-weight-bold my-0 grey--text"
              style="font-size: 13px"
            >
              <p v-text="item" class="mb-1"/>
            </div>
          </div>
          <v-btn :class="`${breakpoint === 'xs' ? 'caption' : 'subtitle-2'} px-1 mt-4 no-background-hover elevation-0 font-weight-bold`" style="background-color: transparent">
            {{ detailInfoBtnText }}
            <v-icon class="ml-3" :small="breakpoint === 'xs'">mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="12" lg="7" xl="6">
          <v-img :src="companyIntroImg" contain/>
        </v-col>
      </v-row>
    </v-container>
    <v-img :src="techIntroImg" style="min-height: 600px; max-height: 800px; height: fit-content; margin-top: 100px; margin-bottom: 100px; padding: 100px;">
      <v-row align="center" justify="end" style="height: 100%">
        <v-col cols="12" md="6" lg="5">
          <div style="text-align: start;">
            <div class="my-6">
              <div
                v-for="(text, i) in techIntroHeaders"
                :key="`tech-header-${i}`"
                class="font-weight-regular white--text"
                :style="`font-size: ${techFontSize.fontSize}px; line-height: ${techFontSize.lineHeight}px`"
              >
                <p v-text="text" class="mb-0"/>
              </div>
            </div>
            <div class="mt-6 mb-8">
              <div
                v-for="(text, i) in techIntroContents"
                :key="`tech-content-${i}`"
                class="ml-1 font-weight-medium white--text"
                :style="`font-size: ${isMobile ? 11 : 13}px; line-height: ${isMobile? 20 : 22}px`"
              >
                <p v-text="text" class="mb-0"/>
              </div>
            </div>
            <v-btn
              class="px-1 mt-4 no-background-hover elevation-0 font-weight-medium white--text"
              :style="`font-size: ${isMobile ? 13 : 15}px; background-color: transparent`"
            >
              {{ detailInfoBtnText }}
              <v-icon class="ml-3" :size="`${isMobile ? 17 : 22}`">mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-img>
    <v-container style="height: fit-content; margin-top: 100px; padding: 40px 100px 10px">
      <v-row align="start" :justify="`${isMobile ? 'start' : 'center'}`" :class="`${isMobile ? 'mx-9' : ''}`">
        <v-col cols="12" md="4" style="text-align: start" class="pr-8">
          <p class="mb-1 font-weight-regular" :style="`font-size: ${isMobile ? 35 : 40}px;`">{{ noticeHeader }}</p>
          <v-btn class="pl-1 my-3 no-background-hover elevation-0 font-weight-bold" style="background-color: transparent">
            {{ noticeDetailBtnText }}
            <v-icon class="ml-3">mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="11" md="7" class="pl-4">
          <div v-for="(item, index) in noticeSampleData" :key="index" @click="moveTo(item.link)" style="cursor:pointer;" class="mb-4">
            <p class="font-weight-bold">{{ item.text }}</p>
            <v-divider v-if="index < noticeSampleData.length-1"/>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "index",
  /*
  async asyncData({$axios}) {
    const {data} = await $axios.get('http://127.0.0.1:3000/projects/readAll');
    return { projects : data.data }
  },
  */
  data: () => ({
    companyIntroImg: require('../assets/home/home_company_info.png'),
    companyIntroHeader1: '초간편',
    companyIntroHeader2: '기술 가치평가 시스템',
    companyIntroContents: ['바다파트너스는 데이터에 기반하여 실시간으로 기술의', '가치를 평가해주는 기술가치평가 전문기관입니다.'],
    techIntroImg: require('../assets/home/home_tech_bg.png'),
    techIntroHeaders: ['Easy valuation system', 'for your technology'],
    techIntroContents: ['Easy-V 1.0 은 개발에 참여한 실무진들의 다년간 평가 노하우를 기반으로', '비전문가라도 누구나 쉽게 평가를 진행할 수 있도록 개발되었습니다.'],
    noticeHeader: 'VADA 소식',
    noticeDetailBtnText: '새로운 소식',
    //TODO (Sample)
    noticeSampleData: [
      { text: '시스템 점검에 따른 서비스 일시 정지 안내(1.20일, 18시00분~24시)', link: '/service'},
      { text: '창립기념일 임시휴무(2021.10.18(월)) 안내', link: '/service'},
      { text: '[공지] 한국특허 평가보고서 생성기능 일시 정지 안내(2021-03-30 10시~ 24시)', link: '/service'},
      { text: '[공지] 전기설비 정기점검에 따른 서비스 중단안내( 2020년11월 06일(금) 20:00 ~ 11월 07일(토) 12:00 )', link: '/service'},
    ],
    detailInfoBtnText: '자세히보기',
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
    techFontSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs": return { fontSize: 30, lineHeight: 40 };
        case "sm": return { fontSize: 40, lineHeight: 50 };
        case "md": return { fontSize: 40, lineHeight: 50 };
        case "lg": return { fontSize: 45, lineHeight: 55 };
        default: return { fontSize: 55, lineHeight: 65 };
      }
    }
  },
  methods: {
    moveTo (link) {
      this.$router.push(link)
    }
  }
}
</script>

<style scoped>
.no-background-hover::before {
  background-color: transparent !important;
}
</style>
