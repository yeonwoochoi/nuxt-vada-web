export const state = () => ({
  tempPurchaseItem: null
})

export const getters = {
  getTempPurchaseItem: state => state.tempPurchaseItem,
}

export const mutations = {
  setTempPurchaseItem: (state, data) => {
    state.tempPurchaseItem = data
  },
}

export const actions = {
  async readAllPlan ({commit}) {
    return new Promise(((resolve, reject) => {
      this.$axios.$get('/service')
        .then(res => {
          resolve(res['vadaServices'])
        })
        .catch(err => {
          reject(err.response.data)
        })
    }))
  },
  async purchase ({commit}, payload) {
    return new Promise(((resolve, reject) => {
      this.$axios.$post('/user/report-purchase', payload)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data)
        })
    }))
  },
  async readPlanByIdx({commit}, param) {
    return new Promise(((resolve, reject) => {
      this.$axios.$get('/service/' + param)
        .then(res => {
          resolve(res['vadaService'])
        })
        .catch(err => {
          reject(err.response.data)
        })
    }))
  }
}
