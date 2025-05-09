import type { APIRoute, GetStaticPaths, InferGetStaticPropsType, InferGetStaticParamsType } from 'astro'
import { lookup } from 'mrmime'

import { title as siteTitle } from 'virtual:config'

import { contents } from '@/utils/getContents'

import { getOgImg } from '@/utils/opengraph'

export const getStaticPaths = (() =>
  Array.fromAsync(contents, async entry => ({
    params: { slug: entry.id },
    props: {
      img: await getOgImg({
        text: {
          title: entry.data.title,
          subtitle: siteTitle,
        },
        format: {
          type: 'png',
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
