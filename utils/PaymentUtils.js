import Sha256 from './sha256'

class PaymentUtils {
    makeDateString() {
        let time = new Date();
        let year = time.getFullYear() + "";
        let month = time.getMonth() + 1;
        let date = time.getDate();
        let hour = time.getHours();
        let min = time.getMinutes();
        let sec = time.getSeconds();
        if (month < 10) {
            month = "0" + month;
        }
        if (date < 10) {
            date = "0" + date;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        return year + month + date + hour + min + sec;
    }

    hashSha256(value) {
        return Sha256.hash(value)
    }

    makePayData(params) {
        const { MxID,
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
            keyData
        } = params;

        //HASH DATA 생성!!
        const callhash = this.hashSha256(MxID + MxIssueNO + Amount + keyData).toUpperCase();

        let temp = "";

        try { temp += "MxID=" + MxID + "|"; } catch (e) { temp += "MxID=|"; }
        try { temp += "MxIssueNO=" + MxIssueNO + "|"; } catch (e) { temp += "MxIssueNO=|"; }
        try { temp += "MxIssueDate=" + MxIssueDate + "|"; } catch (e) { temp += "MxIssueDate=|"; }
        try { temp += "CcProdDesc=" + CcProdDesc + "|"; } catch (e) { temp += "CcProdDesc=|"; }
        try { temp += "Amount=" + Amount + "|"; } catch (e) { temp += "Amount=|"; }
        try { temp += "rtnUrl=" + rtnUrl + "|"; } catch (e) { temp += "rtnUrl=|"; }
        try { temp += "ItemInfo=" + ItemInfo + "|"; } catch (e) { temp += "ItemInfo=|"; }
        try { temp += "connectionType=" + connectionType + "|"; } catch (e) { temp += "connectionType=|"; }
        try { temp += "URL=" + URL + "|"; } catch (e) { temp += "URL=|"; }
        try { temp += "DBPATH=" + DBPATH + "|"; } catch (e) { temp += "DBPATH=|"; }
        try { temp += "Currency=" + Currency + "|"; } catch (e) { temp += "Currency=|"; }
        try { temp += "SelectPayment=" + SelectPayment + "|"; } catch (e) { temp += "SelectPayment=|"; }
        try { temp += "Tmode=" + Tmode + "|"; } catch (e) { temp += "Tmode=|"; }
        try { temp += "LangType=" + LangType + "|"; } catch (e) { temp += "LangType=|"; }
        try { temp += "BillType=" + BillType + "|"; } catch (e) { temp += "BillType=|"; }
        try { temp += "CardSelect=" + CardSelect + "|"; } catch (e) { temp += "CardSelect=|"; }
        try { temp += "escrowYn=" + escrowYn + "|"; } catch (e) { temp += "escrowYn=|"; }
        try { temp += "cashYn=" + cashYn + "|"; } catch (e) { temp += "cashYn=|"; }
        try { temp += "CcNameOnCard=" + CcNameOnCard + "|"; } catch (e) { temp += "CcNameOnCard=|"; }
        try { temp += "PhoneNO=" + PhoneNO + "|"; } catch (e) { temp += "PhoneNO=|"; }
        try { temp += "Email=" + Email + "|"; } catch (e) { temp += "Email=|"; }
        try { temp += "SupportDate=" + SupportDate + "|"; } catch (e) { temp += "SupportDate=|"; }
        try { temp += "EncodeType=" + EncodeType + "|"; } catch (e) { temp += "EncodeType=|"; }

        temp += "CallHash=" + callhash + "|"; //CallHash DATA 추가!!

        return temp;
    }
}

export default new PaymentUtils()