import { defineConfig, envField } from 'astro/config'
import icon from 'astro-icon'
import sitemap from '@astrojs/sitemap'

import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeExternalLinks from 'rehype-external-links'

const isDevelopment = process.env.NODE_ENV === 'development'

export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  security: {
    checkOrigin: true,
  },
  experimental: {
    directRenderScript: true,
    clientPrerender: true,
    contentIntellisense: true,
    contentLayer: true,
    env: {
      schema: {
        CONTENT_GH_REPO: envField.string({ context: 'client', access: 'public' }),
        CONTENT_GH_BRANCH: envField.string({ context: 'client', access: 'public', optional: true }),
        GH_OAUTH_PROXY: envField.string({ context: 'client', access: 'public', optional: true }),
      },
    },
  },
  image: {
    remotePatterns: [
      {
        protocol: 'https',
      },
    ],
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
    icon(),
    sitemap({
      i18n: {
        defaultLocale: 'zh_Hans',
        locales: {
          zh_Hans: 'zh-Hans',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
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
