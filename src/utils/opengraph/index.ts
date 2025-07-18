import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { HTMLAttributes, ComponentProps } from 'astro/types'
import sharp from 'sharp'

import ImgTemplate from './OgImgTemplate.astro'

export type ImageOptions = {
  content: {
    primary: string
    secondary: string
  }
  format: {
    type: 'png' | 'jpeg'
    width: number
    height: number
  }
}

export type MetaTagsOptions = {
  type: 'website' | 'article'
  url: URL
  title: string
  description: string
  sitename?: string
  image?: {
    url: URL
    type: `image/${string}`
    width: number
    height: number
    alt: string
  }
  locale?: {
    default: string
    alternate: string[]
  }
}

export const getImage = async ({ content, format }: ImageOptions) => {
  const container = await AstroContainer.create()
  return sharp(
    new TextEncoder().encode(
      await container.renderToString(ImgTemplate, {
        props: { ...content } satisfies ComponentProps<typeof ImgTemplate>,
      }),
    ),
  )
    .resize(format.width, format.height)
    .toFormat(format.type)
    .toBuffer({ resolveWithObject: true })
}

export const getMetaTags = (opts: MetaTagsOptions): HTMLAttributes<'meta'>[] => {
  const metaTags = [
    {
      property: 'og:type',
      content: opts.type,
    },
    {
      property: 'og:url',
      content: opts.url,
    },
    {
      property: 'og:title',
      content: opts.title,
    },
    {
      property: 'og:description',
      content: opts.description,
    },
  ]
  if (opts.sitename) {
    metaTags.push({
      property: 'og:site_name',
      content: opts.sitename,
    })
  }
  if (opts.image) {
    metaTags.push(
      {
        property: 'og:image',
        content: opts.image.url,
      },
      {
        property: 'og:image:type',
        content: opts.image.type,
      },
      {
        property: 'og:image:width',
        content: opts.image.width.toString(),
      },
      {
        property: 'og:image:height',
        content: opts.image.height.toString(),
      },
      {
        property: 'og:image:alt',
        content: opts.image.alt,
      },
    )
  }
  if (opts.locale) {
    metaTags.push(
      {
        property: 'og:locale',
        content: opts.locale.default,
      },
      ...opts.locale.alternate.map(locale => ({
        property: 'og:locale:alternate',
        content: locale,
      })),
    )
  }
  return metaTags
}
