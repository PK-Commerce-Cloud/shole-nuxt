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
    routeRules: {
        'index': {
            swr: false
        }
    }
})