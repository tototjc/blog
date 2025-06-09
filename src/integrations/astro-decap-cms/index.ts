import type { AstroIntegration } from 'astro'
import type { CmsConfig, CmsCollection, CmsCollectionFile } from 'decap-cms-core'

import type { UserConfig, Config } from './type'

import virtualConfig from './vite-plugin'

export default function (opts: UserConfig): AstroIntegration {
  const { cmsRoute = '/admin', cmsConfig, previewStyles, previewContainer } = opts
  return {
    name: 'astro-decap-cms',
    hooks: {
      'astro:config:setup': async ({ config, injectRoute, updateConfig }) => {
        const defaultCmsConfig = {
          load_config_file: false,
          site_url: config.site,
          i18n: config.i18n && {
            structure: 'multiple_folders',
            locales: config.i18n.locales.map(locale => (typeof locale === 'string' ? locale : locale.path)),
            default_locale: config.i18n.defaultLocale,
          },
        } satisfies Partial<CmsConfig>

        const finalCmsConfig = {
          ...defaultCmsConfig,
          ...cmsConfig,
        } satisfies CmsConfig

        const getPreviewContainerParams = (
          items: (CmsCollection | CmsCollectionFile)[],
        ): Config['previewContainerParams'] => {
          if (!previewContainer) return undefined
          return items.flatMap(item => {
            if ('files' in item && Array.isArray(item.files)) {
              return getPreviewContainerParams(item.files) ?? []
            } else {
              const isMarkdownBody = item.fields?.some(field => field.widget === 'markdown' && field.name === 'body')
              const { tag, attr } = previewContainer
              return isMarkdownBody ? { target: item.name, tag, attr } : []
            }
          })
        }

        injectRoute({
          pattern: cmsRoute,
          entrypoint: new URL('./dashboard.astro', import.meta.url),
        })

        updateConfig({
          vite: {
            plugins: [
              virtualConfig({
                config: finalCmsConfig,
                previewStyleParams: previewStyles?.map(style =>
                  typeof style === 'string' ? [style] : [style.src, { raw: style.raw }],
                ),
                previewContainerParams: getPreviewContainerParams(finalCmsConfig.collections),
              }),
            ],
          },
        })
      },
    },
  }
}
