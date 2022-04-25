<template>
  <div>
    <report/>
    <v-btn
      @click="downloadFile"
    >
      다운로드
    </v-btn>
    <v-btn
      @click="refresh"
    >
      Refresh
    </v-btn>
  </div>
</template>

<script>
import Report from "../components/report/Report";
export default {
  name: "test",
  components: {Report},
  auth: false,
  methods: {
    downloadFile() {
      this.$store.dispatch('patent/downloadSampleFile', 'IpEmailPair').then(
        res => {
          let blob = new Blob([res], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = objectUrl;
          link.setAttribute('download', 'template.xls');
          document.body.appendChild(link);
          link.click();
        },
        err => {
          this.$notifier.showMessage({
            content: err,
            color: 'error'
          })
        }
      )
    },
    refresh() {
      if (this.$auth.strategy.token.status().expired()) {
        console.log('expired!')
      }
      else {
        console.log('valid!')
      }
      this.$auth.refreshTokens().then(
        res => {
          console.log(res)
          console.log("success")
        },
        err => {
          console.dir(err.response.data.message)
        }
      )
    },
  }
}
</script>

<style scoped>

</style>
