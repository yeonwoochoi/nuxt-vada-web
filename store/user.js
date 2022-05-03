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
          reject(err.response.data)
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
          reject(err.response.data)
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
          reject(err.response.data)
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
          reject(err.response.data)
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
          reject(err.response.data)
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
          reject(err.response.data)
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
          reject(err.response.data)
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
          reject(err.response.data)
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
          reject(err.response.data)
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
          reject(err.response.data)
        })
    })
  },
}
