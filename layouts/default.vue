<template>
  <v-app>
    <default-bar/>
    <default-drawer/>
    <default-view/>
    <default-footer/>
    <snackbar/>
  </v-app>
</template>

<script>
import DefaultBar from './default/appBar/appBar'
import DefaultDrawer from './default/drawer/drawer'
import DefaultView from './default/view/view'
import DefaultFooter from './default/footer/footer'
import Snackbar from "../components/snackbar/Snackbar";

export default {
  name: 'DefaultLayout',
  components: {DefaultBar, DefaultDrawer, DefaultView, DefaultFooter, Snackbar},
}
</script>
