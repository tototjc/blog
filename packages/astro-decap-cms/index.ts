import type { AstroIntegration } from 'astro'

import type { UserConfig } from './type'

import { getCmsConfigWithDefaults, normalizePreviewStyles, getPreviewContainerWithTarget } from './utils'

import virtualConfig from './vite-plugin'

export default ({ cmsRoute = '/admin', cmsConfig, previewStyles, previewContainer }: UserConfig): AstroIntegration => ({
  name: 'astro-decap-cms',
  hooks: {
    'astro:config:setup': async ({ config, injectRoute, updateConfig }) => {
      const finalCmsConfig = getCmsConfigWithDefaults(cmsConfig, config)
      injectRoute({
        pattern: cmsRoute,
        entrypoint: new URL('./dashboard.astro', import.meta.url),
      })
      updateConfig({
        vite: {
          plugins: [
            virtualConfig({
              config: finalCmsConfig,
              previewStyleParams: previewStyles && normalizePreviewStyles(previewStyles),
              previewContainerParams:
                previewContainer &&
                (Array.isArray(previewContainer)
                  ? previewContainer
                  : getPreviewContainerWithTarget(finalCmsConfig.collections, previewContainer)),
            }),
          ],
        },
      })
    },
  },
})
