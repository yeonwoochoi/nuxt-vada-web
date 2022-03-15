<template>
  <button
    type="button"
    class="no-background-hover elevation-0 mx-2 pb-2 subtitle-2 font-weight-bold"
    :onclick="`window.open('http://${link}', '_blank')`"
    formtarget="_blank"
    style="background-color: transparent; color: #666666; height: fit-content"
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
  }
}
</script>

<style scoped>

</style>
