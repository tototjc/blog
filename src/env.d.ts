/// <reference types='astro/client' />
/// <reference path="../.astro/types.d.ts" />

declare module 'virtual:config' {
  const Config: import('@/site.config').SiteConfig
  export default Config
}

declare module '@pagefind/modular-ui'

interface Window {
  initSearch(): void
}
