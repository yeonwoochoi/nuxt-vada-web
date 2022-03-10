<template>
  <!--
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height: fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <v-tabs
              :vertical="!isMobile"
              active-class="active-tab black--text"
              hide-slider
              icons-and-text
            >
              <v-tab
                v-for="(tab, index) in tabItems"
                :key="`tab-item-${index}`"
                class="my-1"
              >
                <v-icon v-if="!isMobile" left>{{tab.icon}}</v-icon>
                <p class="mb-0 mt-1 subtitle-1 font-weight-medium">
                  {{tab.text}}
                </p>
                <v-icon v-if="isMobile">{{tab.icon}}</v-icon>
              </v-tab>
              <v-tab-item>
                <user-info-card/>
              </v-tab-item>
              <v-tab-item>
                <inquiry-list-card />
              </v-tab-item>
              <v-tab-item>
                <purchase-list-card/>
              </v-tab-item>
              <v-tab-item>
                <withdrawal-card/>
              </v-tab-item>
            </v-tabs>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
  -->
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <my-page-card/>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "../../components/card/MainCard";
import InquiryListCard from "../../components/card/my-page/InquiryListCard";
import UserInfoCard from "../../components/card/my-page/UserInfoCard";
import PurchaseListCard from "../../components/card/my-page/PurchaseListCard";
import WithdrawalCard from "../../components/card/my-page/WithdrawalCard";
import MyPageCard from "../../components/card/my-page/MyPageCard";
export default {
  name: "index",
  components: {MyPageCard, WithdrawalCard, PurchaseListCard, UserInfoCard, InquiryListCard, MainCard},
  data: () => ({
    header: '마이페이지',
    tabItems: [
        {
          text: '회원정보수정',
          icon: 'mdi-account'
        },
        {
          text: '1:1문의목록',
          icon: 'mdi-forum'
        },
        {
          text: '구매내역목록',
          icon: 'mdi-cart'
        },
        {
          text: '회원탈퇴',
          icon: 'mdi-delete'
        }
      ],

  }),
  computed: {
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
      }
    }
  }
}
</script>

<style scoped>
.active-tab {
  background-color: rgba(0.1, 0.1, 0.1, 0.075);
}
</style>
