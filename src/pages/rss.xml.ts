import type { APIRoute } from 'astro'
import rss from '@astrojs/rss'

import { title, description } from 'virtual:config'

import { posts } from '@/utils/getContents'

export const GET: APIRoute = async context =>
  rss({
    title,
    description,
    site: context.site ?? '',
    items: posts.map(entry => ({ link: entry.id, ...entry.data })),
    stylesheet: '/rss/styles.xsl',
  })
