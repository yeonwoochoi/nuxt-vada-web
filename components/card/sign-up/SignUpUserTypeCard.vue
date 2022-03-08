<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-4 mb-4">
    <v-row align="center" justify="center" style="width: 100%; height: 100%;">
      <v-col cols="11" class="py-0">
        <v-radio-group v-model="userType" :rules="[v => !!userType]">
          <v-radio label="개인" value="private"/>
          <v-radio label="기업/기관" value="enterprise"/>
        </v-radio-group>
      </v-col>
      <div style="display: flex;" class="mt-4">
        <v-btn
          color="primary"
          @click="goNext"
        >
          계속하기
        </v-btn>

        <v-btn
          text
          @click="goPrev"
        >
          이전으로
        </v-btn>
      </div>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "SignUpUserTypeCard",
  data: () => ({
    userType: '',
  }),
  watch: {
    userType(val) {
      this.$emit('setUserType', val);
    }
  },
  methods: {
    goNext() {
      this.$emit('nextStep', 2);
    },
    goPrev() {
      this.$emit('prevStep', 2)
    }
  }
}
</script>

<style scoped>

</style>
