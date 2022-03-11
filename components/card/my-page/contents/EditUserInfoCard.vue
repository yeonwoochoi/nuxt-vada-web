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
              <p class="ma-1 subtitle-2 text-start">이름</p>
              <p class="subtitle-1 ml-2">{{value.email}}</p>
            </div>
            <div>
              <p class="ma-1 subtitle-2 text-start">비밀번호</p>
              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :rules="[rules.password]"
                outlined
                dense
                filled
                :type="showPassword ? 'text' : 'password'"
                background-color="transparent"
                style="max-width: 400px"
                class="mb-4"
              />
            </div>
            <div>
              <p class="ma-1 subtitle-2 text-start">비밀번호 확인</p>
              <v-text-field
                v-model="passwordConfirm"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :rules="[rules.passwordConfirm]"
                outlined
                dense
                filled
                :type="showPassword ? 'text' : 'password'"
                background-color="transparent"
              />
            </div>
            <div>
              <p class="ma-1 subtitle-2 text-start">이름</p>
              <v-text-field
                v-model="value.name"
                :rules="[rules.required]"
                required
                outlined
                dense
                filled
                background-color="transparent"
              />
            </div>
            <div>
              <p class="ma-1 subtitle-2 text-start">연락처(-없이 번호만 입력)</p>
              <v-text-field
                v-model="value.phone"
                @keypress="isNumber($event)"
                maxlength="12"
                :rules="[rules.required]"
                outlined
                dense
                filled
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
  props: {
    header: {
      type: String,
      default: () => ''
    },
    isAuthorize: {
      type: Boolean,
      default: () => false
    },
    value : {
      type : Object,
      required : true
    }
  },
  data: () => ({
    password: '',
    passwordConfirm: '',
    showPassword: false,
    isAuthLoading: false,
    isEditLoading: false,
    valid: false
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
    async checkPwd() {
      if (this.isAuthLoading) return
      this.isAuthLoading = true;
      await this.$emit('selfAuth', this.password)
      this.passwordConfirm = this.password;
      this.isAuthLoading = false;
    },
    async edit() {
      this.valid = this.$refs.editForm.validate();
      if (this.valid) {
        if (this.isEditLoading) return
        this.isEditLoading = true;
        await this.$emit('edit', this.value)
        this.isEditLoading = false;
      }
      else {
        alert('입력한 정보를 확인해 주세요')
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
