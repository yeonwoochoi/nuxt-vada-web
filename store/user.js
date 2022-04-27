export const state = () => ({
  emailForPwdReset: '',
  pwdResetSuccess: false,
})

export const getters = {
  getEmailForPwdReset: state => state.emailForPwdReset,
  getPwdResetSuccess: state => state.pwdResetSuccess,
}

export const mutations = {
  setEmailForPwdReset: (state, payload) => {
    state.emailForPwdReset = payload
  },
  setPwdResetSuccess: (state, payload) => {
    state.pwdResetSuccess = payload
  },
  resetEmailForPwdReset: (state) => {
    state.emailForPwdReset = ''
  },
  resetPwdResetSuccess: (state) => {
    state.emailForPwdReset = ''
  },
}

export const actions = {
  createPrivateUser({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/user', payload)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  createEnterpriseUser({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/enterprise', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  checkPassword({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/user/password/validate', payload)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  getEnterpriseInfo({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/enterprise/' + payload)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  updateUser({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$put('/user', payload)
        .then(res => {
          resolve(res.user)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  deleteUser({commit}, params) {
    return new Promise((resolve, reject) => {
      this.$axios.$delete('/user/' + params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  sendEmailAuthCode({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/email', payload)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  validateEmailAuthCode({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$put('/email', payload)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  changePassword({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$put('/user/password/change', payload)
        .then(res => {
          resolve(res.user)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  changePasswordFromTemp({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$put('/user/password/change-temp', payload)
        .then(res => {
          resolve(res.user)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
}
