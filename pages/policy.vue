<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <div v-for="(data, i) in policyData" :key="`title-${i}`" class="mb-16 ml-8">
              <h3 class="my-4">{{data.title}}</h3>
              <div v-for="(subData, j) in data.subData" :key="`subtitle-${j}`" class="mt-8 ml-4">
                <h4 class="pt-4">{{subData.subTitle}}</h4>
                <div v-for="(subContent, k) in subData.data" :key="`data-${k}`" class="mt-8 ml-8">
                  <p>{{subContent.title}}</p>
                  <p v-for="(explanation, l) in subContent.explanation" :key="`explanation-3-${l}`" class="ml-4">{{explanation}}</p>
                </div>
              </div>
            </div>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "../components/card/MainCard";
export default {
  name: "policy",
  auth: false,
  components: {MainCard},
  created() {
    this.$store.commit('setSheetTitle', '개인정보 처리방침')
  },
  data: () => ({
    header: '개인정보 처리방침',
    policyData: [
      {
        title: '1. 개인정보의 수집 및 이용목적 동의',
        subData: [
          {
            subTitle: '2. 수집하는 개인정보의 항목(개인정보보호법 제15조, 제16조)',
            data: [
              {
                title: '기술가치평가분석시스템은 소관 업무의 수행을 위하여 다음과 같이 개인정보를 수집 및 이용합니다. 수집된 개인정보는 정해진 목적 이외의 용도로는 이용되지 않으며 수집 목적이 변경될 경우 사전에 알리고 동의를 받을 예정입니다.',
                explanation: [
                  '가. 홈페이지 회원 관리 및 관련 서비스 제공',
                  '나. 바다파트너스에서 운영하는 사업에 대한 홍보'
                ]
              },
            ]
          },
          {
            subTitle: '2. 수집하는 개인정보의 항목(개인정보보호법 제15조, 제16조)',
            data: [
              {
                title: '1) 요금제 회원',
                explanation: [
                  '- 필수항목 : 아이디, 비밀번호, 이메일, 이용자명, 무선전화',
                  '- 선택항목 : 없음',
                  '- 자동수집항목 : 서비스 이용시 접속 IP(Internet Protocol)주소, 접속시간',
                  '- 선택항목 : 사업장 소재지, 대표전화, 담당자 부서, 담당자 직책',
                  '- 자동수집항목 : 서비스 이용시 접속 IP(Internet Protocol)주소, 접속시간',
                ]
              },
              {
                title: '2) 부정한 방법으로 타인명의를 사용하는 경우에 대비하기 위해 정보이용내역을 자동 수집합니다.',
                explanation: []
              },
              {
                title: '3) 부정한 방법으로 타인명의 사용 시, 주민등록법 제37조(벌칙)에 의해 처벌 받을 수 있습니다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '3. 개인정보의 보유 및 이용기간(공공기록물 관리에 관한 법률 시행령 제26조)',
            data: [
              {
                title: '기술가치평가분석시스템은 회원가입 탈퇴를 신청한 경우에 한하여 지체 없이 개인정보를 파기합니다.',
                explanation: [
                  '가. 개인정보의 보유 및 이용기간 : 준영구',
                  '나. 개인 정보의 파기 : 회원가입 탈퇴 신청 접수 시 즉시 파기'
                ]
              },
            ]
          },
          {
            subTitle: '4. 동의를 거부할 권리가 있다는 사실 및 동의 거부에 따른 불이익 내용(개인정보보호법 제16조)',
            data: [
              {
                title: '회원가입 시 수집하는 필요한 최소한의 정보 외의 개인정보 수집에 동의를 거부할 권리가 있으나 최소한의 개인정보 수집동의 거부 시에는 기술가치평가분석시스템 서비스 이용이 제한됩니다.',
                explanation: []
              },
            ]
          },
        ]
      },
      {
        title: '2. 개인정보보호 기타 관련 사항 제공에 동의',
        subData: [
          {
            subTitle: '1) 개인정보의 파기 절차 및 방법',
            data: [
              {
                title: '기술가치평가분석시스템은 원칙적으로 개인정보 처리목적이 달성된 개인정보는 지체 없이 파기합니다. 다만, 다른 법령에 따라 보존하여야 하는 경우에는 그러하지 않을 수 있습니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.',
                explanation: []
              },
              {
                title: '가. 파기절차',
                explanation: [
                  '불필요한 개인정보 및 개인정보파일은 개인정보책임자의 책임 하에 내부방침 절차에 따라 다음과 같이 처리하고 있습니다.',
                  '- 개인정보의 파기',
                  '- 보유기간이 경과한 개인정보는 종료일로부터 지체 없이 파기합니다.',
                  '- 개인정보파일의 파기',
                  '개인정보파일의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보파일이 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 지체 없이 그 개인정보파일을 파기합니다.',
                ]
              },
              {
                title: '나. 파기방법',
                explanation: [
                  '1) 전자적 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.',
                  '2) 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.',
                ]
              },
            ]
          },
          {
            subTitle: '2) 이용자 및 법정대리인의 권리와 그 행사방법',
            data: [
              {
                title: '이용자 및 법정대리인의 권리와 그 행사방법에 대해서는 개인정보보호법 제 38조(권리행사의 방법 및 절차)에 의거, 다음과 같은 규정을 준수합니다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '3) 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항 기술가치평가분석시스템은 쿠키 등 인터넷 서비스 이용 시 자동 생성되는 개인정보를 수집하는 장치를 운영하지 않습니다.',
            data: [
              '가. 이용자 및 법정 대리인은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.',
              '나. 이용자 혹은 만 14세 미만 아동의 개인정보 조회 수정을 위해서는 \'개인정보변경\'(또는 \'회원정보수정\' 등)을 가입해지(동의철회)를 위해서는 "회원탈퇴"를 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.',
              '다. 귀하가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제 3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다. 기술가치평가분석시스템은 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 "기술가치평가분석시스템이 수집하는 개인정보의 보유 및 이용기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.',
            ]
          },
        ]
      }
    ]
  })
}
</script>

<style scoped>

</style>
