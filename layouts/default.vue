<template>
  <v-app>
    <default-bar/>
    <default-drawer/>
    <default-view/>
    <default-footer/>
  </v-app>
</template>

<script>
import DefaultBar from './default/appBar/appBar'
import DefaultDrawer from './default/drawer/drawer'
import DefaultView from './default/view/view'
import DefaultFooter from './default/footer/footer'

export default {
  name: 'DefaultLayout',
  components: {DefaultBar, DefaultDrawer, DefaultView, DefaultFooter},
}
</script>
