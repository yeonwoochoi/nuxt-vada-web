<template>
  <div>
    <button @click="savePdf">PDF</button>
    <div data-html2canvas-ignore="true">출력하지 않고 싶은 영역은 태그에 'data-html2canvas-ignore' attribute를 넣어주면된다.</div>
    <div id='page1'>
      <v-img :src="require('../../assets/cover.jpg')" :aspect-ratio="210/297" width="100%"/>
    </div>
    <div id="page2">
      <v-img :src="require('../../assets/bg_sidebar.png')" :aspect-ratio="210/297" width="100%" style="padding: 150px">
        <v-row align="start" justify="center">
          <v-col cols="12" class="my-2">
            <p class="grey--text text--darken-1 mt-1">본 평가에서 기술의 가치는 로열티공제법을 기반으로 수행되었으며,
              평가대상기술의 가치는 {{techPriceFrom}}~{{techPriceTo}}백만원으로 산출되었다.
            </p>
            <vertical-header-table
              :table-header="[ {text: '기술가치 금액', value: 'price', width: '278px'}]"
              :table-items="[{price: `${techPriceFrom}~${techPriceTo}백만원`}]"
            />
          </v-col>
          <v-col cols="12" class="my-2">
            <p style="color: #002145">※ 평가조건, 주요변수 등이 변경될 경우 가치 평가금액이 변동될 수 있음.</p>
          </v-col>
          <v-col cols="12" class="my-2">
            <vertical-header-table
              :table-header="tableHeader"
              :table-items="tableContents"
            />
          </v-col>
        </v-row>
      </v-img>
    </div>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from 'html2canvas'
import VerticalHeaderTable from "../table/VerticalHeaderTable";

export default {
  name: "Report",
  components: {VerticalHeaderTable},
  data: () => ({
    tableHeader: [
      { text: '평가의 목적', value: 'purpose'},
      { text: '평가대상특허', value: 'target'},
      { text: '기술의 경제적\n' +
          '수명 산정', value: 'life'},
      { text: '현금흐름', value: 'cashFlow'},
      { text: '할인율', value: 'discountRate'},
      { text: '기술가치', value: 'techValue'},
    ],
    tableContents: [
      {
        purpose: '평가용도 : 기술 가치금액 참고용',
        target: '평가대상 특허 : 등록 1건\n' +
          'KR 10-0107367',
        life: '기술의 경제적 수명 : 9년\n' +
          '현금흐름 추정기간 : 2020년 ~ 2028년',
        cashFlow: '매출액 추정 : 직접 추정 (시장 점유율법)\n' +
          '로열티 : 업종별 상관행법 X 로열티율 조정계수\n' +
          '= 3.15%',
        discountRate: '할인율 : 10.85%\n' +
          '업종 : 기타 기계 및 장비 제조업 (C29)\n' +
          '기업분류 : 비상장 창업기업',
        techValue: '기술가치 = 1,472~1,472백만원',
      }
    ],
    techPriceFrom: '1,472',
    techPriceTo: '1,472'
  }),
  methods: {
    async savePdf () {
      window.scrollTo({
        top: 0,
        left: 0,
      });
      document.body.style.overflowY = "hidden";
      //const pageIds = ["#cover", "#summary", "#methodology", "#life-span", "#life-span2", "#revenue", "#royalty", "#tax", "#discount", '#discount2', '#final-value']
      const pageIds = ["#page1", "#page2"]
      const pageElements = pageIds.map(id => document.querySelector(id));
      let pdf = new jsPDF("p", "mm", "a4", false);

      for (let i = 0; i < pageElements.length; i++) {
        const canvas = await html2canvas(pageElements[i], {
          width: pageElements[i].offsetWidth,
          height: pageElements[i].offsetHeight,
        });
        const img = canvas.toDataURL('image/jpeg', 1);

        if (i === 0) {
          await pdf.addImage(img, 'jpeg', 0, 0, 210, 297);
        } else {
          await pdf.addPage();
          await pdf.addImage(img, 'jpeg', 0, 0, 210, 297);
        }
        if (i === pageElements.length - 1) {
          pdf.save("report.pdf");
        }
      }
    },
    generateReportPdf(selector = 'body') {
      window.html2canvas = html2canvas //Vue.js 특성상 window 객체에 직접 할당해야한다.
      let that = this
      let pdf = new jsPDF('p', 'mm', 'a4')
      let canvas = pdf.canvas
      const pageWidth = 210 //캔버스 너비 mm
      const pageHeight = 297 //캔버스 높이 mm
      canvas.width = pageWidth

      let ele = document.querySelector(selector)
      let width = ele.offsetWidth // 셀렉트한 요소의 px 너비
      let height = ele.offsetHeight // 셀렉트한 요소의 px 높이
      let imgHeight = pageWidth * height/width // 이미지 높이값 px to mm 변환

      if(!ele){
        console.warn(selector + ' is not exist.')
        return false
      }

      html2canvas(ele, {
        onrendered: function(canvas) {
          let position = 0
          const imgData = canvas.toDataURL('image/png')
          pdf.addImage(imgData, 'png', 0, position, pageWidth, imgHeight, undefined, 'slow')

          //Paging 처리
          let heightLeft = imgHeight //페이징 처리를 위해 남은 페이지 높이 세팅.
          heightLeft -= pageHeight
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight
            pdf.addPage();
            pdf.addImage(imgData, 'png', 0, position, pageWidth, imgHeight)
            heightLeft -= pageHeight
          }

          pdf.save(that.propTitle.toLowerCase() +'.report')
        },

      });
    }
  }
}
</script>

<style scoped>

</style>
