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
                  :table-content="paymentLog"
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
  async asyncData({store, $axios}) {
    try {
      let {paymentLogs} = await $axios.$post('/user/login-email')
      let log = []
      for(let i = paymentLogs.length-1; i >= 0; i--) {
        let time = paymentLogs[i]['purchasedAt'].split("T")
        let serviceInfo = await store.dispatch('payment/readPlanByIdx', paymentLogs[i]['serviceId'])
        log.push({
          index: paymentLogs.length-i,
          price: paymentLogs[i]['price'],
          purchased_at: `${time[0]} ${time[1].split(".")[0]}`,
          serviceName: serviceInfo['name'],
          numReports: serviceInfo['numReports']
        })
      }

      let qna = await store.dispatch('qna/readAll')
      let qnaList = []
      for (let i = 0; i < qna.length; i++) {
        let item = qna[i]
        qnaList.push({
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
        inquiryData: qnaList,
        fetchError: null,
        paymentLog: log
      }
    }
    catch (err) {
      return {
        inquiryData: [],
        fetchError: err,
        paymentLog: []
      }
    }
  },
  created() {
    this.$store.commit('setSheetTitle', '마이페이지')
    if (!!this.fetchError) {
      this.$errorHandler.showMessage(this.fetchError)
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
        align: 'center'
      },
      {
        text: '요금제',
        value: 'serviceName',
        align: 'center'
      },
      {
        text: '신청금액',
        value: 'price',
        align: 'center'
      },
      {
        text: '신청일',
        value: 'purchased_at',
        align: 'center'
      },
      {
        text: '구매 보고서 수',
        value: 'numReports',
        align: 'center'
      },
    ],
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
                this.$errorHandler.showMessage(err)
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
          this.$errorHandler.showMessage(err)
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
