import type { AstroIntegration, ViteUserConfig } from 'astro'
import type { HTMLTag } from 'astro/types'
import type { CmsConfig, CMS } from 'decap-cms-core'

export interface Config {
  cmsRoute?: string
  cmsConfig: Exclude<CmsConfig, 'load_config_file'>
  previewStyles?: Parameters<CMS['registerPreviewStyle']>[]
  previewContainersTag?: HTMLTag
}

const virtualConfig = (config: Config): NonNullable<ViteUserConfig['plugins']>[number] => {
  const virtualModuleId = 'astro-decap-cms:config'
  const resolvedVirtualModuleId = '\0' + virtualModuleId
  return {
    name: 'virtual-decapcms-config',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return Array.from(
          Object.entries(config),
          ([key, value]) => `export const ${key} = ${JSON.stringify(value)}`,
        ).join('\n')
      }
    },
  }
}

export default function (opts: Config): AstroIntegration {
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

        injectRoute({
          pattern: opts.cmsRoute || '/admin',
          entrypoint: new URL('./dashboard.astro', import.meta.url),
        })

        updateConfig({
          vite: {
            plugins: [
              virtualConfig({
                ...opts,
                cmsConfig: {
                  ...defaultCmsConfig,
                  ...opts.cmsConfig,
                },
              }),
            ],
          },
        })
      },
    },
  }
}
