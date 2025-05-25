import type { CollectionEntry, CollectionKey } from 'astro:content'

type Collection = CollectionEntry<CollectionKey>

type CollectionGroup<C extends Collection> = {
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
