<template>
  <div>
    <report/>
    <v-btn
      @click="downloadFile"
    >
      다운로드
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
      this.$store.dispatch('patent/download', 'Report').then(
        res => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'report-sample.docx');
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
    }
  }
}
</script>

<style scoped>

</style>
