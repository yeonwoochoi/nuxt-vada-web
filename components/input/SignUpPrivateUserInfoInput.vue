<template>
  <validation-observer ref="observer">
    <validation-provider v-slot="{ errors }" name="이메일" rules="required|email">
      <p class="white--text ma-1 subtitle-1 text-start font-weight-regular">Email</p>
      <div style="display:flex; flex-direction: row; justify-content: start; align-items: start">
        <v-text-field
          v-model="email"
          :error-messages="errors"
          required
          outlined
          dense
          filled
          :disabled="isAuthorized"
        />
        <v-btn
          @click="sendEmailAuthCode"
          large
          class="font-weight-bold ml-4"
          :disabled="isAuthorized"
        >
          이메일 인증
        </v-btn>
      </div>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="이메일 인증번호" v-if="isEmailAuthCodeSending"></validation-provider>
    <validation-provider v-slot="{ errors }" name="비밀번호" vid="password" rules="required|alpha-dash|min:8|max:20"></validation-provider>
    <validation-provider v-slot="{ errors }" name="비밀번호 확인" rules="required|confirmed:password" data-vv-as="password"></validation-provider>
    <validation-provider v-slot="{ errors }" name="이름" rules="required"></validation-provider>
    <p class="white--text ma-1 subtitle-1 text-start font-weight-regular">연락처</p>
    <div style="display:flex; flex-direction: row; justify-content: center; align-items: center">
      <v-select
        v-model="phoneFirst"
        :items="phoneFirstList"
        :menu-props="{ closeOnClick: true, offsetY: true, bottom: true }"
        style="width: 25%;"
        dense
        filled
      />
      <p class="white--text font-weight-bold title text-center mb-6 mx-5"> - </p>
      <v-text-field
        v-model="phoneMiddle"
        @keypress="isNumber($event)"
        style="width: 25%;"
        maxlength="4"
        required
        outlined
        dense
        filled
      />
      <p class="white--text font-weight-bold title text-center mb-6 mx-5"> - </p>
      <v-text-field
        v-model="phoneLast"
        @keypress="isNumber($event)"
        style="width: 25%;"
        maxlength="4"
        required
        outlined
        dense
        filled
      />
    </div>
  </validation-observer>
</template>

<script>
import { required, email, between, confirmed, alpha_dash, integer, min, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('email', {
  ...email,
  message: '{_field_} must be valid'
})

extend('confirmed', {
  ...confirmed,
  message: '{_field_} must match'
})

extend('between', {
  ...between,
  message: '{_field_} must be between 8 and 20'
})

extend('alpha-dash', {
  ...alpha_dash,
  message: '{_field_} may contain alpha-numeric characters as well as dashes and underscores'
})

extend('integer', {
  ...integer,
  message: '{_field_} must be an integer'
})

extend('min', {
  ...min,
  message: '{_field_} may not be less than 8 characters'
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than 20 characters'
})

export default {
  name: "SignUpPrivateUserInfoInput",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    emailAuth: '',
    phoneFirst: '010',
    phoneMiddle: null,
    phoneLast: null,
    phoneFirstList: ['010','011','016','017','019','02','031','032','033','041','043','042','044','051','052','053','054','055','061','062','063','064','070'],
    showPassword: false,
    // 이메일 인증 여부
    isAuthorized: false,
    // 중복 클릭 안되게 (이메일 인증 버튼)
    isClickingEmailAuthButton: false,
    // 인증코드 전송이 서버에서 완료되면 밑에 인증번호 입력칸 활성화됨
    isEmailAuthCodeSending: false,
    // TODO(temp): 임의로 만든거니까 서버 연결되면 삭제하기 - 서버에서 발송한 인증코드
    emailAuthCode: '',
  }),
  computed: {
    phone() {
      return `${this.phoneFirst}-${this.phoneMiddle}-${this.phoneLast}`
    }
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
      this.isClickingEmailAuthButton = false;
      this.showPassword = false;
      this.email = '';
      this.password = '';
      this.passwordConfirm = '';
      this.username = '';
      this.emailAuth = '';
      this.phoneFirst = '010';
      this.phoneMiddle = null;
      this.phoneLast = null;
    },
    async sendEmailAuthCode() {
      // email validate check
      if (!this.isClickingEmailAuthButton) {
        this.isClickingEmailAuthButton = true;
        if (!this.email) {
          alert('Please input email.')
          this.isClickingEmailAuthButton = false;
        } else {
          // TODO (sign-up-private): 이메일 인증 코드 전송 api 서버랑 통신하는 부분
          setTimeout(() => {
            this.isEmailAuthCodeSending = true;
            this.emailAuthCode = '645273'
          }, 3000)
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
