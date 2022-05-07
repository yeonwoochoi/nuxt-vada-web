export default ({ $axios, app, error: nuxtError }, inject) => {
  $axios.onRequest(config => {
    if (config.url === '/user/refresh-token') {
      config.headers['Authorization'] = 'Bearer ' + app.$auth.strategy.refreshToken.get()
    }
    if (config.url === '/api/pg-approve') {
      console.log("called")
      $axios.setBaseURL('http://172.30.1.19:8765')
    }
    /*
    else {
      $axios.setBaseURL(process.env.API_URL)
    }
     */
    console.log('Making request to ' + config.url)
  })

  $axios.onError(err => {
    const code = parseInt(err.response && err.response.status)
    console.error(err)
  })
}
