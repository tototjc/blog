const config = {
  title: "Gaaising's Blog",
  description: "Gaaising Tam's personal blog",
  author: {
    name: 'Gaaising Tam',
    url: 'https://github.com/tototjc',
  },
  postlist: {
    pageSize: 5,
    summaryLength: 75,
  },
  nav: [
    { href: '/collections', text: 'Collections', icon: 'library' },
    { href: '/about', text: 'About', icon: 'person' },
    { href: '/blogroll', text: 'Blogroll', icon: 'link' },
    { href: '/search', text: 'Search', icon: 'search' },
    { href: '/rss.xml', text: 'Feed', icon: 'rss', type: 'application/rss+xml', target: '_blank' },
  ],
  search: {
    forceLanguage: 'zh',
  },
  cms: {
    locale: 'zh_Hans',
    backend: {
      name: 'github',
      repo: 'tototjc/my-blog-post',
      branch: 'main',
      base_url: 'https://decapcms-auth.tototjc.workers.dev',
    },
  },
} as const

type Writeable<T> = {
  -readonly [K in keyof T]: T[K] extends object ? Writeable<T[K]> : T[K]
}

export type SiteConfig = Writeable<typeof config>

export default config
