export const state = () => ({

})

export const getters = {
}

export const mutations = {
}

export const actions = {
  createPrivateUser({commit}, params) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/user', params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  createEnterpriseUser({commit}, params) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/enterprise', params, {
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
  checkPassword({commit}, params) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/user/password/validate', params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  getEnterpriseInfo({commit}, params) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/enterprise/' + params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  updateUser({commit}, params) {
    return new Promise((resolve, reject) => {
      this.$axios.$put('/user', params)
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
  sendEmailAuthCode({commit}, params) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/email', params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  validateEmailAuthCode({commit}, params) {
    return new Promise((resolve, reject) => {
      this.$axios.$put('/email', params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  }
}
