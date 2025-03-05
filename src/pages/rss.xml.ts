import type { APIRoute } from 'astro'
import rss from '@astrojs/rss'

import config from 'virtual:config'

import { posts } from '@/utils/getContents'

export const GET: APIRoute = async context =>
  rss({
    title: config.title,
    description: config.description,
    site: context.site ?? '',
    items: posts.map(entry => ({ link: entry.id, ...entry.data })),
    stylesheet: '/rss/styles.xsl',
  })
