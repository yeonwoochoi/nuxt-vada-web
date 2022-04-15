export const state = () => ({
  evaluationData: {
    patent: {
      type: '출원번호', // 출원번호, 등록번호
      number: ''
    },
    ksic: null,
    sales: null, // can be null
    businessScale: '상장 기업'
  },
  ksicList: [
    { code: 'A01', title: '농업'},
    { code: 'A02', title: '임업'},
    { code: 'A03', title: '어업'},
    { code: 'B05', title: '석탄, 원유 및 천연가스 광업'},
    { code: 'B06', title: '금속 광업'},
    { code: 'B07', title: '비금속광물 광업;연료용 제외'},
    { code: 'B08', title: '광업 지원 서비스업'},
    { code: 'C10', title: '식료품 제조업'},
    { code: 'C11', title: '음료 제조업'},
    { code: 'C12', title: '담배 제조업'},
    { code: 'C13', title: '섬유제품 제조업; 의복제외'},
    { code: 'C14', title: '의복, 의복액세서리 및 모피제품 제조업'},
    { code: 'C15', title: '가죽, 가방 및 신발 제조업'},
    { code: 'C16', title: '목재 및 나무제품 제조업;가구제외'},
    { code: 'C17', title: '펄프, 종이 및 종이제품 제조업'},
    { code: 'C18', title: '인쇄 및 기록매체 복제업'},
    { code: 'C19', title: '코크스, 연탄 및 석유정제품 제조업'},
    { code: 'C20', title: '화학물질 및 화학제품 제조업;의약품 제외'},
    { code: 'C21', title: '의료용 물질 및 의약품 제조업'},
    { code: 'C22', title: '고무제품 및 플라스틱제품 제조업'},
    { code: 'C23', title: '비금속 광물제품 제조업'},
    { code: 'C24', title: '1차 금속 제조업'},
    { code: 'C25', title: '금속가공제품 제조업;기계 및 가구 제외'},
    { code: 'C26', title: '전자부품, 컴퓨터, 영상, 음향 및 통신장비 제조업'},
    { code: 'C27', title: '의료, 정밀, 광학기기 및 시계 제조업'},
    { code: 'C28', title: '전기장비 제조업'},
    { code: 'C29', title: '기타 기계 및 장비 제조업'},
    { code: 'C30', title: '자동차 및 트레일러 제조업'},
    { code: 'C31', title: '기타 운송장비 제조업'},
    { code: 'C32', title: '가구 제조업'},
    { code: 'C33', title: '기타 제품 제조업'},
    { code: 'C34', title: '산업용 기계 및 장비 수리업'},
    { code: 'D35', title: '전기, 가스, 증기 및 공기조절 공급업'},
    { code: 'E36', title: '수도업'},
    { code: 'E37', title: '하수, 폐수 및 분뇨 처리업'},
    { code: 'E38', title: '폐기물 수집운반, 처리 및 원료재생업'},
    { code: 'E39', title: '환경 정화 및 복원업'},
    { code: 'F41', title: '종합 건설업'},
    { code: 'F42', title: '전문직별 공사업'},
    { code: 'G45', title: '자동차 및 부품 판매업'},
    { code: 'G46', title: '도매 및 상품중개업'},
    { code: 'G47', title: '소매업; 자동차 제외'},
    { code: 'H49', title: '육상운송 및 파이프라인 운송업'},
    { code: 'H50', title: '수상 운송업'},
    { code: 'H51', title: '항공 운송업'},
    { code: 'H52', title: '창고 및 운송관련 서비스업'},
    { code: 'I55', title: '숙박업'},
    { code: 'I56', title: '음식점 및 주점업'},
    { code: 'J581', title: '서적, 잡지 및 기타 인쇄물 출판업'},
    { code: 'J582', title: '소프트웨어 개발 및 공급업'},
    { code: 'J59', title: '영상·오디오 기록물 제작 및 배급업'},
    { code: 'J60', title: '방송업'},
    { code: 'J61', title: '통신업'},
    { code: 'J62', title: '컴퓨터 프로그래밍, 시스템 통합 및 관리업'},
    { code: 'J63', title: '정보서비스업'},
    { code: 'K64', title: '금융업'},
    { code: 'K65', title: '보험 및 연금업'},
    { code: 'K66', title: '금융 및 보험 관련 서비스업'},
    { code: 'L68', title: '부동산업'},
    { code: 'M70', title: '연구개발업'},
    { code: 'M71', title: '전문서비스업'},
    { code: 'M72', title: '건축기술, 엔지니어링 및 기타 과학기술 서비스업'},
    { code: 'M73', title: '기타 전문, 과학 및 기술 서비스업'},
    { code: 'N74', title: '사업시설 관리 및 조경 서비스업'},
    { code: 'N75', title: '사업지원 서비스업'},
    { code: 'N76', title: '임대업'},
    { code: 'O84', title: '공공행정, 국방 및 사회보장 행정'},
    { code: 'P85', title: '교육 서비스업'},
    { code: 'Q86', title: '보건업'},
    { code: 'Q87', title: '사회복지 서비스업'},
    { code: 'R90', title: '창작, 예술 및 여가관련 서비스업'},
    { code: 'R91', title: '스포츠 및 오락관련 서비스업'},
    { code: 'S94', title: '협회 및 단체'},
    { code: 'S95', title: '수리업'},
    { code: 'S96', title: '기타 개인 서비스업'},
  ],
  ipcKsicMapper: [
    { ipc: 'A01B', ksic: 'A01'},
    { ipc: 'A01C', ksic: 'A01'},
    { ipc: 'A01D', ksic: 'A01'},
    { ipc: 'A01G', ksic: 'A01'},
    { ipc: 'A01H', ksic: 'A01'},
    { ipc: 'A01K', ksic: 'A01'},
    { ipc: 'A01B', ksic: 'A02'},
    { ipc: 'A01C', ksic: 'A02'},
    { ipc: 'A01D', ksic: 'A02'},
    { ipc: 'A01G', ksic: 'A02'},
    { ipc: 'A01H', ksic: 'A02'},
    { ipc: 'A01K', ksic: 'A02'},
    { ipc: 'A01B', ksic: 'A03'},
    { ipc: 'A01C', ksic: 'A03'},
    { ipc: 'A01D', ksic: 'A03'},
    { ipc: 'A01G', ksic: 'A03'},
    { ipc: 'A01H', ksic: 'A03'},
    { ipc: 'A01K', ksic: 'A03'},
    { ipc: 'C22B', ksic: 'B05'},
    { ipc: 'E21D', ksic: 'B05'},
    { ipc: 'C22B', ksic: 'B06'},
    { ipc: 'E21D', ksic: 'B06'},
    { ipc: 'C22B', ksic: 'B07'},
    { ipc: 'E21D', ksic: 'B07'},
    { ipc: 'C22B', ksic: 'B08'},
    { ipc: 'E21D', ksic: 'B08'},
    { ipc: 'A21D', ksic: 'C10'},
    { ipc: 'A23B', ksic: 'C10'},
    { ipc: 'A23C', ksic: 'C10'},
    { ipc: 'A23D', ksic: 'C10'},
    { ipc: 'A23F', ksic: 'C10'},
    { ipc: 'A23G', ksic: 'C10'},
    { ipc: 'A23J', ksic: 'C10'},
    { ipc: 'A23K', ksic: 'C10'},
    { ipc: 'A23L', ksic: 'C10'},
    { ipc: 'A23P', ksic: 'C10'},
    { ipc: 'C12J', ksic: 'C10'},
    { ipc: 'C13B', ksic: 'C10'},
    { ipc: 'C13K', ksic: 'C10'},
    { ipc: 'C12C', ksic: 'C11'},
    { ipc: 'C12F', ksic: 'C11'},
    { ipc: 'C12G', ksic: 'C11'},
    { ipc: 'C12H', ksic: 'C11'},
    { ipc: 'A24B', ksic: 'C12'},
    { ipc: 'A24D', ksic: 'C12'},
    { ipc: 'A24F', ksic: 'C12'},
    { ipc: 'D04D', ksic: 'C13'},
    { ipc: 'D04G', ksic: 'C13'},
    { ipc: 'D04H', ksic: 'C13'},
    { ipc: 'D06C', ksic: 'C13'},
    { ipc: 'D06J', ksic: 'C13'},
    { ipc: 'D06M', ksic: 'C13'},
    { ipc: 'D06N', ksic: 'C13'},
    { ipc: 'D06P', ksic: 'C13'},
    { ipc: 'D06Q', ksic: 'C13'},
    { ipc: 'A41B', ksic: 'C14'},
    { ipc: 'A41C', ksic: 'C14'},
    { ipc: 'A41D', ksic: 'C14'},
    { ipc: 'A41F', ksic: 'C14'},
    { ipc: 'A42B', ksic: 'C14'},
    { ipc: 'A42C', ksic: 'C14'},
    { ipc: 'A43B', ksic: 'C15'},
    { ipc: 'A43C', ksic: 'C15'},
    { ipc: 'A45C', ksic: 'C15'},
    { ipc: 'B68B', ksic: 'C15'},
    { ipc: 'B68C', ksic: 'C15'},
    { ipc: 'A44C', ksic: 'C16'},
    { ipc: 'B27D', ksic: 'C16'},
    { ipc: 'B27K', ksic: 'C16'},
    { ipc: 'B27H', ksic: 'C16'},
    { ipc: 'B27M', ksic: 'C16'},
    { ipc: 'B27N', ksic: 'C16'},
    { ipc: 'E04G', ksic: 'C16'},
    { ipc: 'B42F', ksic: 'C17'},
    { ipc: 'D21C', ksic: 'C17'},
    { ipc: 'D21H', ksic: 'C17'},
    { ipc: 'D21J', ksic: 'C17'},
    { ipc: 'B41M', ksic: 'C18'},
    { ipc: 'B42D', ksic: 'C18'},
    { ipc: 'C10G', ksic: 'C19'},
    { ipc: 'C10L', ksic: 'C19'},
    { ipc: 'C01C', ksic: 'C20'},
    { ipc: 'C01D', ksic: 'C20'},
    { ipc: 'C01F', ksic: 'C20'},
    { ipc: 'C01G', ksic: 'C20'},
    { ipc: 'C07B', ksic: 'C20'},
    { ipc: 'C07C', ksic: 'C20'},
    { ipc: 'C07F', ksic: 'C20'},
    { ipc: 'C07G', ksic: 'C20'},
    { ipc: 'C07H', ksic: 'C20'},
    { ipc: 'C09B', ksic: 'C20'},
    { ipc: 'C09C', ksic: 'C20'},
    { ipc: 'C10B', ksic: 'C20'},
    { ipc: 'C10C', ksic: 'C20'},
    { ipc: 'C10H', ksic: 'C20'},
    { ipc: 'C10J', ksic: 'C20'},
    { ipc: 'C10K', ksic: 'C20'},
    { ipc: 'C25B', ksic: 'C20'},
    { ipc: 'G21G', ksic: 'C20'},
    { ipc: 'G21J', ksic: 'C20'},
    { ipc: 'C05B', ksic: 'C20'},
    { ipc: 'C05C', ksic: 'C20'},
    { ipc: 'C05D', ksic: 'C20'},
    { ipc: 'C05F', ksic: 'C20'},
    { ipc: 'C05G', ksic: 'C20'},
    { ipc: 'C08B', ksic: 'C20'},
    { ipc: 'C08F', ksic: 'C20'},
    { ipc: 'C08G', ksic: 'C20'},
    { ipc: 'C08J', ksic: 'C20'},
    { ipc: 'C08K', ksic: 'C20'},
    { ipc: 'C08L', ksic: 'C20'},
    { ipc: 'A01N', ksic: 'C20'},
    { ipc: 'A01P', ksic: 'C20'},
    { ipc: 'C09D', ksic: 'C20'},
    { ipc: 'A61Q', ksic: 'C20'},
    { ipc: 'C09F', ksic: 'C20'},
    { ipc: 'C09G', ksic: 'C20'},
    { ipc: 'C11D', ksic: 'C20'},
    { ipc: 'D06L', ksic: 'C20'},
    { ipc: 'A61K', ksic: 'C20'},
    { ipc: 'A62D', ksic: 'C20'},
    { ipc: 'B01J', ksic: 'C20'},
    { ipc: 'C06B', ksic: 'C20'},
    { ipc: 'C06C', ksic: 'C20'},
    { ipc: 'C06D', ksic: 'C20'},
    { ipc: 'C06F', ksic: 'C20'},
    { ipc: 'C08H', ksic: 'C20'},
    { ipc: 'C09H', ksic: 'C20'},
    { ipc: 'C09J', ksic: 'C20'},
    { ipc: 'C09K', ksic: 'C20'},
    { ipc: 'C10M', ksic: 'C20'},
    { ipc: 'C10N', ksic: 'C20'},
    { ipc: 'C11B', ksic: 'C20'},
    { ipc: 'C11C', ksic: 'C20'},
    { ipc: 'C14C', ksic: 'C20'},
    { ipc: 'C23F', ksic: 'C20'},
    { ipc: 'C23G', ksic: 'C20'},
    { ipc: 'C40B', ksic: 'C20'},
    { ipc: 'C99Z', ksic: 'C20'},
    { ipc: 'F42B', ksic: 'C20'},
    { ipc: 'G03C', ksic: 'C20'},
    { ipc: 'D01C', ksic: 'C20'},
    { ipc: 'D01D', ksic: 'C20'},
    { ipc: 'D01F', ksic: 'C20'},
    { ipc: 'A61P', ksic: 'C21'},
    { ipc: 'C07D', ksic: 'C21'},
    { ipc: 'C07J', ksic: 'C21'},
    { ipc: 'C07K', ksic: 'C21'},
    { ipc: 'C12N', ksic: 'C21'},
    { ipc: 'C12P', ksic: 'C21'},
    { ipc: 'C12Q', ksic: 'C21'},
    { ipc: 'C12R', ksic: 'C21'},
    { ipc: 'A61K', ksic: 'C21'},
    { ipc: 'B29B', ksic: 'C22'},
    { ipc: 'B29C', ksic: 'C22'},
    { ipc: 'B29D', ksic: 'C22'},
    { ipc: 'B29K', ksic: 'C22'},
    { ipc: 'B29L', ksic: 'C22'},
    { ipc: 'A42B', ksic: 'C22'},
    { ipc: 'B60C', ksic: 'C22'},
    { ipc: 'B65D', ksic: 'C22'},
    { ipc: 'B67D', ksic: 'C22'},
    { ipc: 'C08C', ksic: 'C22'},
    { ipc: 'F16L', ksic: 'C22'},
    { ipc: 'A47K', ksic: 'C23'},
    { ipc: 'B24D', ksic: 'C23'},
    { ipc: 'B28B', ksic: 'C23'},
    { ipc: 'B28C', ksic: 'C23'},
    { ipc: 'B28D', ksic: 'C23'},
    { ipc: 'B32B', ksic: 'C23'},
    { ipc: 'C01B', ksic: 'C23'},
    { ipc: 'C03B', ksic: 'C23'},
    { ipc: 'C03C', ksic: 'C23'},
    { ipc: 'C04B', ksic: 'C23'},
    { ipc: 'E03D', ksic: 'C23'},
    { ipc: 'E04B', ksic: 'C23'},
    { ipc: 'E04C', ksic: 'C23'},
    { ipc: 'E04D', ksic: 'C23'},
    { ipc: 'E04F', ksic: 'C23'},
    { ipc: 'B21C', ksic: 'C24'},
    { ipc: 'C21B', ksic: 'C24'},
    { ipc: 'C21C', ksic: 'C24'},
    { ipc: 'C21D', ksic: 'C24'},
    { ipc: 'C22C', ksic: 'C24'},
    { ipc: 'F16S', ksic: 'C24'},
    { ipc: 'F17C', ksic: 'C24'},
    { ipc: 'C22F', ksic: 'C24'},
    { ipc: 'C25C', ksic: 'C24'},
    { ipc: 'G21H', ksic: 'C24'},
    { ipc: 'B22D', ksic: 'C24'},
    { ipc: 'A47H', ksic: 'C25'},
    { ipc: 'B21G', ksic: 'C25'},
    { ipc: 'F16T', ksic: 'C25'},
    { ipc: 'F17B', ksic: 'C25'},
    { ipc: 'F22B', ksic: 'C25'},
    { ipc: 'F22G', ksic: 'C25'},
    { ipc: 'F24D', ksic: 'C25'},
    { ipc: 'F24H', ksic: 'C25'},
    { ipc: 'G21B', ksic: 'C25'},
    { ipc: 'G21C', ksic: 'C25'},
    { ipc: 'G21D', ksic: 'C25'},
    { ipc: 'F41A', ksic: 'C25'},
    { ipc: 'F41B', ksic: 'C25'},
    { ipc: 'F41C', ksic: 'C25'},
    { ipc: 'F41F', ksic: 'C25'},
    { ipc: 'F41G', ksic: 'C25'},
    { ipc: 'F41H', ksic: 'C25'},
    { ipc: 'F41J', ksic: 'C25'},
    { ipc: 'F42C', ksic: 'C25'},
    { ipc: 'A01L', ksic: 'C25'},
    { ipc: 'A44B', ksic: 'C25'},
    { ipc: 'B21D', ksic: 'C25'},
    { ipc: 'B21F', ksic: 'C25'},
    { ipc: 'B21H', ksic: 'C25'},
    { ipc: 'B21J', ksic: 'C25'},
    { ipc: 'B21K', ksic: 'C25'},
    { ipc: 'B21L', ksic: 'C25'},
    { ipc: 'B22F', ksic: 'C25'},
    { ipc: 'B23B', ksic: 'C25'},
    { ipc: 'B23C', ksic: 'C25'},
    { ipc: 'B23D', ksic: 'C25'},
    { ipc: 'B23G', ksic: 'C25'},
    { ipc: 'B23H', ksic: 'C25'},
    { ipc: 'B25B', ksic: 'C25'},
    { ipc: 'B25C', ksic: 'C25'},
    { ipc: 'B25F', ksic: 'C25'},
    { ipc: 'B25G', ksic: 'C25'},
    { ipc: 'B25H', ksic: 'C25'},
    { ipc: 'B26B', ksic: 'C25'},
    { ipc: 'B26F', ksic: 'C25'},
    { ipc: 'B27B', ksic: 'C25'},
    { ipc: 'B27G', ksic: 'C25'},
    { ipc: 'C23D', ksic: 'C25'},
    { ipc: 'C25D', ksic: 'C25'},
    { ipc: 'E05D', ksic: 'C25'},
    { ipc: 'E05G', ksic: 'C25'},
    { ipc: 'F16B', ksic: 'C25'},
    { ipc: 'G11C', ksic: 'C26'},
    { ipc: 'H01L', ksic: 'C26'},
    { ipc: 'B05D', ksic: 'C26'},
    { ipc: 'B81B', ksic: 'C26'},
    { ipc: 'B81C', ksic: 'C26'},
    { ipc: 'B82B', ksic: 'C26'},
    { ipc: 'B82Y', ksic: 'C26'},
    { ipc: 'C30B', ksic: 'C26'},
    { ipc: 'G02F', ksic: 'C26'},
    { ipc: 'G12B', ksic: 'C26'},
    { ipc: 'H01C', ksic: 'C26'},
    { ipc: 'H01F', ksic: 'C26'},
    { ipc: 'H01G', ksic: 'C26'},
    { ipc: 'H01J', ksic: 'C26'},
    { ipc: 'H05K', ksic: 'C26'},
    { ipc: 'H03K', ksic: 'C26'},
    { ipc: 'H03L', ksic: 'C26'},
    { ipc: 'B41J', ksic: 'C26'},
    { ipc: 'B41J', ksic: 'C26'},
    { ipc: 'B41J', ksic: 'C26'},
    { ipc: 'B41J', ksic: 'C26'},
    { ipc: 'B41J', ksic: 'C26'},
    { ipc: 'B41J', ksic: 'C26'},
    { ipc: 'B41J', ksic: 'C26'},
    { ipc: 'G06J', ksic: 'C26'},
    { ipc: 'G06F', ksic: 'C26'},
    { ipc: 'G06F', ksic: 'C26'},
    { ipc: 'G06K', ksic: 'C26'},
    { ipc: 'G03H', ksic: 'C26'},
    { ipc: 'H01P', ksic: 'C26'},
    { ipc: 'H01Q', ksic: 'C26'},
    { ipc: 'H01S', ksic: 'C26'},
    { ipc: 'H03B', ksic: 'C26'},
    { ipc: 'H03C', ksic: 'C26'},
    { ipc: 'H03D', ksic: 'C26'},
    { ipc: 'H03F', ksic: 'C26'},
    { ipc: 'H03G', ksic: 'C26'},
    { ipc: 'H03H', ksic: 'C26'},
    { ipc: 'H03M', ksic: 'C26'},
    { ipc: 'H04B', ksic: 'C26'},
    { ipc: 'H04J', ksic: 'C26'},
    { ipc: 'H04K', ksic: 'C26'},
    { ipc: 'H04L', ksic: 'C26'},
    { ipc: 'H04M', ksic: 'C26'},
    { ipc: 'H04Q', ksic: 'C26'},
    { ipc: 'H04S', ksic: 'C26'},
    { ipc: 'H04W', ksic: 'C26'},
    { ipc: 'H99Z', ksic: 'C26'},
    { ipc: 'G03B', ksic: 'C26'},
    { ipc: 'G10L', ksic: 'C26'},
    { ipc: 'H03J', ksic: 'C26'},
    { ipc: 'H04H', ksic: 'C26'},
    { ipc: 'H04N', ksic: 'C26'},
    { ipc: 'H04R', ksic: 'C26'},
    { ipc: 'G11B', ksic: 'C26'},
    { ipc: 'A61B', ksic: 'C27'},
    { ipc: 'A61C', ksic: 'C27'},
    { ipc: 'A61D', ksic: 'C27'},
    { ipc: 'A61F', ksic: 'C27'},
    { ipc: 'A61G', ksic: 'C27'},
    { ipc: 'A61H', ksic: 'C27'},
    { ipc: 'A61B', ksic: 'C27'},
    { ipc: 'A61C', ksic: 'C27'},
    { ipc: 'A61D', ksic: 'C27'},
    { ipc: 'A61F', ksic: 'C27'},
    { ipc: 'A61G', ksic: 'C27'},
    { ipc: 'A61H', ksic: 'C27'},
    { ipc: 'A61J', ksic: 'C27'},
    { ipc: 'A61L', ksic: 'C27'},
    { ipc: 'A61M', ksic: 'C27'},
    { ipc: 'A61N', ksic: 'C27'},
    { ipc: 'A62B', ksic: 'C27'},
    { ipc: 'B01L', ksic: 'C27'},
    { ipc: 'B04B', ksic: 'C27'},
    { ipc: 'C12M', ksic: 'C27'},
    { ipc: 'G01T', ksic: 'C27'},
    { ipc: 'G03B', ksic: 'C27'},
    { ipc: 'H05G', ksic: 'C27'},
    { ipc: 'G01B', ksic: 'C27'},
    { ipc: 'G01C', ksic: 'C27'},
    { ipc: 'G01D', ksic: 'C27'},
    { ipc: 'G01F', ksic: 'C27'},
    { ipc: 'G01H', ksic: 'C27'},
    { ipc: 'G01J', ksic: 'C27'},
    { ipc: 'G01K', ksic: 'C27'},
    { ipc: 'G01L', ksic: 'C27'},
    { ipc: 'G01M', ksic: 'C27'},
    { ipc: 'G01N', ksic: 'C27'},
    { ipc: 'G01P', ksic: 'C27'},
    { ipc: 'G01Q', ksic: 'C27'},
    { ipc: 'G01R', ksic: 'C27'},
    { ipc: 'G01S', ksic: 'C27'},
    { ipc: 'G01V', ksic: 'C27'},
    { ipc: 'G01W', ksic: 'C27'},
    { ipc: 'G05B', ksic: 'C27'},
    { ipc: 'G05D', ksic: 'C27'},
    { ipc: 'G05F', ksic: 'C27'},
    { ipc: 'G21K', ksic: 'C27'},
    { ipc: 'G08C', ksic: 'C27'},
    { ipc: 'G02B', ksic: 'C27'},
    { ipc: 'G02C', ksic: 'C27'},
    { ipc: 'G03D', ksic: 'C27'},
    { ipc: 'G02F', ksic: 'C27'},
    { ipc: 'G02F', ksic: 'C27'},
    { ipc: 'G02F', ksic: 'C27'},
    { ipc: 'G03B', ksic: 'C27'},
    { ipc: 'G03C', ksic: 'C27'},
    { ipc: 'G03C', ksic: 'C27'},
    { ipc: 'G03C', ksic: 'C27'},
    { ipc: 'G03F', ksic: 'C27'},
    { ipc: 'G04B', ksic: 'C27'},
    { ipc: 'G04C', ksic: 'C27'},
    { ipc: 'G04D', ksic: 'C27'},
    { ipc: 'G04F', ksic: 'C27'},
    { ipc: 'G04G', ksic: 'C27'},
    { ipc: 'G04R', ksic: 'C27'},
    { ipc: 'F99Z', ksic: 'C28'},
    { ipc: 'H02B', ksic: 'C28'},
    { ipc: 'H02J', ksic: 'C28'},
    { ipc: 'H02K', ksic: 'C28'},
    { ipc: 'H02N', ksic: 'C28'},
    { ipc: 'H02P', ksic: 'C28'},
    { ipc: 'H01M', ksic: 'C28'},
    { ipc: 'H01B', ksic: 'C28'},
    { ipc: 'H01H', ksic: 'C28'},
    { ipc: 'H01R', ksic: 'C28'},
    { ipc: 'H02G', ksic: 'C28'},
    { ipc: 'B60Q', ksic: 'C28'},
    { ipc: 'F21H', ksic: 'C28'},
    { ipc: 'F21K', ksic: 'C28'},
    { ipc: 'F21L', ksic: 'C28'},
    { ipc: 'F21S', ksic: 'C28'},
    { ipc: 'F21V', ksic: 'C28'},
    { ipc: 'F21W', ksic: 'C28'},
    { ipc: 'F21Y', ksic: 'C28'},
    { ipc: 'H01K', ksic: 'C28'},
    { ipc: 'A45D', ksic: 'C28'},
    { ipc: 'A47G', ksic: 'C28'},
    { ipc: 'A47J', ksic: 'C28'},
    { ipc: 'A47L', ksic: 'C28'},
    { ipc: 'D06F', ksic: 'C28'},
    { ipc: 'E06C', ksic: 'C28'},
    { ipc: 'F24B', ksic: 'C28'},
    { ipc: 'F24C', ksic: 'C28'},
    { ipc: 'H05B', ksic: 'C28'},
    { ipc: 'B60M', ksic: 'C28'},
    { ipc: 'C25F', ksic: 'C28'},
    { ipc: 'G08B', ksic: 'C28'},
    { ipc: 'G08G', ksic: 'C28'},
    { ipc: 'G10K', ksic: 'C28'},
    { ipc: 'H01T', ksic: 'C28'},
    { ipc: 'H02H', ksic: 'C28'},
    { ipc: 'H02M', ksic: 'C28'},
    { ipc: 'H05C', ksic: 'C28'},
    { ipc: 'H05F', ksic: 'C28'},
    { ipc: 'B41L', ksic: 'C29'},
    { ipc: 'B41J', ksic: 'C29'},
    { ipc: 'G03G', ksic: 'C29'},
    { ipc: 'G06C', ksic: 'C29'},
    { ipc: 'G06M', ksic: 'C29'},
    { ipc: 'G07B', ksic: 'C29'},
    { ipc: 'G07C', ksic: 'C29'},
    { ipc: 'G07D', ksic: 'C29'},
    { ipc: 'G07G', ksic: 'C29'},
    { ipc: 'B01B', ksic: 'C29'},
    { ipc: 'B01D', ksic: 'C29'},
    { ipc: 'B04C', ksic: 'C29'},
    { ipc: 'B05B', ksic: 'C29'},
    { ipc: 'B23F', ksic: 'C29'},
    { ipc: 'B25D', ksic: 'C29'},
    { ipc: 'B41K', ksic: 'C29'},
    { ipc: 'B60S', ksic: 'C29'},
    { ipc: 'B65B', ksic: 'C29'},
    { ipc: 'B65C', ksic: 'C29'},
    { ipc: 'B65G', ksic: 'C29'},
    { ipc: 'B66B', ksic: 'C29'},
    { ipc: 'B66C', ksic: 'C29'},
    { ipc: 'B66D', ksic: 'C29'},
    { ipc: 'B66F', ksic: 'C29'},
    { ipc: 'B67C', ksic: 'C29'},
    { ipc: 'C10F', ksic: 'C29'},
    { ipc: 'C12L', ksic: 'C29'},
    { ipc: 'E01H', ksic: 'C29'},
    { ipc: 'E02C', ksic: 'C29'},
    { ipc: 'E21F', ksic: 'C29'},
    { ipc: 'F01B', ksic: 'C29'},
    { ipc: 'F01C', ksic: 'C29'},
    { ipc: 'F01D', ksic: 'C29'},
    { ipc: 'F01K', ksic: 'C29'},
    { ipc: 'F01M', ksic: 'C29'},
    { ipc: 'F01N', ksic: 'C29'},
    { ipc: 'F01P', ksic: 'C29'},
    { ipc: 'F02G', ksic: 'C29'},
    { ipc: 'F03B', ksic: 'C29'},
    { ipc: 'F03C', ksic: 'C29'},
    { ipc: 'F03G', ksic: 'C29'},
    { ipc: 'F04B', ksic: 'C29'},
    { ipc: 'F04C', ksic: 'C29'},
    { ipc: 'F04D', ksic: 'C29'},
    { ipc: 'F04F', ksic: 'C29'},
    { ipc: 'F15B', ksic: 'C29'},
    { ipc: 'F15C', ksic: 'C29'},
    { ipc: 'F15D', ksic: 'C29'},
    { ipc: 'F16C', ksic: 'C29'},
    { ipc: 'F16D', ksic: 'C29'},
    { ipc: 'F16F', ksic: 'C29'},
    { ipc: 'F16G', ksic: 'C29'},
    { ipc: 'F16H', ksic: 'C29'},
    { ipc: 'F16K', ksic: 'C29'},
    { ipc: 'F16M', ksic: 'C29'},
    { ipc: 'F17D', ksic: 'C29'},
    { ipc: 'F22D', ksic: 'C29'},
    { ipc: 'F23B', ksic: 'C29'},
    { ipc: 'F23C', ksic: 'C29'},
    { ipc: 'F23D', ksic: 'C29'},
    { ipc: 'F23G', ksic: 'C29'},
    { ipc: 'F23H', ksic: 'C29'},
    { ipc: 'F23J', ksic: 'C29'},
    { ipc: 'F23K', ksic: 'C29'},
    { ipc: 'F23L', ksic: 'C29'},
    { ipc: 'F23M', ksic: 'C29'},
    { ipc: 'F23N', ksic: 'C29'},
    { ipc: 'F23R', ksic: 'C29'},
    { ipc: 'F24F', ksic: 'C29'},
    { ipc: 'F24J', ksic: 'C29'},
    { ipc: 'F25B', ksic: 'C29'},
    { ipc: 'F25C', ksic: 'C29'},
    { ipc: 'F25D', ksic: 'C29'},
    { ipc: 'F25J', ksic: 'C29'},
    { ipc: 'F27B', ksic: 'C29'},
    { ipc: 'F27D', ksic: 'C29'},
    { ipc: 'F28B', ksic: 'C29'},
    { ipc: 'F28C', ksic: 'C29'},
    { ipc: 'F28D', ksic: 'C29'},
    { ipc: 'F28F', ksic: 'C29'},
    { ipc: 'F28G', ksic: 'C29'},
    { ipc: 'G01G', ksic: 'C29'},
    { ipc: 'G07F', ksic: 'C29'},
    { ipc: 'G09D', ksic: 'C29'},
    { ipc: 'G09G', ksic: 'C29'},
    { ipc: 'A01B', ksic: 'C29'},
    { ipc: 'A01F', ksic: 'C29'},
    { ipc: 'A01J', ksic: 'C29'},
    { ipc: 'A01M', ksic: 'C29'},
    { ipc: 'A21B', ksic: 'C29'},
    { ipc: 'A21C', ksic: 'C29'},
    { ipc: 'A22B', ksic: 'C29'},
    { ipc: 'A22C', ksic: 'C29'},
    { ipc: 'A23N', ksic: 'C29'},
    { ipc: 'A24C', ksic: 'C29'},
    { ipc: 'A41H', ksic: 'C29'},
    { ipc: 'A42C', ksic: 'C29'},
    { ipc: 'A43D', ksic: 'C29'},
    { ipc: 'A62C', ksic: 'C29'},
    { ipc: 'B01F', ksic: 'C29'},
    { ipc: 'B02B', ksic: 'C29'},
    { ipc: 'B02C', ksic: 'C29'},
    { ipc: 'B03B', ksic: 'C29'},
    { ipc: 'B03C', ksic: 'C29'},
    { ipc: 'B03D', ksic: 'C29'},
    { ipc: 'B05C', ksic: 'C29'},
    { ipc: 'B06B', ksic: 'C29'},
    { ipc: 'B07B', ksic: 'C29'},
    { ipc: 'B07C', ksic: 'C29'},
    { ipc: 'B08B', ksic: 'C29'},
    { ipc: 'B21B', ksic: 'C29'},
    { ipc: 'B22C', ksic: 'C29'},
    { ipc: 'B23K', ksic: 'C29'},
    { ipc: 'B23P', ksic: 'C29'},
    { ipc: 'B23Q', ksic: 'C29'},
    { ipc: 'B24B', ksic: 'C29'},
    { ipc: 'B24C', ksic: 'C29'},
    { ipc: 'B25J', ksic: 'C29'},
    { ipc: 'B26D', ksic: 'C29'},
    { ipc: 'B27C', ksic: 'C29'},
    { ipc: 'B27F', ksic: 'C29'},
    { ipc: 'B27J', ksic: 'C29'},
    { ipc: 'B27L', ksic: 'C29'},
    { ipc: 'B30B', ksic: 'C29'},
    { ipc: 'B31B', ksic: 'C29'},
    { ipc: 'B31C', ksic: 'C29'},
    { ipc: 'B31D', ksic: 'C29'},
    { ipc: 'B31F', ksic: 'C29'},
    { ipc: 'B41B', ksic: 'C29'},
    { ipc: 'B41C', ksic: 'C29'},
    { ipc: 'B41D', ksic: 'C29'},
    { ipc: 'B41F', ksic: 'C29'},
    { ipc: 'B41G', ksic: 'C29'},
    { ipc: 'B41J', ksic: 'C29'},
    { ipc: 'B41N', ksic: 'C29'},
    { ipc: 'B42B', ksic: 'C29'},
    { ipc: 'B42C', ksic: 'C29'},
    { ipc: 'B44B', ksic: 'C29'},
    { ipc: 'B44C', ksic: 'C29'},
    { ipc: 'B65H', ksic: 'C29'},
    { ipc: 'B67B', ksic: 'C29'},
    { ipc: 'B68F', ksic: 'C29'},
    { ipc: 'C14B', ksic: 'C29'},
    { ipc: 'C23C', ksic: 'C29'},
    { ipc: 'D01B', ksic: 'C29'},
    { ipc: 'D01G', ksic: 'C29'},
    { ipc: 'D01H', ksic: 'C29'},
    { ipc: 'D02G', ksic: 'C29'},
    { ipc: 'D02H', ksic: 'C29'},
    { ipc: 'D02J', ksic: 'C29'},
    { ipc: 'D03C', ksic: 'C29'},
    { ipc: 'D03D', ksic: 'C29'},
    { ipc: 'D03J', ksic: 'C29'},
    { ipc: 'D04B', ksic: 'C29'},
    { ipc: 'D04C', ksic: 'C29'},
    { ipc: 'D05B', ksic: 'C29'},
    { ipc: 'D05C', ksic: 'C29'},
    { ipc: 'D06B', ksic: 'C29'},
    { ipc: 'D06G', ksic: 'C29'},
    { ipc: 'D06H', ksic: 'C29'},
    { ipc: 'D21B', ksic: 'C29'},
    { ipc: 'D21D', ksic: 'C29'},
    { ipc: 'D21F', ksic: 'C29'},
    { ipc: 'D21G', ksic: 'C29'},
    { ipc: 'D99Z', ksic: 'C29'},
    { ipc: 'E02F', ksic: 'C29'},
    { ipc: 'E21B', ksic: 'C29'},
    { ipc: 'F01L', ksic: 'C29'},
    { ipc: 'F02B', ksic: 'C29'},
    { ipc: 'F02D', ksic: 'C29'},
    { ipc: 'F02F', ksic: 'C29'},
    { ipc: 'F16N', ksic: 'C29'},
    { ipc: 'F16P', ksic: 'C29'},
    { ipc: 'F26B', ksic: 'C29'},
    { ipc: 'H05H', ksic: 'C29'},
    { ipc: 'B60B', ksic: 'C30'},
    { ipc: 'B60D', ksic: 'C30'},
    { ipc: 'B60F', ksic: 'C30'},
    { ipc: 'B60G', ksic: 'C30'},
    { ipc: 'B60H', ksic: 'C30'},
    { ipc: 'B60J', ksic: 'C30'},
    { ipc: 'B60K', ksic: 'C30'},
    { ipc: 'B60L', ksic: 'C30'},
    { ipc: 'B60N', ksic: 'C30'},
    { ipc: 'B60P', ksic: 'C30'},
    { ipc: 'B60R', ksic: 'C30'},
    { ipc: 'B60S', ksic: 'C30'},
    { ipc: 'B60T', ksic: 'C30'},
    { ipc: 'B60W', ksic: 'C30'},
    { ipc: 'B62D', ksic: 'C30'},
    { ipc: 'E05F', ksic: 'C30'},
    { ipc: 'F02M', ksic: 'C30'},
    { ipc: 'F02N', ksic: 'C30'},
    { ipc: 'F02P', ksic: 'C30'},
    { ipc: 'F16J', ksic: 'C30'},
    { ipc: 'G05G', ksic: 'C30'},
    { ipc: 'B60V', ksic: 'C31'},
    { ipc: 'B63B', ksic: 'C31'},
    { ipc: 'B63C', ksic: 'C31'},
    { ipc: 'B63G', ksic: 'C31'},
    { ipc: 'B63H', ksic: 'C31'},
    { ipc: 'B63J', ksic: 'C31'},
    { ipc: 'B60L', ksic: 'C31'},
    { ipc: 'B61B', ksic: 'C31'},
    { ipc: 'B61C', ksic: 'C31'},
    { ipc: 'B61D', ksic: 'C31'},
    { ipc: 'B61F', ksic: 'C31'},
    { ipc: 'B61G', ksic: 'C31'},
    { ipc: 'B61H', ksic: 'C31'},
    { ipc: 'B61J', ksic: 'C31'},
    { ipc: 'B61K', ksic: 'C31'},
    { ipc: 'B61L', ksic: 'C31'},
    { ipc: 'E01B', ksic: 'C31'},
    { ipc: 'B64B', ksic: 'C31'},
    { ipc: 'B64C', ksic: 'C31'},
    { ipc: 'B64D', ksic: 'C31'},
    { ipc: 'B64F', ksic: 'C31'},
    { ipc: 'B64G', ksic: 'C31'},
    { ipc: 'F02K', ksic: 'C31'},
    { ipc: 'F03H', ksic: 'C31'},
    { ipc: 'F41H', ksic: 'C31'},
    { ipc: 'B62J', ksic: 'C31'},
    { ipc: 'B62K', ksic: 'C31'},
    { ipc: 'B62M', ksic: 'C31'},
    { ipc: 'B62M', ksic: 'C31'},
    { ipc: 'B62B', ksic: 'C31'},
    { ipc: 'B62C', ksic: 'C31'},
    { ipc: 'B62H', ksic: 'C31'},
    { ipc: 'B62K', ksic: 'C31'},
    { ipc: 'B62L', ksic: 'C31'},
    { ipc: 'B62M', ksic: 'C31'},
    { ipc: 'A47B', ksic: 'C32'},
    { ipc: 'A47C', ksic: 'C32'},
    { ipc: 'A47D', ksic: 'C32'},
    { ipc: 'A47F', ksic: 'C32'},
    { ipc: 'A41G', ksic: 'C33'},
    { ipc: 'A44B', ksic: 'C33'},
    { ipc: 'A44C', ksic: 'C33'},
    { ipc: 'A45B', ksic: 'C33'},
    { ipc: 'A45F', ksic: 'C33'},
    { ipc: 'A46B', ksic: 'C33'},
    { ipc: 'A46D', ksic: 'C33'},
    { ipc: 'A63B', ksic: 'C33'},
    { ipc: 'A63C', ksic: 'C33'},
    { ipc: 'A63D', ksic: 'C33'},
    { ipc: 'A63F', ksic: 'C33'},
    { ipc: 'A63G', ksic: 'C33'},
    { ipc: 'A63H', ksic: 'C33'},
    { ipc: 'A63J', ksic: 'C33'},
    { ipc: 'A63K', ksic: 'C33'},
    { ipc: 'A99Z', ksic: 'C33'},
    { ipc: 'B43K', ksic: 'C33'},
    { ipc: 'B43L', ksic: 'C33'},
    { ipc: 'B43M', ksic: 'C33'},
    { ipc: 'B44D', ksic: 'C33'},
    { ipc: 'B44F', ksic: 'C33'},
    { ipc: 'B68G', ksic: 'C33'},
    { ipc: 'B99Z', ksic: 'C33'},
    { ipc: 'D07B', ksic: 'C33'},
    { ipc: 'F23Q', ksic: 'C33'},
    { ipc: 'G09B', ksic: 'C33'},
    { ipc: 'G09F', ksic: 'C33'},
    { ipc: 'G10B', ksic: 'C33'},
    { ipc: 'G10C', ksic: 'C33'},
    { ipc: 'G10D', ksic: 'C33'},
    { ipc: 'G10F', ksic: 'C33'},
    { ipc: 'G10G', ksic: 'C33'},
    { ipc: 'G10H', ksic: 'C33'},
    { ipc: 'F02C', ksic: 'D35'},
    { ipc: 'F03D', ksic: 'D35'},
    { ipc: 'H02S', ksic: 'D35'},
    { ipc: 'G21H', ksic: 'D35'},
    { ipc: 'F02C', ksic: 'D36'},
    { ipc: 'F03D', ksic: 'D36'},
    { ipc: 'H02S', ksic: 'D36'},
    { ipc: 'G21H', ksic: 'D36'},
    { ipc: 'B09B', ksic: 'E37'},
    { ipc: 'B09C', ksic: 'E37'},
    { ipc: 'B65F', ksic: 'E37'},
    { ipc: 'C02F', ksic: 'E37'},
    { ipc: 'G21F', ksic: 'E37'},
    { ipc: 'B09B', ksic: 'E38'},
    { ipc: 'B09C', ksic: 'E38'},
    { ipc: 'B65F', ksic: 'E38'},
    { ipc: 'C02F', ksic: 'E38'},
    { ipc: 'G21F', ksic: 'E38'},
    { ipc: 'B09B', ksic: 'E39'},
    { ipc: 'B09C', ksic: 'E39'},
    { ipc: 'B65F', ksic: 'E39'},
    { ipc: 'C02F', ksic: 'E39'},
    { ipc: 'G21F', ksic: 'E39'},
    { ipc: 'E01C', ksic: 'F41'},
    { ipc: 'E01D', ksic: 'F41'},
    { ipc: 'E01F', ksic: 'F41'},
    { ipc: 'E02B', ksic: 'F41'},
    { ipc: 'E02D', ksic: 'F41'},
    { ipc: 'E03B', ksic: 'F41'},
    { ipc: 'E03C', ksic: 'F41'},
    { ipc: 'E03F', ksic: 'F41'},
    { ipc: 'E04H', ksic: 'F41'},
    { ipc: 'E05B', ksic: 'F41'},
    { ipc: 'E05C', ksic: 'F41'},
    { ipc: 'E06B', ksic: 'F41'},
    { ipc: 'E21C', ksic: 'F41'},
    { ipc: 'E99Z', ksic: 'F41'},
    { ipc: 'F42D', ksic: 'F41'},
    { ipc: 'E01C', ksic: 'F42'},
    { ipc: 'E01D', ksic: 'F42'},
    { ipc: 'E01F', ksic: 'F42'},
    { ipc: 'E02B', ksic: 'F42'},
    { ipc: 'E02D', ksic: 'F42'},
    { ipc: 'E03B', ksic: 'F42'},
    { ipc: 'E03C', ksic: 'F42'},
    { ipc: 'E03F', ksic: 'F42'},
    { ipc: 'E04H', ksic: 'F42'},
    { ipc: 'E05B', ksic: 'F42'},
    { ipc: 'E05C', ksic: 'F42'},
    { ipc: 'E06B', ksic: 'F42'},
    { ipc: 'E21C', ksic: 'F42'},
    { ipc: 'E99Z', ksic: 'F42'},
    { ipc: 'F42D', ksic: 'F42'},
    { ipc: 'G06D', ksic: 'J582'},
    { ipc: 'G06E', ksic: 'J582'},
    { ipc: 'G06F', ksic: 'J582'},
    { ipc: 'G06G', ksic: 'J582'},
    { ipc: 'G06N', ksic: 'J582'},
    { ipc: 'G06Q', ksic: 'J582'},
    { ipc: 'G06T', ksic: 'J582'},
    { ipc: 'G09C', ksic: 'J582'},
    { ipc: 'G06D', ksic: 'J62'},
    { ipc: 'G06E', ksic: 'J62'},
    { ipc: 'G06F', ksic: 'J62'},
    { ipc: 'G06G', ksic: 'J62'},
    { ipc: 'G06N', ksic: 'J62'},
    { ipc: 'G06Q', ksic: 'J62'},
    { ipc: 'G06T', ksic: 'J62'},
    { ipc: 'G09C', ksic: 'J62'},
    { ipc: 'G06D', ksic: 'J63'},
    { ipc: 'G06E', ksic: 'J63'},
    { ipc: 'G06F', ksic: 'J63'},
    { ipc: 'G06G', ksic: 'J63'},
    { ipc: 'G06N', ksic: 'J63'},
    { ipc: 'G06Q', ksic: 'J63'},
    { ipc: 'G06T', ksic: 'J63'},
    { ipc: 'G09C', ksic: 'J63'},
  ]
})

export const getters = {
  getKsicList: (state) => state.ksicList,
  getEvaluationData: (state) => state.evaluationData,
}


export const mutations = {
  setPatentInfo: (state, data) => {
    state.evaluationData.patent = data
  },
  setKsic: (state, data) => {
    state.evaluationData.ksic = data
  },
  setSalesData: (state, data) => {
    state.evaluationData.sales = data
  },
  setBusinessScale: (state, data) => {
    state.evaluationData.businessScale = data
  },
  resetEvalData: (state) => {
    state.evaluationData = {
      patent: {
        type: '출원번호', // default value
        number: ''
      },
      ksic: '',
      sales: null, // can be null
      businessScale: '상장 기업' // default value
    }
  },
}

export const actions = {

}
