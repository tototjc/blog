import type { APIRoute } from 'astro'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import MdAdditionalInfo from '@/utils/getMdAdditionalInfo'
import { SITE_TITLE, SITE_DESCRIPTION } from '@/consts'

export const GET: APIRoute = async context =>
  rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site ?? '',
    items: (await getCollection('blog', ({ id }) => id.startsWith('post/')))
      .map(entry => ({
        ...entry.data,
        link: entry.id,
        description: new MdAdditionalInfo(entry.body ?? '').getSummary(),
      }))
      .sort((a, b) => (b.pubDate ?? 0).valueOf() - (a.pubDate ?? 0).valueOf()),
    stylesheet: '/rss/styles.xsl',
  })
