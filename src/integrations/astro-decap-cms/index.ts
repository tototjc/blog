import type { AstroIntegration } from 'astro'
import type { CmsConfig, CmsCollection, CmsCollectionFile } from 'decap-cms-core'

import type { UserConfig, PreviewContainer, PreviewContainerWithTarget } from './type'

import virtualConfig from './vite-plugin'

const getPreviewContainerWithTarget = (
  items: (CmsCollection | CmsCollectionFile)[],
  previewContainer: PreviewContainer,
): PreviewContainerWithTarget[] => {
  return items.flatMap(item => {
    if ('files' in item && Array.isArray(item.files)) {
      return getPreviewContainerWithTarget(item.files, previewContainer) ?? []
    } else {
      const isMarkdownBody = item.fields?.some(field => field.widget === 'markdown' && field.name === 'body')
      const { tag, attr } = previewContainer
      return isMarkdownBody ? { target: item.name, tag, attr } : []
    }
  })
}

export default function (opts: UserConfig): AstroIntegration {
  const { cmsRoute = '/admin', cmsConfig, previewStyles, previewContainer } = opts
  return {
    name: 'astro-decap-cms',
    hooks: {
      'astro:config:setup': async ({ config, injectRoute, updateConfig }) => {
        const defaultCmsConfig: Partial<CmsConfig> = {
          load_config_file: false,
          site_url: config.site,
          i18n: config.i18n && {
            structure: 'multiple_folders',
            locales: config.i18n.locales.map(locale => (typeof locale === 'string' ? locale : locale.path)),
            default_locale: config.i18n.defaultLocale,
          },
        }

        const finalCmsConfig = {
          ...defaultCmsConfig,
          ...cmsConfig,
        } satisfies CmsConfig

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
  }
}
