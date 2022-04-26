<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-8 mb-4">
    <v-row align="center" justify="center" style="width: 100%; height: 100%;">
      <v-col cols="11" md="8" class="py-0">
        <v-radio-group v-model="userType" :rules="[v => !!userType]">
          <v-radio label="개인" value="private"/>
          <v-radio label="기업/기관" value="enterprise"/>
        </v-radio-group>
        <div style="display: flex; align-items: center; justify-content: center" class="mt-6 mb-4">
          <custom-button
            class="mx-1 darken-1"
            :width="`${$vuetify.breakpoint.smAndDown ? '49%' : '200'}`"
            @submit="goNext"
            :color="'primary'"
            :text="`계속하기`"
            :is-disable="!userType"
          />
          <custom-button
            class="mx-1"
            :width="`${$vuetify.breakpoint.smAndDown ? '49%' : '200'}`"
            @submit="goPrev"
            :color="'primary'"
            :text="`이전으로`"
          />
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import CustomButton from "../../button/CustomButton";
export default {
  name: "SignUpUserTypeCard",
  components: {CustomButton},
  data: () => ({
    userType: '',
  }),
  watch: {
    userType(val) {
      this.$emit('setUserType', val);
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
