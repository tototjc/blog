import type { CmsConfig } from 'decap-cms-core'
import { i18n, site } from 'astro:config/client'
import { cms } from 'virtual:config'

export default {
  load_config_file: false,
  site_url: site,
  locale: cms.locale,
  backend: cms.backend,
  media_folder: 'assets',
  i18n: i18n && {
    structure: 'multiple_folders',
    locales: i18n.locales.map(locale => (typeof locale === 'string' ? locale : locale.path)),
    default_locale: i18n.defaultLocale,
  },
  collections: [
    {
      name: 'posts',
      label: 'Posts',
      create: true,
      folder: 'post',
      format: 'frontmatter',
      extension: 'md',
      i18n: i18n && true,
      slug: '{{year}}{{month}}{{day}}{{hour}}{{minute}}',
      summary: '{{title}} - {{filename}} - {{commit_date}}',
      sortable_fields: ['commit_date', 'title', 'pubDate', 'updDate'],
      view_groups: [
        { field: 'pubDate', label: 'Publish Year', pattern: '\\d{4}' },
        { field: 'updDate', label: 'Update Year', pattern: '\\d{4}' },
      ],
      fields: [
        { name: 'title', label: 'Title', widget: 'string', required: true, i18n: true },
        { name: 'description', label: 'Description', widget: 'string', i18n: true },
        {
          name: 'categories',
          label: 'Category',
          widget: 'list',
          summary: '{{fields.category}}',
          field: { name: 'category', widget: 'string' },
        },
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
} satisfies CmsConfig
