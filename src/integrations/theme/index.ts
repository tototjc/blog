import type { AstroIntegration } from 'astro'

import { virtualSiteConfig } from './virtual-site-config'

import type { SiteConfig } from './type'

export default function (opts: SiteConfig): AstroIntegration {
  return {
    name: 'site-config-helper',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [virtualSiteConfig(opts)],
          },
        })
      },
    },
  }
}
