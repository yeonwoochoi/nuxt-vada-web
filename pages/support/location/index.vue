<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <google-map class="ml-6"/>
            <div class="pt-4">
              <contact-card :contact-data="contactData1"/>
              <contact-card :contact-data="contactData2"/>
              <contact-card :contact-data="contactData3"/>
            </div>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "../../../components/card/MainCard";
import GoogleMap from "../../../components/map/GoogleMap";
import ContactCard from "../../../components/contact/ContactCard";

export default {
  name: "Contact",
  components: {ContactCard, GoogleMap, MainCard},
  created() {
    this.$store.commit('setSheetTitle', '오시는길')
  },
  data: () => ({
    header: 'Contact',
    contactData1: {
      header: 'Mailing address',
      content: '132, Teheran-ro, Gangnam-gu,\n' +
        'Seoul, Republic of Korea\n' +
        '서울특별시 강남구 테헤란로 132\n' +
        '\n' +
        '한독타워 11층 (역삼동)\n' +
        '우편번호 06235'
    },
    contactData2: {
      header: 'TEL',
      content: '02-3475-7807'
    },
    contactData3: {
      header: 'E-mail',
      content: 'vadapartners@gmail.com'
    }
  }),
}
</script>

<style scoped>


pre {
  white-space: pre-wrap;
}
</style>
