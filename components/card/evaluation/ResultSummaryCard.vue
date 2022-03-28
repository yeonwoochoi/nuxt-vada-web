<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-4 mb-4">
    <v-row align="center" justify="center" style="width: 100%; height: 100%;">
      <v-col cols="11" class="text-center pt-6 font-weight-bold headline">
        <p>{{title}}</p>
      </v-col>
      <v-col cols="11" class="py-0">
        <v-data-table
          :headers="summaryHeader"
          :items="summaryContent"
          hide-default-header
          hide-default-footer
          class="text-start"
          :mobile-breakpoint="0"
        />
      </v-col>
      <div style="display: flex;" class="mt-6 mb-4">
        <download-button
          class="mx-1"
          :link="downloadLink"
        >
          <custom-button
            class="mx-1 darken-1"
            :link="downloadLink"
            :width="`${$vuetify.breakpoint.smAndDown ? '49%' : '200'}`"
            :color="'primary'"
            :text="`구매하기`"
            style="min-width: 140px;"
          />
        </download-button>
        <custom-button
          class="mx-1"
          :width="`${$vuetify.breakpoint.smAndDown ? '49%' : '200'}`"
          :color="'primary'"
          :text="`메인으로`"
          @submit="$router.push('/')"
        />
      </div>
    </v-row>
  </v-card>
</template>

<script>
import CustomButton from "../../button/CustomButton";
import DownloadButton from "../../button/DownloadButton";

export default {
  name: "ResultSummaryCard",
  components: {DownloadButton, CustomButton},
  props: {
    downloadLink: {
      type: String,
    }
  },
  data: () => ({
    title: '요약 보고서',
    summaryHeader: [
      {
        text: 'Header',
        value: 'header',
        align: 'center'
      },
      {
        text: 'Value',
        value: 'value',
        align: 'start'
      },
    ],
    summaryContent: [
      {
        header: '기술가치 금액',
        value: '1,472~1,472 백만원'
      },
      {
        header: '평가의 목적',
        value: '평가용도: 기술 가치금액 참고용'
      },
      {
        header: '평가대상특허',
        value: '평가대상 특허: 등록 1건\nKR 10-0107367'
      },
    ],
    isLoading: false,
  }),
  methods: {

  }
}
</script>

<style scoped>

</style>
