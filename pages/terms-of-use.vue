<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <h2 class="my-4">1. 이용약관, 개인정보 수집 및 이용, 개인정보 제공, 개인정보보호 기타 관련 사항에 모두 동의합니다.</h2>
            <div v-for="(data, i) in termsOfUserData1" :key="`title-1-${i}`" class="my-8 ml-4">
              <h3 class="pt-4 pb-0 ml-4">{{data.title}}</h3>
              <div v-for="(content, j) in data.content" :key="`subtitle-1-${j}`" class="mt-8 ml-4">
                <h4 class="ml-4 py-2">{{content.subTitle}}</h4>
                <div v-for="(subContent, k) in content.data" :key="`data-1-${k}`" class="mt-8 ml-8">
                  <p>{{subContent.title}}</p>
                  <div v-if="subContent.explanation.length > 0" class="ml-4">
                    <p v-for="(explanation, l) in subContent.explanation" :key="`explanation-1-${l}`">{{explanation}}</p>
                  </div>
                </div>
              </div>
            </div>
            <p class="ml-16">시행일: 본 약관은 <span class="subtitle-1 font-weight-bold">2020년 12월 31일</span>부터 시행된다.</p>
            <h2 class="mb-4 mt-16">2. 개인정보의 수집 및 이용목적 동의</h2>
            <div v-for="(data, i) in termsOfUserData2" :key="`title-2-${i}`" class="my-8 ml-4">
              <h3 class="my-4 ml-4">{{data.title}}</h3>
              <div v-for="(content, j) in data.content" :key="`subtitle-2-${j}`" class="mt-8 ml-4">
                <h4 class="ml-4 pt-4">{{content.subTitle}}</h4>
                <div v-for="(subContent, k) in content.data" :key="`data-2-${k}`" class="mt-8 ml-8">
                  <p>{{subContent.title}}</p>
                  <div v-if="subContent.explanation.length > 0" class="ml-4">
                    <p v-for="(explanation, l) in subContent.explanation" :key="`explanation-2-${l}`">{{explanation}}</p>
                  </div>
                </div>
              </div>
            </div>
            <h2 class="mb-4 mt-16">3. 개인정보보호 기타 관련 사항 제공에 동의</h2>
            <div v-for="(data, i) in termsOfUserData3" :key="`title-3-${i}`" class="my-8 ml-4">
              <h3 class="py-4 ml-4">{{data.title}}</h3>
              <div v-for="(content, j) in data.content" :key="`subtitle-3-${j}`" class="mt-8 ml-4">
                <h4 class="ml-4 pt-4">{{content.subTitle}}</h4>
                <div v-for="(subContent, k) in content.data" :key="`data-3-${k}`" class="mt-8 ml-8">
                  <p>{{subContent.title}}</p>
                  <div v-if="subContent.explanation.length > 0" class="ml-4">
                    <p v-for="(explanation, l) in subContent.explanation" :key="`explanation-3-${l}`">{{explanation}}</p>
                  </div>
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
  name: "terms-of-use",
  auth: false,
  components: {MainCard},
  created() {
    this.$store.commit('setSheetTitle', '이용약관')
  },
  data: () => ({
    header: '이용약관',
    termsOfUserData1: [
      {
        title: '제 1 장 총 칙',
        content: [
          {
            subTitle: '제 1 조 (목 적)',
            data: [
              {
                title: '본 약관은 바다파트너스가 제공하는 기술가치평가시스템 (이하 “가치평가시스템”이라 한다) 이용에 관한 제반 절차 및 바다파트너스와 서비스 이용자 (이하“이용자”라 한다)의 권리, 의무 및 책임사항을 규정함을 목적으로 한다.',
                explanation: []
              }
            ]
          },
          {
            subTitle: '제 2 조 (정 의)',
            data: [
              {
                title: '① 이 약관에서 이용하는 용어의 정의는 다음과 같다.',
                explanation: [
                  '- “이용자”란 이 약관에 따라 바다파트너스에서 제공하는 서비스를 받는 회원 및 비회원을 말한다.',
                  '- “회원”이라 함은 바다파트너스에 개인정보를 제공하여 회원등록을 한 자로 유료회원 및 무료회원을 말한다.',
                  '- “유료회원”이란 공지된 비용(이하 “이용요금”이라 한다)을 지불하고 바다파트너스의 서비스를 이용하는 자를 말하며, 특별한 경우가 아닌 경우 아래 약관 내용에서 회원이라 함은 유료회원을 지칭한다.',
                  '- “무료회원”이란 바다파트너스에 개인정보를 제공하여 회원등록을 한 자로 이용요금의 지불없이 바다파트너스가 허여한 제한된 서비스 범위내에서 이용하는 자를 말한다. 다만, 무료회원에 대한 서비스의 제공 여부는 바다파트너스가 정하는 운영정책에 따른다.',
                  '- “이용자ID(이하“ID”라 한다)”라 함은 회원의 식별 및 서비스 이용을 위하여 회원이 선정하고 바다파트너스가 부여하는 고유한 문자와 숫자의 조합을 말한다.',
                  '- “비밀번호”라 함은 ID로 식별되는 회원의 본인 여부를 검증하기 위하여 회원이 설정하여 바다파트너스에 등록한 고유의 문자와 숫자의 조합을 말한다.'
                ]
              },
              {
                title: '② 이 약관에서 이용하는 용어 중 제 ①항에서 정하지 아니한 것은 관계법령 및 서비스별 안내에서 정하는 바에 따르며, 그 외에는 일반 관례에 따른다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '제 3 조 (약관의 개정)',
            data: [
              {
                title: '① 바다파트너스는 약관을 개정할 경우 개정내용에 대해서 그 내용을 서비스 화면에 게시하거나, 또는 회원이 제공한 전자우편 주소를 이용하여 그 사실을 적용일자 7일전에 알려야 한다. 다만, 서비스 사이트에 게시된 개정 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있다.',
                explanation: []
              },
              {
                title: '② 회원은 정기적으로 바다파트너스에서 제공하는 서비스에 접속하여 약관의 변경사항을 확인하여야 한다. 다만, 회원이 등록한 전자우편 주소의 부정확성, 서비스 미 방문 등의 사유로 인해 변경된 약관에 대한 정보를 알지 못해 발생하는 회원의 피해는 바다파트너스에서 책임지지 않는다.',
                explanation: []
              },
              {
                title: '③ 회원은 변경된 약관에 동의하지 않을 경우 회원 해지를 요청할 수 있으며, 변경된 약관의 효력발생일로부터 7일 이후에도 서비스를 계속 이용할 경우 약관의 변경 사항에 동의한 것으로 간주한다.',
                explanation: []
              },
              {
                title: '④ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 관련법령 및 일반적인 전자상거래 관행에 따른다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '제 4 조 (약관 외 준칙)',
            data: [
              {
                title: '바다파트너스는 필요한 경우 이용자와 별도 계약을 맺을 수 있으며, 본 약관과 별도 계약의 내용이 상충하는 경우에는 별도 계약의 내용을 우선하여 적용한다.',
                explanation: []
              }
            ]
          },
        ]
      },
      {
        title: '제 2 장 이용계약 체결',
        content: [
          {
            subTitle: '제 5 조 (이용계약의 성립)',
            data: [
              {
                title: '① 이용계약은 이용자의 이용계약 내용에 대한 동의와 이용신청에 대하여 바다파트너스가 승낙함으로써 성립한다.',
                explanation: []
              },
              {
                title: '② 이용계약의 성립은 이용요금이 바다파트너스에 결제 완료된 시점으로 한다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '제 6 조 (회원가입 및 이용신청)',
            data: [
              {
                title: '① 서비스를 이용하고자 하는 자는 이 약관에 대한 동의표시 및 바다파트너스가 요청하는 제반정보에 대해 회원가입 양식에 따라 개인정보 또는 기업정보를 제공하여야 한다. 단, 바다파트너스가 전화 또는 전자우편 주소 등을 통해서 이용신청이 가능하도록 한 경우에는 이를 통해서 이용 신청을 할 수 있다.',
                explanation: []
              },
              {
                title: '② 회원 가입은 반드시 실명으로만 가입할 수 있으며, 바다파트너스는 실명확인조치를 할 수 있다. 회원은 바다파트너스의 확인조치에 대해서 적극 협력하여야 하며, 만일 이를 준수하지 아니할 경우 바다파트너스는 회원이 등록한 정보가 부정한 것으로 처리할 수 있다.',
                explanation: []
              },
              {
                title: '③ 회원의 진정한 정보를 등록하지 않은 회원은 서비스 이용과 관련하여 아무런 권리를 주장할 수 없으며, 타인의 명의를 도용하여 이용신청을 한 경우 회원의 모든 정보는 삭제되며, 관계법령에 따라 처벌을 받을 수 있다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '제 7 조 (이용신청의 승낙과 제한)',
            data: [
              {
                title: '① 바다파트너스는 제5조, 제6조의 이용신청 절차에 위배되지 않고 업무수행상 또는 기술상 지장이 없는 경우 이용신청에 대해 이용요금의 입금이 확인된 후 서비스 이용을 승낙한다. 이용계약의 성립은 이용요금이 바다파트너스에 결제 완료된 시점으로 한다.',
                explanation: []
              },
              {
                title: '② 바다파트너스는 아래사항에 해당하는 이용신청에 대하여는 해당 사유가 해소될 때까지 그 승낙을 유보 및 보류할 수 있다.',
                explanation: [
                  '- 회원의 진정한 정보를 제공하지 아니한 이용신청의 경우',
                  '- 바다파트너스가 제공하는 서비스와 경쟁관계에 있는 이용자가 신청하는 경우',
                  '- 회원이 바다파트너스에 납부할 이용요금, 가산금 또는 불법 면탈요금을 체불하고 있는 경우',
                  '- 바다파트너스의 약관을 위반하여 이용계약이 해지된 적이 있는 이용자가 신청하는 경우',
                  '- 부정한 용도로 본 서비스를 이용하고자 하는 경우',
                  '- 바다파트너스의 기술상 지장이 있는 경우',
                  '- 바다파트너스가 설비의 여유가 없는 경우',
                  '- 기타 바다파트너스의 귀책사유로 이용승낙이 곤란한 경우',
                ]
              },
            ]
          },
        ]
      },
      {
        title: '제 3 장 계약 당사자의 의무 및 협력',
        content: [
          {
            subTitle: '제 8 조(바다파트너스의 의무)',
            data: [
              {
                title: '① 바다파트너스는 관련법규와 이 약관이 금지하는 어떠한 행위도 하지 아니하며, 이 약관이 정하는 바에 따라 지속적이고, 안정적인 서비스를 제공하는데 최선을 다한다.',
                explanation: []
              },
              {
                title: '② 바다파트너스는 이용자가 안전하게 가치평가시스템을 이용할 수 있도록 이용자의 개인정보 및 관리를 위한 필요한 조치를 취하여야 한다.',
                explanation: []
              },
              {
                title: '③ 바다파트너스는 이용자의 개인신상정보를 본인의 승낙 없이 타인에게 누설, 배포하여서는 안된다.',
                explanation: []
              },
              {
                title: '④ 바다파트너스는 계속적이고 안정적인 서비스의 제공을 위하여 설비에 장애가 생기거나 멸실된 때에는 부득이한 사유가 없는 한 지체없이 이를 수리 또는 복구한다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '제 9 조(회원의 의무)',
            data: [
              {
                title: '① 회원은 이 약관에서 규정하는 모든 사항과 서비스 이용안내 및 주의사항을 준수하여야 한다.',
                explanation: []
              },
              {
                title: '② 회원은 자신의 ID와 비밀번호를 관리할 의무를 가지고, 회원의 ID와 비밀번호를 이용하여 발생하는 모든 결과에 대한 책임은 전적으로 회원에게 있다.',
                explanation: []
              },
              {
                title: '③ 회원은 주소, 전화번호, 전자우편 주소 등 인적 사항이 변경된 경우에는 즉시 바다파트너스에 고지할 책임을 지며, 이에 대한 변경 절차를 진행하지 아니하여 발생한 문제에 대하여는 바다파트너스가 책임을 지지 않는다.',
                explanation: []
              },
              {
                title: '④ 회원은 제공되는 서비스를 이용함으로써 발생하는 이용요금에 대해 납부할 책임을 진다.',
                explanation: []
              },
              {
                title: '⑤ 회원은 바다파트너스에 사전 통보 없이 임의로 제3자에게 유료서비스에 대해 양도 및 증여를 할 수 없으며, 어떤 질권의 목적으로도 이용할 수 없다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '제 10 조(협력사항)',
            data: [
              {
                title: '① 회원은 서비스 활용 및 조기안정화를 위해 바다파트너스의 요구에 따라 의견을 제시할 수 있다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '제 11 조 (개인정보보호 및 보안유지)',
            data: [
              {
                title: '① 바다파트너스에 제공된 회원의 개인정보는 바다파트너스가 회원의 동의 없이 목적 외의 이용이나 제3자에게 제공할 수 없으며, 이에 대한 모든 책임은 바다파트너스가 진다. 다만, 아래의 경우에는 예외로 한다.',
                explanation: [
                  '- 전기통신기본법 등 법률의 규정에 의해 국가기관의 요구가 있는 경우',
                  '- 범죄에 대한 수사상의 목적이 있거나 정보 통신 윤리위원회의 요청이 있는 경우',
                  '- 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우',
                ]
              },
              {
                title: '② 회원은 언제든지 바다파트너스가 가지고 있는 자신의 개인정보에 대해 열람 및 오류정정을 요구할 수 있으며 바다파트너스는 이에 대해 지체 없이 필요한 조치를 취할 의무를 진다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '제 12 조 (비밀유지)',
            data: [
              {
                title: '① 바다파트너스와 회원은 본 시스템 이용과 관련하여 취득한 상대방의 업무상 비밀에 대하여 상대방의 사전 서면 동의 없이 제3자에게 유출하거나 타목적에 이용하여서는 안된다.',
                explanation: []
              },
              {
                title: '② 이용자는 시스템으로 얻어진 모든 정보에 대해서 타인에게 바다파트너스의 사전승낙 없이 복제, 전송, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안된다.',
                explanation: []
              },
              {
                title: '③ 이용자는 시스템 이용 과정에서 취득한 모든 기밀사항을 타인에게 일체 누설할 수 없으며, 공공기관의 기록물 관리에 관한 법률, 동법 시행령 및 시행규칙, 보안업무규정을 준수하고, 바다파트너스가 요구하는 사항과 절차를 철저히 준수하여야 한다.',
                explanation: []
              },
              {
                title: '④ 이용자는 시스템 이용 도중이나 이행 후에도 보안유지에 노력하여야 하며, 보안에 관한 사항을 누설 또는 취급소홀로 인하여 중대한 상황이 발생하였거나 발생할 우려가 있다고 인정될 때에는 바다파트너스는 본 이용약관을 해지할 수 있으며, 이용자는 어떠한 조치라도 감수해야 한다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '제 13 조 (공지 및 통지)',
            data: [
              {
                title: '① 바다파트너스는 회원에 대한 공지 및 통지를 하는 경우, 바다파트너스가 제공하는 메인 서비스에 게시하거나, 회원이 기재한 전자우편 주소로 그 내용을 통지할 수 있다. 단, 허위로 기재된 전자우편 주소로 인해 발생하는 불이익에 대한 책임은 전적으로 회원에게 있으며, 서비스 사이트에 게시되는 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있다.',
                explanation: []
              },
              {
                title: '② 바다파트너스는 불특정다수 회원에 대한 공지 및 통지를 할 경우 5일 이상 사이트에 공지하거나 또는 게시판을 통해 공지함으로써 고객에게 개별 통지한 것으로 갈음할 수 있다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '제 14 조 (회원의 지위승계)',
            data: [
              {
                title: '① 아래의 항목에 해당하는 사유가 발생한 때에는 회원의 지위를 승계한다.',
                explanation: [
                  '- 회원의 사망으로 그 지위를 상속받은 때',
                  '- 법인이 다른 법인을 흡수 합병하여 존속하는 법인이 그 이용권을 인수한 때',
                  '- 2인 이상의 법인이 하나의 법인으로 신설 합병하여 새로운 법인이 그 이용권을 인수한 때',
                  '- 하나의 법인이 2 이상의 법인으로 분할하는 경우로서 그 분할된 법인 중 하나의 법인이 그 이용권을 인수한 때',
                  '- 그 외 위에 열거된 항목과 유사한 사유가 발생하여 바다파트너스가 필요하다고 인정한 때',
                ]
              },
              {
                title: '② 위 제①항의 규정에 의하여 회원의 지위를 승계한 자는 아래의 항목에 해당하는 사항을 바다파트너스에 통보하여야 한다.',
                explanation: [
                  '- 회원의 모든 변경정보',
                  '- 이용요금고지주소가 변경되는 경우에는 그 변경되는 이용요금고지주소',
                  '- 이용요금납입책임자가 변경되는 경우에는 그 변경되는 이용요금납입책임자',
                ]
              },
            ]
          },
        ]
      },
      {
        title: '제 4 장 서비스의 이용',
        content: [
          {
            subTitle: '제 15 조 (서비스 이용 범위 및 그 제한)',
            data: [
              {
                title: '① 가치평가시스템은 특허평가, 특허평가보고서, 특허평가요약보고서 등의 서비스를 제공하며, 이용자는 본 시스템을 활용하여 아래와 같은 목적 범위 내에서 이용할 수 있다.',
                explanation: [
                  '- 기술가치평가를 통한 등록 특허의 유지･포기 등의 특허관리 의사결정 지원',
                  '- 기업 내부 자체 특허 평가 검증 활용 등',
                  '- 이용자는 위와 같은 내부 자체 의사결정에 이용할 수 있으나, 가치평가시스템을 통해 얻어진 정보를 외부에 공표하는 등의 행위에 일체 이용할 수 없다.',
                ]
              },
              {
                title: '② 이용자가 제①항의 서비스 범위를 벗어나 서비스 결과물을 임의로 이용하고자 하는 경우, 반드시 바다파트너스의 사전 동의를 받아야 하며 그렇지 않은 경우 시스템 이용이 제한될 수 있다.',
                explanation: []
              },
              {
                title: '③ 이용자가 바다파트너스의 동의 없이 제①항의 서비스 범위를 넘어 서비스 결과물을 임의로 이용하여 문제가 발생하는 경우, 그 모든 책임은 이용자에게 있다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '제 16 조 (서비스 이용시간 및 이용책임)',
            data: [
              {
                title: '① 서비스 이용은 바다파트너스의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간 운영을 원칙으로 한다. 단, 바다파트너스는 가치평가시스템 정기점검, 증설 및 교체를 위해 바다파트너스가 정한 날이나 시간에 서비스를 일시 중단할 수 있으며, 예정되어 있는 작업으로 인한 서비스 일시 중단은 사이트를 통해 사전에 공지한다.',
                explanation: []
              },
              {
                title: '② 바다파트너스는 긴급한 가치평가시스템 점검, 증설 및 교체, 설비의 장애, 서비스 이용의 폭주, 국가비상사태, 정전 등 부득이한 사유가 발생한 경우 사전 예고 없이 일시적으로 서비스의 전부 또는 일부를 중단할 수 있다.',
                explanation: []
              },
              {
                title: '③ 바다파트너스는 서비스 개편 등 서비스 운영상 필요한 경우 회원에게 사전 예고 후 서비스의 전부 또는 일부의 제공을 중단할 수 있다.',
                explanation: []
              },
              {
                title: '④ 바다파트너스는 위 제①항, 제②항, 제③항의 사유로 서비스의 제공이 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상하지 아니한다. 단, 바다파트너스에 고의 또는 중과실이 있는 경우에는 그러하지 아니한다.',
                explanation: []
              },
              {
                title: '⑤ 이용자가 서비스 이용요금 및 제공되는 서비스의 내용 안내에 대해 충분한 숙지 없이 서비스 자료를 취사, 선택, 이용하여 발생되는 손해에 대해서는 이용자의 자기책임으로 한다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '제 17 조 (이용요금 및 요금의 납입방법 등)',
            data: [
              {
                title: '① 바다파트너스에서 제공하는 서비스 중 사이트상에 고지된 금액은 그 고지된 금액을 확정금액으로 한다.',
                explanation: []
              },
              {
                title: '② 바다파트너스가 제공하는 서비스에 대한 대금지급방법은 아래 항목 중에서 하나로 할 수 있다.',
                explanation: [
                  '- 전자결제를 통한 신용카드결제',
                  '- 전자결제를 통한 계좌이체결제'
                ]
              },
              {
                title: '③ 이용요금 납입책임자는 서비스 이용가입자를 원칙으로 한다. 다만, 바다파트너스가 인정하는 경우에는 타인을 이용요금 납입책임자로 할 수 있다.',
                explanation: []
              },
              {
                title: '④ 위 제③항의 규정에 의한 이용요금 납입책임자는 이용자가 바다파트너스에 대하여 부담하는 서비스 이용요금 등 약관에 따른 모든 채무를 이용자와 연대하여 바다파트너스에 납입하여야 한다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '제 18 조 (1년 무제한 요금제 이용기간 및 연장)',
            data: [
              {
                title: '① 1년 무제한 요금제의 이용 기간은 계약 체결일로부터 12개월로 한다.',
                explanation: []
              },
              {
                title: '② 이용기간 만료일 1개월 이내 상호 별도의 서면 의사표시를 하여 바다파트너스가 이용요금의 납입을 확인 후 연간회원의 이용기간 연장을 승인할 수 있다.',
                explanation: []
              },
            ]
          },
        ]
      },
      {
        title: '제 5 장 계약해지 및 청약철회',
        content: [
          {
            subTitle: '제 19 조 (회원탈퇴 및 자격상실)',
            data: [
              {
                title: '① 제5조, 제6조에 의해 회원 가입한 회원은 바다파트너스에 언제든지 서비스의 해지 및 회원탈퇴를 요청할 수 있으며, 바다파트너스는 요청을 접수한 후 즉시 이를 처리하여야 한다.',
                explanation: []
              },
              {
                title: '② 바다파트너스는 서비스의 이용이 승낙된 이후 제7조 제②항에 해당하는 사유가 발견된 경우 회원 자격을 정지하고 이용계약을 철회할 수 있다.',
                explanation: []
              },
            ],
          },
          {
            subTitle: '제 20 조 (이용계약의 해지 등)',
            data: [
              {
                title: '① 회원이 서비스 이용계약을 해지하고자 하는 때에는 회원 본인이 서비스 내의 회원탈퇴메뉴를 이용해 가입 해지를 해야 한다. 다만, 부득이한 경우 바다파트너스의 고객센터를 통해 전화로 해지 신청을 할 수 있으며, 이때 회원은 바다파트너스가 서비스의 이용자 본인임을 확인하는 절차에 적극 협조하여야 한다.',
                explanation: []
              },
              {
                title: '② 회원이 서비스의 해지를 신청하면 바다파트너스는 이용요금을 정산하여 15일 이내로 예치금 잔액을 환불하여야 한다.',
                explanation: []
              },
              {
                title: '③ 회원의 해지로 인하여 이전의 모든 회원정보는 추후 재가입 시에도 복구가 불가능하며, 바다파트너스는 해지와 관련된 손해배상의 책임을 지지 않는다. 다만, 서비스 운영정책에서 정한 일정 기간 내에 재가입이 이루어져 회원정보의 복구가 유효한 경우에는 회원의 요청에 따라 복구를 지원한다.',
                explanation: []
              },
              {
                title: '④ 바다파트너스는 아래의 항목에 해당하는 사유가 발생했을 때 일정기간 또는 조건을 정하여 서비스 제공을 중지할 수 있으며, 중지기간 내 중지사유를 해소하지 아니하면 중지기간 종료 후 해당 회원의 서비스를 해지한다. 다만, 중지기간 내에 중지사유를 해소하면 서비스를 재개한다.',
                explanation: [
                  '- 예치금의 잔액이 운영정책에서 정한 허용 범위를 초과한 경우',
                  '- 바다파트너스가 제공하는 서비스의 시스템에 위해를 가할 우려가 있는 경우',
                  '- 이 약관에 언급된 이용자의 의무 규정을 위반한 경우',
                  '- 서비스 이용 기간 중 제7조 제②항의 사유가 적발된 경우',
                ]
              },
              {
                title: '⑤ 바다파트너스는 제7조 제②항, 제16조 또는 본조제④항의 사유 중에서 중대한 위반 사유에 해당하는 대해서는 통지 없이 즉시 서비스를 중지하거나, 해지 등의 조치를 취할 수 있다.',
                explanation: []
              },
              {
                title: '⑥ 바다파트너스는 해지된 이용자에 대하여는 운영정책에서 정하는 일정기간 동안 가입을 제한할 수 있다.',
                explanation: []
              },
            ],
          },
          {
            subTitle: '제 21 조 (청약철회 및 환불)',
            data: [
              {
                title: '① 바다파트너스는 서비스의 제공을 할 수 없을 때와 이용요금의 과오납이 있을 때에는 과오납분에 대해서는 서비스의 이용요금을 받은 날로부터 7일 이내에 환불 등의 필요한 조치를 취하고 그 사유를 통지하여야 한다. 다만, 정상적인 업무처리가 이루어진 경우 바다파트너스는 이용요금의 환불에 대한 책임을 지지 아니한다.',
                explanation: []
              },
              {
                title: '② 이용자가 바다파트너스의 서비스 이용을 위해 가입 후 예치금 결제를 하여 계약이 성립되었다 하더라도 결제 후 해당 서비스의 계약을 철회하고 예치금 환불을 요청할 수 있다.',
                explanation: []
              },
              {
                title: '③ 이용자의 환불요청이 있는 경우 바다파트너스는 서비스 이용요금 정산 후 예치금 잔액을 환불한다.',
                explanation: []
              },
            ],
          },
          {
            subTitle: '제 22 조 (불법면탈요금 등의 징수)',
            data: [
              {
                title: '이용요금 등을 불법으로 면탈한 자에 대해서는 면탈한 금액의 2배에 해당하는 액을 징수한다.',
                explanation: []
              },
            ],
          },
          {
            subTitle: '제 23 조 (약관의 해지)',
            data: [
              {
                title: '① 바다파트너스와 이용자는 상대방이 특별한 사유 없이 본 협약에서 규정한 제반 협력 및 의무를 다하지 아니했을 경우 본 약관을 해지할 수 있다.',
                explanation: []
              },
              {
                title: '② 바다파트너스 또는 이용자가 부도, 파산, 해산된 경우 상대방은 본 협약을 해지할 수 있다.',
                explanation: []
              },
              {
                title: '③ 바다파트너스와 이용자는 상호 합의에 의하여 본 협약을 해지할 수 있다.',
                explanation: []
              },
            ],
          },
        ],
      },
      {
        title: '제 6 장 손해배상 및 기타사항',
        content: [
          {
            subTitle: '제 24 조 (손해배상)',
            data: [
              {
                title: '① 바다파트너스의 과실에 의해 회원이 손해를 입은 경우 바다파트너스는 이용요금(손해를 입은 이용요금에 한한다)의 3배 이내에서 보상하여야 할 책임이 있다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '제 25 조 (면책조항)',
            data: [
              {
                title: '① 바다파트너스는 천재지변 및 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 대한 책임을 지지 않는다.',
                explanation: []
              },
              {
                title: '② 바다파트너스는 회원의 귀책사유로 인한 서비스 이용의 장애 또는 손해에 대하여 책임을 지지 않는다.',
                explanation: []
              },
              {
                title: '③ 바다파트너스는 회원이 서비스를 이용함에 있어 회원이 소유한 단말기의 이상으로 인해 서비스의 제공을 받지 못했거나, 기간통신 사업자 등 전기통신사업자가 전기통신 서비스를 중지하거나 정상적으로 제공하지 아니하여 회원이 손해 및 불이익을 당한 경우에는 책임이 면제된다.',
                explanation: []
              },
              {
                title: '④ 바다파트너스는 이용자의 단말기 오류에 의해 손해가 발생한 경우, 또는 회원이 신상정보 및 전자우편 주소를 부실하게 제공하여 손해가 발생한 경우 책임을 지지 않는다.',
                explanation: []
              },
              {
                title: '⑤ 바다파트너스는 이용자가 게시 또는 전송한 자료의 내용에 관하여는 책임을 지지 아니한다.',
                explanation: []
              },
              {
                title: '⑥ 바다파트너스는 본 약관에서 규정하고 있는 회원의 의무를 이행하지 아니함으로써 오는 회원의 불이익에 대해 책임을 지지 아니한다.',
                explanation: []
              },
              {
                title: '⑦ 바다파트너스는 본 사이트와 연결된 사이트에 대한 보증 책임을 지지 않으며, 따라서, 연결 사이트와 회원 간에 이루어진 어떠한 거래에 대하여도 책임을 지지 않는다.',
                explanation: []
              },
              {
                title: '⑧ 바다파트너스에서 회원에게 무료로 제공하는 서비스의 이용과 관련해서는 어떠한 손해도 책임을 지지 않는다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '제 26 조 (저작권의 귀속 및 이용제한)',
            data: [
              {
                title: '① 바다파트너스가 작성한 저작물에 대한 저작권 및 기타 지적재산권은 바다파트너스에 귀속된다.',
                explanation: []
              },
              {
                title: '② 회원은 서비스를 이용함으로써 얻은 정보를 바다파트너스의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 된다.',
                explanation: []
              },
              {
                title: '③ 바다파트너스와의 사전 동의 없는 각종 자료의 배포 및 유통은 저작권법에 의해 형사처벌 될 수 있다.',
                explanation: []
              },
            ]
          },
          {
            subTitle: '제 27 조 (재판권 및 준거법)',
            data: [
              {
                title: '① 이 약관에 명시되지 않은 사항은 전기통신사업법 등 대한민국의 관계법령과 상관습에 따른다.',
                explanation: []
              },
              {
                title: '② 제공하는 서비스에 대해 이용자와 바다파트너스 간 발생한 문제에 대해서는 이 약관과 서비스 운영정책을 따른다.',
                explanation: []
              },
              {
                title: '③ 서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 바다파트너스의 소재지를 관할하는 법원을 관할 법원으로 한다.',
                explanation: []
              },
            ]
          },
        ]
      }
    ],
    termsOfUserData2: [
      {
        title: '1. 개인정보의 수집 및 이용 목적(개인정보보호법 제15조)',
        content: [
          {
            subTitle: '기술가치평가분석시스템은 소관 업무의 수행을 위하여 다음과 같이 개인정보를 수집 및 이용합니다. 수집된 개인정보는 정해진 목적 이외의 용도로는 이용되지 않으며 수집 목적이 변경될 경우 사전에 알리고 동의를 받을 예정입니다.',
            data: [
              {
                title: '가. 홈페이지 회원 관리 및 관련 서비스 제공',
                explanation: []
              },
              {
                title: '나. 바다파트너스에서 운영하는 사업에 대한 홍보',
                explanation: []
              },
            ]
          },
        ]
      },
      {
        title: '2. 수집하는 개인정보의 항목(개인정보보호법 제15조, 제16조)',
        content: [
          {
            subTitle: '요금제 회원',
            data: [
              {
                title: '필수항목 : 아이디, 비밀번호, 이메일, 이용자명, 무선전화',
                explanation: []
              },
              {
                title: '선택항목 : 없음',
                explanation: []
              },
              {
                title: '자동수집항목 : 서비스 이용시 접속 IP(Internet Protocol)주소, 접속시간',
                explanation: []
              },
              {
                title: '선택항목 : 사업장 소재지, 대표전화, 담당자 부서, 담당자 직책',
                explanation: []
              },
              {
                title: '자동수집항목 : 서비스 이용시 접속 IP(Internet Protocol)주소, 접속시간',
                explanation: []
              },
              {
                title: '- 부정한 방법으로 타인명의를 사용하는 경우에 대비하기 위해 정보이용내역을 자동 수집합니다.',
                explanation: []
              },
              {
                title: '※ 부정한 방법으로 타인명의 사용 시, 주민등록법 제37조(벌칙)에 의해 처벌 받을 수 있습니다.',
                explanation: []
              },
            ]
          },
        ]
      },
      {
        title: '3. 개인정보의 보유 및 이용기간(공공기록물 관리에 관한 법률 시행령 제26조)',
        content: [
          {
            subTitle: '기술가치평가분석시스템은 회원가입 탈퇴를 신청한 경우에 한하여 지체 없이 개인정보를 파기합니다.',
            data: [
              {
                title: '가. 개인정보의 보유 및 이용기간 : 준영구',
                explanation: []
              },
              {
                title: '나. 개인 정보의 파기 : 회원가입 탈퇴 신청 접수 시 즉시 파기',
                explanation: []
              },
            ]
          },
        ]
      },
      {
        title: '4. 동의를 거부할 권리가 있다는 사실 및 동의 거부에 따른 불이익 내용(개인정보보호법 제16조)',
        content: [
          {
            subTitle: '회원가입 시 수집하는 필요한 최소한의 정보 외의 개인정보 수집에 동의를 거부할 권리가 있으나 최소한의 개인정보 수집동의 거부 시에는 기술가치평가분석시스템 서비스 이용이 제한됩니다.',
            data: [
              {
                title: '',
                explanation: []
              },
            ]
          },
        ]
      },
    ],
    termsOfUserData3: [
      {
        title: '1. 개인정보의 파기 절차 및 방법',
        content: [
          {
            subTitle: '기술가치평가분석시스템은 원칙적으로 개인정보 처리목적이 달성된 개인정보는 지체 없이 파기합니다. 다만, 다른 법령에 따라 보존하여야 하는 경우에는 그러하지 않을 수 있습니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.',
            data: [
              {
                title: '가. 파기절차',
                explanation: [
                  '- 불필요한 개인정보 및 개인정보파일은 개인정보책임자의 책임 하에 내부방침 절차에 따라 다음과 같이 처리하고 있습니다.',
                  '- 개인정보의 파기',
                  '- 보유기간이 경과한 개인정보는 종료일로부터 지체 없이 파기합니다.',
                  '- 개인정보파일의 파기',
                  '- 개인정보파일의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보파일이 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 지체 없이 그 개인정보파일을 파기합니다.',
                ]
              },
              {
                title: '나. 파기방법',
                explanation: [
                  '1) 전자적 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.',
                  '2) 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.'
                ]
              },
            ]
          },
        ]
      },
      {
        title: '2. 이용자 및 법정대리인의 권리와 그 행사방법',
        content: [
          {
            subTitle: '이용자 및 법정대리인의 권리와 그 행사방법에 대해서는 개인정보보호법 제 38조(권리행사의 방법 및 절차)에 의거, 다음과 같은 규정을 준수합니다.',
            data: [
              {
                title: 'a. 이용자 및 법정 대리인은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.',
                explanation: []
              },
              {
                title: 'b. 이용자 혹은 만 14세 미만 아동의 개인정보 조회 수정을 위해서는 \'개인정보변경\'(또는 \'회원정보수정\' 등)을 가입해지(동의철회)를 위해서는 "회원탈퇴"를 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.',
                explanation: []
              },
              {
                title: 'c. 귀하가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제 3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다.',
                explanation: [
                  '- 기술가치평가분석시스템은 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 "기술가치평가분석시스템이 수집하는 개인정보의 보유 및 이용기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.'
                ]
              },
            ]
          },
        ]
      },
      {
        title: '3. 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항',
        content: [
          {
            subTitle: '기술가치평가분석시스템은 쿠키 등 인터넷 서비스 이용 시 자동 생성되는 개인정보를 수집하는 장치를 운영하지 않습니다.',
            data: [
              {
                title: '',
                explanation: []
              },
            ]
          },
        ]
      },
    ]
  })
}
</script>

<style scoped>

</style>
