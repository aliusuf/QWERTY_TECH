// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: true,

  css: [
    '@fontsource/anton/400.css',
    '@fontsource/archivo/600.css',
    '@fontsource/archivo/700.css',
    '@fontsource/space-mono/400.css',
    '~/assets/css/main.css'
  ],

  // the 4.3 MB GLB ships gzip/brotli-compressed
  nitro: { compressPublicAssets: true },

  // three is client-only (JellyfishModel.client.vue); pre-bundle it for fast dev loads
  vite: { optimizeDeps: { include: ['three'] } },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'QWERTY TECK — Creative Technology',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        {
          name: 'description',
          content:
            'A creative space showcasing groundbreaking projects that blend creativity and technology.'
        },
        { name: 'theme-color', content: '#eceaf2' }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🪼</text></svg>'
        }
      ]
    }
  }
})
