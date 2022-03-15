<template>
  <v-col cols="11" md="8">
    <validation-provider v-slot="{ errors }" name="기업명" rules="required">
      <p class="ma-1 subtitle-2 text-start">기업명</p>
      <v-text-field
        v-model="companyName"
        :error-messages="errors"
        required
        outlined
        dense
        filled
        background-color="transparent"
      />
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="사업자등록번호" rules="required|businessNumber">
      <p class="ma-1 subtitle-2 text-start">사업자등록번호(-없이 번호만 입력)</p>
      <v-text-field
        v-model="businessNumber"
        :error-messages="errors"
        @keypress="isNumber($event)"
        maxlength="10"
        required
        outlined
        dense
        filled
        background-color="transparent"
      />
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="담당자명" rules="required">
      <p class="ma-1 subtitle-2 text-start">담당자명</p>
      <v-text-field
        v-model="managerName"
        :error-messages="errors"
        required
        outlined
        dense
        filled
        background-color="transparent"
      />
    </validation-provider>
    <validation-provider v-slot="{ errors, valid }" name="이메일" rules="required|email">
      <p class="ma-1 subtitle-2 text-start">담당자 이메일</p>
      <div style="display:flex; flex-direction: row; justify-content: start; align-items: start">
        <v-text-field
          v-model="managerEmail"
          :error-messages="errors"
          required
          outlined
          dense
          filled
          :disabled="isAuthorized || isEmailAuthCodeSending"
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
    <validation-provider v-slot="{ errors }" name="이메일 인증" :rules="`required|emailAuth:${emailAuthCode}`">
      <div style="display:flex; flex-direction: row; justify-content: start; align-items: start" v-if="isEmailAuthCodeSending">
        <v-text-field
          v-model="managerEmailAuth"
          @keypress="isNumber($event)"
          maxlength="6"
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
    <validation-provider v-slot="{ errors }" name="연락처" rules="required">
      <p class="ma-1 subtitle-2 text-start">담당자 연락처(-없이 번호만 입력)</p>
      <v-text-field
        v-model="managerPhone"
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
    <validation-provider v-slot="{ errors }" name="IP" :rules="`fileRequired:${ipFile}`" style="display: flex; align-items: center;">
      <v-file-input
        v-model="ipFile"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        placeholder="IP (Internet Protocol) 주소 파일"
        label="IP (Internet Protocol) 주소 파일"
        class="pr-4"
      />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <download-button
            :link="`ai.kunsan.ac.kr:3000/uploads/files-1637042697203.pdf`"
          >
            <template>
              <span v-bind="attrs" v-on="on">
                <v-icon>mdi-file-download</v-icon>
                양식 다운로드
              </span>
            </template>
          </download-button>
        </template>
        <span style="white-space: pre-line">{{ipTooltip}}</span>
      </v-tooltip>
    </validation-provider>
    <validation-provider v-slot="{ errors }" name="사업자등록증" :rules="`fileRequired:${businessRegistrationFile}`">
      <v-file-input
        v-model="businessRegistrationFile"
        ref="registrationImage"
        accept="image/*"
        placeholder="사업자등록증 (이미지 파일)"
        label="사업자등록증 (이미지 파일)"
        @change="handleImageFileSelect"
      />
      <v-row align="start" justify="start" v-if="previewImgUrl">
        <v-col cols="12" class="mb-6">
          <img :src="previewImgUrl" style="min-height: 128px; max-height: 200px;" alt="businessRegistrationFile"/>
        </v-col>
      </v-row>
    </validation-provider>
    <div class="mt-6" style="display: flex; align-items: center; justify-content: center">
      <custom-button
        class="mx-1 darken-1"
        :width="`${isMobile ? '49%' : '200'}`"
        @submit="goNext"
        :color="'primary'"
        :text="`계속하기`"
        :loading="loadingSubmit"
      />
      <custom-button
        class="mx-1"
        :width="`${isMobile ? '49%' : '200'}`"
        @submit="goPrev"
        :color="'primary'"
        :text="`이전으로`"
      />
    </div>
  </v-col>
</template>

<script>
import CustomButton from "../button/CustomButton";
import { required, email, confirmed } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";
import DownloadButton from "../button/DownloadButton";

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
  params: ['min'],
  validate(value, { min }) {
    return value.length >= parseInt(min);
  },
  message: '{_field_}는 {min}자 이상이어야 합니다.'
})

extend('max', {
  params: ['max'],
  validate(value, { max }) {
    return value.length <= parseInt(max);
  },
  message: '{_field_}는 {max}자 이하이어야 합니다.'
})

extend('emailAuth', {
  params: ['code'],
  validate(value, { code }) {
    return value === code
  },
  message: '인증번호가 일치하지 않습니다.'
})

extend('fileRequired', {
  params: ['file'],
  validate(value, { file }) {
    return !!file
  },
  message: '인증번호가 일치하지 않습니다.'
})

extend('businessNumber', {
  validate(value) {
    let chkStep1 = 0;
    if ( value.length === 10 ) {
      const keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5]; // 인증키(고정)

      for (let i = 0; i < value.length - 1; i++) {
        // 사업자번호의 9자리까지 인증키와 자릿수같은 숫자끼리 곱한 뒤, 계속 더해준다. (ex_ (0*1) + (1*3) + ...
        chkStep1 += parseInt(value.substring( i, i+1 ), 10) * keyArr[ i ];
      }
      // 9번째 자리의 숫자에 0.5를 곱한 뒤, 다시 더해준다.
      chkStep1 += Math.floor(parseInt(value.substring(8, 9), 10) * 5 / 10);
    }
    // '10 - (지금까지 더한 수의 나머지) == 사업자번호의 마지막 자릿수'가 같다면 성공
    const chkStep2 = parseInt( value.substring(9, 10), 10 );
    return (10 - (chkStep1 % 10)) === chkStep2;
  },
  message: "사업자번호가 유효하지 않습니다."
})

extend('ip', {
  validate(value) {
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
  },
  message: "IP가 유효하지 않습니다."
})


export default {
  name: "SignUpEnterpriseUserInfoInput",
  components: {
    DownloadButton,
    ValidationObserver,
    ValidationProvider,
    CustomButton
  },
  mounted() {
    this.reset();
  },
  data: () => ({
    companyName: '',
    businessNumber: '',
    businessRegistrationFile: null,
    managerName: '',
    managerEmail: '',
    managerPhone: '',
    managerEmailAuth: '',
    ipFile: null,
    // 이메일 인증 여부
    isAuthorized: false,
    // 중복 클릭 안되게 (이메일 인증 버튼)
    loadingEmailAuth: false,
    loadingSubmit: false,
    // 인증코드 전송이 서버에서 완료되면 밑에 인증번호 입력칸 활성화됨
    isEmailAuthCodeSending: false,
    // 이메일 인증코드 재전송 여부
    isRedirectAuthCode: false,
    // TODO(temp): 임의로 만든거니까 서버 연결되면 삭제하기 - 서버에서 발송한 인증코드
    emailAuthCode: '',
    isUploading: false,
    contentLimit: 500,
    previewImgUrl: null,

  }),
  computed: {
    companyInfo() {
      return {
        type: 'enterprise',
        companyName: this.companyName,
        businessNumber: this.businessNumber,
        businessRegistrationFile: this.businessRegistrationFile,
        managerName: this.managerName,
        managerEmail: this.managerEmail,
        ipFile: this.ipFile,
      }
    },
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
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

      this.companyName = '';
      this.businessNumber = '';
      this.businessRegistrationFile = null;
      this.managerName = '';
      this.managerEmail = '';
      this.managerPhone = '';
      this.managerEmailAuth = '';
      this.ipFile = null;
    },
    async sendEmailAuthCode(valid) {
      // email validate check
      if (!this.loadingEmailAuth) {
        this.loadingEmailAuth = true;
        if (!this.managerEmail) {
          alert('이메일을 입력해주십시오.')
          this.loadingEmailAuth = false;
        } else {
          if (!valid) {
            alert('이메일 형식이 올바르지 않습니다')
            this.loadingEmailAuth = false;
            return;
          }
          // TODO (sign-up-private): 이메일 인증 코드 전송 api 서버랑 통신하는 부분
          setTimeout(() => {
            this.loadingEmailAuth = false;
            this.isEmailAuthCodeSending = true;
            this.isRedirectAuthCode = true;
            this.emailAuthCode = '111111'
          }, 3000)
        }
      }
    },
    checkEmailAuthCode() {
      if (`${this.managerEmailAuth}` === this.emailAuthCode) {
        alert("인증이 완료되었습니다.")
        this.isAuthorized = true;
      } else {
        alert("잘못된 인증번호 입니다. 인증번호를 확인한 다음 다시 입력해 주세요.")
      }
    },
    async goNext() {
      if (this.loadingSubmit) return;
      this.loadingSubmit = true;

      let errorMsg = "";

      if (!this.businessRegistrationFile) {
        errorMsg = '사업자 등록증 파일 첨부가 필요합니다.'
      }
      else if (!this.ipFile) {
        errorMsg = 'IP 파일 첨부가 필요합니다.'
      }
      else if (!this.isAuthorized) {
        errorMsg = '이메일 인증이 필요합니다.'
      }
      else {
        errorMsg = '입력한 정보를 확인해 주세요.'
      }

      let form = new FormData();
      form.append("type", 'enterprise');
      form.append("companyName", this.companyName);
      form.append("businessNumber", this.businessNumber);
      form.append("businessRegistrationFile", this.businessRegistrationFile);
      form.append("managerName", this.managerName);
      form.append("managerEmail", this.managerEmail);
      form.append("ipFile", this.ipFile);

      await this.$emit('submitCompanyInfo', form, errorMsg);

      this.loadingSubmit = false;
    },
    goPrev() {
      this.$emit('prevStep')
    },
    handleImageFileSelect() {
      this.previewImg();
    },
    previewImg() {
      if (!!this.businessRegistrationFile) {
        let selectFile = this.businessRegistrationFile;
        //this.uploadFiles[i].file = selectFile;

        //확장자명 가져오기 (ex. .png .jpg .pdf)
        let fileExt = selectFile.name.substring(
          selectFile.name.lastIndexOf(".") + 1
        );
        fileExt = fileExt.toLowerCase();

        // 20MB
        let limitSize = 1048576 * 20;

        // 이미지 파일
        if (
          ["jpeg", "jpg", "png", "gif", "bmp"].includes(fileExt) &&
          selectFile.size <= limitSize
        ) {
          let reader = new FileReader();
          reader.onload = e => {
            this.previewImgUrl = e.target.result;
          }
          reader.readAsDataURL(selectFile)
        }
        // 이미지 외 파일
        else if (selectFile.size <= limitSize) {
          this.previewImgUrl = require('../../assets/no_thumbnail.png');
        }
        else {
          alert("Invalid File")
          this.previewImgUrl = null;
          this.resetBusinessRegistrationFile()
        }
      }
      else {
        this.previewImgUrl = null;
      }
    },
    resetBusinessRegistrationFile() {
      if (this.businessRegistrationFile.size > 0) {
        this.businessRegistrationFile = null
      }
    },
  },
}
</script>

<style scoped>
.no-background-hover::before {
  background-color: transparent !important;
}
</style>
