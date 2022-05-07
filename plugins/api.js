export default function ({ $axios, $auth }, inject) {
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/json',
        Authorization: $auth.loggedIn ? $auth.strategy.token : ''
      }
    }
  })

  // Set baseURL to something different
  api.setBaseURL('https://localhost:8765')

  // Inject to context as $api
  inject('api', api)
}
