<template>
  <v-navigation-drawer
    v-if="$vuetify.breakpoint.smAndDown"
    v-model="drawer"
    v-bind="$attrs"
    dark
    :src="require('../../../assets/bg_sidebar.png')"
    app
  >
    <template
      #img="props"
    >
      <v-img
        gradient="rgba(0, 0, 0, .25), rgba(0, 0, 0, .25)"
        v-bind="props"
      />
    </template>

    <drawer-header />

    <v-divider/>

    <drawer-list :items="items" />

    <!--
    <template #append>
      <div class="pa-4 text-center">
        <v-btn
          block
          class="font-weight-black"
          color="red"
          rounded
          large
          target="_blank"
          to="/"
          >
          {{ company }}
        </v-btn>
      </div>
    </template>
    -->
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import DrawerHeader from './header/drawerHeader'
import DrawerList from './content/drawerList'

export default {
  name: "DefaultDrawer",
  components: {
    DrawerHeader,
    DrawerList
  },
  computed: {
    ...mapState({
      company: 'company',
      items: 'drawerItems',
    }),
    drawer: {
      get () {
        return this.$store.getters['getDrawer']
      },
      set (value) {
        return this.$store.commit('setDrawer', value)
      }
    },
  }
}
</script>

<style scoped>

</style>
