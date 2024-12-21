import type { APIRoute } from 'astro'
import rss from '@astrojs/rss'

import { sortedPosts } from '@/utils/getPosts'
import MdAdditionalInfo from '@/utils/getMdAdditionalInfo'

import { SITE_TITLE, SITE_DESCRIPTION } from '@/consts'

export const GET: APIRoute = async context =>
  rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site ?? '',
    items: sortedPosts.map(entry => ({
      ...entry.data,
      link: entry.id,
      description: new MdAdditionalInfo(entry.body ?? '').getSummary(),
    })),
    stylesheet: '/rss/styles.xsl',
  })
