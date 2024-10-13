import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

export const collections = {
  blog: defineCollection({
    loader: glob({
      pattern: '**/*.md',
      base: 'src/blog',
    }),
    schema: z.object({
      title: z.string(),
      category: z.string().optional(),
      pubDate: z.coerce.date().optional(),
      updDate: z.coerce.date().optional(),
    }),
  }),
}
