<template>
  <v-img
    @click="openGoogleMap"
    style="width: 80%; height: 450px; overflow-y: hidden; overflow-x: hidden; cursor: pointer"
    :src="googleMap"
  />
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "GoogleMap",
  computed: {
    ...mapState({
      googleMap: "googleMap"
    })
  },
  methods: {
    openGoogleMap() {
      window.open('https://map.naver.com/v5/entry/place/20637541?c=14141228.0460652,4508885.8311540,17,0,0,0,dh')
    }
  }
}
</script>

<style scoped>

</style>
