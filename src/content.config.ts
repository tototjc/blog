import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

import { contentSchema } from './integrations/theme/schema'

export const collections = {
  post: defineCollection({
    loader: glob({
      pattern: 'post/*.md',
      base: 'blog',
    }),
    schema: contentSchema,
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
