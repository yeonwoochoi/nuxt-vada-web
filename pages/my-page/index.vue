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
                  :header="'회원정보'"
                  @selfAuth="selfAuthentication"
                  @edit="editUserInfo"
                />
                <inquiry-list-card
                  v-if="activeIndex === 1"
                  :header="'문의목록'"
                  :inquiryList="inquiryData"
                />
                <purchase-list-card
                  v-if="activeIndex === 2"
                  :header="'구매내역'"
                  :table-header="purchaseListHeader"
                  :table-content="purchaseListContents"
                />
                <withdrawal-card
                  v-if="activeIndex === 3"
                  :header="'회원탈퇴'"
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
  asyncData({store}) {
    return store.dispatch('qna/readAll').then(
      res => {
        let result = []
        for (let i = 0; i < res.length; i++) {
          let item = res[i]
          result.push({
            id: item.id,
            isAnswered: item.answered,
            data: {
              title: item.title,
              content: item.content,
              created_at: item.updatedAt.split('T')[0],
              answer: !item.answered ? null : { data: item.answer, created_at: item.answeredAt.split('T')[0] }
            }
          })
        }
        return {
          inquiryData: result,
          fetchError: null
        }
      },
      err => {
        return {
          inquiryData: [],
          fetchError: err
        }
      }
    )
  },
  created() {
    this.$store.commit('setSheetTitle', '마이페이지')
    if (!!this.fetchError) {
      this.$notifier.showMessage({
        content: this.fetchError,
        color: 'error'
      })
    }
  },
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
    userInfo: {},
    purchaseListHeader: [
      {
        text: 'No',
        value: 'index',
        sortable: false,
        align: 'center'
      },
      {
        text: '상태',
        value: 'state',
        sortable: false,
        align: 'center'
      },
      {
        text: '결제유형',
        value: 'paymentType',
        sortable: false,
        align: 'center'
      },
      {
        text: '요금제',
        value: 'plan',
        sortable: false,
        align: 'center'
      },
      {
        text: '신청금액',
        value: 'price',
        sortable: false,
        align: 'center'
      },
      {
        text: '신청일',
        value: 'date',
        sortable: false,
        align: 'center'
      },
    ],
    // TODO (구매내역): 데이터는 서버에서 받아오기
    purchaseListContents: [
      {
        index: 1,
        state: '결제완료',
        paymentType: '신용카드',
        plan: 'Vada1',
        price: '1000 KRW',
        date: '2022/02/22'
      },
      {
        index: 2,
        state: '결제완료',
        paymentType: '신용카드',
        plan: 'Vada1',
        price: '1000 KRW',
        date: '2022/02/22'
      },
      {
        index: 3,
        state: '결제완료',
        paymentType: '신용카드',
        plan: 'Vada1',
        price: '1000 KRW',
        date: '2022/02/22'
      },
      {
        index: 4,
        state: '결제완료',
        paymentType: '신용카드',
        plan: 'Vada1',
        price: '1000 KRW',
        date: '2022/02/22'
      },
      {
        index: 5,
        state: '결제완료',
        paymentType: '신용카드',
        plan: 'Vada1',
        price: '1000 KRW',
        date: '2022/02/22'
      },
    ]
  }),
  methods: {
    openTabContent(index) {
      this.activeIndex = index
    },
    async selfAuthentication(pwd, callback = null) {
      // 관리자 회원은 접근 불가
      let roles = this.$auth.user['roles']
      if (roles.includes("ROLE_ADMIN")) {
        this.$notifier.showMessage({
          content: '관리 사이트로 이동하여 정보를 변경해주십시오.',
          color: 'error'
        })
        if (!!callback) callback(false, null);
        return
      }

      // 기업 귀속 회원도 접근 불가
      if (roles.includes("ROLE_ENTERPRISE_USER")) {
        this.$notifier.showMessage({
          content: '기업 일반 회원은 본인이 소속된 기업 관리자 회원의 1:1 문의를 통해\n 회원정보를 변경할 수 있습니다.',
          color: 'error'
        })
        if (!!callback) callback(false, null);
        return
      }
      await this.$store.dispatch('user/checkPassword', {password: pwd}).then(
        res => {
          let enterpriseId = this.$auth.user["enterprise"]["enterpriseId"]
          if (!enterpriseId) {
            this.userInfo = this.$auth.user
            if (!!callback) callback(true, this.userInfo);
          }
          else {
            this.$store.dispatch('user/getEnterpriseInfo', enterpriseId).then(
              res => {
                let enterpriseInfo = {
                  ...this.$auth.user['enterprise'],
                  organizationName: res['organizationName'],
                  organizationNumber: res['organizationNumber']
                }
                this.userInfo = this.$auth.user
                this.userInfo['enterprise'] = enterpriseInfo
                if (!!callback) callback(true, this.userInfo);
              },
              err => {
                this.userInfo = {}
                this.$notifier.showMessage({
                  content: err,
                  color: 'error'
                })
                if (!!callback) callback(false, this.userInfo);
              }
            )
          }
        },
        err => {
          this.userInfo = {}
          this.$notifier.showMessage({
            content: "비밀번호가 올바르지 않습니다.",
            color: 'error'
          })
          if (!!callback) callback(false, null);
        }
      )
    },
    async editUserInfo(info, callback) {
      await this.$store.dispatch('user/updateUser', info).then(
        res => {
          callback(true, '회원 정보가 수정되었습니다.')
        },
        err => {
          callback(false, err)
        }
      )
    },
    async deleteUserInfo() {
      await this.$store.dispatch('user/deleteUser', this.$auth.user.id).then(
        res => {
          alert('회원 탈퇴가 완료되었습니다.')
          this.$store.commit('logout')
          this.$router.push('/')
        },
        err => {
          this.$notifier.showMessage({
            content: err,
            color: 'error'
          })
        }
      )
    }
  }
}
</script>

<style scoped>
.active-tab {
  background-color: rgba(0.1, 0.1, 0.1, 0.075);
}
</style>
