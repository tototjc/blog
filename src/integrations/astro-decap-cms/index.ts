import type { AstroIntegration, ViteUserConfig } from 'astro'
import type { HTMLTag } from 'astro/types'
import type { CmsConfig, CMS } from 'decap-cms-core'

export interface UserConfig {
  cmsRoute?: string
  cmsConfig: Exclude<CmsConfig, 'load_config_file'>
  previewStyles?: (string | { src: string; raw: boolean })[]
  previewContainersTag?: HTMLTag
}

export interface Config {
  config: CmsConfig
  previewStyleParams?: Parameters<CMS['registerPreviewStyle']>[]
  previewContainerParams?: { target: string; tag: HTMLTag }[]
}

const virtualConfig = (cfg: Config): NonNullable<ViteUserConfig['plugins']>[number] => {
  const virtualModuleId = 'astro-decap-cms:config'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  const { previewStyleParams, ...configs } = cfg

  return {
    name: 'virtual-decapcms-config',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const imports: { [name: string]: string } = {}

        const formatPreviewStylesParams: Config['previewStyleParams'] =
          previewStyleParams &&
          (await Array.fromAsync(previewStyleParams, async (style, index) => {
            const [src, opt] = style
            if (opt?.raw) return style
            const resolvedId = await this.resolve(src)
            if (!resolvedId) throw new Error(`Could not resolve: ${src}`)
            const name = `__preview_style_${index}`
            imports[name] = resolvedId.external ? resolvedId.id : `${resolvedId.id}?url`
            return [name]
          }))

        return [
          ...Object.entries(imports).map(([name, id]) => `import ${name} from '${id}'`),
          ...Object.entries(configs).map(([key, value]) => `export const ${key} = ${JSON.stringify(value)}`),
          formatPreviewStylesParams &&
            `
            export const previewStyleParams = [${formatPreviewStylesParams.map(([name]) => `[${name}]`).join(',')}]
          `,
        ].join('\n')
      }
    },
  }
}

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
