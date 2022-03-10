<template>
  <v-scroll-y-transition mode="out-in">
    <v-card
      flat
      style="width: 100%; height: fit-content;"
    >
      <v-card-title class="pb-0">
        <p class="font-weight-medium display-1">
          {{ header }}
        </p>
      </v-card-title>
      <v-divider style="background-color:#555555; border-width: 1px !important;"/>
      <v-data-table
        :headers="headers"
        :items="inquiryList"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        :items-per-page="inquiryList.length"
        mobile-breakpoint="0"
        item-key="no"
        show-expand
        hide-default-header
        hide-default-footer
        class='row-height-100'
        style="width: 100%"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-card flat width="100%" height="fit-content" style="background-color: rgb(245, 245, 245);" class="py-8 px-6">
              <p>Q. {{item.data.content}}</p>
              <v-divider v-if="item.isAnswered" class="my-6"/>
              <div v-if="item.isAnswered">
                <pre class="card-content mb-6" v-html="`A. ${item.data.answer.data}`"/>
                <pre>{{item.data.answer.created_at}}</pre>
              </div>
            </v-card>
          </td>
        </template>
        <template v-slot:item.isAnswered="{item}">
          <td class="px-0">
            <p
              class="mb-0 text-center"
              :class="`${item.isAnswered ? 'font-weight-bold' : 'font-weight-thin'}`"
              style="min-width: 100px"
            >
              {{ !item.isAnswered ? '답변대기' : '답변완료' }}
            </p>
          </td>
        </template>
        <template v-slot:item.data="{item}">
          <td class="text-start">
            <div class="font-weight-bold mb-2">
              [{{item.data.type}}] {{item.data.title}}
            </div>
            <div>
              {{item.data.created_at}}
            </div>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-scroll-y-transition>
</template>

<script>
export default {
  name: "InquiryListCard",
  props: {
    // TODO (Sample)
    inquiryList: {
      type: Array,
      default: () => [
        {
          no: 1,
          isAnswered: true,
          data: {
            type: '사용방법 문의',
            title: '포인트 신청은 어떻게 하나요?',
            content: '포인트 신청하고 싶은데 상단 바에도 들어가는 경로가 없네요. url을 첨부해주셔도 좋으니까 경로 접근 방법 부탁드려요.',
            created_at: '2022-03-04 13:14',
            answer: {
              data: '안녕하세요,Vada Partners 최연우 입니다.\n' +
                '\n' +
                '\n' +
                '\n' +
                '대출신청은 매일(주말,공휴일포함)오전 6시부터 밤11시까지 가능하며\n' +
                '최근 이사시즌으로 신청량 급증되어 하루 접수량 제어되고 있습니다.\n' +
                '오전 6시부터 많은 고객님들께서 동시진행시 빠른시간대로 마감되는 경우가 있습니다.\n' +
                '\n' +
                '당행은 대면창구가 없는 비대면은행이기 때문에 대출신청접수는 앱에서만 가능하며\n' +
                '유선상으로도 직원이 별도 접수해드리거나 마감시간과 마감예측시간 확인이 불가합니다.\n' +
                '대출 이용에 불편을 드려 죄송합니다.\n' +
                '\n' +
                '서류 잔금일 기준 1개월전부터 최소 15일전까지가 대출 신청가능기간이며\n' +
                '잔금일 여유가 있으시다면  재시도 해주셔서 신청가능여부를  앱을 통해 \n' +
                '다시 확인해보시길 바랍니다.\n' +
                '\n' +
                '\n' +
                '\n' +
                '마지막으로 당부 말씀 드립니다.\n' +
                '\n' +
                '\n' +
                '전월세보증금 대출 신청전, 꼭 알아두셔야 할 내용을 안내드립니다.\n' +
                '\n' +
                '\n' +
                '■ 모바일앱 로그인 >  상품/서비스(田) > 전월세보증금 대출 상품안내 페이지의 [신청조건] 및 전세자금실행 후 [주기적 실거주/ 고가주택, 다주택 및 3억초과 투기지역   아파트 소유여부확인 절차] 등 상세 내용 반드시 확인 부탁드립니다. \n' +
                '    https://kakaobank.onelink.me/0qMi/eccf7218\n' +
                '\n' +
                '\n' +
                '■ 전월세보증금대출의 예상 한도는 서류 제출 전의 결과이며 서류 제출 및  서류확인 후 최종 대출 가능여부, 한도 및 금리가 결정됩니다. \n' +
                '   서류확인 결과에 따라 부결 되실 수도 있으며, 추가서류 및 보완사항이 발생할 수 있는 점도 참고 부탁드립니다.\n' +
                '\n' +
                '\n' +
                '■ 대출 신청기한은 서류상 잔금일로부터 최소 15일전까지만 가능합니다. \n' +
                '  ( 1일 접수량 제어시 서류접수가 어려울 수 있으며, 이로 인해 잔금일수 부족 할 경우 진행 불가합니다.)\n' +
                '\n' +
                '\n' +
                '■ 임차보증금은 최소 1천만원 이상 부터 입니다.       \n' +
                '\n' +
                '\n' +
                '■ 서류확인 및 보증 결과에 따라 임대인을 만나 계약사실 확인을 할 수도 있습니다. (오피스텔은 필수)\n' +
                '\n' +
                '\n' +
                '■ 당행 전월세보증금 대출은 추가대출및 대환이 불가합니다.\n' +
                '\n' +
                '\n' +
                '\n' +
                '\n' +
                '추가 문의사항이 있으신 경우, 카카오뱅크 고객센터 1599-3333 > 0 > 2 > 2  으로 문의 주시거나 카카오뱅크 어플 내 1:1문의 주시면 성실하게 답변 드리겠습니다. \n' +
                '\n' +
                '\n' +
                '\n' +
                '감사합니다.',
              created_at: '2022-03-06 15:32'
            }
          }
        },
        {
          no: 2,
          isAnswered: false,
          data: {
            type: '기타',
            title: '기업 회원 가입은 어떻게 하나요?',
            content: '기업 회원은 어떻게 하나요?',
            created_at: '2022-03-04 13:14',
            answer: {}
          }
        },
        {
          no: 3,
          isAnswered: false,
          data: {
            type: '기타',
            title: '출원 중인 특허도 평가가 가능한가요?',
            content: '등록일로부터 2~3개월 후 평가 가능한가요?',
            created_at: '2022-03-04 13:14',
            answer: {}
          }
        },
        {
          no: 4,
          isAnswered: true,
          data: {
            type: '기타',
            title: '등록된 특허인데 평가결과가 조회되지 않는 경우가 있나요?',
            content: '기업 회원은 어떻게 하나요?',
            created_at: '2022-03-04 13:14',
            answer: {
              data: '안녕하세요,Vada Partners 최연우 입니다.\n\n특허가 등록되어도 공보 발행 전이거나 등록 후 VADA 평가에 반영기간(2~3개월) 전인 경우에 평가결과가 조회되지 않습니다.',
              created_at: '2022-03-04 17:14'
            }
          }
        },
        {
          no: 5,
          isAnswered: false,
          data: {
            type: '기타',
            title: '기업 회원 가입은 어떻게 하나요?',
            content: '기업 회원은 어떻게 하나요?',
            created_at: '2022-03-04 13:14',
            answer: {}
          }
        },
      ]
    },
    header: {
      type: String,
      default: () => ''
    }
  },
  data: () => ({
    headers: [
      {
        text: '답변여부',
        value: 'isAnswered',
        align: 'center',
      },
      {
        text: '내용',
        value: 'data',
        align: 'center'
      },
      {
        text: '',
        value: 'data-table-expand',
        width: '5%'
      },
    ],
    expanded: [],
    singleExpand: false,
  }),
  computed: {

  }
}
</script>

<style lang="scss">
.v-data-table__expanded.v-data-table__expanded__content {
  box-shadow: none !important;
  background-color: rgb(245, 245, 245);
}
.card-content {
  white-space: pre-wrap;
  overflow: auto;
}

.v-data-table.row-height-100 td {
  height: 100px !important;
}
</style>
