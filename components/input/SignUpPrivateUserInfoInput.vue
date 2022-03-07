<template>
  <p></p>
</template>

<script>
import { required, email, between, confirmed, alpha_dash, integer, min, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";

setInteractionMode('eager')

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
  name: "SignUpPrivateUserInfoInput",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    emailAuth: '',
    phoneFirst: '010',
    phoneMiddle: null,
    phoneLast: null,
    phoneFirstList: ['010','011','016','017','019','02','031','032','033','041','043','042','044','051','052','053','054','055','061','062','063','064','070'],
    showPassword: false,
  }),
  computed: {
    phone() {

    }
  },
  methods: {
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  }
}
</script>

<style scoped>

</style>
