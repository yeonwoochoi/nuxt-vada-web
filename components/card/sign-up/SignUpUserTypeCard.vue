<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-4 mb-4">
    <v-row align="center" justify="center" style="width: 100%; height: 100%;">
      <v-col cols="11" class="py-0">
        <v-radio-group v-model="userType" :rules="[v => !!userType]">
          <v-radio label="개인" value="private"/>
          <v-radio label="기업/기관" value="enterprise"/>
        </v-radio-group>
      </v-col>
      <div style="display: flex;" class="mt-6 mb-4">
        <custom-button
          class="mx-1 darken-1"
          :width="`${isMobile ? '49%' : '200'}`"
          @submit="goNext"
          :color="'primary'"
          :text="`계속하기`"
        />
        <custom-button
          class="mx-1"
          :width="`${isMobile ? '49%' : '200'}`"
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
  name: "SignUpUserTypeCard",
  components: {CustomButton},
  data: () => ({
    userType: '',
  }),
  computed: {
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
      }
    },
  },
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
