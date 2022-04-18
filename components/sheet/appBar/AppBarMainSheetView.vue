<template>
  <v-img style="position: relative;" :max-height="window.height" :min-height="650" :src="imgSrc">
    <v-card-text style="height: 100%; position: absolute;">
      <v-container fluid style="height: 100%;">
        <v-row align="center" justify="start" style="height: 100%;">
          <v-col cols="12" align="start" :style="`margin-top: 4%; ${getWidth > 960 ? 'margin-left: 14%;' : 'margin-left: 10px;'}`">
            <pre class="font-weight-bold white--text" :class="getWidth > 1264 ? 'display-2' : 'display-1'" style="line-height: 130%;">{{ title }}</pre>
            <pre class="font-weight-bold white--text mt-2" :class="getWidth > 1264 ? 'title' : 'subtitle-1'">{{ subtitle }}</pre>
            <v-btn
              class="subtitle-1 mt-8 white--text"
              @click="goToService"
              :ripple="false"
              x-large
              style="border: white solid 0.15em; background-color: transparent; "
            >
              자세히 보러가기
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-img>
</template>

<script>
export default {
  name: "AppBarMainSheetView",
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    imgSrc() {
      return require("assets/header/header_main.png")
    },
    getWidth() {
      return this.$vuetify.breakpoint.width;
    },
  },
  data: () => ({
    title: '기술의 숨겨진 가치를\n찾아드립니다',
    subtitle: '초간편 기술 가치평가 시스템',
    window: {
      width: 0,
      height: 0
    }
  }),
  methods: {
    goToService() {
      this.$router.push('/about')
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  }
}
</script>

<style scoped>
.button_white_border {
  border: white solid 0.1em;
  background-color: transparent;
}
</style>
