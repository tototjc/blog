import type { APIRoute, GetStaticPaths, InferGetStaticPropsType, InferGetStaticParamsType } from 'astro'
import { experimental_AstroContainer } from 'astro/container'
import { createIndex } from 'pagefind'
import mime from 'mime'

import config from 'virtual:config'

import { allPosts } from '@/utils/getPosts'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Page from '@/pages/[...slug].astro'

const { index, errors: createErrors } = await createIndex(config.search)

if (!index) {
  throw new Error(createErrors.join('\n'))
}

const container = await experimental_AstroContainer.create()

for (const entry of allPosts) {
  await index.addHTMLFile({
    url: entry.id,
    content: await container.renderToString(Page, {
      params: { slug: entry.id },
      props: { entry },
    }),
  })
}

const { files } = await index.getFiles()

export const getStaticPaths = (() => files.map(file => ({ params: { file: file.path } }))) satisfies GetStaticPaths

type Props = InferGetStaticPropsType<typeof getStaticPaths>
type Params = InferGetStaticParamsType<typeof getStaticPaths>

export const GET: APIRoute<Props, Params> = async ({ params }) => {
  const file = files.find(file => file.path === params.file)
  if (!file) {
    return new Response('Not found', { status: 404 })
  } else {
    return new Response(file.content, {
      headers: {
        'Content-Type': mime.getType(file.path),
      },
    })
  }
}
