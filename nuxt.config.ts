export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        'nuxt-headlessui',
        'nuxt-swiper', 
        '@nuxt/image-edge', 
        '@nuxtjs/tailwindcss',
        '@pinia-plugin-persistedstate/nuxt'
    ],
    swiper: {
        styleLang: 'css',
    },
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
    }
})