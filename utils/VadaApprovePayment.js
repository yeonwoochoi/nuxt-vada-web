import PaymentUtils from "./PaymentUtils";
import iconv from "iconv-lite";
import axios from "axios";


/**
 * 바다파트너스 결제 확인 클래스
 */
class VadaRequestPayment {
    constructor(data) {
        const keyData = process.env.PG_KEY

        const { MxID, MxIssueNO, FDTid, Amount, ServiceId, PIDS } = data

        let hashValue = '' // 요청하기 위한 해쉬 값 생성

        if (typeof MxID === 'undefined' ||
            typeof MxIssueNO === 'undefined' ||
            typeof FDTid === 'undefined' ||
            typeof ServiceId == 'undefined'
        ) {
            throw new TypeError('Invalid Request')
        }

        if (FDTid !== null && FDTid !== "") {
            hashValue = PaymentUtils.hashSha256(MxID + MxIssueNO + keyData).toUpperCase()
        } else {
            if (PIDS !== null && PIDS !== "") {
                hashValue = PaymentUtils.hashSha256(MxID + MxIssueNO + Amount + PIDS + keyData).toUpperCase()
            } else {
                hashValue = PaymentUtils.hashSha256(MxID + MxIssueNO + Amount + keyData).toUpperCase()
            }
        }

        this.hashValue = hashValue
        this.data = data
        this.EncodeType = "U"
    }

    createFormData() {
        let formDataStr = "" // 결제 확인해야 하는 폼 데이터

        Object.keys(this.data).forEach(key => {
            const converted = iconv.encode(this.data[key], 'euc-kr') // 데이터를 EUC-KR 으로 인코딩
            formDataStr += `${key}=${encodeURIComponent(converted)}&`
        })

        formDataStr += `FDHash=${this.hashValue}&EncodeType=${this.EncodeType}&SpecVer=F100C000`;
        return formDataStr
    }
}

export default VadaRequestPayment
