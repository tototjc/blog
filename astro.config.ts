import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeExternalLinks from 'rehype-external-links'

import devtoolsJson from 'vite-plugin-devtools-json'

import blogTheme from './src/integrations/theme'
import astroDecapCms from './src/integrations/astro-decap-cms'

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
    }),
    astroDecapCms({
      previewContainersTag: 'article',
      previewStyles: [['/src/styles/global.css'], ['/src/styles/markdown.css']],
      cmsConfig: {
        locale: 'zh_Hans',
        backend: {
          name: 'github',
          repo: 'tototjc/my-blog-post',
          branch: 'main',
          base_url: 'https://decapcms-auth.tototjc.workers.dev',
        },
        media_folder: 'assets',
        collections: [
          {
            name: 'posts',
            label: 'Posts',
            create: true,
            folder: 'post',
            format: 'frontmatter',
            extension: 'md',
            slug: '{{year}}{{month}}{{day}}{{hour}}{{minute}}',
            summary: '{{title}} - {{filename}} - {{commit_date}}',
            sortable_fields: ['commit_date', 'title', 'pubDate', 'updDate'],
            view_groups: [
              { field: 'category', label: 'Category' },
              { field: 'pubDate', label: 'Publish Year', pattern: '\\d{4}' },
              { field: 'updDate', label: 'Update Year', pattern: '\\d{4}' },
            ],
            fields: [
              { name: 'title', label: 'Title', widget: 'string', required: true, i18n: true },
              { name: 'category', label: 'Category', widget: 'string' },
              { name: 'pubDate', label: 'Publish Date', widget: 'datetime' },
              { name: 'updDate', label: 'Update Date', widget: 'datetime', default: '{{now}}' },
              { name: 'body', label: 'Text', widget: 'markdown', i18n: true },
            ],
          },
          {
            name: 'pages',
            label: 'Pages',
            sortable_fields: [],
            files: [
              {
                name: 'about',
                label: 'About',
                file: 'about.md',
                fields: [
                  { name: 'title', label: 'Title', widget: 'hidden', default: 'About', required: true },
                  { name: 'body', label: 'Text', widget: 'markdown' },
                ],
              },
              {
                name: 'blogroll',
                label: 'Blogroll',
                file: 'blogroll.md',
                fields: [
                  { name: 'title', label: 'Title', widget: 'hidden', default: 'Blogroll', required: true },
                  { name: 'body', label: 'Text', widget: 'markdown' },
                ],
              },
            ],
          },
        ],
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
