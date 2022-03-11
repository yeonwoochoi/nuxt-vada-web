<template>
  <v-scroll-y-transition mode="out-in">
    <v-card
      flat
      style="width: 100%; height: fit-content;"
    >
      <v-card-title class="pb-0">
        <p class="font-weight-medium display-1">
          {{ header }}
        </p>
      </v-card-title>
      <v-divider style="background-color:#555555; border-width: 1px !important;"/>
      <slot name="body"/>
    </v-card>
  </v-scroll-y-transition>
</template>

<script>
export default {
  name: "MyPageContentCard",
  props: {
    header: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style scoped>

</style>
