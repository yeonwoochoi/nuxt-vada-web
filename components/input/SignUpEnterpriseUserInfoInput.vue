<template>
  <p>enterprise</p>
</template>

<script>
import { required, email, between, confirmed, alpha_dash, integer, min, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";

setInteractionMode('aggressive')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('email', {
  ...email,
  message: '{_field_} must be valid'
})

extend('confirmed', {
  ...confirmed,
  message: '{_field_} must match'
})

extend('between', {
  ...between,
  message: '{_field_} must be between 8 and 20'
})

extend('alpha-dash', {
  ...alpha_dash,
  message: '{_field_} may contain alpha-numeric characters as well as dashes and underscores'
})

extend('integer', {
  ...integer,
  message: '{_field_} must be an integer'
})

extend('min', {
  ...min,
  message: '{_field_} may not be less than 8 characters'
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than 20 characters'
})

export default {
  name: "SignUpEnterpriseUserInfoInput",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    companyName: '',
    businessNumber: '',
    businessRegistrationFile: '',
    managerName: '',
    managerEmail: '',
    id: '',
    ip: '',
    emailAuth: '',
  }),
  methods: {isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    checkIpAddressValidation: function (ip) {
      return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
    },
    checkBusinessNumberValidation( strBN ) {  // strBN = '0123456789'
      let chkStep1 = 0;
      if ( strBN.length === 10 ) {
        const keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5]; // 인증키(고정)

        for (let i = 0; i < strBN.length - 1; i++) {
          // 사업자번호의 9자리까지 인증키와 자릿수같은 숫자끼리 곱한 뒤, 계속 더해준다. (ex_ (0*1) + (1*3) + ...
          chkStep1 += parseInt(strBN.substring( i, i+1 ), 10) * keyArr[ i ];
        }
        // 9번째 자리의 숫자에 0.5를 곱한 뒤, 다시 더해준다.
        chkStep1 += Math.floor(parseInt(strBN.substring(8, 9), 10) * 5 / 10);
      }
      // '10 - (지금까지 더한 수의 나머지) == 사업자번호의 마지막 자릿수'가 같다면 성공
      const chkStep2 = parseInt( strBN.substring(9, 10), 10 );
      if ( ( 10 - (chkStep1 % 10) ) !== chkStep2 ) {
        alert("사업자번호가 유효하지 않습니다.");
        return false;
      }
      else {
        return true;
      }
    }}
}
</script>

<style scoped>

</style>
