<template>
  <v-main style="padding-bottom: 360px">
    <v-container
      fluid
      class="overflow-y-auto px-0"
    >
      <Nuxt/>
    </v-container>
    <v-btn
      v-show="isScrolled"
      v-scroll="onScroll"
      class="ma-6"
      fab
      dark
      fixed
      bottom
      right
      color="rgb(0, 44, 74)"
      @click="goTop"
    >
      <v-icon>mdi-menu-up</v-icon>
    </v-btn>
  </v-main>
</template>

<script>
export default {
  name: "DefaultView",
  data: () => ({
    isScrolled: false
  }),
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.isScrolled = top > 20
    },
    goTop() {
      this.$vuetify.goTo(0);
    }
  }
}
</script>

<style scoped>

</style>
