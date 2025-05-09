import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import sharp from 'sharp'

import ImgTemplate from './OgImgTemplate.astro'

export type OgImgOptions = {
  text: {
    title?: string
    subtitle?: string
  }
  format:
    | {
        type: 'png'
        options?: sharp.PngOptions
      }
    | {
        type: 'jpeg'
        options?: sharp.JpegOptions
      }
}

const container = await AstroContainer.create()

export const getOgImg = async ({ text, format }: OgImgOptions) =>
  await sharp(new TextEncoder().encode(await container.renderToString(ImgTemplate, { props: { ...text } })))
    .toFormat(format.type, format.options)
    .toBuffer({ resolveWithObject: true })

export { default as metaTags } from './OgMetaTags.astro'
