import type { APIRoute, GetStaticPaths, InferGetStaticPropsType, InferGetStaticParamsType } from 'astro'
import { experimental_AstroContainer } from 'astro/container'
import { createIndex } from 'pagefind'
import mime from 'mime'

import { search } from 'virtual:config'

import { posts } from '@/utils/getContents'

import Page from '@/pages/[...slug]/index.astro'

const { index, errors: createErrors } = await createIndex(search)

if (!index) {
  throw new Error(createErrors.join('\n'))
}

const container = await experimental_AstroContainer.create()

for (const entry of posts) {
  await index.addHTMLFile({
    url: entry.id,
    content: await container.renderToString(Page, {
      params: { slug: entry.id },
      props: { entry },
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

export const GET: APIRoute<Props, Params> = async ({ params, props }) =>
  new Response(props.data, { headers: { 'Content-Type': mime.getType(params.file) ?? '' } })
