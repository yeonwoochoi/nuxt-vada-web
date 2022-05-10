export default ({ $axios, app, error: nuxtError }, inject) => {
  $axios.onRequest(config => {
    if (config.url === '/user/refresh-token') {
      config.headers['Authorization'] = 'Bearer ' + app.$auth.strategy.refreshToken.get()
    }
  })
}
