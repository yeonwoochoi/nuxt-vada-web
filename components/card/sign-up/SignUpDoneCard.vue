<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-4 mb-8">
    <v-row align="center" justify="center" style="width: 100%; height: 100%;">
      <v-col cols="12" align="center" class="mt-10 mb-2">
        <v-img aspect-ratio="1" style="height: 250px;" contain :src="icon"/>
      </v-col>
      <v-col cols="10" class="mb-6" style="display: flex; align-items: center; justify-content: center">
        <p class="ma-1 text-h6 text-center font-weight-medium">회원가입이 완료 되었습니다</p>
      </v-col>
      <v-col cols="10" style="display: flex; align-items: center; justify-content: center">
        <v-btn
          color="primary"
          @click="goNext"
        >
          메인으로
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "SignUpDoneCard",
  data: () => ({
    icon: require('../../../assets/icon_complete.png')
  }),
  methods: {
    goNext() {
      this.$emit('nextStep', 4)
    }
  }
}
</script>

<style scoped>

</style>
