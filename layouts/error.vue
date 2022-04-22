<template>
  <v-card class="border-card flex-center" style="width: 1114px; height: 720px;">
    <div>
      <div class="flex-center">
        <v-img :src="errorIcon" max-width="135px"/>
      </div>
      <div class="text-center">
        <p v-if="error.statusCode === 404" class="font-weight-black text-h3 mt-10">
          {{ pageNotFound }}
        </p>
        <p v-else class="font-weight-black text-h3 mt-10">
          {{ otherError }}
        </p>
      </div>
      <div class="flex-center">
        <p v-if="error.statusCode === 404" class="title text-center my-4" style="max-width: 590px;">{{ pageNotFoundInfo }}</p>
        <p v-else class="title text-center my-4" style="max-width: 590px;">{{ otherErrorInfo }}</p>
      </div>
      <v-card-actions class="flex-center">
        <v-btn
          x-large
          href="/"
          :color="baseColor"
          class="white--text font-weight-bold mt-3"
          :width="200"
          height="52px"
          style="letter-spacing: 1px; text-transform: none;"
        >
          메인으로
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "errorDefault",
  layout: 'errorLayout',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    pageNotFound: '요청하신 페이지를 찾을 수 없습니다.',
    pageNotFoundInfo: '방문하시려는 페이지의 주소가 잘못 입력되었거나,\n' +
      '\n' +
      '해당 페이지가 현재 변경 혹은 삭제되어 접근하실 수 없습니다.\n' +
      '\n' +
      '이용에 어려움을 드려 죄송합니다.',
    otherError: '오류가 발생했습니다.',
    otherErrorInfo: '메인 페이지로 돌아가셔서 다시 시도해주십시오.',
    errorIcon: require('../assets/icon_error.png'),
    baseColor: '#1976D2',
  }),
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

