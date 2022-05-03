export const state = () => ({

})

export const actions = {
  async createInquiry ({commit}, params) {
    return new Promise(((resolve, reject) => {
      this.$axios.$post('/enquire', params).then(res => {
        resolve(res['enquire'])
      }).catch(err => {
        reject(err.response.data)
      })
    }))
  },
  async readAll({commit}) {
    return new Promise(((resolve, reject) => {
      this.$axios.$get('/enquire').then(res => {
        resolve(res['enquires'])
      }).catch(err => {
        reject(err.response.data)
      })
    }))
  }
}
