import type { ViteUserConfig } from 'astro'

import type { Config } from './type'

export default function (cfg: Config): NonNullable<ViteUserConfig['plugins']>[number] {
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
