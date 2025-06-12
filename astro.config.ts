import { defineConfig } from 'astro/config'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'

import sitemap from '@astrojs/sitemap'

import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'

import devtoolsJson from 'vite-plugin-devtools-json'

import blogTheme from './src/integrations/theme'

export default defineConfig({
  site: 'https://i.cuicu.icu',
  experimental: {
    clientPrerender: true,
    contentIntellisense: true,
    headingIdCompat: true,
    preserveScriptOrder: true,
    responsiveImages: true,
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
      rehypeHeadingIds,
      [rehypeKatex, { strict: false, trust: true }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: 'anchor' },
          content: { type: 'text', value: '#' },
        },
      ],
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
    blogTheme({
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
    plugins: [devtoolsJson()],
    resolve: {
      alias: {
        '@/': 'src/',
      },
    },
  },
})
