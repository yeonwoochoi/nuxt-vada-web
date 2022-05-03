<template>
  <v-form ref="resetPwdAuthForm" v-model="valid" lazy-validation>
    <reset-pwd-card>
      <template v-slot:header>
        <p class=" mb-0 text-center" style="font-size: 36px; font-weight: 500">
          비밀번호 재설정
        </p>
        <p class="subtitle-1 text-center">
          인증코드 입력 후 비밀번호를 새로 설정해 주세요.
        </p>
      </template>
      <template v-slot:body style="display: flex; align-items: start">
        <v-text-field
          v-model="emailAuth"
          flat
          solo
          outlined
          hide-details
          label="인증코드"
          :rules="[rules.required]"
          prepend-inner-icon="mdi-focus-field-horizontal"
          class="mb-3"
          :disabled="isLoading"
        >
          <template v-slot:append-outer>
            <v-btn
              large
              @click="resendAuthCode"
              class="font-weight-bold"
              color="primary"
              width="fit-content"
              :loading="isSendLoading"
              height="52"
              style="letter-spacing: 1px; text-transform: none; margin-top: 0.1em"
              :disabled="isLoading"
            >
              재전송
            </v-btn>
          </template>
        </v-text-field>
        <v-text-field
          v-model="password"
          flat
          solo
          outlined
          hide-details
          label="새 비밀번호"
          :rules="[rules.required, rules.password]"
          class="my-3"
          prepend-inner-icon="mdi-lock-outline"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :type="showPassword ? 'text' : 'password'"
          :disabled="isLoading"
        />
        <v-text-field
          v-model="passwordConfirm"
          flat
          solo
          outlined
          hide-details
          label="새 비밀번호 확인"
          :rules="[rules.required, rules.passwordConfirm]"
          class="my-3"
          prepend-inner-icon="mdi-lock-check-outline"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :type="showPassword ? 'text' : 'password'"
          :disabled="isLoading"
        />
      </template>
      <template v-slot:button>
        <custom-button
          @submit="submit"
          :width="`100%`"
          :color="'primary'"
          :text="`확인`"
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
  name: "ResetPasswordAuth",
  auth: false,
  components: {ResetPwdCard, CustomButton},
  asyncData({redirect, store}) {
    if (store.$auth.loggedIn) {
      redirect('/')
    }
    else if (!store.getters["user/getEmailForPwdReset"]) {
      redirect('/membership/reset-password')
    }
  },
  created() {
    this.$store.commit('setSheetTitle', '비밀번호 재설정')
    this.email = this.$store.getters["user/getEmailForPwdReset"]
  },
  destroyed() {
    this.$store.commit('user/resetEmailForPwdReset')
  },
  data: () => ({
    email: '',
    emailAuth: '',
    password: '',
    passwordConfirm: '',
    showPassword: false,
    isLoading: false,
    isSendLoading: false,
    valid: false,
  }),
  computed: {
    rules() {
      return {
        required: value => !!value || '값을 입력해주세요',
        password: value => /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).*$/.test(value) || '영문 대소문자와 최소 1개의 숫자 혹은 특수 문자를 포함해야 합니다.',
        passwordConfirm: value => value === this.password || '비밀번호가 일치하지 않습니다.',
      }
    },
  },
  methods: {
    async submit() {
      if (this.isLoading) return;
      this.isLoading = true;
      let v = this.$refs.resetPwdAuthForm.validate();
      if (v) {
        let payload = {
          email: this.email,
          code: this.emailAuth,
          password: this.password
        }
        await this.$store.dispatch('user/changePassword', payload).then(
          res => {
            this.isLoading = false;
            this.$store.commit('user/setPwdResetSuccess', true)
            this.$router.push('/membership/reset-password/done')
          },
          err => {
            this.$errorHandler.showMessage(err)
            this.isLoading = false;
          }
        )
      }
      else {
        this.showAlert()
        this.isLoading = false;
      }
    },
    showAlert() {
      if (!this.password || !this.passwordConfirm || !this.emailAuth) {
        this.$notifier.showMessage({
          content: "값을 모두 입력해주세요.",
          color: 'error'
        })
      }
      else if (!/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).*$/.test(this.password)) {
        this.$notifier.showMessage({
          content: '영문 대소문자와 최소 1개의 숫자를 포함해야 합니다.',
          color: 'error'
        })
      }
      else if (this.password !== this.passwordConfirm) {
        this.$notifier.showMessage({
          content: '비밀번호가 일치하지 않습니다.',
          color: 'error'
        })
      }
      else {
        this.$notifier.showMessage({
          content: '입력한 정보를 확인해 주세요',
          color: 'error'
        })
      }
    },
    async resendAuthCode() {
      if (this.isSendLoading) return;
      this.isSendLoading = true;
      if (!!this.email) {
        let params = {
          type: 'Find',
          email: this.email
        }
        await this.$store.dispatch('user/sendEmailAuthCode', params).then(
          res => {
            this.$notifier.showMessage({
              content: "인증코드가 전송되었습니다.",
              color: 'success'
            })
            this.isSendLoading = false;
          },
          err => {
            this.$errorHandler.showMessage(err)
            this.isSendLoading = false;
          }
        )
      }
      else {
        this.$notifier.showMessage({
          content: '오류가 발생했습니다. 다시 시도해주세요.',
          color: 'error'
        })
        this.isSendLoading = false;
      }
    },
  }
}
</script>

<style scoped>

</style>
