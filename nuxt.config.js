import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vue-vada-web',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'animate.css/animate.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-particles', ssr: false },
    { src: "~/plugins/google-maps", ssr: false },
    { src: "~/plugins/vue-carousel", ssr: false },
    { src: '~/plugins/vee-validate', ssr: false },
    { src: '~/plugins/vue-json-csv', ssr: false },
    { src: '~/plugins/notifier' },
    { src: '~/plugins/axios' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  router: {
    middleware: 'auth'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['vue-notifications'],
    transpile: [/^vue2-google-maps($|\/)/, 'vee-validate/dist/rules']
  },

  auth: {
    // default value
    redirect: {
      login: '/membership/login', // 로그인이 필요할 때 이동할 path
      logout: '/', // 로그아웃 후 이동할 path
      callback: '/membership/login', // 로그인 후에 이동할 path
      home: '/' // 로그인 후에 이동할 path
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token.access_token',
          type: 'Bearer',
          name: 'Authorization',
          global: true,   // request header 에 authentication 으로 자동 포함됨
          maxAge: 60  // 30분
          //maxAge: 1800  // 30분
        },
        refreshToken: {
          property: 'token.refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30 // 30일
        },
        user: {
          property: 'user',
          data: 'user'
        },
        endpoints: {
          login: { url: '/user/login', method: 'post', },
          refresh: { url: '/user/refresh-token', method: 'post' },
          user: { url: '/user/login-email', method: 'get' },
        },
        // autoLogout: false
      }
    }
  },

  server: {
    port: 8765,
    host: '127.0.0.1'
  },

  axios: {
    baseURL: 'http://127.0.0.1:3000'
  }
}
