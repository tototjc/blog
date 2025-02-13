import { defineConfig, envField } from 'astro/config'
import sitemap from '@astrojs/sitemap'

import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeExternalLinks from 'rehype-external-links'

const isDevelopment = process.env.NODE_ENV === 'development'

export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  experimental: {
    clientPrerender: true,
    contentIntellisense: true,
    responsiveImages: true,
    serializeConfig: true,
    svg: {
      mode: 'inline',
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  image: {
    remotePatterns: [
      {
        protocol: 'https',
      },
    ],
    experimentalLayout: 'full-width',
    experimentalObjectFit: 'contain',
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [rehypeKatex, { strict: false, trust: true }],
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
  integrations: [
    sitemap({
      filter: page => !new URL(page).pathname.startsWith('/admin'),
    }),
  ],
  env: {
    schema: {
      CONTENT_GH_REPO: envField.string({ context: 'client', access: 'public' }),
      CONTENT_GH_BRANCH: envField.string({ context: 'client', access: 'public', optional: true }),
      GH_OAUTH_PROXY: envField.string({ context: 'client', access: 'public', optional: true }),
    },
    validateSecrets: true,
  },
  vite: {
    build: {
      sourcemap: isDevelopment,
    },
    css: {
      devSourcemap: isDevelopment,
    },
    resolve: {
      alias: {
        '@/': 'src/',
      },
    },
    ssr: {
      noExternal: ['katex'],
    },
  },
})
