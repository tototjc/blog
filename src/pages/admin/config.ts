import type { CmsConfig } from 'decap-cms-core'
import { CONTENT_GH_REPO, CONTENT_GH_BRANCH, GH_OAUTH_PROXY } from 'astro:env/client'

export default {
  load_config_file: false,
  locale: 'zh_Hans',
  backend: {
    name: 'github',
    repo: CONTENT_GH_REPO,
    branch: CONTENT_GH_BRANCH,
    base_url: GH_OAUTH_PROXY,
  },
  media_folder: 'assets',
  collections: [
    {
      name: 'posts',
      label: 'Blog Posts',
      create: true,
      folder: 'post',
      slug: '{{year}}{{month}}{{day}}{{hour}}{{minute}}',
      summary: '{{title}} - {{filename}} - {{commit_date}}',
      sortable_fields: ['commit_date', 'title', 'pubDate', 'updDate'],
      view_groups: [
        { field: 'category', label: 'Category' },
        { field: 'pubDate', label: 'Publish Year', pattern: '\\d{4}' },
        { field: 'updDate', label: 'Update Year', pattern: '\\d{4}' },
      ],
      fields: [
        { name: 'title', label: 'Title', widget: 'string', required: true },
        { name: 'category', label: 'Category', widget: 'string' },
        { name: 'pubDate', label: 'Publish Date', widget: 'datetime' },
        { name: 'updDate', label: 'Update Date', widget: 'datetime', default: '{{now}}' },
        { name: 'body', label: 'Main Body', widget: 'markdown' },
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
