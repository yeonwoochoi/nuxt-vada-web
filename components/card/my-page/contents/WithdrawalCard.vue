<template>
  <my-page-content-card :header="header">
    <template v-slot:body>
      <div v-if="!isAuthorize">
        <v-card-subtitle class="mt-6">
          <p class="font-weight-bold subtitle-1">
            본인 확인을 위해 비밀번호를 입력해 주세요.
          </p>
        </v-card-subtitle>
        <v-card-text>
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            required
            outlined
            dense
            filled
            :type="showPassword ? 'text' : 'password'"
            background-color="transparent"
            style="max-width: 400px"
            class="mb-4"
          />
          <custom-button
            :width="'200'"
            :text="`확인`"
            :loading="isLoading"
            @submit="checkPwd"
          />
        </v-card-text>
      </div>
      <div v-else>
        <v-card-subtitle class="mt-6">
          <p class="font-weight-bold title">
            회원탈퇴 주의사항
          </p>
        </v-card-subtitle>
        <v-card-text>
          <p class="pa-6 subtitle-2 text-start caution-info-card" v-html="caution" />
          <v-checkbox
            class="my-2"
            v-model="cautionAgree"
            :label="cautionAgreeLabel"
          />

          <v-dialog
            v-model="isDialogOpen"
            max-width="350"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                x-large
                class="font-weight-bold elevation-0"
                color="primary"
                width="200px"
                :loading="isLoading"
                height="52px"
                style="letter-spacing: 1px; text-transform: none;"
                v-bind="attrs"
                v-on="on"
                :disabled="!cautionAgree"
              >
                탈퇴하기
              </v-btn>
            </template>
            <confirmation-dialog
              @cancel="isDialogOpen = false"
              @ok="withdraw"
              :title="dialogHeader"
              :comment="dialogContent"
            />
          </v-dialog>
        </v-card-text>
      </div>
    </template>
  </my-page-content-card>
</template>

<script>
import CustomButton from "../../../button/CustomButton";
import MyPageContentCard from "../MyPageContentCard";
import ConfirmationDialog from "../../../dialogue/ConfirmationDialog";

export default {
  name: "WithdrawalCard",
  components: {ConfirmationDialog, MyPageContentCard, CustomButton},
  props: {
    header: {
      type: String,
      default: () => ''
    },
  },
  data: () => ({
    password: '',
    showPassword: false,
    isDialogOpen: false,
    isAuthorize: false,
    dialogHeader: '바다파트너스 탈퇴',
    dialogContent: '탈퇴 시, 바다 파트너스의 모든 데이터는 삭제됩니다. \n정말로 탈퇴하시겠습니까?',
    caution: '<h1>개인정보 처리방침</h1>\n' +
      '<p class="title font-weight-bold">1. 개인정보의 수집 및 이용목적 동의</p>' +
      '<p class="subtitle-1 font-weight-bold">1. 개인정보의 수집 및 이용 목적(개인정보보호법 제15조)</p>' +
      '기술가치평가분석시스템은 소관 업무의 수행을 위하여 다음과 같이 개인정보를 수집 및 이용합니다. 수집된 개인정보는 정해진 목적 이외의 용도로는 이용되지 않으며 수집 목적이 변경될 경우 사전에 알리고 동의를 받을 예정입니다.\n' +
      '\n' +
      '가. 홈페이지 회원 관리 및 관련 서비스 제공\n' +
      '\n' +
      '나. 바다파트너스에서 운영하는 사업에 대한 홍보\n' +
      '\n' +
      '<p class="subtitle-1 font-weight-bold">2. 수집하는 개인정보의 항목(개인정보보호법 제15조, 제16조)</p>' +
      '요금제 회원\n' +
      '\n' +
      '필수항목 : 아이디, 비밀번호, 이메일, 이용자명, 무선전화\n' +
      '\n' +
      '선택항목 : 없음\n' +
      '\n' +
      '자동수집항목 : 서비스 이용시 접속 IP(Internet Protocol)주소, 접속시간\n' +
      '\n' +
      '선택항목 : 사업장 소재지, 대표전화, 담당자 부서, 담당자 직책\n' +
      '\n' +
      '자동수집항목 : 서비스 이용시 접속 IP(Internet Protocol)주소, 접속시간\n' +
      '\n' +
      '- 부정한 방법으로 타인명의를 사용하는 경우에 대비하기 위해 정보이용내역을 자동 수집합니다.\n' +
      '\n' +
      '※ 부정한 방법으로 타인명의 사용 시, 주민등록법 제37조(벌칙)에 의해 처벌 받을 수 있습니다.\n' +
      '\n' +
      '<p class="subtitle-1 font-weight-bold">3. 개인정보의 보유 및 이용기간(공공기록물 관리에 관한 법률 시행령 제26조)</p>' +
      '기술가치평가분석시스템은 회원가입 탈퇴를 신청한 경우에 한하여 지체 없이 개인정보를 파기합니다.\n' +
      '\n' +
      '가. 개인정보의 보유 및 이용기간 : 준영구\n' +
      '\n' +
      '나. 개인 정보의 파기 : 회원가입 탈퇴 신청 접수 시 즉시 파기\n' +
      '\n' +
      '<p class="subtitle-1 font-weight-bold">4. 동의를 거부할 권리가 있다는 사실 및 동의 거부에 따른 불이익 내용(개인정보보호법 제16조)</p>' +
      '회원가입 시 수집하는 필요한 최소한의 정보 외의 개인정보 수집에 동의를 거부할 권리가 있으나 최소한의 개인정보 수집동의 거부 시에는 기술가치평가분석시스템 서비스 이용이 제한됩니다.\n' +
      '\n' +
      '<p class="title font-weight-bold">2. 개인정보의 제공에 동의</p>' +
      '<p class="subtitle-1 font-weight-bold">1. 개인정보 제공</p>' +
      '기술가치평가분석시스템이 보유하고 있는 개인정보는 이용 및 제공에 엄격한 제한이 있는 정보입니다. 개인정보보호법 제 17조(개인정보의 제공)에 의거, 기술가치평가분석시스템은 회원에 대하여 보다 더 질 높은 서비스 제공 및 상급기관의 관리감독 등을 위해 아래와 같이 귀하의 개인정보를 제공하고 있습니다.\n' +
      '\n' +
      '제공대상 : 특허청\n' +
      '\n' +
      '제공 개인정보 항목 : 수집하는 개인정보 항목\n' +
      '\n' +
      '제공정보의 이용 목적 : 홈페이지 회원의 현황 파악\n' +
      '\n' +
      '또한, 개인정보보호법 제 18조(개인정보의 이용ㆍ제공 제한)는 이에 관하여 다음과 같이 규정하고 있습니다.\n' +
      '\n' +
      'a. 정보주체로부터 별도의 동의를 받은 경우\n' +
      '\n' +
      'b. 다른 법률에 특별한 규정이 있는 경우\n' +
      '\n' +
      'c. 정보주체 또는 그 법정대리인이 의사표시를 할 수 없는 상태에 있거나 주소불명 등으로 사전 동의를 받을 수 없는 경우로서 명백히 정보주체 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우\n' +
      '\n' +
      'd. 통계작성 및 학술연구 등의 목적을 위하여 필요한 경우로서 특정 개인을 알아볼 수 없는 형태로 개인정보를 제공하는 경우\n' +
      '\n' +
      'e. 개인정보를 목적 외의 용도로 이용하거나 이를 제3자에게 제공하지 아니하면 다른 법률에서 정하는 소관 업무를 수행할 수 없는 경우로서 보호위원회의 심의·의결을 거친 경우\n' +
      '\n' +
      'f. 조약, 그 밖의 국제협정의 이행을 위하여 외국정부 또는 국제기구에 제공하기 위하여 필요한 경우\n' +
      '\n' +
      'g. 범죄의 수사와 공소의 제기 및 유지를 위하여 필요한 경우\n' +
      '\n' +
      'h. 법원의 재판업무 수행을 위하여 필요한 경우\n' +
      '\n' +
      'i. 형(刑) 및 감호, 보호처분의 집행을 위하여 필요한 경우\n' +
      '\n' +
      '<p class="subtitle-1 font-weight-bold">2. 수집한 개인정보의 위탁</p>' +
      '우리 홈페이지는 원활한 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.\n' +
      '\n' +
      '가. 수탁업체 : ㈜지에이시스템\n' +
      '\n' +
      '나. 위탁항목 : 수집하는 개인정보 항목\n' +
      '\n' +
      '다. 위탁업무내용(목적) : 특허 분석 및 평가 정보 서비스 제공\n' +
      '\n' +
      '라. 보유 및 이용기간 : 위탁계약 종료 시까지\n' +
      '\n' +
      '<p class="subtitle-1 font-weight-bold">3. 개인정보보호 기타 관련 사항 제공에 동의</p>' +
      '1. 개인정보의 파기 절차 및 방법\n' +
      '\n' +
      '기술가치평가분석시스템은 원칙적으로 개인정보 처리목적이 달성된 개인정보는 지체 없이 파기합니다. 다만, 다른 법령에 따라 보존하여야 하는 경우에는 그러하지 않을 수 있습니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.\n' +
      '\n' +
      '가. 파기절차\n' +
      '\n' +
      '불필요한 개인정보 및 개인정보파일은 개인정보책임자의 책임 하에 내부방침 절차에 따라 다음과 같이 처리하고 있습니다.\n' +
      '\n' +
      '개인정보의 파기\n' +
      '\n' +
      '보유기간이 경과한 개인정보는 종료일로부터 지체 없이 파기합니다.\n' +
      '\n' +
      '개인정보파일의 파기\n' +
      '\n' +
      '개인정보파일의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보파일이 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 지체 없이 그 개인정보파일을 파기합니다.\n' +
      '\n' +
      '나. 파기방법\n' +
      '\n' +
      '1) 전자적 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.\n' +
      '\n' +
      '2) 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.\n' +
      '\n' +
      '2. 이용자 및 법정대리인의 권리와 그 행사방법\n' +
      '\n' +
      '이용자 및 법정대리인의 권리와 그 행사방법에 대해서는 개인정보보호법 제 38조(권리행사의 방법 및 절차)에 의거, 다음과 같은 규정을 준수합니다.\n' +
      '\n' +
      'a. 이용자 및 법정 대리인은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.\n' +
      '\n' +
      'b. 이용자 혹은 만 14세 미만 아동의 개인정보 조회 수정을 위해서는 \'개인정보변경\'(또는 \'회원정보수정\' 등)을 가입해지(동의철회)를 위해서는 "회원탈퇴"를 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.\n' +
      '\n' +
      'c. 귀하가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제 3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다. 기술가치평가분석시스템은 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 "기술가치평가분석시스템이 수집하는 개인정보의 보유 및 이용기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.\n' +
      '\n' +
      '3. 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항 기술가치평가분석시스템은 쿠키 등 인터넷 서비스 이용 시 자동 생성되는 개인정보를 수집하는 장치를 운영하지 않습니다.\n' +
      '\n',
    cautionAgree: false,
    cautionAgreeLabel: '위의 회원탈퇴 시 주의사항을 모두 확인하였습니다.',
    isLoading: false,
  }),
  methods: {
    async checkPwd() {
      if (!this.password) {
        this.$notifier.showMessage({
          content: '값을 입력해주세요.',
          color: 'error'
        })
        return
      }
      this.isLoading = true;
      await this.$emit('selfAuth', this.password, (success) => {
        this.isAuthorize = success;
        this.isLoading = false;
      })
    },
    withdraw() {
      this.$emit('delete')
    }
  }
}
</script>

<style scoped>
.caution-info-card {
  border: 1px solid rgba(0, 0, 0, 0.25);
  height: 500px;
  width: 100%;
  overflow-y: scroll;
  white-space: pre-wrap;
}
</style>
