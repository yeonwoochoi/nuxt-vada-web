<template>
  <v-list
    dense
    expand
    nav
  >
    <template
      v-for="(item, index) in items"
    >
      <drawer-list-group
        v-if="item.items && item.items.length > 0"
        :key="`group-${index}`"
        :item="item"
      />
      <drawer-list-item
        v-else
        :key="`item-${index}`"
        :item="item"
      />
    </template>
  </v-list>
</template>

<script>
import DrawerListItem from './drawerListItem'
import DrawerListGroup from './drawerListGroup'

export default {
  name: "DrawerList",
  components: {
    DrawerListGroup,
    DrawerListItem
  },
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style scoped>

</style>
