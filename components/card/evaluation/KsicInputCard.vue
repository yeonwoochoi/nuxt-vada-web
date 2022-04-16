<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-4 mb-4">
    <v-row align="center" justify="center" style="width: 100%; height: 100%;">
      <v-col cols="11" class="text-center pt-6 font-weight-bold headline">
        <p>{{title}}</p>
      </v-col>
      <v-col cols="11" md="8" class="mb-0">
        <vertical-header-table
          :table-header="ksicHeader"
          :table-items="ksicContent"
        />
      </v-col>
      <v-col cols="11" class="text-center pt-8 pb-0 font-weight-bold subtitle-1">
        <p class="mb-0">{{subtitle}}</p>
      </v-col>
      <v-col cols="11" md="8" class="pt-0 pb-2">
        <div style="display: flex; align-items: center; justify-content: center">
          <v-radio-group v-model="isValidCode" row>
            <v-radio :value="false" label="수정하기" class="px-2" />
            <v-radio :value="true" label="계속하기" class="px-2" />
          </v-radio-group>
        </div>
      </v-col>
      <v-col cols="11" md="8" class="pb-0" v-if="!isValidCode">
        <v-select
          v-model="tempKsic"
          outlined
          filled
          :items="classificationItems"
          return-object
          :item-text="item => item.code + ' ' + item.title"
        />
      </v-col>
      <div style="display: flex;" class="mt-6 mb-4">
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
import VerticalHeaderTable from "../../table/VerticalHeaderTable";
import {mapGetters} from "vuex";
import ksicList from "../../../data/ksic.json"

export default {
  name: "KsicInputCard",
  components: {VerticalHeaderTable, CustomButton},
  props: {
    prevKsic: {
      type: Object,
      default: () => ksicList[0]
    }
  },
  data: () => ({
    title: '산업분류코드(KSIC)를 확인해주세요',
    subtitle: '수정하시겠습니까?',
    isValidCode: true,
    tempKsic: null
  }),
  computed: {
    ...mapGetters("evaluation", {
      evaluationData: 'getTempEvalData'
    }),
    classification: {
      get() {
        return this.$store.getters["evaluation/getTempEvalData"].ksic
      },
      set(value) {
        return this.$store.commit('evaluation/setKsic', value)
      }
    },
    classificationItems() {
      return ksicList
    },
    ksicHeader() {
      return [
        {
          text: '특허번호',
          value: 'patentNumber',
        },
        {
          text: '산업분류코드(KSIC)',
          value: 'ksic',
        },
      ]
    },
    ksicContent() {
      return [
        {
          patentNumber: this.evaluationData.patentNumber,
          ksic: `${this.evaluationData.ksic.code} ${this.evaluationData.ksic.title}`
        }
      ]
    },
  },
  methods: {
    goNext() {
      this.$emit('nextStep', 3);
      this.classification = this.tempKsic
    },
    goPrev() {
      this.$emit('prevStep', 3)
    },
    fetchData() {
      this.tempKsic = this.classification
    }
  },
}
</script>

<style scoped>

</style>
