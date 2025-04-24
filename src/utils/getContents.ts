import { getCollection, type CollectionEntry } from 'astro:content'
import { readingTime } from 'reading-time-estimator'

import { groupCollections } from './contentGroupHelper'

type Post = CollectionEntry<'post'> & {
  data: {
    readingTime: {
      minutes: number
      words: number
    }
  }
}

export const posts = Array.from<Post, Post>(await getCollection('post'), item => {
  item.data.readingTime = readingTime(item.rendered?.html ?? '')
  return item
}).sort((a, b) => (b.data.pubDate ?? 0).valueOf() - (a.data.pubDate ?? 0).valueOf())

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
