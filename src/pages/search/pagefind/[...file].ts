import type { APIRoute, GetStaticPaths, InferGetStaticPropsType, InferGetStaticParamsType } from 'astro'
import { createIndex } from 'pagefind'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toString } from 'mdast-util-to-string'

import mime from 'mime'

import { allPosts } from '@/utils/getPosts'

const { index, errors: createErrors } = await createIndex()

if (!index) {
  throw new Error(createErrors.join('\n'))
}

for (const post of allPosts) {
  await index.addCustomRecord({
    url: post.id,
    content: toString(fromMarkdown(post.body ?? '')),
    language: 'zh',
    meta: {
      title: post.data.title,
    },
    filters: {
      category: [post.data.category ?? 'others'],
    },
    sort: {
      date: (post.data.pubDate ?? 0).valueOf().toFixed(),
    },
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
