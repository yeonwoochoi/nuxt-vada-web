<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-4 mb-4">
    <v-row align="center" justify="center" style="width: 100%; height: 100%;">
      <v-col cols="11" class="text-center pt-6 font-weight-bold headline">
        <p>{{title}}</p>
      </v-col>
      <v-col cols="11" md="8" class="pb-0">
        <v-select
          v-model="businessScale"
          outlined
          filled
          :items="businessScaleItems"
          return-object
          :item-text="item => item.original"
          :disabled="loading"
        />
      </v-col>
      <div style="display: flex;" class="mt-6 mb-4">
        <custom-button
          :loading="loading"
          class="mx-1 darken-1"
          :width="`${$vuetify.breakpoint.smAndDown ? '49%' : '200'}`"
          @submit="goNext"
          :color="'primary'"
          :text="`계속하기`"
        />
        <custom-button
          class="mx-1"
          :width="`${$vuetify.breakpoint.smAndDown ? '49%' : '200'}`"
          @submit="goPrev"
          :color="'primary'"
          :text="`이전으로`"
        />
      </div>
    </v-row>
  </v-card>
</template>

<script>
import CustomButton from "../../button/CustomButton";

export default {
  name: "BusinessScaleInputCard",
  components: {CustomButton},
  data: () => ({
    title: '기업 규모를 선택해주세요',
    loading: false
  }),
  computed: {
    businessScaleItems() {
      return this.$store.getters["evaluation/getBusinessScaleList"]
    },
    businessScale: {
      get () {
        return this.$store.getters['evaluation/getTempEvalData'].businessScale
      },
      set (value) {
        return this.$store.commit('evaluation/setBusinessScale', value)
      }
    }
  },
  methods: {
    goNext() {
      this.loading = true;
      this.$emit('nextStep', 4, () => {
        this.loading = false;
      });
    },
    goPrev() {
      this.$emit('prevStep', 4)
    }
  }
}
</script>

<style scoped>

</style>
