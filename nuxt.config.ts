export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        'nuxt-headlessui',
        '@nuxt/image-edge', 
        '@nuxtjs/tailwindcss',
        '@pinia-plugin-persistedstate/nuxt'
    ],
    headlessui: {
        prefix: 'Hl'
    },
    runtimeConfig: {
        client_id: process.env.CLIENT_ID,
        public: {
            shortCode: process.env.SHORT_CODE,
            organization: process.env.ORGANIZATION,
            channel_id: process.env.CHANNEL_ID || 'RefArch',
            callback: process.env.CALLBACK || 'http://localhost:3000/callback',
            version: process.env.VERSION || 'v1'
        }
    },
    routeRules: {
        'checkout': { ssr: false }
    }
})