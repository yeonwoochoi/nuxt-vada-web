import PaymentUtils from "./PaymentUtils";
import iconv from "iconv-lite";
import axios from "axios";


/**
 * 바다파트너스 결제 확인 클래스
 */
class VadaRequestPayment {
    constructor(data) {
        console.dir(data)
        const keyData = process.env.PG_KEY

        const { MxID, MxIssueNO, FDTid, Amount, ServiceId, PIDS } = data

        let hashValue = '' // 요청하기 위한 해쉬 값 생성

        if (typeof MxID === 'undefined' ||
            typeof MxIssueNO === 'undefined' ||
            typeof FDTid === 'undefined' ||
            typeof ServiceId == 'undefined'
        ) {
            console.error('pay-request: invalid request')
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

    getAxiosConfig() {
        const formData = this.createFormData()
        const url = process.env.PG_REQ_URL


        console.log(`pay-request: approvePayment url: ${url}, hashValue: ${this.hashValue}, encode type: ${this.EncodeType}`)
        console.log(`pay-request: formDataStr: ${formData}`)

        return {
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData
        }
    }
}

export default VadaRequestPayment
