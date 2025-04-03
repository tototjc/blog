/// <reference types='astro/client' />
/// <reference path="../.astro/types.d.ts" />

declare module '*.astro'

declare module '@pagefind/modular-ui'

interface Window {
  initSearch(): void
}
