<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-4 mb-8">
    <v-row align="center" justify="center" style="width: 100%; height: 100%;">
      <v-col cols="12" align="center" class="mt-10">
        <v-img aspect-ratio="1" style="height: 180px;" contain :src="icon"/>
      </v-col>
      <v-col v-if="isPrivateUser" cols="12" class="mb-3 mt-1 text-center font-weight-thin">
        <pre v-html="privateGuide.header" :style="`font-size: ${$vuetify.breakpoint.smAndDown ? '24' : '33'}px; letter-spacing: 0;`"/>
        <pre v-text="privateGuide.content" class="font-weight-bold mt-1" :style="`font-size: ${$vuetify.breakpoint.smAndDown ? '13' : '15'}px;  letter-spacing: 0;`"/>
      </v-col>
      <v-col v-else cols="12" class="mb-3 mt-1 text-center font-weight-thin">
        <pre v-html="enterpriseGuide.header" :style="`font-size: ${$vuetify.breakpoint.smAndDown ? '24' : '33'}px; letter-spacing: 0;`"/>
        <p v-text="enterpriseGuide.content" class="font-weight-bold mt-1 mb-0" :style="`font-size: ${$vuetify.breakpoint.smAndDown ? '13' : '15'}px;  letter-spacing: 0;`"/>
      </v-col>
      <v-col cols="10" style="display: flex; align-items: center; justify-content: center">
        <custom-button
          class="darken-1"
          :width="`200`"
          @submit="goNext"
          :color="'primary'"
          :text="`메인으로`"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import CustomButton from "../../button/CustomButton";
export default {
  name: "SignUpDoneCard",
  components: {CustomButton},
  props: {
    userType: {
      type: String,
      default: () => 'private'
    }
  },
  data: () => ({
    icon: require('../../../assets/icon_complete.png'),
    privateGuide: {
      header: '<span class="font-weight-bold primary--text text--darken-2">회원가입이 완료</span>되었습니다.',
      content: '로그인 후, 다양한 서비스를 이용하실 수 있습니다.',
    },
    enterpriseGuide: {
      header: '<span class="font-weight-bold primary--text text--darken-2">가입 신청</span>이 완료되었습니다.',
      content: `가입 심사 후 아이디와 비밀번호를 담당자 이메일로 보내드리겠습니다.`
    },
  }),
  computed: {
    isPrivateUser() {
      return this.userType === 'private'
    },
  },
  methods: {
    goNext() {
      this.$emit('nextStep', 4)
    }
  }
}
</script>

<style scoped>
pre {
  font-family: "Roboto", sans-serif;
}
</style>
