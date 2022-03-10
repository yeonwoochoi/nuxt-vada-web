<template>
  <v-card flat style="width: 100%; height: fit-content;" class="elevation-0 mt-4 mb-4">
    <v-row align="center" justify="center" style="width: 100%; height: 100%;">
      <sign-up-private-user-info-input v-if="isPrivate" @submitUserInfo="submit" @prevStep="goPrev"/>
      <sign-up-enterprise-user-info-input v-else @submitCompanyInfo="submit" @prevStep="goPrev"/>
    </v-row>
  </v-card>
</template>

<script>
import SignUpEnterpriseUserInfoInput from "../../input/SignUpEnterpriseUserInfoInput";
import SignUpPrivateUserInfoInput from "../../input/SignUpPrivateUserInfoInput";

export default {
  name: "SignUpUserInfoInputCard",
  components: {
    SignUpEnterpriseUserInfoInput,
    SignUpPrivateUserInfoInput
  },
  props: {
    userType: {
      type: String,
      default: () => 'private'
    }
  },
  data: () => ({
    privateInfo: {
      email: '',
      password: '',
      username: '',
      phone: '',
    },
    companyInfo: {
      companyName: '',
      businessNumber: '',
      businessRegistrationFile: '',
      managerName: '',
      managerEmail: '',
      id: '',
      ip: ''
    },
  }),
  computed: {
    isPrivate() {
      return this.userType === 'private'
    },
  },
  methods: {
    submit(params, errorMsg) {
      this.$emit('submit', params, errorMsg);
    },
    goPrev() {
      this.$emit('prevStep', 3)
    }
  }
}
</script>

<style scoped>

</style>
