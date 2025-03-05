import { getCollection, type CollectionEntry } from 'astro:content'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toString } from 'mdast-util-to-string'
import readingTime, { type ReadingTimeResult } from 'reading-time'

import { groupContents, sortGroupByKey } from './contentGroupHelper'

export type Content = CollectionEntry<'blog'>

export type Post = Content & {
  data: {
    description?: string
    readingTime?: ReadingTimeResult
  }
}

export const contents = await getCollection('blog')

export const posts = contents
  .filter(({ id }) => id.startsWith('post/'))
  .map(item => {
    const summaryLength = 75
    const plainText = toString(fromMarkdown(item.body ?? ''))
    ;(item as Post).data.description =
      plainText.slice(0, summaryLength) + (plainText.length > summaryLength ? ' ...' : '')
    ;(item as Post).data.readingTime = readingTime(plainText)
    return item
  })
  .sort((a, b) => (b.data.pubDate ?? 0).valueOf() - (a.data.pubDate ?? 0).valueOf())

export const groups = [
  {
    path: 'archive',
    title: 'Archive',
    group: groupContents(posts, entry => [entry.data.pubDate?.getFullYear().toString() ?? 'others']),
  },
  {
    path: 'category',
    title: 'Category',
    group: sortGroupByKey(
      groupContents(posts, entry => [entry.data.category ?? 'others']),
      {
        locales: 'zh-Hans-CN',
        options: { sensitivity: 'accent' },
      },
    ),
  },
]
