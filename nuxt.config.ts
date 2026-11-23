export default ({
    // Client-only SPA: data lives in the URL and is decoded in the browser,
    // so no server runtime is needed (and old Nitro targets unsupported nodejs16.x on Vercel).
    ssr: false,
    modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@vueuse/nuxt'],
    build: {
        transpile: ["@headlessui/vue"],
    },
    colorMode: {
        classSuffix: '',
    },
})
