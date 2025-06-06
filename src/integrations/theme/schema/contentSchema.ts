import { z } from 'astro/zod'

export default z
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
  })
