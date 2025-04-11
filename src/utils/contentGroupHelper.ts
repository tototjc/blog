import type { CollectionEntry, CollectionKey } from 'astro:content'

export type Collection = CollectionEntry<CollectionKey>

export type CollectionGroup<C extends Collection> = {
  path: string
  title: string
  collection: C[]
}[]

export const groupCollections = <C extends Collection>(
  items: C[],
  keySelector: (item: C) => string[],
): CollectionGroup<C> => {
  const grouped: Record<string, C[]> = {}
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

export const sortGroupByKey = <G extends CollectionGroup<Collection>>(
  group: G,
  { locales, options }: { locales?: Intl.LocalesArgument; options?: Intl.CollatorOptions },
): G => group.sort((a, b) => String(a.title).localeCompare(String(b.title), locales, options))
