import type { AstroIntegration, ViteUserConfig } from 'astro'
import type { CmsConfig } from 'decap-cms-core'

export interface Config {
  cmsRoute?: string
  cmsConfig: Exclude<CmsConfig, 'load_config_file'>
}

export default function (opts: Config): AstroIntegration {
  return {
    name: 'astro-decap-cms',
    hooks: {
      'astro:config:setup': async ({ config, injectRoute, updateConfig }) => {
        const defaultConfig = {
          load_config_file: false,
          site_url: config.site,
          i18n: config.i18n && {
            structure: 'multiple_folders',
            locales: config.i18n.locales.map(locale => (typeof locale === 'string' ? locale : locale.path)),
            default_locale: config.i18n.defaultLocale,
          },
        } satisfies Partial<CmsConfig>

        const virtualConfig = (): NonNullable<ViteUserConfig['plugins']>[number] => {
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
                return `export default ${JSON.stringify({
                  ...defaultConfig,
                  ...opts.cmsConfig,
                })}`
              }
            },
          }
        }

        injectRoute({
          pattern: opts.cmsRoute || '/admin',
          entrypoint: new URL('./dashboard.astro', import.meta.url),
        })

        updateConfig({
          vite: {
            plugins: [virtualConfig()],
          },
        })
      },
    },
  }
}
