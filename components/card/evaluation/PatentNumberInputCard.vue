<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-4 mb-4">
    <v-row align="center" justify="center" style="width: 100%; height: fit-content;">
      <v-col cols="11" class="text-center pt-6 font-weight-bold headline">
        <p>{{title}}</p>
      </v-col>
      <v-col cols="8" class="pb-8">
        <v-text-field
          v-model="patentNumber"
          :label="`등록/출원번호`"
          flat
          filled
          outlined
          :rules="[rules.required]"
        />
      </v-col>
      <div style="display: flex;" class="mb-4">
        <custom-button
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
  name: "PatentNumberInputCard",
  components: {CustomButton},
  data: () => ({
    title: '특허번호를 입력해주세요.',
    patentNumber: ''
  }),
  computed: {
    rules() {
      return {
        required: value => !!value || '값을 입력해주세요',
      }
    }
  },
  methods: {
    goNext() {
      this.$emit('nextStep', 2);
    },
    goPrev() {
      this.$emit('prevStep', 2)
    }
  }
}
</script>

<style scoped>

</style>
