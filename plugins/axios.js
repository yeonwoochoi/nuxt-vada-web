export default ({ $axios, store }, inject) => {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(err => {
    console.error(err)
  })
}
