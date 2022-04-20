export default function getReportData() {
  return {
    ...reportBaseData,
    ...getEstimatedSalesTableData(),
    ...getTlafTableData(),
    ...getConfirmationFactorTableData(),
    ...getDiscountRateTableData(),
    ...getEvalTableData()
  }
}

let reportBaseData = {
  tech_price: '64.3',   // 기술 가치 금액
  tech_exp_date: '2022년 09월 30일',   // 기술가치 유효기간 (yyyy년 mm월 dd일)
  applicant_num: 'KR 10-1491762',   // 출원 번호
  cashflow_from: '2022',    // 현금흐름 추정기간 From
  cashflow_to: '2046',      // 현금흐름 추정기간 To
  tech_life: '23',   // 기술의 경제적 수명 (기간)
  tech_life_to: '2044',  // 기술 경제적 수명 To (연도)
  preparation_period: '2',    // 사업화 준비기간
  royalty_rate_final: '16.13',    // 적정(합리적) 로열티율
  royalty_rate_base: '3.84',    // 기준 로열티율
  discount_rate: '11.48',   // 할인율
  industry_code: '기타 기계 및 장비 제조업 (C29)',    // 업종
  enterprise_size: '비상장 소기업',   // 기업분류 (규모)
  ipc: 'H01L',    // IPC
  tct_title: '반도체 장치; 다른 곳에 속하지 않는 전기적 고체 장치',    // TCT 지수 제목
  tct_avg: '7.75',    // TCT 지수 평균
  tct_q1: '3',    // TCT 지수 Q1
  tct_median: '6',    // TCT 지수 중앙값
  tct_q3: '10',    // TCT 지수 Q3
  eval_date: '2022년 4월 1일',    // 평가기준일 (yyyy년 mm월 dd일)
  invention_title: '박막 증착 장치 및 방법',   // 특허의 명칭
  applicant_date: '2014.07.16',   // 출원일
  duration: '2034.07.16',   // 존속기간
  remain_period: '12',    // 잔존기간
  tlaf_score_total: '121.0',    // 기술수명 영향요인 총점
  tlaf_output: '59.0',    // 기술수명 영향요인 산출값 (획득값)
  tech_weight: '35.0',    // 기술의 비중
  industry_royalty_median: '3.00',    // 업종 로열티율 중앙값
  pioneer_rate: '10',   // 개척률
  risk_score_total: '34',   // 기술사업화 위험프리미엄 점수 합계
  risk_premium: '3.80',   // 기술사업화 위험프리미엄
  ksic: '기타 기계 및 장비 제조업(C29)',    // 한국표준사업분류
  corporate_tax_percent: '11.00',   // 법인세율(%)
  corporate_tax: '0.1100',   // 법인세율
  cf_total: '6',    // 조정계수 평점 합계
  cf_final: '1.20',   // 조정계수
  cf_final_percent: '120',    // 조정계수(%)
  wacc: '11.48',    // WACC
  capital_mine_base: '10.21',   // 자기자본비용 (위험프리미엄 적용 전)
  capital_mine: '14.01',    // 자기자본비용
  capital_others: '8.30',   // 타인자본비용
  capital_mine_rate: '61.75',   // 자기자본비율
  capital_others_rate: '38.25',   // 타인자본비율

  risk_tech_1: '4',   // 기술사업화 위험프리미엄 산출표 - 기술 및 권리위험 - 차별성
  risk_tech_2: '2',   // 기술사업화 위험프리미엄 산출표 - 기술 및 권리위험 - 기술경쟁강도
  risk_tech_3: '3',   // 기술사업화 위험프리미엄 산출표 - 기술 및 권리위험 - 기술사업화 환경
  risk_tech_4: '4',   // 기술사업화 위험프리미엄 산출표 - 기술 및 권리위험 - 모방난이도
  risk_tech_5: '3',   // 기술사업화 위험프리미엄 산출표 - 기술 및 권리위험 - 권리안정성
  risk_market_1: '2',   // 기술사업화 위험프리미엄 산출표 - 시장 및 사업위험 - 시장진입 가능성
  risk_market_2: '4',   // 기술사업화 위험프리미엄 산출표 - 시장 및 사업위험 - 시장경쟁강도
  risk_market_3: '4',   // 기술사업화 위험프리미엄 산출표 - 시장 및 사업위험 - 시장의 성장 전망
  risk_market_4: '4',   // 기술사업화 위험프리미엄 산출표 - 시장 및 사업위험 - 생산용이성
  risk_market_5: '4',   // 기술사업화 위험프리미엄 산출표 - 시장 및 사업위험 - 수익성

  t1: '0',    // 기술성(권리성 포함) 평가 - 우월성
  t2: '0',    // 기술성(권리성 포함) 평가 - 혁신성
  t3: '0',    // 기술성(권리성 포함) 평가 - 차별성
  t4: '0',    // 기술성(권리성 포함) 평가 - 기술 경쟁 강도
  t5: '0',    // 기술성(권리성 포함) 평가 - 대체 가능성
  t6: '0',    // 기술성(권리성 포함) 평가 - 활용성
  t7: '0',    // 기술성(권리성 포함) 평가 - 전망성
  t8: '0',    // 기술성(권리성 포함) 평가 - 파급성
  t9: '0',    // 기술성(권리성 포함) 평가 - 진부화 가능성
  t10: '0',    // 기술성(권리성 포함) 평가 - 기술 사업화 환경
  t11: '0',    // 기술성(권리성 포함) 평가 - 모방 난이도
  t12: '0',    // 기술성(권리성 포함) 평가 - 권리 보호 강도
  t13: '0',    // 기술성(권리성 포함) 평가 - 권리 안정성
  t14: '0',    // 기술성(권리성 포함) 평가 - 침해 발견 및 입증 용이성
  t15: '0',    // 기술성(권리성 포함) 평가 - 신규성 또는 진보성 무효 가능성
  t16: '0',    // 기술성(권리성 포함) 평가 - 기타 요인에 의한 무효 가능성
  t17: '0',    // 기술성(권리성 포함) 평가 - 해당 제품(서비스) 보호 가능성
  t18: '0',    // 기술성(권리성 포함) 평가 - 국내외 IP포트폴리오 구축의 적합성
  t19: '0',    // 기술성(권리성 포함) 평가 - 권리 행사 제한 가능성
  t20: '0',    // 기술성(권리성 포함) 평가 - 분쟁 및 라이센스 활성도
  t21: '0',    // 기술성(권리성 포함) 평가 - 특허 출원 활성도
  m1: '0',    // 사업성(시장성 포함) 평가 - 시장 진입 가능성
  m2: '0',    // 사업성(시장성 포함) 평가 - 시장 경쟁 강도
  m3: '0',    // 사업성(시장성 포함) 평가 - 시장 경쟁의 변화
  m4: '0',    // 사업성(시장성 포함) 평가 - 시장의 성장 전망
  m5: '0',    // 사업성(시장성 포함) 평가 - 신제품 출현 가능성
  m6: '0',    // 사업성(시장성 포함) 평가 - 수요 민감도
  m7: '0',    // 사업성(시장성 포함) 평가 - 예상 시장 점유율
  m8: '0',    // 사업성(시장성 포함) 평가 - 사업화 준비 기간
  m9: '0',    // 사업성(시장성 포함) 평가 - 사업화 소요 자금
  m10: '0',    // 사업성(시장성 포함) 평가 - 생산 용이성
  m11: '0',    // 사업성(시장성 포함) 평가 - 경제적 수명
  m12: '0',    // 사업성(시장성 포함) 평가 - 매출 성장 추세
  m13: '0',    // 사업성(시장성 포함) 평가 - 수익성
  m14: '0',    // 사업성(시장성 포함) 평가 - 파생적 매출
}

// 추정 매출액 표 (HTML)
function getEstimatedSalesTableData() {
  // TODO: input parameter 형식이 이렇게 되어야함
  const input = [
    {
      year: '2022',
      sales: '0'
    },
    {
      year: '2023',
      sales: '0'
    },
    {
      year: '2024',
      sales: '455'
    },
    {
      year: '2025',
      sales: '1,536'
    },
    {
      year: '2026',
      sales: '13,821'
    },
    {
      year: '2027',
      sales: '21,852'
    },
    {
      year: '2028',
      sales: '27,942'
    },
    {
      year: '2029',
      sales: '25,236'
    },
  ]

  /*
  let result = '<table style="width: 100%; text-align: center;"><tr style="background-color: #3C4552; color: white; font-weight: bold;">'

  result += `<th style="outline: black 1px solid; padding: 5px 0;">구분</th>`

  for (let i = 0; i < input.length; i++) {
    result += `<td style="outline: black 1px solid;">${input[i].year}</td>`
  }

  result += `</tr><tr><th style="outline: black 1px solid; padding: 5px 0;">매출액</th>`

  for (let i = 0; i < input.length; i++) {
    result += `<td style="outline: black 1px solid;">${input[i].sales}</td>`
  }

  result += '</tr></table>'
  */

  const from = 2022;
  const to = 2046;
  let result = [];
  let temp = 0
  for (let year = from; year <= to; year++) {
    result.push({
      year: year,
      sales: temp.toLocaleString()
    })
    temp += getRandomInteger(0, 10000)
  }

  return {
    estimated_sales_table: result
  };
}

// 기술수명 영향요인 평가표
function getTlafTableData() {
  // TODO: input parameter 형식이 이렇게 되어야함
  const input = [
    4, 3, 2, 2, 3, 4, 1, 5, 4, 1
  ]

  const columnCount = 10    // 행
  const rowCount = 9    // 열

  let inputData = [];
  for (let i = 0; i < input.length; i++) {
    let temp = input[i];
    let idx = (temp - 1) * 2
    inputData.push(idx)

  }

  let result = {};

  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      let key = `tlaf_${column}${row}`;
      result[key] = (inputData[column] === row) ? 'O' : ''
    }
  }

  return result;
}

// 가치 평가표
function getEvalTableData() {
  const from = 2022;
  const to = 2046;
  let result = []
  for (let year = from; year <= to; year++) {
    result.push({
      year: year,
      sales: `${getRandomInteger(10000, 50000)}`.toLocaleString(),
      royalty_rate: `${getRandomInteger(0, 99)}.${getRandomInteger(0, 99)}`,
      royalty_income: `${getRandomInteger(0, 99)}.${getRandomInteger(0, 9)}`,
      corporate_tax: `${getRandomInteger(0, 99)}.${getRandomInteger(0, 9)}`,
      royalty_after_tax: `${getRandomInteger(0, 99)}.${getRandomInteger(0, 9)}`,
      suspension: `0.${getRandomInteger(0, 9999)}`,
      present_value: `${getRandomInteger(0, 99)}.${getRandomInteger(0, 9)}`
    })
  }
  return { eval_table: result }
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 조정계수 산출표
function getConfirmationFactorTableData() {
  // TODO: input parameter 형식이 이렇게 되어야함
  const input = [
    0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0
  ]

  const columnCount = 17    // 행
  const rowCount = 5    // 열

  let inputData = [];
  for (let i = 0; i < input.length; i++) {
    let temp = input[i];
    let idx = temp + 2
    inputData.push(idx)
  }

  let result = {};

  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      let key = `cf_${column}${row}`;
      result[key] = (inputData[column] === row) ? 'O' : ''
    }
  }

  return result;
}

// 산업별 할인율 산출표
function getDiscountRateTableData() {
  // TODO: input parameter 형식이 이렇게 되어야함
  const input = [
    {
      industry_code: 'C28',   // 산업분류코드
      capm: '6.97',   // 상장 CAPM
      major_prev: '7.48',    // 대기업 (사업화프리미엄 가산 전)
      medium_prev: '8.65',   // 중기업 (사업화프리미엄 가산 전)
      small_prev: '10.24',   // 소기업 (사업화프리미엄 가산 전)
      startUp_prev: '11.60',   // 창업기업 (사업화프리미엄 가산 전)
      capital_mine_rate: '63.43',   // 자기자본비율
      public: '4.76',   // 상장기업
      major: '5.68',    // 대기업
      medium: '6.75',   // 중기업
      small: '7.99',   // 소기업
      startUp: '9.42',   // 창업기업
    },
    {
      industry_code: 'C29',
      capm: '6.83',
      major_prev: '7.35',
      medium_prev: '8.56',
      small_prev: '10.21',
      startUp_prev: '11.61',
      capital_mine_rate: '61.75',
      public: '5.06',
      major: '5.99',
      medium: '7.06',
      small: '8.30',
      startUp: '9.73',
    },
    {
      industry_code: 'C30',
      capm: '7.37',
      major_prev: '7.85',
      medium_prev: '8.94',
      small_prev: '10.44',
      startUp_prev: '11.71',
      capital_mine_rate: '79.45',
      public: '4.54',
      major: '5.46',
      medium: '6.54',
      small: '7.77',
      startUp: '9.21',
    },
  ]

  const columnCount = 17    // 행
  const rowCount = input.length    // 열

  let result = {};

  for (let row = 0; row < rowCount; row++) {
    let key = `ds_${row}`
    result[`${key}${0}`] = input[row]['industry_code']
    result[`${key}${1}`] = input[row]['capm']
    result[`${key}${2}`] = input[row]['major_prev']
    result[`${key}${3}`] = input[row]['medium_prev']
    result[`${key}${4}`] = input[row]['small_prev']
    result[`${key}${5}`] = input[row]['startUp_prev']
    result[`${key}${6}`] = input[row]['capital_mine_rate']
    result[`${key}${7}`] = input[row]['public']
    result[`${key}${8}`] = input[row]['major']
    result[`${key}${9}`] = input[row]['medium']
    result[`${key}${10}`] = input[row]['small']
    result[`${key}${11}`] = input[row]['startUp']
  }

  return result;
}
