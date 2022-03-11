<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <my-page-card :tab-items="tabItems" @openTabContent="openTabContent">
              <template v-slot:body>
                <edit-user-info-card
                  v-if="activeIndex === 0"
                  v-model="userInfo"
                  :header="'회원정보'"
                  :isAuthorize="isAuthorized"
                  @selfAuth="selfAuthentication"
                  @edit="editUserInfo"
                />
                <inquiry-list-card :header="'문의목록'" v-if="activeIndex === 1"/>
                <purchase-list-card :header="'구매내역'" v-if="activeIndex === 2"/>
                <withdrawal-card
                  v-if="activeIndex === 3"
                  :header="'회원탈퇴'"
                  :isAuthorize="isAuthorized"
                  @selfAuth="selfAuthentication"
                  @delete="deleteUserInfo"
                />
              </template>
            </my-page-card>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

import MainCard from "../../components/card/MainCard";
import MyPageCard from "../../components/card/my-page/MyPageCard";
import EditUserInfoCard from "../../components/card/my-page/contents/EditUserInfoCard";
import InquiryListCard from "../../components/card/my-page/contents/InquiryListCard";
import PurchaseListCard from "../../components/card/my-page/contents/PurchaseListCard";
import WithdrawalCard from "../../components/card/my-page/contents/WithdrawalCard";

export default {
  name: "index",
  components: {WithdrawalCard, PurchaseListCard, InquiryListCard, EditUserInfoCard, MyPageCard, MainCard},
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
    activeIndex: 0,
    password: '',
    showPassword: false,
    isAuthorized: false,
    userInfo: {}
  }),
  methods: {
    openTabContent(index) {
      this.activeIndex = index
    },
    async selfAuthentication(pwd) {
      if (!pwd) {
        alert("값을 입력해주십시오.")
        return;
      }
      // TODO (my-page): 임시로..
      setTimeout(() => {
        if (pwd === '123123a') {
          this.userInfo = {
            email: 'rud527@naver.com',
            name: '최연우',
            phone: '01085603465',
            password: this.password
          }
          this.isAuthorized = true;
        }
        else {
          this.isAuthorized = false
          alert("비밀번호가 올바르지 않습니다.")
        }
      }, 1000)
    },
    async editUserInfo(info) {
      //TODO (MyPage): 본인 확인 서버 통신해서
      setTimeout(() => {
        this.$router.push('/')
      }, 1000)
    },
    async deleteUserInfo(info) {
      //TODO (MyPage): 본인 확인 서버 통신해서
      setTimeout(() => {
        alert("회원탈퇴가 정상적으로 되었습니다.")
        this.$router.push('/')
      }, 1000)
    }
  }
}
</script>

<style scoped>
.active-tab {
  background-color: rgba(0.1, 0.1, 0.1, 0.075);
}
</style>
