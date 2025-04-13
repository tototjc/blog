import type { APIRoute, GetStaticPaths, InferGetStaticPropsType, InferGetStaticParamsType } from 'astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { title as siteTitle } from 'virtual:config'
import sharp from 'sharp'

import { contents } from '@/utils/getContents'

import OgImg from '@/components/OgImg.astro'

const container = await AstroContainer.create()

export const getStaticPaths = (() =>
  Array.fromAsync(contents, async entry => ({
    params: { slug: entry.id },
    props: {
      img: await sharp(
        new TextEncoder().encode(
          await container.renderToString(OgImg, {
            props: {
              title: entry.data.title,
              subtitle: siteTitle,
            },
          }),
        ),
      )
        .toFormat('png')
        .toBuffer(),
    },
  }))) satisfies GetStaticPaths

type Props = InferGetStaticPropsType<typeof getStaticPaths>
type Params = InferGetStaticParamsType<typeof getStaticPaths>

export const GET: APIRoute<Props, Params> = ({ props }) =>
  new Response(props.img, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
