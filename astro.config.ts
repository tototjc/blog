import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeExternalLinks from 'rehype-external-links'

import siteConfigHelper from './src/integrations/site-config-helper'

export default defineConfig({
  site: process.env.SITE_URL,
  experimental: {
    clientPrerender: true,
    contentIntellisense: true,
    headingIdCompat: true,
    preserveScriptOrder: true,
    responsiveImages: true,
    serializeConfig: true,
    svg: true,
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
    siteConfigHelper({
      title: "Gaaising's Blog",
      description: "Gaaising Tam's personal blog",
      author: {
        name: 'Gaaising Tam',
        url: 'https://github.com/tototjc',
      },
      beian: '粤ICP备2025369000号',
      postlist: {
        pageSize: 5,
        summaryLength: 75,
      },
      nav: [
        { href: '/collections', text: 'Collections', icon: 'library' },
        { href: '/about', text: 'About', icon: 'person' },
        { href: '/blogroll', text: 'Blogroll', icon: 'link' },
        { href: '/search', text: 'Search', icon: 'search' },
        { href: '/rss.xml', text: 'Feed', icon: 'rss', type: 'application/rss+xml', target: '_blank' },
      ],
      search: {
        forceLanguage: 'zh',
      },
      cms: {
        locale: 'zh_Hans',
        backend: {
          name: 'github',
          repo: 'tototjc/my-blog-post',
          branch: 'main',
          base_url: 'https://decapcms-auth.tototjc.workers.dev',
        },
      },
    }),
  ],
  vite: {
    css: {
      devSourcemap: true,
    },
    resolve: {
      alias: {
        '@/': 'src/',
      },
    },
  },
})
