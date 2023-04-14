export default defineNuxtConfig({
    modules: [
        '@nuxt/image-edge', '@nuxtjs/tailwindcss', 'nuxt-swiper', 'nuxt-headlessui'
    ],
    swiper: {
        styleLang: 'css',
    },
    headlessui: {
        prefix: 'Hl'
    }
})