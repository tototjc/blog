import { getCollection, type CollectionEntry } from 'astro:content'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toString } from 'mdast-util-to-string'
import readingTime, { type ReadingTimeResult } from 'reading-time'

import { groupCollections } from './contentGroupHelper'

type Post = CollectionEntry<'post'> & {
  data: {
    readingTime: ReadingTimeResult
  }
}

export const posts = (await getCollection('post'))
  .map(item => {
    ;(item as Post).data.readingTime = readingTime(toString(fromMarkdown(item.body ?? '')))
    return item
  })
  .sort((a, b) => (b.data.pubDate ?? 0).valueOf() - (a.data.pubDate ?? 0).valueOf())

export const pages = await getCollection('page')

export const contents = [...posts, ...pages]

export const groups = [
  {
    path: 'archive',
    title: 'Archive',
    group: groupCollections(posts, entry => [entry.data.pubDate?.getFullYear().toString() ?? 'others']),
  },
  {
    path: 'category',
    title: 'Category',
    group: groupCollections(posts, entry => entry.data.categories ?? ['others']).sort((a, b) =>
      String(a.title).localeCompare(String(b.title), 'zh-Hans-CN', { sensitivity: 'accent' }),
    ),
  },
]
