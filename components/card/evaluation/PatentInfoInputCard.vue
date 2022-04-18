<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-4 mb-4">
    <v-row align="center" justify="center" style="width: 100%; height: fit-content;">
      <v-col cols="11" class="text-center pt-6 font-weight-bold headline">
        <p>{{title}}</p>
      </v-col>
      <v-col cols="11" md="8" class="mb-0">
        <v-text-field
          v-model="patentNumber"
          label="출원/등록번호"
          flat
          filled
          outlined
          maxlength="13"
          :disabled="loading"
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
          :loading="loading"
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
  name: "PatentInfoInputCard",
  components: {CustomButton},
  data: () => ({
    title: '출원/등록번호를 입력해주세요.',
    patentNumber: '',
    loading: false,
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
      this.loading = true;
      if (!this.$util.validatePatentNumber(this.patentNumber)) {
        this.$notifier.showMessage({
          content: '유효하지 않은 출원/등록번호입니다.',
          color: 'error'
        })
        this.loading = false
        return;
      }
      this.$store.commit('patent/setPatentNumber', this.patentNumber)
      this.$emit('nextStep', 2, () => {
        this.loading = false
      });
    },
    goPrev() {
      this.$emit('prevStep', 2)
    },
  }
}
</script>

<style scoped>

</style>
