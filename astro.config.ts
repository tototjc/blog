import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeExternalLinks from 'rehype-external-links'

import { vitePluginSiteConfig } from './src/plugins/virtual-site-config'
import siteConfig from './src/site.config'

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
    plugins: [vitePluginSiteConfig(siteConfig)],
  },
})
