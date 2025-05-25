import type { APIRoute } from 'astro'
import { getRssString } from '@astrojs/rss'

import { title, description } from 'virtual:config'

import { posts } from '@/utils/getContents'

export const GET: APIRoute = async context =>
  new Response(
    await getRssString({
      title,
      description,
      site: context.site ?? '',
      items: posts.map(entry => ({ link: entry.id, ...entry.data })),
      stylesheet: '/rss/styles.xsl',
    }),
    {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
      },
    },
  )
