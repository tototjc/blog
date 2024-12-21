import { getCollection, type CollectionEntry } from 'astro:content'

type Posts = CollectionEntry<'blog'>[]

const allPosts = await getCollection('blog', ({ id }) => id.startsWith('post/'))

const getSortedGroup = (group: Map<string, Posts>) =>
  new Map(
    [...group.entries()].sort(([a], [b]) =>
      String(a).localeCompare(String(b), 'zh-Hans-CN', { sensitivity: 'accent' }),
    ),
  )

const sortedPosts = allPosts.sort((a, b) => (b.data.pubDate ?? 0).valueOf() - (a.data.pubDate ?? 0).valueOf())

const archiveGroup = getSortedGroup(
  Map.groupBy(sortedPosts, post => post.data.pubDate?.getFullYear().toString() ?? 'others'),
)

const categoryGroup = getSortedGroup(Map.groupBy(sortedPosts, post => post.data.category ?? 'others'))

const groupedPosts = new Map([
  ['archive', archiveGroup],
  ['category', categoryGroup],
])

export { sortedPosts, groupedPosts, type Posts }
