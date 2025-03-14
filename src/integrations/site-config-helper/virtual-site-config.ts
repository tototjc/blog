import type { ViteUserConfig } from 'astro'

const resolveVirtualModuleId = <T extends string>(id: T): `\0${T}` => `\0${id}`

export function virtualSiteConfig(config: object): NonNullable<ViteUserConfig['plugins']>[number] {
  const modules = {
    'virtual:config': `export default ${JSON.stringify(config)}`,
  }

  const resolutionMap = Object.fromEntries(
    (Object.keys(modules) as (keyof typeof modules)[]).map(key => [resolveVirtualModuleId(key), key]),
  )

  return {
    name: 'virtual-site-config',
    resolveId(id) {
      if (id in modules) return resolveVirtualModuleId(id)
    },
    load(id) {
      const resolution = resolutionMap[id]
      if (resolution) return modules[resolution]
    },
  }
}
