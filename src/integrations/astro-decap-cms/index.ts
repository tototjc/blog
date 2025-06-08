import type { AstroIntegration } from 'astro'
import type { CmsConfig } from 'decap-cms-core'

import type { UserConfig } from './type'

import virtualConfig from './vite-plugin'

export default function (opts: UserConfig): AstroIntegration {
  const { cmsRoute = '/admin', cmsConfig, previewStyles, previewContainersTag } = opts
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
                  previewContainersTag &&
                  finalCmsConfig.collections.flatMap(({ name, files }) => {
                    if (files && files.length) {
                      return files.map(file => ({
                        target: file.name,
                        tag: previewContainersTag,
                      }))
                    } else {
                      return {
                        target: name,
                        tag: previewContainersTag,
                      }
                    }
                  }),
              }),
            ],
          },
        })
      },
    },
  }
}
