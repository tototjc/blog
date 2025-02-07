import { getCollection, type CollectionEntry } from 'astro:content'

export type Posts = CollectionEntry<'blog'>[]

const getSortedPosts = (posts: Posts) =>
  posts.sort((a, b) => (b.data.pubDate ?? 0).valueOf() - (a.data.pubDate ?? 0).valueOf())

const getSortedGroup = (group: Map<string, Posts>) =>
  new Map(
    [...group.entries()].sort(([a], [b]) =>
      String(a).localeCompare(String(b), 'zh-Hans-CN', { sensitivity: 'accent' }),
    ),
  )

export const allPosts = await getCollection('blog', ({ id }) => id.startsWith('post/'))

export const sortedPosts = getSortedPosts(allPosts)

export const groupedPosts = new Map([
  ['archive', Map.groupBy(sortedPosts, post => post.data.pubDate?.getFullYear().toString() ?? 'others')],
  ['category', getSortedGroup(Map.groupBy(sortedPosts, post => post.data.category ?? 'others'))],
])
