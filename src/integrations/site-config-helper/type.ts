import type { CmsBackend } from 'decap-cms-core'
import type { PagefindServiceConfig } from 'pagefind'

export type SiteConfig = {
  title: string
  description: string
  author?: {
    name: string
    url: string
  }
  beian?: string
  postlist: {
    pageSize: number
    summaryLength: number
  }
  nav: {
    href: string
    text: string
    icon: string
    [key: string]: string
  }[]
  search?: PagefindServiceConfig
  cms: {
    locale?: string
    backend: CmsBackend
  }
}
