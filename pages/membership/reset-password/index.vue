<template>
  <v-form ref="resetPwdForm" v-model="valid" lazy-validation>
    <reset-pwd-card>
      <template v-slot:header>
        <p class=" mb-0 text-center" style="font-size: 36px; font-weight: 500">
          비밀번호 재설정
        </p>
        <p class="subtitle-1 text-center">
          인증코드는 등록된 휴대전화 번호로 전달됩니다.
        </p>
      </template>
      <template v-slot:body>
        <v-text-field
          v-model="email"
          flat
          solo
          outlined
          label="아이디(이메일)"
          :rules="[rules.required, rules.email]"
          prepend-inner-icon="mdi-account"
          class="mt-6"
        />
      </template>
      <template v-slot:button>
        <custom-button
          @submit="submit"
          :width="`100%`"
          :color="'primary'"
          :text="`인증번호 전송`"
          class="darken-1"
          :loading="isLoading"
        />
      </template>
    </reset-pwd-card>
  </v-form>
</template>

<script>
import CustomButton from "../../../components/button/CustomButton";
import ResetPwdCard from "../../../components/card/reset-password/ResetPwdCard";
export default {
  name: "ResetPassword",
  components: {ResetPwdCard, CustomButton},
  data: () => ({
    email: '',
    isLoading: false,
    valid: false,
  }),
  computed: {
    rules() {
      return {
        required: value => !!value || '값을 입력해주세요',
        email: value => {
          const replaceV = value.replace(/(\s*)/g, '')
          const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
          return pattern.test(replaceV) || '이메일 형식으로 입력해주세요'
        }
      }
    },
  },
  methods: {
    async submit() {
      if (this.isLoading) return;
      this.isLoading = true;
      let v = this.$refs.resetPwdForm.validate();
      if (v) {
        setTimeout(() => {
          alert("인증코드가 전송되었습니다.")
          this.isLoading = false;
          this.$router.push('/membership/reset-password-auth')
        }, 3000)
      }
      else {
        alert('입력한 정보를 확인해 주세요')
        this.isLoading = false;
      }
    },
  }
}
</script>

<style scoped>
</style>
