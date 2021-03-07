import jrvs from './data/jrvs.json'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate
  generate: {
    fallback: true,
    crawler: false,
    routes: jrvs.map((jrv) => `/jrvs/${jrv.jrv}`),
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Visualizador de respaldos - Votaciones Feb. 2021',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Respaldo de actas de las JRV. Votaciones 28 de Febrero del 2021',
      },
      // Open Graph / Facebook
      {
        hid: 'og:type',
        name: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Visualizador de respaldos - Votaciones Feb. 2021',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content:
          'Respaldo de actas de las JRV. Votaciones 28 de Febrero del 2021',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content:
          'https://user-images.githubusercontent.com/13499566/110225764-1bc16300-7eae-11eb-8887-053070e8fafc.png',
      },
      // Twitter
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Visualizador de respaldos - Votaciones Feb. 2021',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Respaldo de actas de las JRV. Votaciones 28 de Febrero del 2021',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content:
          'https://user-images.githubusercontent.com/13499566/110225764-1bc16300-7eae-11eb-8887-053070e8fafc.png',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://io.hackerspace.sv/data/actas_tse/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build#hotmiddleware
    hotMiddleware: {
      client: {
        // Turn off client overlay when errors are present
        overlay: false,
      },
    },
  },
}
