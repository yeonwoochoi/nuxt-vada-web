<template>
  <v-img :src="!!imgSrc ? imgSrc : ''" color="white">
    <slot name="body"/>
  </v-img>
</template>

<script>
export default {
  name: "HomeCard",
  props: {
    imgSrc: {
      type: String,
    },
  }
}
</script>

<style scoped>

</style>
