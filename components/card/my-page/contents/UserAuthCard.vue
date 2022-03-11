<template>
  <v-scroll-y-transition mode="out-in">
    <v-card
      class="mx-auto"
      flat
      style="width: 100%; height: fit-content;"
    >
      <v-card-title class="pb-0">
        <p class="font-weight-medium display-1">
          {{ header }}
        </p>
      </v-card-title>
      <v-divider style="background-color:#555555; border-width: 1px !important;"/>
      <!--
      <v-row align="center" justify="center" class="text-center" style="width: 100%; margin-top: 50px;">
        <v-col cols="12">
          <p class="font-weight-bold title">
            비밀번호 재확인
          </p>
          <p class="font-weight-medium subtitle-1">
            본인 확인을 위해 비밀번호를 입력해 주세요.
          </p>
        </v-col>
        <v-col cols="12" align="center">
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
            @submit="checkPwd"
          />
        </v-col>
      </v-row>
      -->
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
          @submit="checkPwd"
        />
      </v-card-text>
    </v-card>
  </v-scroll-y-transition>
</template>

<script>
import CustomButton from "../../../button/CustomButton";
export default {
  name: "UserAuthCard",
  components: {CustomButton},
  props: {
    userPwd: {
      type: String,
      default: () => '111111'
    },
    header: {
      type: String,
      default: () => ''
    }
  },
  data: () => ({
    password: '',
    showPassword: false,
  }),
  methods: {
    checkPwd() {
      if (this.userPwd === `${this.password}`) {
        // TODO (my-page): 회원 정보 인증되면 어떻게 할 건지
      }
      else {
        alert('비밀번호가 올바르지 않습니다.')
      }
    }
  }
}
</script>

<style scoped>

</style>
