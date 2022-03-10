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
      <template v-slot:body>
        <v-text-field
          v-model="emailAuth"
          flat
          solo
          outlined
          hide-details
          label="인증코드"
          :rules="[rules.required]"
          prepend-inner-icon="mdi-focus-field-horizontal"
          @keypress="isNumber($event)"
          maxlength="6"
          class="mb-4"
        />
        <v-text-field
          v-model="password"
          flat
          solo
          outlined
          label="새 비밀번호"
          :rules="[rules.password]"
          prepend-inner-icon="mdi-lock-outline"
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
import CustomButton from "../../components/button/CustomButton";
import ResetPwdCard from "../../components/card/reset-password/ResetPwdCard";
export default {
  name: "ResetPasswordAuth",
  components: {ResetPwdCard, CustomButton},
  data: () => ({
    // TODO(ResetPwdAuth): Vuex같은데 저장된 값들임. 불러왔다치고 하는거임.
    email: 'rud527@naver.com',
    code: '111111',
    emailAuth: '',
    password: '',
    isLoading: false,
    valid: false,
  }),
  computed: {
    rules() {
      return {
        required: value => !!value || '값을 입력해주세요',
        password: value => /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).*$/.test(value) || '영문 대소문자와 최소 1개의 숫자 혹은 특수 문자를 포함해야 합니다.',
      }
    },
  },
  methods: {
    async submit() {
      if (this.isLoading) return;
      this.isLoading = true;
      let v = this.$refs.resetPwdAuthForm.validate();
      if (v) {
        if (this.emailAuth === this.code) {
          //TODO (resetPwdAuth): 여기서 서버에 재설정 api 호출하고나서..
          setTimeout(() => {
            this.isLoading = false;
            this.$router.push('/membership/reset-password-done')
          }, 3000)
        }
        else {
          alert('잘못된 인증코드입니다')
          this.isLoading = false;
        }
      }
      else {
        alert('입력한 정보를 확인해 주세요')
        this.isLoading = false;
      }
    },
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  }
}
</script>

<style scoped>
</style>
