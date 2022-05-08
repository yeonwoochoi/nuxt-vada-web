<template>
  <v-container>
    <v-row align="center" justify="space-around" class="ml-6" style="height: 225px">
      <v-col cols="12" class="white--text mt-2">
        <CompanyLogoBtn :logo-src="companyLogo" :logo-height="120"/>
        <div class="my-7">
          <a
            v-for="(info, i) in footerBtnInfo"
            :key="i"
            class="subtitle-2 white--text pr-3"
            style="text-decoration: none;"
            :href="info.link"
          >
            {{ info.text }}
          </a>
        </div>
        <p class="subtitle-2">{{ copyright }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import CompanyLogoBtn from "../../../components/button/CompanyLogoBtn";
export default {
  name: "DefaultMobileFooter",
  components: {CompanyLogoBtn},
  computed: {
    ...mapState({
      companyLogo: 'companyWhiteLogo',
      footerBtnInfo: 'footerBtnInfo',
    }),
    copyright() {
      return `COPYRIGHT 바다파트너스 ${new Date().getFullYear()}. ALL RIGHTS RESERVED`
    }
  }
}
</script>

<style scoped>

</style>
