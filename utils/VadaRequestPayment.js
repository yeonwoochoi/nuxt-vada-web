import PaymentUtils from "./PaymentUtils";

/**
 * 바다파트너스 결제 요청 클래스
 */
class VadaRequestPayment {
    constructor(service) {
        const MxID = process.env.PG_MXID
        const keyData = process.env.PG_KEY
        const MxIssueDate = PaymentUtils.makeDateString()
        const MxIssueNO = MxID + MxIssueDate
        const CcProdDesc = service['serviceName']
        const ServiceId = service['id']
        const Amount = service['price']
        const rtnUrl = process.env["PG_RTN_URL"]
        // 1: product, 2: service
        const ItemInfo = 2;
        const connectionType = process.env.PG_CONNECTION_TYPE
        const URL = "URL"
        const DBPATH = process.env.PG_DB_PATH
        // TODO : Let the user select payment. For now just credit card.
        const SelectPayment = "CRDT"
        //  isMobile ? "CRDT" : "ALL";
        const CardSelect = "00"
        const escrowYn = "N"
        const cashYn = "Y"
        const LangType = "HAN"
        const EncodeType = "U"
        const CcNameOnCard = ""
        const Email = ""
        const PhoneNO = ""
        const Currency = "KRW"
        const Tmode = "WEB"
        const BillType = "00"
        const SupportDate = ""
        const popflag = "L"

        this.paymentData = {
            MxID,
            MxIssueNO,
            MxIssueDate,
            CcProdDesc,
            Amount,
            rtnUrl,
            ItemInfo,
            connectionType,
            URL,
            DBPATH,
            Currency,
            SelectPayment,
            Tmode,
            LangType,
            BillType,
            CardSelect,
            escrowYn,
            cashYn,
            CcNameOnCard,
            PhoneNO,
            Email,
            SupportDate,
            EncodeType,
            popflag,
            keyData,
            ServiceId
        }
    }

    getPayload() {
        return PaymentUtils.makePayData(this.paymentData)
    }
}

export default VadaRequestPayment
