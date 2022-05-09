<template>
  <div>
    <v-container style="height: fit-content; margin-bottom: 100px; padding: 0px 50px 50px;">
      <v-row align="center" :justify="`${$vuetify.breakpoint.smAndDown ? 'start' : 'center'}`" :class="`${$vuetify.breakpoint.smAndDown ? 'mx-9' : ''}`">
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
          <v-btn
            to="/about"
            :class="`${breakpoint === 'xs' ? 'caption' : 'subtitle-2'} px-1 mt-4 no-background-hover elevation-0 font-weight-bold`"
            style="background-color: transparent"
          >
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
                :style="`font-size: ${$vuetify.breakpoint.smAndDown ? 11 : 13}px; line-height: ${$vuetify.breakpoint.smAndDown? 20 : 22}px`"
              >
                <p v-text="text" class="mb-0"/>
              </div>
            </div>
            <v-btn
              to="/about"
              class="px-1 mt-4 no-background-hover elevation-0 font-weight-medium white--text"
              :style="`font-size: ${$vuetify.breakpoint.smAndDown ? 13 : 15}px; background-color: transparent`"
            >
              {{ detailInfoBtnText }}
              <v-icon class="ml-3" :size="`${$vuetify.breakpoint.smAndDown ? 17 : 22}`">mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-img>
    <v-container style="height: fit-content; margin-top: 100px;" :style="`padding: 40px ${$vuetify.breakpoint.smAndDown ? 10 : 100}px 10px`">
      <v-row align="start" :justify="`${$vuetify.breakpoint.smAndDown ? 'start' : 'center'}`" :class="`${$vuetify.breakpoint.smAndDown ? 'mx-9' : ''}`">
        <v-col cols="12" md="4" style="text-align: start" class="pr-8">
          <p class="mb-1 font-weight-regular" :style="`font-size: ${$vuetify.breakpoint.smAndDown ? 35 : 40}px;`">{{ noticeHeader }}</p>
          <v-btn
            to="/support/news"
            class="pl-1 my-3 no-background-hover elevation-0 font-weight-bold"
            style="background-color: transparent"
          >
            {{ noticeDetailBtnText }}
            <v-icon class="ml-3">mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="11" md="7" class="pl-4" v-if="!!newsItems">
          <div v-for="(item, index) in newsItems" :key="index" @click="moveTo(item)" style="cursor:pointer;" class="mb-4">
            <p class="font-weight-bold">{{ item.title }}</p>
            <v-divider v-if="index < newsItems.length-1"/>
          </div>
        </v-col>
        <v-col cols="11" md="7" class="pl-4" v-else>
          <p class="font-weight-bold">{{ '공지사항이 없습니다' }}</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "index",
  auth: false,
  async asyncData({store}) {
    return store.dispatch('news/readAll').then(
      res => {
        let result = []
        let count = 0;
        for (let i = res.length-1; i >= 0; i--) {
          count++
          if (count > 4) break;
          let item = res[i]
          let time = item.updatedAt.split('T')[0]
          let created_at = time.split('T')[0]
          result.push({
            no: res.length-i,
            idx: item.id,
            title: item.title,
            content: item.content,
            created_at: created_at,
            view_count: item.view
          })
        }
        return {
          newsItems: result,
          fetchError: null
        }
      },
      err => {
        return {
          newsItems: [],
          fetchError: err
        }
      }
    )
  },
  created() {
    if (!!this.fetchError) {
      this.$errorHandler.showMessage(this.fetchError)
    }
  },
  data: () => ({
    companyIntroImg: require('../assets/home/home_company_info.png'),
    companyIntroHeader1: '초간편',
    companyIntroHeader2: '기술 가치평가 시스템',
    companyIntroContents: ['바다 파트너스는 실시간으로 특허기술의 가치를', '평가하여 제공하는 기술가치평가 전문기관입니다.'],
    techIntroImg: require('../assets/home/home_tech_bg.png'),
    techIntroHeaders: ['Easy valuation system', 'for your technology'],
    techIntroContents: ['바다 파트너스는 실시간으로 특허기술의 가치를', '평가하여 제공하는 기술가치평가 전문기관입니다.'],
    noticeHeader: 'VADA 소식',
    noticeDetailBtnText: '새로운 소식',
    detailInfoBtnText: '자세히보기',
  }),
  computed: {
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
      let path = '/support/news/content?uid=' + link.idx
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.no-background-hover::before {
  background-color: transparent !important;
}
</style>
