<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-4 mb-4">
    <v-row align="center" justify="center" style="width: 100%; height: fit-content;">
      <v-col cols="11" class="text-center pt-6 font-weight-bold headline">
        <p>{{title}}</p>
      </v-col>
      <v-col cols="3" md="2" class="pb-8 pr-0">
        <v-select
          v-model="type"
          :items="items"
          label="Outlined style"
          outlined
        />
      </v-col>
      <v-col cols="8" md="6" class="pb-8">
        <v-text-field
          v-model="patentNumber"
          :label="type"
          flat
          filled
          outlined
          :rules="[rules.required, rules.length]"
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
    patentNumber: '',
    items: [
      '출원번호',
      '등록번호'
    ],
    type: '출원번호'
  }),
  computed: {
    rules() {
      return {
        required: value => !!value || '값을 입력해주세요',
        length: value => value.length === 13 || '출원, 등록번호는 13자리로 이루어져 있습니다.',
      }
    }
  },
  methods: {
    goNext() {
      if (this.type === '등록번호') {
        if (this.patentNumber.length === 13) {
          if (this.patentNumber.substring(9) !== '0000') {
            alert("유효한 등록번호를 입력해주십시오.")
            return;
          }
        }
      }
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
