export const state = () => ({
  itemsPerPage: 10,
})

export const actions = {
  async readAll ({commit}) {
    return new Promise(((resolve, reject) => {
      this.$axios.$get('/notice')
        .then(res => {
          resolve(res.notices)
        })
        .catch(err => {
          reject(err.response.data)
        })
    }))
  },
  async readByIndex ({commit}, params) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('/notice/' + params).then(res=> {
        resolve(res.notice)
      }).catch(err => {
        reject(err.response.data)
      })
    })
  },
  async addViewCount ({commit}, params) {
    return new Promise(((resolve, reject) => {
      this.$axios.$put('/notice/increase/' + params).then(res=> {
        resolve(res)
      }).catch(err => {
        reject(err.response.data)
      })
    }))
  }
}
