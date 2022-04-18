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
}

export default (context, inject) => {
  inject('util', Utils)
}
