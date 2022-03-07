<template>
  <v-card>
    <v-card-title class="text-h5">
      {{ title }}
    </v-card-title>
    <v-card-text>{{ comment }}</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="green darken-1"
        text
        @click="onClickOkBtn"
      >
        확인
      </v-btn>
      <v-btn
        color="green darken-1"
        text
        @click="closeDialog"
      >
        취소
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ConfirmationDialog",
  props: {
    title: {
      type: String,
      default: () => ''
    },
    comment: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    onClickOkBtn() {
      this.$emit("onClickOkButton")
      this.closeDialog()
    },
    closeDialog() {
      this.$emit("close")
    }
  }
}
</script>

<style scoped>

</style>
