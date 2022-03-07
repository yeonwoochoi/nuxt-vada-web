<template>
  <v-img style="position: relative;" height="450" :src="imgSrc">
    <v-card-text style="height: 100%; position: absolute;">
      <v-container fluid style="height: 100%;">
        <v-row align="center" justify="center" style="height: 100%;">
          <v-col cols="12" align="center" class="mt-4">
            <pre class="font-weight-bold white--text mt-12 header-anim display-2">{{ headerTitle }}</pre>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-img>
</template>

<script>
export default {
  name: "AppBarSheetView",
  props: {
    isMobile: {
      type: Boolean,
      default: () => false
    },
    imgSrc: {
      type: String,
      default: () => require("../../assets/header/header_about.png")
    },
    headerTitle: {
      type: String,
      default: () => ''
    }
  },
}
</script>

<style scoped>
  .header-anim {
    animation: backInDown;
    animation-duration: 1s;
  }
</style>
