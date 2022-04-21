<template>
  <v-form ref="changePwdForm" v-model="valid" lazy-validation>
    <reset-pwd-card>
      <template v-slot:header>
        <p class=" mb-0 text-center" style="font-size: 36px; font-weight: 500">
          비밀번호 재설정
        </p>
        <p class="subtitle-1 text-center">
          비밀번호를 새로 설정해 주세요.
        </p>
      </template>
      <template v-slot:body style="display: flex; align-items: start">
        <v-text-field
          v-model="password"
          class="pt-2"
          flat
          solo
          outlined
          label="새 비밀번호"
          :rules="[rules.required, rules.password]"
          prepend-inner-icon="mdi-lock-outline"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :type="showPassword ? 'text' : 'password'"
          style="width: 385px;"
        />
        <v-text-field
          v-model="passwordConfirm"
          flat
          solo
          outlined
          label="새 비밀번호 확인"
          :rules="[rules.passwordConfirm]"
          prepend-inner-icon="mdi-lock-check-outline"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :type="showPassword ? 'text' : 'password'"
          style="width: 385px;"
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
import ResetPwdCard from "../../components/card/reset-password/ResetPwdCard";
import CustomButton from "../../components/button/CustomButton";
export default {
  name: "change-password",
  components: {CustomButton, ResetPwdCard},
  asyncData({store,redirect}) {
    if(store.$auth.loggedIn) {
      redirect('/')
    }
  },
  created() {
    this.$store.commit('setSheetTitle', '비밀번호 변경')
  },
  data: () => ({
    valid: false,
    password: '',
    passwordConfirm: '',
    isLoading: false,
    showPassword: false
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
      let v = this.$refs.changePwdForm.validate();
      if (v) {
        setTimeout(() => {
          this.isLoading = false;
          alert("비밀번호가 변경되었습니다.")
          this.$router.push('/')
        }, 3000)
      }
      else {
        alert('입력한 정보를 확인해 주세요')
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>

</style>
