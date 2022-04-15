<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-4 mb-4">
    <v-row align="center" justify="center" style="width: 100%; height: fit-content;">
      <v-col cols="11" class="text-center pt-6 font-weight-bold headline">
        <p>{{title}}</p>
      </v-col>
      <v-col cols="3" md="2" class="pb-8 pr-0">
        <v-select
          v-model="patentType"
          :items="patentTypes"
          label="Outlined style"
          outlined
        />
      </v-col>
      <v-col cols="8" md="6" class="pb-8">
        <v-text-field
          v-model="patentNumber"
          :label="patentType"
          flat
          filled
          outlined
          :disabled="loading"
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
import mapper from "../../../data/ipcKsicMapper.json"
import ksicList from "../../../data/ksic.json"

export default {
  name: "PatentInfoInputCard",
  components: {CustomButton},
  data: () => ({
    title: '특허번호를 입력해주세요.',
    patentNumber: '',
    patentTypes: [
      '출원번호',
      '등록번호'
    ],
    patentType: '출원번호',
    loading: false,
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
      if (!this.checkPatentValidation()) {
        alert("유효한 등록번호를 입력해주십시오.")
        return;
      }
      this.loading = true;
      setTimeout(() => {
        this.$emit('nextStep', 2);
        this.$store.commit('evaluation/setPatentInfo', {
          type: this.patentType,
          number: this.patentNumber
        })

        // TODO: 서버 통신해서 IPC 코드 받아와야함
        let targetKsic = this.getKsicFromIpc('A42B')

        this.$store.commit('evaluation/setKsic', targetKsic)
        this.loading = false
      }, 3000)
    },
    goPrev() {
      this.$emit('prevStep', 2)
    },

    // 등록번호 유효성 확인
    checkPatentValidation() {
      if (this.patentType === '등록번호') {
        if (this.patentNumber.length === 13) {
          if (this.patentNumber.substring(9) !== '0000') {
            return false
          }
        }
      }
      return true;
    },

    getKsicFromIpc(ipc) {
      let target = mapper.find(v => v.ipc === ipc).ksic;
      return ksicList.find(v => v.code === target)
    },
  }
}
</script>

<style scoped>

</style>
