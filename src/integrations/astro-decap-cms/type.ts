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
