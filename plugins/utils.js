class Utils {
  static validatePatentNumber(number) {
    if (number.length !== 13 || !number) {
      return false
    }
    let str = `${number}`.slice(0, 2)
    let prefix = ['10', '20', '30', '40', '41', '42', '43', '44', '45', '46', '47']
    for (let i = 0; i < prefix.length; i++) {
      if (prefix[i] === str) {
        return true
      }
    }
    return false
  }
  static getKiprisDoiLink(applicantNumber) {
    return 'https://doi.org/10.8080/' + applicantNumber
  }
  static getCurrentYear() {
    const now = new Date();
    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const koreaTimeDiff = 9 * 60 * 60 * 1000;
    const koreaNow = new Date(utcNow + koreaTimeDiff);
    return koreaNow.getMonth() + 1 <= 6 ? koreaNow.getFullYear() - 1 : koreaNow.getFullYear();
  }
  static getCurrentDate() {
    const now = new Date();
    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const koreaTimeDiff = 9 * 60 * 60 * 1000;
    return new Date(utcNow + koreaTimeDiff)
  }

  static toStringByFormatting(delimiter = '-') {
    let source = new Date()
    const year = source.getFullYear();
    let tempMonth = source.getMonth() + 1
    let tempDay = source.getDate()
    const month = tempMonth >= 10 ? tempMonth : `0${tempMonth}`;
    const day = tempDay >= 10 ? tempDay : `0${tempDay}`;
    return [year, month, day].join(delimiter);
  }
}

export default (context, inject) => {
  inject('util', Utils)
}
