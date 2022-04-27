<template>
  <my-page-content-card :header="header">
    <template v-slot:body>
      <div v-if="!isAuthorize">
        <v-card-subtitle class="mt-6">
          <p class="font-weight-bold subtitle-1">
            본인 확인을 위해 비밀번호를 입력해 주세요.
          </p>
        </v-card-subtitle>
        <v-card-text>
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            required
            outlined
            dense
            filled
            :type="showPassword ? 'text' : 'password'"
            background-color="transparent"
            style="max-width: 400px"
            class="mb-4"
          />
          <custom-button
            :width="'200'"
            :text="`확인`"
            :loading="isAuthLoading"
            @submit="checkPwd"
          />
        </v-card-text>
      </div>
      <div v-else>
        <v-card-text>
          <v-form ref="editForm" v-model="valid" lazy-validation>
            <div class="mb-8">
              <p class="ma-1 subtitle-2 text-start">회원유형</p>
              <p class="subtitle-1 mt-2 ml-2">{{userType}}</p>
            </div>
            <div class="mb-8" v-if="!isPersonalUser">
              <p class="ma-1 subtitle-2 text-start">기업명</p>
              <p class="subtitle-1 mt-2 ml-2">{{initUserInfo['enterprise']['organizationName']}}</p>
            </div>
            <div class="mb-8" v-if="!isPersonalUser">
              <p class="ma-1 subtitle-2 text-start">사업자 등록번호</p>
              <p class="subtitle-1 mt-2 ml-2">{{initUserInfo['enterprise']['organizationNumber']}}</p>
            </div>
            <div class="mb-8">
              <p class="ma-1 subtitle-2 text-start">이메일</p>
              <p class="subtitle-1 mt-2 ml-2">{{initUserInfo.email}}</p>
            </div>
            <div>
              <p class="ma-1 subtitle-2 text-start">이름</p>
              <v-text-field
                v-model="tempName"
                :rules="[rules.required]"
                flat
                solo
                outlined
                label="이름"
                prepend-inner-icon="mdi-account-outline"
                background-color="transparent"
              />
            </div>
            <div>
              <p class="ma-1 subtitle-2 text-start">비밀번호</p>
              <v-text-field
                v-model="password"
                flat
                solo
                outlined
                label="비밀번호"
                :rules="[rules.required, rules.password]"
                prepend-inner-icon="mdi-lock-outline"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
              />
            </div>
            <div>
              <p class="ma-1 subtitle-2 text-start">비밀번호 확인</p>
              <v-text-field
                v-model="passwordConfirm"
                flat
                solo
                outlined
                label="비밀번호 확인"
                :rules="[rules.passwordConfirm]"
                prepend-inner-icon="mdi-lock-check-outline"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
              />
            </div>
            <div>
              <p class="ma-1 subtitle-2 text-start">연락처(-없이 번호만 입력)</p>
              <v-text-field
                v-model="tempPhone"
                @keypress="isNumber($event)"
                flat
                solo
                outlined
                label="연락처"
                maxlength="12"
                :rules="[rules.required]"
                prepend-inner-icon="mdi-phone-outline"
                background-color="transparent"
              />
            </div>
            <custom-button
              :width="'200'"
              :text="`수정`"
              :loading="isEditLoading"
              @submit="edit"
              class="mt-4"
            />
          </v-form>
        </v-card-text>
      </div>
    </template>
  </my-page-content-card>
</template>

<script>
import CustomButton from "../../../button/CustomButton";
import MyPageContentCard from "../MyPageContentCard";
export default {
  name: "EditUserInfoCard",
  components: {MyPageContentCard, CustomButton},
  created() {
    this.isAuthorize = false;
  },
  props: {
    header: {
      type: String,
      default: () => ''
    },
  },
  data: () => ({
    password: '',
    passwordConfirm: '',
    showPassword: false,
    isAuthLoading: false,
    isEditLoading: false,
    isAuthorize: false,
    valid: false,
    initUserInfo: {},
    tempUserInfo: {},
    tempName: '',
    tempPhone: ''
  }),
  computed: {
    rules() {
      return {
        required: value => !!value || '값을 입력해주세요',
        password: value => /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).*$/.test(value) || '영문 대소문자와 최소 1개의 숫자 혹은 특수 문자를 포함해야 합니다.',
        passwordConfirm: value => value === this.password || '비밀번호가 일치하지 않습니다.',
      }
    },
    userType() {
      switch (this.initUserInfo['roles'][0]) {
        case "ROLE_ENTERPRISE_MANAGER_USER":
          return '기업 매니저 회원';
        case "ROLE_ENTERPRISE_USER":
          return '기업 일반 회원';
        case "ROLE_PERSONAL_USER":
          return '일반 회원'
        case "ROLE_ADMIN":
          return 'Admin'
        default:
          return ''
      }
    },
    isPersonalUser() {
      return this.initUserInfo['roles'][0] === "ROLE_PERSONAL_USER";
    }
  },
  methods: {
    async checkPwd() {
      if (!this.password) {
        this.$notifier.showMessage({
          content: '값을 입력해주세요.',
          color: 'error'
        })
        return
      }
      this.isAuthLoading = true;
      await this.$emit('selfAuth', this.password, (success, userInfo) => {
        if (!success) {
          this.isAuthorize = false;
          this.isAuthLoading = false;
          return;
        }
        // 정보 세팅
        this.initUserInfo = {
          password: this.password,
          ...userInfo
        };
        this.tempName = this.initUserInfo.fullName;
        this.tempPhone = this.initUserInfo.phoneNumber;
        this.passwordConfirm = this.password;
        this.isAuthorize = true;
        this.isAuthLoading = false;
      })
    },
    async edit() {
      this.valid = this.$refs.editForm.validate();

      // validate 체크
      if (this.valid) {
        if (this.isEditLoading) return
        this.isEditLoading = true;

        // 변경된 정보 여부 체크
        if (this.initUserInfo.fullName === this.tempName && this.initUserInfo.phoneNumber === this.tempPhone && this.initUserInfo.password === this.password) {
          this.$notifier.showMessage({
            content: '변경된 정보가 없습니다.',
            color: 'error'
          })
          this.isEditLoading = false;
          return;
        }

        let payload = {
          name: this.tempName,
          phoneNumber: this.tempPhone,
          password: this.password
        }

        // 서버 통신
        await this.$emit('edit', payload, (success, message) => {
          this.isEditLoading = false;
          if (!success) {
            this.$notifier.showMessage({
              content: message,
              color: 'error'
            })
          }
          else {
            alert(message)
            this.$router.go(0)
          }
        })
      }
      else {
        this.$notifier.showMessage({
          content: '입력한 정보를 확인해 주세요',
          color: 'error'
        })
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
