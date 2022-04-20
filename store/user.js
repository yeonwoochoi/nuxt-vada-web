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
  }
}
