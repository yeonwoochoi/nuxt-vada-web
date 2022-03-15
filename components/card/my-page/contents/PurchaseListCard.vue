<template>
  <v-scroll-y-transition mode="out-in">
    <v-card
      class="mx-auto"
      flat
      style="width: 100%; height: fit-content;"
    >
      <v-card-title class="pb-0">
        <p class="font-weight-medium display-1">
          {{ header }}
        </p>
      </v-card-title>
      <v-divider style="background-color:#555555; border-width: 1px !important;"/>
      <simple-data-table
        :table-header="tableHeader"
        :table-content="tableContent"
      />
    </v-card>
  </v-scroll-y-transition>
</template>

<script>
import SimpleDataTable from "../../../table/SimpleDataTable";
export default {
  name: "PurchaseListCard",
  components: {SimpleDataTable},
  props: {
    header: {
      type: String,
      default: () => ''
    },
    tableHeader: {
      type: Array,
      default: () => []
    },
    tableContent: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
