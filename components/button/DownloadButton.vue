<template>
  <button
    type="button"
    class="no-background-hover elevation-0 mx-2 subtitle-2 font-weight-bold"
    :onclick="`window.open('http://${link}', '_blank')`"
    formtarget="_blank"
    style="background-color: transparent; color: #666666; height: fit-content"
    :disabled="isDisable"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  name: "DownloadButton",
  props: {
    link: {
      type: String,
      default: () => ''
    },
    isDisable: {
      type: Boolean,
      default: () => false
    }
  },
}
</script>

<style scoped>
.no-background-hover::before {
  background-color: transparent !important;
}
</style>
