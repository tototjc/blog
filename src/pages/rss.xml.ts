import type { APIRoute } from 'astro'
import rss from '@astrojs/rss'

import config from 'virtual:config'

import { sortedPosts } from '@/utils/getPosts'
import MdAdditionalInfo from '@/utils/getMdAdditionalInfo'

export const GET: APIRoute = async context =>
  rss({
    title: config.title,
    description: config.description,
    site: context.site ?? '',
    items: sortedPosts.map(entry => ({
      ...entry.data,
      link: entry.id,
      description: new MdAdditionalInfo(entry.body ?? '').getSummary(config.postlist.summaryLength),
    })),
    stylesheet: '/rss/styles.xsl',
  })
