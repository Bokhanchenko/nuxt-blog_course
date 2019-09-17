module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || 'SSR Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // for SEO
      { hid: 'description', name: 'description', content: process.env.npm_package_description || 'SSR BLOCK - HELLO!!' },
      { hid: 'keywords', name: 'keywords', content: 'js, javascript, ssr, blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#001bff' },
  /*
  ** Global CSS
  */
  css: [
    '@/styles/global.scss',
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/index',
    // '@/plugins/element-ui',
    '@/plugins/axios',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // https://pwa.nuxtjs.org/setup.html
    ['@nuxtjs/pwa', { icon: false }],
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // setup for axios when yse with heroku
    baseURL: process.env.BASE_URL || 'http://localhost:3000'
  },
  /*
  ** Build configuration
  */

  //
  env: {
    appName: 'SSR Blog',
  },

  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }
    }
  }
};
