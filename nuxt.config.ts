export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt",
    "nuxt-headlessui",
    "@nuxt/image-edge",
    "@nuxtjs/tailwindcss",
    "@pinia-plugin-persistedstate/nuxt",
    '@nuxtjs/i18n',
  ],
  headlessui: {
    prefix: "Hl",
  },
  runtimeConfig: {
    client_id: process.env.CLIENT_ID,
    public: {
      shortCode: process.env.SHORT_CODE,
      organization: process.env.ORGANIZATION,
      channel_id: process.env.CHANNEL_ID || "RefArch",
      callback: process.env.CALLBACK || "http://localhost:3000/callback",
      version: process.env.VERSION || "v1",
    },
  },
  routeRules: {
    checkout: { ssr: false },
  },
  i18n: {
    locales: [
      {
        code: 'default',
        files: ['en-US.json'],
        name: 'English'
      },
      {
        code: 'es',
        files: ['es-ES.json'],
        name: 'Español'
      },
      {
        code: 'es-MX',
        files: ['es-ES.json'],
        name: 'Español Mexico'
      }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
    },
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'default',
  }
});
