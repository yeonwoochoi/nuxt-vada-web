<template>
  <v-col cols="11" md="8">
    <validation-provider v-slot="{ errors, valid }" name="이메일" rules="required|email">
      <p class="ma-1 subtitle-2 text-start">이메일</p>
      <div style="display:flex; flex-direction: row; justify-content: start; align-items: start">
        <v-text-field
          v-model="email"
          :error-messages="errors"
          required
          outlined
          dense
          filled
          :disabled="isAuthorized"
          background-color="transparent"
        />
        <v-btn
          @click="sendEmailAuthCode(valid)"
          large
          class="font-weight-bold ml-4 elevation-0"
          :loading="loadingEmailAuth"
          :disabled="isAuthorized"
          style="height: 40px; border: 1px darkgrey solid"
        >
          {{ !isRedirectAuthCode ? '이메일 인증' : '재전송' }}
        </v-btn>
      </div>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="이메일 인증" rules="required">
      <div style="display:flex; flex-direction: row; justify-content: start; align-items: start" v-if="isEmailAuthCodeSending">
        <v-text-field
          v-model="emailAuth"
          required
          outlined
          dense
          filled
          :disabled="isAuthorized"
          hide-details
          background-color="transparent"
        />
        <v-btn
          @click="checkEmailAuthCode(!errors)"
          large
          class="font-weight-bold ml-4 mb-4 elevation-0"
          :disabled="isAuthorized"
          style="height: 40px; border: 1px darkgrey solid"
        >
          확인
        </v-btn>
      </div>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="비밀번호" vid="password" rules="required|alpha-dash|min:8|max:20">
      <p class="ma-1 subtitle-2 text-start">비밀번호</p>
      <v-text-field
        v-model="password"
        :error-messages="errors"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        :type="showPassword ? 'text' : 'password'"
        required
        outlined
        dense
        filled
        background-color="transparent"
      />
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="비밀번호 확인" rules="required|confirmed:password" data-vv-as="password">
      <p class="ma-1 subtitle-2 text-start">비밀번호 확인</p>
      <v-text-field
        v-model="passwordConfirm"
        :error-messages="errors"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        :type="showPassword ? 'text' : 'password'"
        required
        outlined
        dense
        filled
        background-color="transparent"
      />
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="이름" rules="required">
      <p class="ma-1 subtitle-2 text-start">이름</p>
      <v-text-field
        v-model="username"
        :error-messages="errors"
        required
        outlined
        dense
        filled
        background-color="transparent"
      />
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="연락처" rules="required">
      <p class="ma-1 subtitle-2 text-start">연락처(-없이 번호만 입력)</p>
      <v-text-field
        v-model="phone"
        :error-messages="errors"
        @keypress="isNumber($event)"
        maxlength="12"
        required
        outlined
        dense
        filled
        background-color="transparent"
      />
    </validation-provider>
    <div class="mt-6" style="display: flex; align-items: center; justify-content: center">
      <custom-button
        class="mx-1 darken-1"
        :width="`${$vuetify.breakpoint.smAndDown ? '49%' : '200'}`"
        @submit="goNext"
        :color="'primary'"
        :text="`계속하기`"
        :loading="loadingSubmit"
      />
      <custom-button
        class="mx-1"
        :width="`${$vuetify.breakpoint.smAndDown ? '49%' : '200'}`"
        @submit="goPrev"
        :color="'primary'"
        :text="`이전으로`"
      />
    </div>
  </v-col>
</template>

<script>
import { required, email, confirmed } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";
import CustomButton from "../button/CustomButton";

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_}은/는 필수 입력란 입니다.'
})

extend('email', {
  ...email,
  message: '{_value_}은/는 올바른 이메일 형식이 아닙니다.'
})

extend('confirmed', {
  ...confirmed,
  message: '비밀번호가 일치하지 않습니다.'
})

extend('alpha-dash', {
  validate(value) {
    return /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).*$/.test(value)
  },
  message: '{_field_}는 영문 대소문자와 최소 1개의 숫자 혹은 특수 문자를 포함해야 합니다.'
})

extend('min', {
  validate(value, { min }) {
    return value.length >= parseInt(min);
  },
  params: ["min"],
  message: '{_field_}는 {min}자 이상이어야 합니다.'
})

extend('max', {
  validate(value, { max }) {
    return value.length <= parseInt(max);
  },
  params: ["max"],
  message: '{_field_}는 {max}자 이하이어야 합니다.'
})

export default {
  name: "SignUpPrivateUserInfoInput",
  components: {
    CustomButton,
    ValidationObserver,
    ValidationProvider,
  },
  mounted() {
    this.reset();
  },
  data: () => ({
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    emailAuth: '',
    phone: '',
    showPassword: false,
    // 이메일 인증 여부
    isAuthorized: false,
    // 중복 클릭 안되게 (이메일 인증 버튼)
    loadingEmailAuth: false,
    loadingSubmit: false,
    // 인증코드 전송이 서버에서 완료되면 밑에 인증번호 입력칸 활성화됨
    isEmailAuthCodeSending: false,
    // 이메일 인증코드 재전송 여부
    isRedirectAuthCode: false,
  }),
  computed: {
    userInfo() {
      return {
        email: this.email,
        password: this.password,
        fullName: this.username,
        phoneNumber: this.phone
      }
    },
  },
  methods: {
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    reset() {
      this.isAuthorized = false;
      this.isEmailAuthCodeSending = false;
      this.loadingSubmit = false;
      this.loadingEmailAuth = false;
      this.showPassword = false;
      this.email = '';
      this.password = '';
      this.passwordConfirm = '';
      this.username = '';
      this.emailAuth = '';
      this.phone = '';
    },
    async sendEmailAuthCode(valid) {
      // email validate check
      if (!this.loadingEmailAuth) {
        this.loadingEmailAuth = true;
        if (!this.email) {
          this.$notifier.showMessage({
            content: '이메일을 입력해주십시오.',
            color: 'error'
          })
          this.loadingEmailAuth = false;
        }
        else {
          if (!valid) {
            this.$notifier.showMessage({
              content: '이메일 형식이 올바르지 않습니다',
              color: 'error'
            })
            this.loadingEmailAuth = false;
            return;
          }

          this.$emit('sendAuthCode', this.email, (success) => {
            this.loadingEmailAuth = false;
            this.isEmailAuthCodeSending = success;
            this.isRedirectAuthCode = success;
          })
        }
      }
    },
    checkEmailAuthCode() {
      this.$emit('checkAuthCode', this.email, this.emailAuth, (success) => {
        this.isAuthorized = success;
      })
    },
    async goNext() {
      if (this.loadingSubmit) return;
      this.loadingSubmit = true;
      if (!this.isAuthorized) {
        this.$notifier.showMessage({
          content: '이메일 인증이 필요합니다.',
          color: 'error'
        })
        this.loadingSubmit = false;
        return;
      }

      await this.$emit('submitUserInfo', {
        data: this.userInfo,
        errorMsg: '입력한 정보를 확인해 주세요.',
        isPrivate: true
      });
      this.loadingSubmit = false;
    },
    goPrev() {
      this.$emit('prevStep')
    },
  }
}
</script>

<style scoped>
</style>
