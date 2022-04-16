<template>
  <v-snackbar v-model="show" :color="color" top style="padding-top: 120px;">
    <div style="display: flex; align-items: center; justify-content: space-between">
      <p class="white--text mb-0 pl-6" style="font-size: 1rem;">{{ message }}</p>
      <v-btn text @click="show = false">Close</v-btn>
    </div>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  data: () => ({
    show: false,
    message: '',
    color: ''
  }),
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'alert/showMessage') {
        this.message = state.alert.content
        this.color = state.alert.color
        this.show = true
      }
    })
  }
}
</script>

<style scoped>

</style>
