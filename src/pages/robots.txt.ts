import type { APIRoute } from 'astro'

type RobotsPolicy = {
  userAgent: string[]
  allow?: string[]
  disallow?: string[]
}[]

const policy: RobotsPolicy = [
  {
    userAgent: ['*'],
    allow: ['/'],
    disallow: ['/admin'],
  },
]

export const GET: APIRoute = ({ site }) =>
  new Response(
    [
      ...policy.map(({ userAgent, allow, disallow }) =>
        [
          ...userAgent.map(i => `User-agent: ${i}`),
          ...(allow ?? []).map(i => `Allow: ${i}`),
          ...(disallow ?? []).map(i => `Disallow: ${i}`),
        ].join('\n'),
      ),
      `Sitemap: ${URL.parse('/sitemap-index.xml', site)?.href}`,
    ].join('\n\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    },
  )
