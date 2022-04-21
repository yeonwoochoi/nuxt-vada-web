<template>
  <reset-pwd-card>
    <template v-slot:header>
      <v-img aspect-ratio="1" style="height: 180px;" contain :src="icon"/>
    </template>
    <template v-slot:body>
      <pre
        v-text="guide"
        class="font-weight-medium text-center my-8"
      />
    </template>
    <template v-slot:button>
      <custom-button
        @submit="goToLogin"
        :width="`200`"
        :color="'primary'"
        :text="`로그인`"
        class="darken-1"
      />
    </template>
  </reset-pwd-card>
</template>

<script>
import ResetPwdCard from "../../../components/card/reset-password/ResetPwdCard";
import CustomButton from "../../../components/button/CustomButton";

export default {
  name: "reset-password-done",
  auth: false,
  components: {CustomButton, ResetPwdCard},
  asyncData({redirect, store}) {
    if (store.$auth.loggedIn) {
      redirect('/')
    }
    else if (!store.getters["user/getPwdResetSuccess"]) {
      redirect('/membership/reset-password')
    }
  },
  created() {
    this.$store.commit('setSheetTitle', '비밀번호 재설정')
  },
  destroyed() {
    console.log('destroyed - done')
    this.$store.commit('user/resetEmailForPwdReset')
    this.$store.commit('user/resetPwdResetSuccess')
  },
  data: () => ({
    icon: require('../../../assets/icon_complete.png'),
    guide: '비밀번호가 재설정되었습니다.'
  }),
  methods: {
    goToLogin() {
      this.$router.push('/membership/login')
    }
  }
}
</script>

<style scoped>
pre {
  font-family: "Roboto", sans-serif;
  font-size: 25px;
  letter-spacing: 0;
}
</style>
