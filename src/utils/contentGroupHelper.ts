import type { CollectionEntry, CollectionKey } from 'astro:content'

export type Content = CollectionEntry<CollectionKey>

export type ContentGroup = {
  path: string
  title: string
  collection: Content[]
}[]

export const groupContents = (items: Content[], keySelector: (item: Content) => string[]): ContentGroup => {
  const grouped: Record<string, Content[]> = {}

  items.forEach(item =>
    keySelector(item).forEach(key => {
      if (!grouped[key]) grouped[key] = []
      grouped[key].push(item)
    }),
  )

  return Object.entries(grouped).map(([key, collection]) => ({
    path: decodeURIComponent(key),
    title: key,
    collection,
  }))
}

export const sortGroupByKey = (
  group: ContentGroup,
  {
    locales,
    options,
  }: {
    locales?: Intl.LocalesArgument
    options?: Intl.CollatorOptions
  },
) => group.sort((a, b) => String(a.title).localeCompare(String(b.title), locales, options))
