export default ({app, store}, inject) => {
  inject('errorHandler', {
    showMessage({code = '', subCode = ''}) {
      store.commit('alert/showMessage', {content: getErrorMessage(code, subCode), color: "error"})
    }
  })
}

function getErrorMessage(code, subCode) {
  let codeInt = parseInt(code)
  let subCodeInt = parseInt(subCode)
  switch (codeInt) {
    case 0:
      switch (subCodeInt) {
        case 1:
          return "잘못된 요청입니다. 다시 시도해주십시오."
        case 2:
          return "처리 과정에서 오류가 발생했습니다. 다시 시도해주십시오."
        case 3:
          return "입력하신 값을 다시 확인해주십시오."
        case 4:
          return "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주십시오."
        case 5:
          return "유효하지 않은 값이 입력되었습니다. 값을 다시 확인해주십시오."
        case 6:
          return "잘못된 요청입니다. 다시 시도해주세요."
        case 7:
          return "잘못된 요청입니다. 재로그인 후 다시 시도해주십시오."
        case 8:
          return "입력하신 값을 다시 확인해주십시오."
        case 9:
          return "잘못된 요청입니다. 재로그인 후 다시 시도해주십시오."
        default:
          return "잘못된 요청입니다. 다시 시도해주세요."
      }
    case 1:
      switch (subCodeInt) {
        case 1000:
          return "존재하지 않거나 탈퇴한 회원입니다."
        case 1001:
          return "존재하지 않는 회원입니다."
        case 1002:
          return "비밀번호가 일치하지 않습니다."
        case 1003:
          return "인증이 만료되었습니다. 다시 로그인해주십시오."
        case 1004:
          return "잘못된 접근입니다. 재로그인 후 시도해주십시오."
        case 1005:
          return "인증되지 않은 회원입니다. 로그인 후 다시 시도해주십시오."
        case 1006:
          return "이미 존재하는 회원입니다."
        case 1007:
          return "로그인한 IP주소와 등록된 IP주소가 일치하지 않습니다."
        case 1008:
          return "인증이 만료되었습니다. 다시 로그인해주십시오."
        case 1009:
          return "접근 권한이 없습니다."
        case 1010:
          return "포인트가 부족합니다. 서비스 > 이용신청 으로 이동하여 포인트 충전 후 다시 시도해주십시오."
        case 1011:
          return "인증되지 않은 회원입니다. 로그인 후 다시 시도해주십시오."
        default:
          return "잘못된 요청입니다. 다시 시도해주세요."
      }
    case 2:
      switch (subCodeInt) {
        case 2000:
          return "기업 규모를 입력해주십시오."
        case 2001:
          return "목록에 존재하지 않는 기업 규모 유형입니다. 목록에 있는 데이터 중 하나를 선택해주십시오."
        default:
          return "잘못된 요청입니다. 다시 시도해주세요."
      }
    case 3:
      switch (subCodeInt) {
        case 3000:
          return "특허 PQI 지수를 찾을 수 없습니다."
        default:
          return "잘못된 요청입니다. 다시 시도해주세요."
      }
    case 4:
      switch (subCodeInt) {
        case 4000:
          return "해당 공지사항을 찾을 수 없습니다."
        default:
          return "잘못된 요청입니다. 다시 시도해주세요."
      }
    case 5:
      switch (subCodeInt) {
        case 5000:
          return "해당 FAQ를 찾을 수 없습니다."
        default:
          return "잘못된 요청입니다. 다시 시도해주세요."
      }
    case 6:
      switch (subCodeInt) {
        case 6000:
          return "파일이 업로드되지 않았습니다. 다시 업로드해주십시오."
        case 6001:
          return "지원되지 않는 파일 형식입니다. csv 파일을 업로드해주십시오."
        case 6002:
          return "지원되지 않는 파일 형식입니다. excel 파일을 업로드해주십시오."
        default:
          return "잘못된 요청입니다. 다시 시도해주세요."
      }
    case 7:
      switch (subCodeInt) {
        case 7001:
          return "해당 문의를 찾을 수 없습니다."
        default:
          return "잘못된 요청입니다. 다시 시도해주세요."
      }
    case 8:
      switch (subCodeInt) {
        case 8001:
          return "인증 번호가 만료되었습니다. 인증 번호를 다시 전송해주십시오."
        case 8002:
          return "인증 번호 발송에 실패했습니다. 다시 시도해주십시오."
        default:
          return "잘못된 요청입니다. 다시 시도해주세요."
      }
    case 9:
      switch (subCodeInt) {
        case 9000:
          return "입력하신 정보를 다시 확인해주십시오."
        case 9001:
          return "존재하지 않는 기업입니다."
        case 9002:
          return "이미 존재하는 기업입니다."
        case 9003:
          return "이미 승인된 기업입니다."
        case 9004:
          return "존재하지 않는 기업 회원입니다."
        case 9005:
          return "승인되지 않은 기업입니다."
        case 9006:
          return "포인트가 부족합니다. 회사 매니저 계정으로 로그인한 후, 서비스 > 이용신청 으로 이동하여 포인트 충전 후 다시 시도해주십시오."
        case 9007:
          return "1년 이용권이 이미 존재합니다."
        default:
          return "잘못된 요청입니다. 다시 시도해주세요."
      }
    case 10:
      switch (subCodeInt) {
        case 10010:
          return "특허 평가를 위한 데이터가 아직 준비되지 않았습니다."
        case 10001:
          return "해당 특허를 찾을 수 없습니다."
        case 10002:
          return "특허 평가를 위한 데이터가 아직 준비되지 않았습니다."
        case 10003:
          return "특허 평가를 위한 데이터가 아직 준비되지 않았습니다."
        case 10004:
          return "특허 평가를 위한 데이터가 아직 준비되지 않았습니다."
        case 10005:
          return "특허 평가를 위한 데이터가 아직 준비되지 않았습니다."
        case 10006:
          return "특허 평가를 위한 데이터가 아직 준비되지 않았습니다."
        case 10007:
          return "특허 평가를 위한 데이터가 아직 준비되지 않았습니다."
        default:
          return "잘못된 요청입니다. 다시 시도해주세요."
      }
    case 11:
      switch (subCodeInt) {
        case 11000:
          return "유효하지 않은 특허 번호입니다."
        case 11001:
          return "오류가 발생했습니다. 잠시 후 시도해주십시오."
        case 11002:
          return "특허 번호가 유효하지 않습니다."
        case 11003:
          return "특허 번호를 입력해 주십시오."
        case 11004:
          return "해당 특허 평가를 찾을 수 없습니다."
        case 11005:
          return "해당 특허 평가 요약 보고서를 찾을 수 없습니다."
        case 11006:
          return "해당 보고서 파일을 찾을 수 없습니다."
        case 11007:
          return "해당 평가를 진행한 회원과 현재 회원이 일치하지 않습니다."
        default:
          return "잘못된 요청입니다. 다시 시도해주세요."
      }
    default:
      return "잘못된 요청입니다. 다시 시도해주세요."
  }
}
