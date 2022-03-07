<template>
  <v-card flat style="width: 100%; height: fit-content" class="elevation-0 mt-4 mb-8">
    <v-row align="center" justify="center" style="width: 100%; height: 100%;">
      <v-col cols="11" class="py-0">
        <v-radio-group v-model="userType" :rules="[v => !!userType]">
          <v-radio label="개인" value="private"/>
          <v-radio label="기업/기관" value="enterprise"/>
        </v-radio-group>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "SignUpUserTypeCard",
  data: () => ({
    userType: '',
  }),
  watch: {
    userType(val) {
      this.$emit('setUserType', val);
    }
  }
}
</script>

<style scoped>

</style>
