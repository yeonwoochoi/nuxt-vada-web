export const actions = {
  async readAllPlan ({commit}) {
    return new Promise(((resolve, reject) => {
      this.$axios.$get('/service')
        .then(res => {
          resolve(res['vadaServices'])
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    }))
  },
}
