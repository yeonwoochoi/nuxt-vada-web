import React, { useState } from "react";
import Parser from "../../util/Parser";
import IpCalculator from "../../services/IpCalculator";
import styles from "../../styles/FullReport.module.scss";
import Layout from "../../components/Layout";
import Nav from "../../components/Nav";
import KsicDb from "../../services/KsicDb";
import PatentInfoDb from "../../services/PatentInfoDb";
import IpcDb from "../../services/IpcDb";
import KiprisApiService from "../../services/KiprisApiService";
import xml2js from "xml2js";
import JsUtil from "../../util/JsUtil";
import animationData from "../../public/animation/loading.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faSave } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import AuthUtil from '../../util/AuthUtil';
import Lottie from "react-lottie";
import Logger from '../../util/Logger';

export default function FullReport(props) {
  const { result, query } = props;
  let {
    registrationNumber,
    techLifeSpan,
    currentFinalcialYear,
    royaltyRate,
    finalRoyaltyRate,
    discountRate,
    ksic,
    companySizeTitle,
    matchingIpcCode,
    matchingRoyaltyCode,
    patentInfo,
    lastThreeYearRevenues,
    revenueRoyaltyRatio,
    royaltyCodeTotalScore,
    riskPremium,
    discountRateTotalScore,
    industryDiscountRate,
    corporateTaxRate,
    equitySizePremium,
    debtSizePremium,
    intellectualPropertyEffectivenessLowBound,
    intellectualPropertyEffectivenessHighBound,
    flow,
    royaltyFlow,
    corporateTaxFlow,
    royaltyFlowAfterTax,
    discountFactors,
    presentValueFlow,
    presentValueSum,
    ipcScore,
    CAGR,
    royaltyIpRate,
    industryDiscountRates,
    ipcName
  } = result;

  const [loading, setLoading] = useState(false);

  const evaluationDate = parseInt(query.evaluationDate);

  const decimalToPercent = (decimal) => (decimal * 100).toFixed(2);
  const ipcMedian = matchingIpcCode.median;
  const ipcCode = matchingIpcCode.ipcCode;
  const ipcAvg = matchingIpcCode.avg;
  const ipcQ1 = matchingIpcCode.q1;
  const ipcQ3 = matchingIpcCode.q3;
  const now = new Date(evaluationDate);
  let currentFinancialYear = now.getMonth() <= 5 ? now.getFullYear() - 2 : now.getFullYear() - 1;
  let currentActualYear = now.getFullYear();
  let applicationDateStr = patentInfo.applicationDate[0];
  applicationDateStr = `${applicationDateStr.substr(
    0,
    4
  )}-${applicationDateStr.substr(4, 2)}-${applicationDateStr.substr(6, 2)}`;

  const applicationDate = new Date(applicationDateStr);
  const terminationDate = new Date(applicationDateStr);
  terminationDate.setFullYear(applicationDate.getFullYear() + 20);

  const patentLegalLifeSpan = terminationDate.getFullYear() - now.getFullYear();

  const formattedRegistrationNumber = '10-' + registrationNumber.slice(2, registrationNumber.length - 4);
  const presentValueSumStr = parseInt(presentValueSum.toFixed(0)).toLocaleString();
  const finalIpValue = parseInt(presentValueSum * intellectualPropertyEffectivenessLowBound).toLocaleString();
  const finalIpLowerBound = parseInt(presentValueSum * intellectualPropertyEffectivenessLowBound * intellectualPropertyEffectivenessLowBound).toLocaleString();
  const finalIpHighBound = parseInt(presentValueSum * intellectualPropertyEffectivenessLowBound * intellectualPropertyEffectivenessHighBound).toLocaleString()
  const addComma = (value) => {
    if (isNaN(parseInt(value))) return "";
    return parseInt(value).toLocaleString();
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  const savePdf = async () => {
    setLoading(true);
    window.scrollTo({
      top: 0,
      left: 0,
    });
    document.body.style.overflowY = "hidden";
    // let disableScroll = document.addEventListener("scroll", e => {
    //   e.preventDefault();
    //   window.scrollTo({
    //     top: 0,
    //     left: 0
    //   })
    // })
    const pageIds = ["#cover", "#summary", "#methodology", "#life-span", "#life-span2", "#revenue", "#royalty", "#tax", "#discount", '#discount2', '#final-value']
    const pageElements = pageIds.map(id => document.querySelector(id));
    let pdf = new jsPDF("p", "mm", "a4", false);

    for (let i = 0; i < pageElements.length; i++) {
      // pageElements[i].scrollIntoView();
      const canvas = await html2canvas(pageElements[i], {
        width: pageElements[i].offsetWidth,
        height: pageElements[i].offsetHeight,
        // windowWidth: window.screen.width,
        // windowHeight: window.screen.height,
        // scrollY: 0,
        // scrollX: 0
      });
      const img = canvas.toDataURL('image/jpeg', 1);

      if (i == 0) {
        await pdf.addImage(img, 'jpeg', 0, 0, 210, 297);
      } else {
        await pdf.addPage();
        await pdf.addImage(img, 'jpeg', 0, 0, 210, 297);
      }
      if (i == pageElements.length - 1) {
        pdf.save("report.report");
      }
    }
    // document.removeEventListener('scroll', disableScroll);
    setLoading(false);
    document.body.style.overflowY = "scroll";
  }

  const renderFinalValueTable = () => {
    let period = flow.length;
    const numRows = Math.ceil(period / 5);
    let numRowsArr = [];
    for (let i = 0; i < numRows; i++) {
      numRowsArr.push(i);
    }

    const sliceFiveYear = (data, rowIndex) => {
      let result = data.slice(rowIndex * 5, rowIndex * 5 + 5);
      // Add empty cells if the total number of period is not divisible by 5.
      if (numRows - 1 == rowIndex && period % 5 !== 0) {
        for (let i = 0; i < 5 - (period % 5); i++) {
          result.push({
            toFixed: () => ""
          });
        }
      }
      return result;
    }

    const renderRows = numRowsArr.map(rowIndex => {
      const revenueFlowData = sliceFiveYear(flow, rowIndex);
      const royaltyFlowData = sliceFiveYear(royaltyFlow, rowIndex);
      const taxFlowData = sliceFiveYear(corporateTaxFlow, rowIndex);
      const royaltyFlowAfterTaxData = sliceFiveYear(royaltyFlowAfterTax, rowIndex);
      const discountFactorsData = sliceFiveYear(discountFactors, rowIndex);
      const presentValueFlowData = sliceFiveYear(presentValueFlow, rowIndex);
      const isFinalRow = numRows - 1 == rowIndex;
      const numberOfColumns = isFinalRow ? period % 5 === 0 ? 5 : period % 5 : 5;
      const renderRoyaltyRateFiller = () => {
        let filler = [];
        if (isFinalRow && period % 5 !== 0) {
          for (let i = 0; i < 5 - period % 5; i++) {
            filler.push("");
          }
        }
        return filler.map(() => <td></td>)
      }
      const renderRow = () => {
        return (<>
          <thead>
            <tr>
              <th>구분</th>
              {revenueFlowData.map((flow, index) => {
                return <th key={index}>{currentActualYear + index + rowIndex * 5}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>매출액</th>
              {revenueFlowData.map((revenue, index) => (
                <td key={index}>{addComma(revenue.toFixed(0))}</td>
              ))}
            </tr>
            <tr>
              <th>로열티율</th>
              <td colspan={numberOfColumns}>{decimalToPercent(royaltyRate) + "%"}</td>
              {renderRoyaltyRateFiller()}
            </tr>
            <tr>
              <th>로열티수입</th>
              {royaltyFlowData.map((royalty, index) => (
                <td key={index}>{addComma(royalty.toFixed(0))}</td>
              ))}
            </tr>
            <tr>
              <th>법인세 등</th>
              {taxFlowData.map((tax, index) => (
                <td key={index}>{addComma(tax.toFixed(0))}</td>
              ))}
            </tr>
            <tr>
              <th>세후 로열티 수입</th>
              {royaltyFlowAfterTaxData.map((afterTax, index) => (
                <td key={index}>{addComma(afterTax.toFixed(0))}</td>
              ))}
            </tr>
            <tr>
              <th>현가계수</th>
              {discountFactorsData.map((discountFactor, index) => (
                <td key={index}>{discountFactor.toFixed(2)}</td>
              ))}
            </tr>
            <tr>
              <th>현재가치</th>
              {presentValueFlowData.map((pv, index) => (
                <td key={index}>{addComma(pv.toFixed(0))}</td>
              ))}
            </tr>
            {rowIndex == numRows - 1 ? (<><tr>
              <th>현재가치 합산</th>
              <td colspan={5}>{presentValueSumStr}</td>
            </tr>
              <tr>
                <th>지적 재산 유효성</th>
                <td colspan={5}>
                  {`${intellectualPropertyEffectivenessLowBound.toFixed(
                    1
                  )}`}
                </td>
              </tr>
              <tr>
                <th>IP 가치</th>
                <td
                  colspan={5}
                >{finalIpValue}</td>
              </tr></>) : null}
          </tbody></>
        )
      }
      return renderRow();
    })
    return (
      <div className={styles.result}>
        <table className={styles["result-table"]} border={1}>

          {renderRows}
        </table>
      </div>
    );
  };

  const renderRevenueFlow = () => {
    return (
      <table>
        <tr>
          <th>구분</th>
          {result.flow.map((rvn, index) => {
            return <th>{currentActualYear + index}</th>;
          })}
        </tr>
        <tr>
          <td>매출액</td>
          {result.flow.map((rvn) => {
            return <td><span className={styles["blue-text"]}>{addComma(rvn.toFixed(0))}</span></td>;
          })}
        </tr>
      </table>
    );
  };

  const lottieOption = {
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <Layout>
      <Nav user={props.user}></Nav>
      {loading ?
        <div className={styles['loading-overlay']}>
          <div className={styles['loading-wrapper']}>
            <div>보고서를 PDF로 변환 중입니다.</div>
            <Lottie width={200} options={lottieOption} />
          </div>
        </div> : null}
      <main className={styles.report}>
        <div id='cover' className={`${styles.page} ${styles.cover}`}></div>
        <div id="summary" className={styles.page}>
          <div className={styles.summary}>
            <div className={styles.body}>
              <div className={styles["background-gradient"]}></div>
              <div className={styles["background-image"]}></div>
              <h1 className={styles["background-accent"]}>
                I. 기술가치평가요약
              </h1>
              <div className={styles["summary-inner-wrapper"]}>
                <p className={`gray-text ${styles["bullet-point"]}`}>
                  본 평가에서 기술의 가치는 로열티공제법을 기반으로
                  수행되었으며, 평가대상기술의 가치는{" "} <span className={styles['blue-text']}>
                    {`${finalIpLowerBound}~${finalIpHighBound}`}</span>
                      백만원으로 산출되었다.
                </p>
                <div className={styles["item-row"]}>
                  <div className={styles["item-title"]}>기술가치 금액</div>
                  <div className={styles["item-content"]}>
                    <span className={styles["blue-text"]}>{`${finalIpLowerBound} ~ ${finalIpHighBound}백만원`}</span>
                  </div>
                </div>
                <p className={`${styles["warning"]} gray-text`}>
                  ※ 평가조건, 주요변수 등이 변경될 경우 가치 평가금액이 변동될
                  수 있음.
                </p>
                <div className={styles["item-row"]}>
                  <div className={styles["item-title"]}>평가의 목적</div>
                  <div className={styles["item-content"]}>
                    <p>
                      <span className={styles.triagle}>▶ </span><span>평가용도 : 기술 가치금액 참고용</span>
                    </p>
                  </div>
                </div>
                <div className={styles["item-row"]}>
                  <div className={styles["item-title"]}>평가의 대상 특허</div>
                  <div className={styles["item-content"]}>
                    <p><span className={styles.triagle}>▶ </span><span>평가대상 특허 : 등록 1건</span></p>
                    <p><span className={styles.triagle}>▶ </span><span className={styles["blue-text"]}> KR {formattedRegistrationNumber}</span> </p>
                  </div>
                </div>
                <div className={styles["item-row"]}>
                  <div className={styles["item-title"]}>
                    기술의 경제적 수명 산정
                  </div>
                  <div className={styles["item-content"]}>
                    <p>
                      <span className={styles.triagle}>▶ </span>
                      기술의 경제적 수명 : <span className={styles["blue-text"]}>{techLifeSpan}</span>년
                    </p>
                    <p>
                      <span className={styles.triagle}>▶ </span>
                      현금흐름 추정기간 : <span className={styles["blue-text"]}>{currentActualYear}년 ~ {currentActualYear + techLifeSpan - 1
                      }년</span>
                    </p>
                  </div>
                </div>
                <div className={styles["item-row"]}>
                  <div className={styles["item-title"]}>현금 흐름</div>
                  <div className={styles["item-content"]}>
                    <p>
                      <span className={styles.triagle}>▶ </span>
                      <span> 매출액 추정 : 직접 추정</span>
                    </p>
                    <p>
                      <span className={styles.triagle}>▶ </span>
                      <span> {`로열티율: ${decimalToPercent(finalRoyaltyRate)}%`}</span>
                    </p>
                  </div>
                </div>
                <div className={styles["item-row"]}>
                  <div className={styles["item-title"]}>할인율</div>
                  <div className={styles["item-content"]}>
                    <p>
                      <span className={styles.triagle}>▶ </span>
                      할인율: <span className={styles["blue-text"]}>{decimalToPercent(discountRate)}%</span>
                    </p>
                    <p>
                      <span className={styles.triagle}>▶ </span>
                      업종 : <span className={styles["blue-text"]}>{ksic.title} ({ksic.ksic})</span>
                    </p>
                    <p>
                      <span className={styles.triagle}>▶ </span>
                      기업규모 : <span className={styles["blue-text"]}>{companySizeTitle}</span>
                    </p>
                  </div>
                </div>
                <div className={styles["item-row"]}>
                  <div className={styles["item-title"]}>기술가치</div>
                  <div className={styles["item-content"]}>
                    <p>
                      <span className={styles.triagle}>▶ </span>
                      <span>기술가치: </span><span className={styles["blue-text"]}><span className={styles.blur}>{`${finalIpLowerBound} ~ ${finalIpHighBound}`}</span></span><span>백만원</span>
                    </p>
                  </div>
                </div>
                <p className={`gray-text ${styles["bottom-warning"]}`}>
                  ※) 개별 특허의 가치합계는 반올림으로 인해 기술가치와 차이가
                  발생할 수 있음
                </p>
              </div>
            </div>
            <img
              className={styles["bottom-logo"]}
              src="/images/logo-white.svg"
            />
          </div>
        </div>
        <div id="methodology" className={styles.page}>
          <div className={styles.methodology}>
            <div className={styles.header}>
              <img className={styles["top-image"]} src="/images/top-image1.png" alt="" />
              <h1 className={styles["background-accent"]}>II.경제성 평가</h1>
            </div>
            <div className={styles.body}>
              <div className={styles["methodology-inner-wrapper"]}>
                <h1>1. 평가 방법</h1>
                <p className={`gray-text ${styles["body-text"]} ${styles["bullet-point"]}`}>
                  본 평가에서는 기술가치평가 실무가이드(2017) 로열티공제법 모델 Ⅱ
                  로 평가대상 기술의 가치를 추정하였다. 로열티공제법은 제3자로부터 라이선스
                  되었다면 지급할 로열티를 기술소유자가 부담하지 않음으로써 절감될 수 있는
                  로열티 지불액을 추정하여 현재가치로 환산하는 방법이다. 즉, 추정된 로열티
                  지불액은 특허권을 보유했기 때문에 지불하지 않아도 되는 것을 의미하는 것으로
                  기회비용 관점에서 특허권의 가치를 추정하는 방법이라고 할 수 있다.
                </p>
                <p className={`gray-text ${styles["body-text"]} ${styles["bullet-point"]}`}>
                  로열티공제법 모델 Ⅱ 기반 기술가치평가 모형의 산식은 다음과 같다.
                </p>
                <div className={`${styles["background-accent"]} ${styles['formula']}`}>
                  <p>기술가치 =</p>
                  <p>매출액 × [(합리적 로열티율 × 지식재산 보호비중) × (1 - 세율)]의 현재가치 ×
                  지식재산 유효성</p>
                  <p></p>
                  <p>◦ 합리적 로열티율 = 기준 로열티율 × 조정계수</p>
                  <p>◦ 기준 로열티율: 유사사례 로열티율 또는 업종별 로열티 통계의 중앙값(또는 평균)</p>
                  <p>◦ 조정계수: 로열티 영향요인 평점에 근거하여 기준 로열티율을 조정하는 계수</p>
                  <p>◦ 지식재산 보호비중: 대상지식재산이 대상기술제품에서 차지하는 비율(0~100%)</p>
                  <p>◦ 지식재산 유효성: 기술(지식재산)의 권리로서의 유효성과 거래가능성에 대한
                  평점(0~100%)</p>
                </div>
                <p className={`gray-text ${styles["body-text"]} ${styles["bullet-point"]}`}>
                  로열티공제법에 의한 기술가치는 매출액에 합리적 로열티율과 지식재산 보호비중을
                  곱하여 로열티수입을 산정한 후 법인세와 할인율로 조정한 추정기간 동안의 세후
                  로열티수입의 현재가치에 지식재산 유효성을 곱하여 최종 산출된다.
                </p>
              </div>
            </div>
            <img className={styles["bottom-logo"]} src="/images/logo.svg" />
          </div>
        </div>
        <div id="life-span" className={styles.page}>
          <div className={styles["life-span"]}>
            <div className={styles["background-gradient"]}></div>
            <div className={styles["background-image"]}></div>
            <div className={styles["life-span-inner-wrapper"]}>
              <div className={styles['title-wrapper']}>
                <h1 className={styles["background-accent"]}>
                  2.주요한 가치변수
                </h1>
                <h1 className={`${styles["background-accent"]} ${styles['sub-header']}`}>2.1 특허의 경제적 수명</h1>
              </div>
              <div className={styles['body-wrapper']}>
                <p className={`gray-text ${styles["body-text"]} ${styles["bullet-point"]}`}>
                  기술가치평가에서는 특허의 경제적 수명을 결정하는 과정이
                  필수적이다. 이는 특정 기술자산을 이용한 사업이 기술적 우위에
                  확보할 수 있는 시간을 의미한다. 기술의 경제적 수명은 기술자산의
                  법적 보호 기간이나 내용연수와는 다른 개념으로 기술 자체의
                  수명뿐만 아니라 기술이 사용되는 환경적 요인을 고려하여 결정된다.
              </p>
                <p className={`gray-text ${styles["body-text"]} ${styles["bullet-point"]}`}>
                  기술의 경제적 수명을 결정할 수 있는 하나의 추정방법으로
                  특허인용수명 지수 (TCT 등)를 적용할 수 있다. 특허인용수명이란
                  특정 특허가 등록 이후 다른 특허에 의해 인용되는 기간을 의미한다.
              </p>
                <p className={`gray-text ${styles["body-text"]} ${styles["bullet-point"]}`}>
                  특허인용수명은 기술군 내 개별특허의 연차별 인용빈도수에 기반하여
                  개별특허의 수명주기 값을 산출한 것으로 각 특허에 대해 당해
                  특허의 등록연도와 그것이 인용하고 있는 특허(backward
                  citation)들의 등록연도 간의 기간을 산출한 것으로서, 해당
                  특허기술이 속한 기술군의 변화속도를 보여준다.
              </p>
                <p className={`gray-text ${styles["body-text"]} ${styles["bullet-point"]}`}>
                  특정 기술군에 대한 특허인용수명 분포의 형태는 양의 왜도를 갖는
                  비대칭분포로 나타나기 때문에, 이 분포의 대표 값을 중앙값(median
                value)으로 사용하고 이를 TCT<sup>1</sup>(Technology Cycle Time,
                기술수명주기 또는 기술순환주기)라고 정의한다.
              </p>
                <p className={`gray-text ${styles["body-text"]} ${styles["bullet-point"]}`}>
                  평가대상 기술은 TCT 지수에 <span className={styles["blue-text"]}>{ipcCode}({ipcName})</span>에 해당하는 기술군으로 동
                기술에 대한 특허 인용 수명의 중앙값은 {ipcMedian}년이다.
              </p>
                <div>
                  <h4>[표 2-1] 평가대상 기술의 TCT 지수</h4>
                  <p className={styles.unit}>(단위 : 년)</p>
                  <table>
                    <tr>
                      <th>IPC</th>
                      <th>Title</th>
                      <th>평균</th>
                      <th>Q1</th>
                      <th>중앙값</th>
                      <th>Q3</th>
                    </tr>
                    <tr>
                      <td><span className={styles["blue-text"]}>{ipcCode}</span></td>
                      <td><span className={styles["blue-text"]}>{ipcName}</span></td>
                      <td><span className={styles["blue-text"]}>{ipcAvg}</span></td>
                      <td><span className={styles["blue-text"]}>{ipcQ1}</span></td>
                      <td><span className={styles["blue-text"]}>{ipcMedian}</span></td>
                      <td><span className={styles["blue-text"]}>{ipcQ3}</span></td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className={styles.footer}>
                <hr className={styles["hr-line"]} />
                <p className={`gray-text ${styles["body-text"]} ${styles.footnote}`}> <sup>1</sup> TCT는 미국 CHI가 국립과학재단(NSF)의 지원으로 개발한 지표로서 특허인용정보를 활용하여 각종 기술혁신 패턴 분석에 널리 활용되고 있다.</p>
              </div>
            </div>
          </div>
        </div>
        <div id="life-span2" className={styles.page}>
          <div className={styles["life-span2"]}>
            <div className={styles["background-gradient"]}></div>
            <div className={styles["background-image"]}></div>
            <div className={styles["life-span2-inner-wrapper"]}>
              <p className={`gray-text ${styles["body-text"]} ${styles["bullet-point"]}`}>
                특허권의 존속기간은 특허출원일로부터 20년으로 규정하고 있다.
                따라서 평가대상 기술의 경제적 수명을 평가기준일인{" "}
                <span className={styles["blue-text"]}>{now.getFullYear()}년 {now.getMonth() + 1}월 {now.getDate()}일</span>을
                기준으로 특허권의 법적 보호기간을 적용하여 산출해 보면 다음과
                같다.
              </p>
              <div>
                <h4>[표 2-2] 평가대상 특허의 잔존기간</h4>
                <table>
                  <tr>
                    <th>등록번호</th>
                    <th>특허의 명칭</th>
                    <th>출원일</th>
                    <th className={styles["nowrap"]}>존속기한</th>
                    <th className={styles["nowrap"]}>잔존기한</th>
                  </tr>
                  <tr>
                    <td><span className={styles["blue-text"]}>{formattedRegistrationNumber}</span></td>
                    <td><span className={styles["blue-text"]}>{patentInfo.inventionTitle}</span></td>
                    <td><span style={{whiteSpace : "nowrap"}} className={[styles["blue-text"], styles["nowrap"]]}>{applicationDate.toLocaleDateString("ko-KR")}</span></td>
                    <td><span style={{whiteSpace : "nowrap"}} className={[styles["blue-text"], styles["nowrap"]]}>{terminationDate.toLocaleDateString("ko-KR")}</span></td>
                    <td><span className={styles["blue-text"]}>{patentLegalLifeSpan}</span></td>
                  </tr>
                </table>
                <p className={`gray-text ${styles["body-text"]} ${styles['evaluation-date']}`}>
                  ※ 평가기준일 :{now.getFullYear()}년 {now.getMonth() + 1}월{" "}
                  {now.getDate()}일
              </p>
              </div>
              <p className={`gray-text ${styles["body-text"]} ${styles["bullet-point"]}`}>이상의 평가대상 기술의 수명주기를 조정하기 위해 기술수명 영향요인에 대한 평가지표에 따라 평가한 결과 영향요인 점수 획득 값은 <span className={styles["blue-text"]}>{ipcScore}점</span>을 반영하였다.</p>
              <div>
                <h4>[표 2-3] 기술수명 영향요인 평가</h4>
                <table className={`gray-text ${styles["body-text"]} ${styles["table-white"]}`}>
                  <tr>
                    <th colSpan={2}>단계</th>
                    <th colSpan={1}>추정 결과</th>
                  </tr>
                  <tr>
                    <td>1단계</td>
                    <td>인용특허수명지수산출</td>
                    <td><span className={styles["blue-text"]}>{ipcCode} : Q1({ipcQ1}년), Q2({ipcMedian}년), Q3({ipcQ3}년)</span></td>
                  </tr>
                  <tr>
                    <td>2단계</td>
                    <td>기술수명영향요인평가</td>
                    <td><span className={styles["blue-text"]}>획득값{ipcScore}점, 기준값60점, 최소값20점</span></td>
                  </tr>
                  <tr>
                    <td>3단계</td>
                    <td>기술의경제적수명 적용기간결정</td>
                    <td>대상기술의경제적수명<br />= Q2 + (Q3 - Q2)×[(획득값-기준값)/(100-기준값)],<br /> if 획득값 {"<"} 기준값 <br /><span className={styles["blue-text"]}> = {ipcQ1} + ({ipcMedian}-{ipcQ1}) × ({ipcScore}-60)/(100-60) = {techLifeSpan}(년)</span></td>
                  </tr>
                  <tr>
                    <td>4단계</td>
                    <td>특허권의잔존권리기간</td>
                    <td><span className={styles["blue-text"]}>{patentLegalLifeSpan}년</span></td>
                  </tr>
                  <tr>
                    <td>5단계</td>
                    <td>현금흐름추정기간결정 </td>
                    <td><span className={styles["blue-text"]}>{techLifeSpan}년</span></td>
                  </tr>
                </table>
              </div>
              <p className={`gray-text ${styles["body-text"]} ${styles["bullet-point"]}`}>
                평가결과를 활용하여 기술의 경제적 수명을 산출하면 <span className={styles["blue-text"]}>{techLifeSpan}</span>년으로 산출되고,
                법적 잔존기간 <span className={styles["blue-text"]}>{patentLegalLifeSpan}</span>년과 비교하면 기술의 경제적 수명이 짧아
                정량적 산식에 의한 기술의 경제적 수명은 <span className={styles["blue-text"]}>{techLifeSpan}</span>년으로 산정된다.
                그에 따라 {currentActualYear}년부터
                매출액이 발생하는 것으로 가정하고, 이후 현금흐름추정기간 만료연도인 <span className={styles["blue-text"]}>{currentActualYear + techLifeSpan - 1}
                </span>년까지 매출액을 추정하는 것으로 하여 현금흐름을 추정하였다.
              </p>
              <div className={styles.footer}>
                <hr className={styles["hr-line"]} />
                <p className={`gray-text ${styles["body-text"]} ${styles.footnote}`}>
                  <sup>2</sup> ‘기술가치평가 실무가이드’에 따라 기술의 경제적 수명 적용기간 {'\<'} 법적 잔존기간 {'→'} 기술의 경제적 수명을 유효수명으로 적용한다.
              </p>
              </div>
            </div>
          </div>
        </div>
        <div id="revenue" className={styles.page}>
          <div className={styles.revenue}>
            <div className={styles.header}>
              <img className={styles["top-image"]} src="/images/top-image2.png" alt="" />
              <h1 className={styles["background-accent"]}>2.2. 매출액 추정</h1>
            </div>
            <div className={styles["revenue-inner-wrapper"]}>
              <div className={styles["revenue-body"]}>
                {/* <h1>1. 평가 방법</h1> */}
                <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                  매출액의 추정은 사업주체의 경영역량(개발, 생산, 마케팅, 인력
                  등), 기존 제품과의 경쟁력 분석 등을 통해 이루어진다. 본
                  평가에서는 동사의 평가대상 특허의 매출실적을 반영하여 매출액을
                  추정하였다.
                </p>{" "}
                <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                  평가 기준일 시점을 고려하여 평가대상기술
                  제품의 매출액 규모는 동사 자료를 통해 파악한 <span className={styles["blue-text"]}>{currentFinancialYear}</span>
                  년 기준 <span className={styles["blue-text"]}>{addComma(lastThreeYearRevenues[2])}</span> 백만 원을
                  기준으로 향후 매출액을 추정하였다.
                </p>
                <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                  매출액 추정에서 있어 본 평가에서는 제품수명주기의 특성을
                  반영하였다. 제품수명주기의 특징 상 성숙기 때 매출이 정체기를
                  겪다 하락 하면서 쇠퇴기를 맞기에 각 시나리오 별로 성장률을
                  조정하여 지속적으로 성장하던 성장률이 정체 후 하락하는 것으로
                  반영하였다.
                </p>
                <div>
                  <h4>[표 2-4] 동사의 <span className={styles["blue-text"]}>′17~′19년</span> 매출 실적</h4>
                  <p className={styles.unit}>(단위 : 백만원, %)</p>
                  <table>
                    <tr>
                      <th>구분</th>
                      <th>{currentFinancialYear - 2}</th>
                      <th>{currentFinancialYear - 1}</th>
                      <th>{currentFinancialYear}</th>
                      <th>CAGR</th>
                    </tr>
                    <tr>
                      <td>매출액</td>
                      <td><span className={styles["blue-text"]}>{addComma(lastThreeYearRevenues[0])}</span></td>
                      <td><span className={styles["blue-text"]}>{addComma(lastThreeYearRevenues[1])}</span></td>
                      <td><span className={styles["blue-text"]}>{addComma(lastThreeYearRevenues[2])}</span></td>
                      <td><span className={styles["blue-text"]}>{decimalToPercent(CAGR)}%</span></td>
                    </tr>
                  </table>
                </div>
                <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                  동사의 매출액에서 평가대상 특허가 차지하는 비율은{" "}
                  <span className={styles["blue-text"]}>{revenueRoyaltyRatio}</span>%이고, 이를 고려하여 추정된 국내 매출액은
                  다음과 같다
                </p>
                <div>
                  <h4>[표 2-5] 국내 매출액 추정</h4>
                  <p className={styles.unit}>(단위: 백만원)</p>
                  {renderRevenueFlow()}
                </div>
              </div>
            </div>
            <img className={styles["bottom-logo"]} src="/images/logo.svg" />
          </div>
        </div>
        <div id="royalty" className={styles.page}>
          <div className={styles.royalty}>
            <div className={styles["background-gradient"]}></div>
            <div className={styles["background-image"]}></div>

            <div className={styles["royalty-inner-wrapper"]}>
              <div className={styles.header}>
                <h1 className={styles["background-accent"]}>
                  2.3. 적정 로열티율 결정
                </h1>
              </div>
              <div className={styles["royalty-body"]}>
                <p className={styles["accent-text"]}>(1) 적정 로열티율 산출</p>
                <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                  ‘기술가치평가 실무가이드’에서 제시하고 있는 업종별 로열티
                  요약통계 자료에서 ‘{ksic.title}({ksic.ksic})’의 중앙값은{" "}
                  {matchingRoyaltyCode.median}%이며 Q1과 Q3는 각각{" "}
                  {matchingRoyaltyCode.q1}%, {matchingRoyaltyCode.q3}%이다.
                </p>
                <p className={styles["accent-text"]}>(2) 조정 계수</p>
                <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                  로열티공제법에서는 업종별 거래사례 로열티 통계나 업종별 로열티 통계를
                  이용하여 로열티 적정범위(하한~상한)를 정한 다음, 최종 로열티를 결정하기 위해
                  조정계수를 활용하여 기준 로열티율의 대상이 되는 표준적인 기술과 평가대상
                  기술의 차이를 조정할 필요가 있다.
                </p>
                <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                  업종별로 로열티 적정범위가 설정된 것은 로열티가 다양한 영향용인에 의해 서로
                  다르게 결정되고 있다는 것을 반영한 것이다. 로열티에 영향을 미치는 요인은
                  국내외 라이선스 연구와 IP가치평가핵심요인을 의미한다. 평가대상 기술은
                  영향요인의 평가결과에 따라 적정 범위 내에서 대해 차별적인 로열티율을 갖게
                  된다. 각각의 로열티 영향요인은 개별항목당 5점 척도로 평가하고, 10개
                  평가항목에 대한 배점은 50점이다. 본 평가에서 조정계수는 {royaltyCodeTotalScore}점으로 산출되었다
                </p>
                <p className={styles["accent-text"]}>(3) 합리적 로열티율</p>
                <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                  합리적 로열티율의 산식은 다음과 같다.
                </p>
                <div
                  className={`${styles["background-accent"]} ${styles["royalty-formula"]}`}
                >
                  <p>합리적 로열티율</p>
                  <p> = Rm + (R3 – Rm)[(획득값 - 기준값)/(최대값 - 기준값)], 획득값 ≥ 기준값</p>
                  <p>= R1 + (Rm – R1)[(획득값 - 최소값)/(기준값 - 최소값)], 획득값 {"<"} 기준값</p>
                  <p>◦ Rm: 업종별 로열티 통계의 중앙값</p>
                  <p>◦ R3: 업종별 로열티 통계의 삼사분위값(또는 최대값)</p>
                  <p>◦ R1: 업종별 로열티 통계의 일사분위값(또는 최소값)</p>
                  <p>◦ 획득값: {"< 표 10 >"} 에서 구한 평점</p>
                  <p>◦ 기준값: 30점</p>
                  <p>◦ 최대값: 50점</p>
                </div>
                <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                  산출 된 합리적 로열티율은 {decimalToPercent(royaltyRate)}%로 산정되었다.
                </p>
                <div>
                  <h4>[표 2-6] 적정 로열티율 산출</h4>
                  <table>
                    <tr>
                      <th>기준 로열티율</th>
                      <th>상한값 </th>
                      <th>하한값</th>
                      <th>조정계수</th>
                      <th>합리적 로열티율</th>
                    </tr>
                    <tr>
                      <td>{matchingRoyaltyCode.median}%</td>
                      <td>{matchingRoyaltyCode.q3}%</td>
                      <td>{matchingRoyaltyCode.q1}%</td>
                      <td>{royaltyCodeTotalScore}</td>
                      {royaltyCodeTotalScore < 30
                        ? <td>{decimalToPercent(royaltyRate)}% = {matchingRoyaltyCode.q1}+({matchingRoyaltyCode.median}-{matchingRoyaltyCode.q1})*({royaltyCodeTotalScore}-10)/(30-10)</td>
                        : <td>{decimalToPercent(royaltyRate)}% = {matchingRoyaltyCode.median}+({matchingRoyaltyCode.q3}-{matchingRoyaltyCode.median})*({royaltyCodeTotalScore}-30)/(50-30)</td>
                      }
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="tax" className={styles.page}>
          <div className={styles.tax}>
            <div className={styles["background-gradient"]}></div>
            <div className={styles["background-image"]}></div>
            <div className={styles["tax-inner-wrapper"]}>
              <p className={styles["accent-text"]}>(4) 최종 로열티율</p>
              <div
                className={`${styles["background-accent"]} ${styles["final-royalty-formula"]}`}
              >
                <p>최종 로열티율 = 힙리적 로열티율 × 지식재산 보호비중</p>
                <p>◦ 합리적 로열티율 = 기준 로열티율 × 조정계수 </p>
                <p>◦ 지식재산 보호비중 : 대상 지식재산이 대상기술 제품에서 차지하는 비율(0 ~ 100%)</p>
              </div>
              <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                지식재산 보호비중은 매출액 추정에 사용되는 전체 제품(또는 서비스)에서 특허권
                등 지식재산권으로 보호되는 비중을 의미함. 전체 제품을 구성하는 세부기술을
                분류하여 원가비중, 소비자의 구매요인 비중, 전문가의 정성적 평가 등을 통해
                비중을 산정한다.
                </p>
              <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                미국 특허소송에서의 총 시장가치 포함의 법리(Entire Market Value Rule)를
                적용하여 대상지식재산으로 보호되는 기술이 소비자 구매 요인의 기초가 되거나
                제품의 실질적인 가치를 창출하는 것으로 판단되는 경우, 지식재산 보호비중을
                100%로 반영할 수 있다. 본 평가에서는 동업종 평균 지식재산 보호비중인 {(royaltyIpRate * 100).toFixed(0)}%를
                반영하였다.
                </p>
              <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                따라서 앞서 산출된 합리적 로열티율에 지식재산 보호비중을 반영하여 산출된
                  최종 로열티율은 {decimalToPercent(finalRoyaltyRate)}%이다.
                </p>
              <div className={styles.header}>
                <h1 className={styles["background-accent"]}>2.4 법인세</h1>
              </div>
              <p className={`gray-text ${styles["body-text"]}  ${styles['bullet-point']}`}>
                미래 현금흐름의 추정에서 법인세는 향후 실제 부담할 법인세를
                말하는 것으로, 영업이익(EBIT)에 대한 법인세 부담액을 계산한다.
              </p>
              <p className={`gray-text ${styles["body-text"]}  ${styles['bullet-point']}`}>
                기술가치평가 실무가이드(2017)에 따른 법인세율 과세표준은 2억 원
                이하가 10%, 2억 원~ 200억 원 20%, 200억 원 ~ 3000억 원 22%,
                3000억 원 초과가 25%이다. 추정 연도별로 산정된 영업 이익의
                규모에 따라 법인세율과 주민세를 포함하여 계산하였다.
              </p>
              <div>
                <h4>[표 2-7] 법인세율 과세표준</h4>
                <table
                  className={`gray-text ${styles["body-text"]} ${styles["table-white"]}`}
                >
                  <tr>
                    <th>과세 표준 영업이익</th>
                    <th>세율</th>
                    <th>비고</th>
                    <th>주민세<br></br>포함<br></br>세율</th>
                  </tr>
                  <tr>
                    <td>2억 원 이하</td>
                    <td>10%</td>
                    <td>과세표준의 10%</td>
                    <td>10%</td>
                  </tr>
                  <tr>
                    <td>2억 원 초과 ~ <br></br>200억 원 이하</td>
                    <td>20%</td>
                    <td>2천만 원 + (2억 원을 초과하는 금액의 20%)</td>
                    <td>22%</td>
                  </tr>
                  <tr>
                    <td>200억 원 초과 ~ <br></br>3000억 원 이하</td>
                    <td>22%</td>
                    <td>39.8억 원 + (200억 원을 초과하는 금액의 22%)</td>
                    <td>24.2%</td>
                  </tr>
                  <tr>
                    <td>3000억 원 초과</td>
                    <td>25%</td>
                    <td>655.8억 원 + (3000억 원을 초과하는 금액의 25%)</td>
                    <td>27.5%</td>
                  </tr>
                </table>
              </div>
              <div className={styles.footer}>
                <hr className={styles["hr-line"]} />
                <p className={`gray-text ${styles["body-text"]} ${styles.footnote}`}>
                  <sup>3</sup>  산업통상자원부, ‘기술가치평가 실무가이드’, 2014.12, p.43.
              </p>
              </div>
            </div>
          </div>
        </div>
        <div id='discount' className={styles.page}>
          <div className={styles.discount}>
            <div className={styles["background-gradient"]}></div>
            <div className={styles["background-image"]}></div>
            <div className={styles["discount-inner-wrapper"]}>
              <div>
                <img className={styles["side-image"]} src="/images/side-image1.png" alt="" />
                <div className={styles.header}>
                  <h1 className={styles["background-accent"]}>2.5 할인율</h1>
                </div>
                <div className={styles["overwrap-image"]}>
                  <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                    기술가치평가의 할인율(이하 ‘할인율’)은 기술사업화 과정에 내재된
                다양한 위험을 반영한 할인율(risk-adjusted discount rate)<sup>3</sup>을
                의미하며, 이는 경제적 수명기간 동안 창출될 미래 현금흐름을
                현재가치로 전화할 때 사용되는 환원율을 의미한다.
              </p>
                  <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                    할인율은 대상기술의 사업화에서 발생할 수 있는 잠재적 위험을
                    평가하여 정량화하는 것으로 기술위험, 시장위험, 사업위험 등을
                    분석하여 그 결과를 반영하며, 기술가치평가의 할인율은 기업가치
                    할인율 구성요소인 자기자본비용과 타인자본비용에 추가
                    위험프리미엄을 도입한 것으로 이해할 수 있다.
              </p>
                  <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                    가중평균자본비용(WACC)에서의 타인자본비용은 대상기술의
                    사업주체나 유사기업의 재무 분석을 통해 관측이 가능한 반면,
                    자기자본비용은 객관적 측정이 곤란하므로 자본자산가격모형(CAPM:
                    Capital Asset Pricing Model)을 활용하여 자본시장에서 관측된
                    정보로부터 산출하여 대용치(proxy)로 사용하고 있다.
              </p>
                </div>
                <div
                  className={`${styles["background-accent"]} ${styles["discount-formula"]} `}
                >
                  <p>가중평균자본비용(WACC) =</p>
                  <p>
                    자기자본비용x자기자본구성비
                    +타인자본비용x타인자본구성비x(1-법인세율)
                </p>
                </div>
                <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                  기술성 및 시장성에 대한 분석결과를 바탕으로 한 사업화위험
                평가점수는 <span className={styles["blue-text"]}>{discountRateTotalScore}</span>점으로 결정되었으며, 이에
                해당하는 기술사업화 위험프리미엄은{" "}
                  <span className={styles["blue-text"]}>{decimalToPercent(riskPremium)}</span>%이다.
              </p>
                <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                  평가대상 기술제품은 한국표준산업분류상 <span className={styles["blue-text"]}>‘{ksic.title}({ksic.ksic}
                )’</span>에 해당되어 이를 적용하여 CAPM<sup>4</sup> , 규모 위험프리미엄,
                타인자본비용, 자기자본비율 등을 산정하였으며, 이러한 산출값과
                할인율 (WACC) 산출식(=
                자기자본비용x자기자본비율+타인자본비용x타인자본비율x(1-법인세율))으로부터
                할인율은 <span className={styles["blue-text"]}>{decimalToPercent(discountRate)}</span>%로 계산되었다. 참고로
                평가대상 특허기술의 사업화 주체는{" "}
                  <span className={styles["blue-text"]}> {companySizeTitle.replace("비상장 ", "")}</span>
                이므로, 그에 따라 사업화 주체는
                <span className={styles["blue-text"]}> {companySizeTitle}</span>으로 가정하였다.
              </p>
              </div>
              <div className={styles.footer}>
                <hr className={styles["hr-line"]} />
                <p className={`gray-text ${styles["body-text"]} ${styles.footnote}`}>
                  <sup>3</sup>위험자산 투자에서 현재가치를 산출하기 위해 무위험 이자율에 기대 위험프리미엄 (expected risk premium)을 가산한비율(rate)을 의미함.<br></br>
                  <sup>4</sup>CAPM(Capital Asset Pricing Model, 자본자산가격결정모형).
              </p>
              </div>
            </div>
          </div>
        </div>
        <div id='discount2' className={styles.page}>
          <div className={styles.discount2}>
            <div className={styles["background-gradient"]}></div>
            <div className={styles["background-image"]}></div>
            <div className={styles["discount2-inner-wrapper"]}>
              <div>
                <h4>[표 2-8] 산업별 할인율 산출표 (2017년도 적용기준)</h4>
                <table
                  className={`gray-text ${styles["body-text"]} ${styles["table-white"]}`}
                >
                  <tr>
                    <th rowSpan={3}>산업</th>
                    <th colSpan={5}>자기자본비용(사업화프리미엄 가산 전)</th>
                    <th rowSpan={3}>자기자본비율</th>
                    <th colSpan={5}>세전 타인자본비용</th>
                  </tr>
                  <tr>
                    <th rowSpan={2}>상장 CAPM</th>
                    <th colSpan={4}>비상장</th>
                    <th rowSpan={2}>상장</th>
                    <th rowSpan={2}>대</th>
                    <th rowSpan={2}>중</th>
                    <th rowSpan={2}>소</th>
                    <th rowSpan={2}>창업</th>
                  </tr>
                  <tr>
                    <th>대</th>
                    <th>중</th>
                    <th>소</th>
                    <th>창업</th>
                  </tr>
                  {Object.keys(industryDiscountRates).map(key => {
                    const dr = industryDiscountRates[key];
                    return (<tr>
                      <td>{key}</td>
                      <td>{dr.equity.CAPM}</td>
                      <td>{dr.equity.big}</td>
                      <td>{dr.equity.medium}</td>
                      <td>{dr.equity.small}</td>
                      <td>{dr.equity.startup}</td>
                      <td>{dr.capitalAdequacyRatio}</td>
                      <td>{dr.debt.CAPM}</td>
                      <td>{dr.debt.big}</td>
                      <td>{dr.debt.medium}</td>
                      <td>{dr.debt.small}</td>
                      <td>{dr.debt.startup}</td>
                    </tr>);
                  })}
                </table>
              </div>
              <div>
                <h4>[표 2-9] 할인율</h4>
                <table
                  className={`gray-text ${styles["body-text"]} ${styles["table-white"]}`}
                >
                  <tr>
                    <th rowSpan={2}>자기자본비용</th>
                    <th>CAPM/규모프리미엄</th>
                    <th>기술사업화위험프리미엄</th>
                    <th>합계</th>
                  </tr>
                  <tr>
                    <td><span className={styles["blue-text"]}>{decimalToPercent(equitySizePremium)}%</span></td>
                    <td><span className={styles["blue-text"]}>{decimalToPercent(riskPremium)}%</span></td>
                    <td><span className={styles["blue-text"]}>{decimalToPercent(equitySizePremium + riskPremium)}%</span></td>
                  </tr>
                  <tr>
                    <th>타인자본비용</th>
                    <td colSpan={3}><span className={styles["blue-text"]}>{decimalToPercent(debtSizePremium)}%</span></td>
                  </tr>
                  <tr>
                    <th>자기자본비율</th>
                    <td><span className={styles["blue-text"]}>{industryDiscountRate.capitalAdequacyRatio}%</span></td>
                    <th>타인자본비율</th>
                    <td><span className={styles["blue-text"]}>{100 - industryDiscountRate.capitalAdequacyRatio}%</span></td>
                  </tr>
                  <tr>
                    <th>법인세율</th>
                    <td colSpan={3}><span className={styles["blue-text"]}>{decimalToPercent(corporateTaxRate)}</span></td>
                  </tr>
                  <tr>
                    <th>WACC</th>
                    <td colSpan={3}><span className={styles["blue-text"]}>{`${decimalToPercent(
                      discountRate
                    )}% = (${decimalToPercent(
                      equitySizePremium + riskPremium
                    )}% * ${industryDiscountRate.capitalAdequacyRatio
                      }%) + (${decimalToPercent(debtSizePremium)}% * ${100 - industryDiscountRate.capitalAdequacyRatio
                      }%) * (1- ${decimalToPercent(corporateTaxRate)}%)`}</span></td>
                  </tr>
                </table>
              </div>
              <div className={styles.header}>
                <h1 className={styles["background-accent"]}>2.6 지식재산 유효성</h1>
              </div>
              <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                지식재산 유효성은 유효한 권리로서 인정될 수 있고 지식재산거래시장에서 거래될
                수 있는가에 대한 지표이다. 대상지식재산이 권리로서 유효한지, 대상지식재산
                제품을 모방으로부터 보호할 수 있는지, 지식재산권 행사의 용이성 여부, 해당
                분야의 지식재산거래 및 분쟁 등의 활성도를 평가항목으로 포함하고 있다. 본
                평가에서는 지식재산 유효성은 {(royaltyIpRate * 100).toFixed(0)}%로 산정하였다.
              </p>
            </div>
          </div>
        </div>
        <div id='final-value' className={styles.page}>
          <div className={styles["final-value"]}>
            <div className={styles["background-gradient"]}></div>
            <div className={styles["background-image"]}></div>
            <div className={styles["final-value-inner-wrapper"]}>
              <h1 className={styles["background-accent"]}>3. IP 가치산정</h1>
              <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                매출액에 적정 로열티율을 곱하여 로열티수입을 산출하고 법인세를
                차감하면 세후 로열티수입이 산출된다. 여기에 할인율을 적용하면
                세후 로열티수입의 현재가치가 산출되고 산출된 현재가치의 합계가
                기술가치이다.
              </p>
              <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                계산된 평가대상 기술제품의 로열티율은{" "}
                {decimalToPercent(royaltyRate)}%로 이는 매출액에서 로열티가
                차지하는 비율이라고 할 수 있다. 이를 토대로 기술의 경제적
                수명만큼 추정된 매출액에서 해당하는 로열티수입을 계산하여 IP의
                가치를 산정하였다.
              </p>
              <div>
                <h4>[표 2-10] 가치평가표</h4>
                <p className={styles["unit"]}>(단위 : 백만 원)</p>
                {renderFinalValueTable()}
              </div>
              <p className={`gray-text ${styles["body-text"]} ${styles['table-footnote']}`}>* 주) 특허의 경제적 기술수명(내용연수) 기한 : {now.getFullYear() + techLifeSpan - 1}년 12월 31일 <br />
                  ※ 평가기준일 : {now.getFullYear()}년 {now.getMonth() + 1}월 {now.getDate()}일</p>
              <p className={`gray-text ${styles["body-text"]} ${styles['bullet-point']}`}>
                로열티공제법에 따라 평가된 기술가치는 <span className={styles["blue-text"]}>{finalIpValue}</span>
                백만 원으로 산정되었다. 평가결과를 기반으로 보수적 관점(평가결과*0.8)과 낙관적관점(평가결과*1.2)을 고려하여 평가된 특허기술의 가치는
                평가기준일({now.getFullYear()}년 {now.getMonth() + 1}월 {now.getDate()}일)
                현재 <span className={styles["blue-text"]}>
                  {finalIpLowerBound}
                   ~
                  {finalIpHighBound}
                </span> 백만 원으로 산출되었다
              </p>
            </div>
          </div>
        </div>
        <div className={styles['float-button-wrapper']}>
          <div onClick={scrollToTop} className={styles['to-top']}><FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon></div>
          <div onClick={savePdf} className={styles['save-report']}><FontAwesomeIcon icon={faSave}></FontAwesomeIcon></div>
        </div>
        <div className={styles['float-button-wrapper-mobile']}>
          <button onClick={() => {
            savePdf();
          }} className={`${styles['save-report']} btn`}>보고서 다운로드</button>
        </div>
      </main>
    </Layout >
  );
}

export async function getServerSideProps(context) {
  const user = await AuthUtil.protectRoute(context);
  if (user == null) {
    return { props: {} };
  }

  const { query, res } = context;

  let requiredQueries = [
    "patentNumber",
    "firstRvn",
    "secondRvn",
    "thirdRvn",
    "companySize",
    "industryCode",
    "revenueRoyaltyRatio",
    "ipcCode",
    "registrationNumber",
    "evaluationDate"
  ];

  const companySizeOptions = {
    CAPM: "상장기업",
    big: "비상장 대기업",
    medium: "비상장 중기업",
    small: "비상장 소기업",
    startup: "비상장 창업기업",
  };

  const { companySize } = query;

  let isQueryValid = true;
  requiredQueries.forEach((rq) => {
    if (!query.hasOwnProperty(rq) || JsUtil.isUndefinedOrFalsy(query[rq])) {
      isQueryValid = false;
    }
    return rq;
  });

  if (!isQueryValid) {
    res.setHeader("location", "/error/400");
    res.statusCode = 302;
    res.end();
    return;
  }
  const purchasedReport = await PatentInfoDb.findPurchasedReportByUserId(user.userId, query.patentNumber);
  Logger.debug("full-report: purchasedReport: ", purchasedReport);
  Logger.debug("full-report: user.userId: ", user.userId);
  Logger.debug("full-report: query.patentNumber: ", query.patentNumber);
  if (purchasedReport == null) {
    Logger.debug("purchasedReport is null", user.userId, query.patentNumber);

    res.setHeader("location", "/purchase-points");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  const calculator = new IpCalculator(query);

  let result = await calculator.calculateIpValue();

  const ksic = await KsicDb.findByKsic(query.industryCode);
  result.ksic = ksic;
  let ipc = await KiprisApiService.getIpc(
    query.patentNumber
  );
  const parsed = await xml2js.parseStringPromise(ipc);
  const patentInfo = parsed.response.body[0].items[0].item[0];
  result.patentInfo = patentInfo;
  result.lastThreeYearRevenues = result.lastThreeYearRevenues;

  const companySizeTitle = companySizeOptions[companySize];
  result.companySizeTitle = companySizeTitle;
  result.revenueRoyaltyRatio = query.revenueRoyaltyRatio;

  let ipcName = await IpcDb.findNameByCode(result.matchingIpcCode.ipcCode);
  ipcName = ipcName?.ipc_name;
  result.ipcName = ipcName;

  return {
    props: { result, query, user },
  };
}
