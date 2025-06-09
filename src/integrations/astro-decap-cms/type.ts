import type { JSX } from 'react'
import type { CmsConfig, CMS } from 'decap-cms-core'

interface PreviewContainerElem<T extends keyof JSX.IntrinsicElements> {
  tag: T
  attr?: JSX.IntrinsicElements[T]
}

export interface UserConfig {
  cmsRoute?: string
  cmsConfig: Exclude<CmsConfig, 'load_config_file'>
  previewStyles?: (string | { src: string; raw: boolean })[]
  previewContainer?: PreviewContainerElem<keyof JSX.IntrinsicElements>
}

export interface Config {
  config: CmsConfig
  previewStyleParams?: Parameters<CMS['registerPreviewStyle']>[]
  previewContainerParams?: (PreviewContainerElem<keyof JSX.IntrinsicElements> & { target: string })[]
}
