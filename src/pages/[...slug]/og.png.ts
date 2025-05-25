import type { APIRoute, GetStaticPaths, InferGetStaticPropsType, InferGetStaticParamsType } from 'astro'
import { lookup } from 'mrmime'

import { title as siteTitle } from 'virtual:config'

import { contents } from '@/utils/getContents'

import { getImage } from '@/utils/opengraph'

export const getStaticPaths = (() =>
  Array.fromAsync(contents, async entry => ({
    params: { slug: entry.id },
    props: {
      img: await getImage({
        content: {
          primary: entry.data.title,
          secondary: siteTitle,
        },
        format: {
          type: 'png',
          width: 1200,
          height: 630,
        },
      }),
    },
  }))) satisfies GetStaticPaths

type Props = InferGetStaticPropsType<typeof getStaticPaths>
type Params = InferGetStaticParamsType<typeof getStaticPaths>

export const GET: APIRoute<Props, Params> = ({ props: { img } }) =>
  new Response(img.data, {
    headers: {
      'Content-Type': lookup(img.info.format) ?? 'application/octet-stream',
    },
  })
