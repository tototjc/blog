import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

export const collections = {
  post: defineCollection({
    loader: glob({
      pattern: 'post/*.md',
      base: 'blog',
    }),
    schema: z
      .object({
        title: z.string(),
        description: z.string().optional(),
        categories: z
          .array(z.string())
          .transform(val => Array.from(new Set(val)))
          .optional(),
        pubDate: z.coerce.date().optional(),
        updDate: z.coerce.date().optional(),
      })
      .superRefine(({ pubDate, updDate }, { addIssue }) => {
        if (pubDate && updDate && updDate <= pubDate)
          addIssue({
            code: z.ZodIssueCode.too_small,
            minimum: pubDate.valueOf(),
            type: 'date',
            inclusive: false,
            path: ['updDate'],
          })
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
