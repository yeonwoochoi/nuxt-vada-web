<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-4 mb-4">
    <v-row align="center" justify="center" style="width: 100%; height: fit-content;">
      <v-col cols="11" class="text-center pt-6 font-weight-bold headline">
        <p>{{title}}</p>
      </v-col>
      <v-col cols="11" md="8" class="mb-0">
        <v-text-field
          v-model="patentNumber"
          @keypress="isNumber($event)"
          label="출원/등록번호"
          flat
          filled
          outlined
          maxlength="13"
          :disabled="loading"
          :rules="[rules.required]"
        />
      </v-col>
      <v-col cols="12">
        <div style="display: flex; justify-content: center;" class="mb-4">
          <custom-button
            class="mx-1 darken-1"
            :width="`${$vuetify.breakpoint.smAndDown ? '49%' : '200'}`"
            @submit="goNext"
            :color="'primary'"
            :text="`계속하기`"
            :loading="loading"
          />
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import CustomButton from "../../button/CustomButton";

export default {
  name: "PatentInfoInputCard",
  components: {CustomButton},
  created() {
    this.patentNumber = this.$store.getters["patent/getTempEvalData"].patentNumber
  },
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
      let tempPatentNumber = this.patentNumber
      if (!!this.patentNumber && this.patentNumber.length === 9) {
        tempPatentNumber = `${this.patentNumber}0000`
      }
      if (!this.$util.validatePatentNumber(tempPatentNumber)) {
        this.$notifier.showMessage({
          content: '유효하지 않은 출원/등록번호입니다.',
          color: 'error'
        })
        this.loading = false
        return;
      }
      this.$store.commit('patent/setPatentNumber', tempPatentNumber)
      this.$emit('nextStep', 1, () => {
        this.loading = false
      });
    },
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  }
}
</script>

<style scoped>

</style>
