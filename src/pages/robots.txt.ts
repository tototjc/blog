import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = `
    User-agent: *
    Allow: /
    Disallow: /admin
    Sitemap: ${URL.parse('/sitemap-index.xml', site)?.href}
  `.trim()
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
