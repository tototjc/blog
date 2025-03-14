import type { CmsConfig } from 'decap-cms-core'
import { i18n, site } from 'astro:config/client'
import config from 'virtual:config'

export default {
  load_config_file: false,
  site_url: site,
  locale: config.cms.locale,
  backend: config.cms.backend,
  media_folder: 'assets',
  i18n: i18n && {
    structure: 'multiple_folders',
    locales: i18n.locales.map(locale => (typeof locale === 'string' ? locale : locale.path)),
    default_locale: i18n.defaultLocale,
  },
  collections: [
    {
      name: 'posts',
      label: 'Blog Posts',
      create: true,
      folder: 'post',
      format: 'frontmatter',
      extension: 'md',
      i18n: i18n && true,
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
        { name: 'body', label: 'Main Body', widget: 'markdown', i18n: true },
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
            { label: 'Title', name: 'title', widget: 'hidden', default: 'About', required: true },
            { label: 'Main Body', name: 'body', widget: 'markdown' },
          ],
        },
        {
          name: 'blogroll',
          label: 'Blogroll',
          file: 'blogroll.md',
          fields: [
            { name: 'title', label: 'Title', widget: 'hidden', default: 'Blogroll', required: true },
            { name: 'body', label: 'Main Body', widget: 'markdown' },
          ],
        },
      ],
    },
  ],
} satisfies CmsConfig
