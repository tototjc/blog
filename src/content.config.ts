import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

export const collections = {
  post: defineCollection({
    loader: glob({
      pattern: 'post/*.md',
      base: 'blog',
    }),
    schema: z.object({
      title: z.string(),
      categories: z.array(z.string()).optional(),
      pubDate: z.coerce.date().optional(),
      updDate: z.coerce.date().optional(),
    }),
  }),
  page: defineCollection({
    loader: glob({
      pattern: '*.md',
      base: 'blog',
    }),
    schema: z.object({
      title: z.string(),
    }),
  }),
}
