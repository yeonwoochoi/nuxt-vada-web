<template>
  <v-data-table
    :headers="tableHeader"
    :items="tableContent"
    hide-default-footer
    class="text-center"
    :mobile-breakpoint="mobileBreakpoint"
  />
</template>

<script>
export default {
  name: "SimpleDataTable",
  props: {
    tableHeader: {
      type: Array,
      default: () => []
    },
    tableContent: {
      type: Array,
      default: () => []
    },
    mobileBreakpoint: {
      type: Number,
      default: () => 0
    }
  }
}
</script>

<style scoped>

</style>
