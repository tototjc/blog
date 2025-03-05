import { z } from 'astro/zod'
import type { CmsConfig } from 'decap-cms-core'
import { AstroError } from 'astro/errors'

export class CmsConfigHelper {
  constructor(options: CmsConfig) {
    return options
  }
}

export const SiteConfigSchema = () =>
  z.object({
    // lang: z.string().default('en'),
    title: z.string(),
    description: z.string().default(''),
    author: z
      .object({
        name: z.string(),
        url: z.string().url().optional(),
      })
      .optional(),
    postlist: z
      .object({
        pageSize: z.number().default(5),
        summaryLength: z.number().default(75),
      })
      .optional(),
    cms: z
      .object({
        config: z.instanceof(CmsConfigHelper).or(z.object({}).passthrough()).optional(),
      })
      .optional(),
  })

export type SiteConfig = z.infer<ReturnType<typeof SiteConfigSchema>>

export function defineConfig(config: z.input<ReturnType<typeof SiteConfigSchema>>) {
  const parsedData = SiteConfigSchema().safeParse(config)
  if (!parsedData.success) {
    throw new AstroError(parsedData.error.message, parsedData.error.issues.map(i => i.message).join('\n'))
  }
  return parsedData.data
}
