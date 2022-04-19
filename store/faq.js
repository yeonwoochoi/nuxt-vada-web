export const state = () => ({

})

export const actions = {
  async readAll ({commit}) {
    return new Promise(((resolve, reject) => {
      this.$axios.$get('/faq').then(res => {
        resolve(res['faqs'])
      }).catch(err => {
        reject(err.response.data.message)
      })
    }))
  }
}
