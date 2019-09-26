import pkg from './package'
require('dotenv').config()

const isProd = process.env.NODE_ENV === 'production'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name || 'Multiple choice Tests',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'bootstrap/dist/css/bootstrap.css',
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/scss/main.scss'

  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/component-cache',
    'nuxt-purgecss'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:3002/api'
  },
  env: {
    SOCKET_HOST_URL: process.env.SOCKET_HOST_URL || 'http://localhost:3002'
  },

  /*
  ** Config manifest
  */
  manifest: {
    short_name: 'Multiple choice Tests',
    name: 'Multiple choice Tests',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    description: 'Take the tests perfectly!',
    lang: 'vi-VN',
    orientation: 'portrait-primary'
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    analyze: !isProd,
    cache: !isProd,
    cssSourceMap: !isProd,
    optimization: {
      minimize: isProd
    },
    extractCss: isProd,
    vendor: ['socket.io-client'],
    extend (config, { isClient, isDev }) {
      if (!isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            configFile: '.eslintrc.js',
            fix: true
          }
        })
      }
    }
  },

  /*
  ** PurgeCss configuration
  */
  purgeCSS: {
    enabled: ({ isDev, isClient }) => (!isDev && isClient),
    styleExtensions: ['.css'],
    paths: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js'
    ],
    whitelist: ['body', 'html', 'nuxt-progress', 'active'],
    extractors: [
      {
        extractor: class {
          static extract (content) {
            return content.match(/[A-z0-9-:\\/]+/g)
          }
        },
        extensions: ['html', 'vue', 'js']
      }
    ]
  }
}
