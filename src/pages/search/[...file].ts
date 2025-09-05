import type { APIRoute, GetStaticPaths, InferGetStaticPropsType, InferGetStaticParamsType } from 'astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { createIndex } from 'pagefind'
import { lookup } from 'mrmime'

import { search } from 'virtual:config'

import { posts } from '@/utils/getContents'

import { default as Page, getStaticPaths as pageGetStaticPaths } from '@/pages/[...slug]/index.astro'

const { index, errors: createErrors } = await createIndex(search)

if (!index) {
  throw new Error(createErrors.join('\n'))
}

const container = await AstroContainer.create()

for (const entry of posts) {
  await index.addHTMLFile({
    url: entry.id,
    content: await container.renderToString(Page, {
      params: { slug: entry.id } satisfies InferGetStaticParamsType<typeof pageGetStaticPaths>,
      props: { entry } satisfies InferGetStaticPropsType<typeof pageGetStaticPaths>,
      partial: false,
    }),
  })
}

const { files } = await index.getFiles()

export const getStaticPaths = (() =>
  files.map(file => ({
    params: { file: file.path },
    props: { data: file.content },
  }))) satisfies GetStaticPaths

type Props = InferGetStaticPropsType<typeof getStaticPaths>
type Params = InferGetStaticParamsType<typeof getStaticPaths>

export const GET: APIRoute<Props, Params> = ({ params, props }) =>
  new Response(props.data as Uint8Array<ArrayBuffer>, {
    headers: {
      'Content-Type': lookup(params.file) ?? 'application/octet-stream',
    },
  })
