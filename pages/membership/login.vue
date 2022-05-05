<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card class="elevation-2 login-card">
        <v-row align="center" justify="center" style="width: 100%; height: 100%">
          <div>
            <div>
              <p class="font-weight-medium mb-0 text-center" style="font-size: 50px;">
                Vada
              </p>
              <p class="subtitle-1 text-center">
                로그인 후 Vada의 다양한 서비스를 누려보세요.
              </p>
            </div>
            <div class="pb-1">
              <v-text-field
                v-model="id"
                flat
                solo
                outlined
                hide-details
                label="아이디(이메일)"
                prepend-inner-icon="mdi-account"
                class="mt-6 mb-2"
              />
              <v-text-field
                v-model="password"
                class="my-2"
                flat
                solo
                outlined
                hide-details
                label="비밀번호"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
            </div>
            <div>
              <custom-button
                @submit="submit"
                :width="`100%`"
                :color="'primary'"
                :text="`로그인`"
                class="mt-2 darken-1"
              />
              <div class="d-flex mt-5" style="color: #888888; justify-content: center">
                <span @click="goToPasswordFind" style="cursor: pointer;">비밀번호 재설정</span>
                <v-divider
                  class="mx-4"
                  vertical
                  style="display: inline;"
                  color="B4B4B4"
                />
                <span @click="goToSignUp" style="cursor: pointer;">회원가입</span>
              </div>
            </div>
          </div>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import CustomButton from "../../components/button/CustomButton";
export default {
  name: "login",
  components: {CustomButton},
  asyncData({store,redirect}) {
    if(store.$auth.loggedIn) {
      redirect('/')
    }
  },
  created() {
    this.$store.commit('setSheetTitle', '로그인')
  },
  data: () => ({
    header: '로그인',
    id: '',
    password: '',
    showPassword: false,
  }),
  methods: {
    async submit() {
      await this.$auth.loginWith('local', { data: { email: this.id, password: this.password } })
        .then((res) => {
          if (res.data.user['roles'].includes("ROLE_ENTERPRISE_USER")) {
            if (res.data.user.enterprise['needChangePassword']) {
              this.$router.push('/membership/change-password')
              return;
            }
          }
          this.$router.push(`/`)
        })
        .catch(err => {
          this.$errorHandler.showMessage(err.response.data)
        })
    },
    goToSignUp() {
      this.$router.push('join')
    },
    goToPasswordFind() {
      this.$router.push('reset-password')
    }
  }
}
</script>

<style scoped>
.login-card {
  border-radius: 5px;
  border: 1px solid rgba(0.06, 0.13, 0.25, 0.25);
  width: 800px;
  height: 500px;
}
</style>
