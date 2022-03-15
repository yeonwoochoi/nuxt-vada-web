<template>
  <v-btn
    x-large
    @click="submit"
    class="font-weight-bold"
    :color="color"
    :width="width"
    :loading="loading"
    :disabled="isDisable"
    height="52px"
    style="letter-spacing: 1px; text-transform: none;"
  >
    {{text}}
  </v-btn>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    width: {
      type: String,
      default: () => '200'
    },
    color: {
      type: String,
      default: () => 'primary'
    },
    text: {
      type: String,
      default: () => ''
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    isDisable: {
      type: Boolean,
      default: () => false
    },
  },
  methods: {
    submit() {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped>

</style>
