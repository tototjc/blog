import type { JSX } from 'react'
import type { CmsConfig, CMS } from 'decap-cms-core'

export type PreviewContainerElem<T extends keyof JSX.IntrinsicElements> = {
  tag: T
  attr?: JSX.IntrinsicElements[T]
}

export type PreviewContainer = PreviewContainerElem<keyof JSX.IntrinsicElements>

export type PreviewContainerWithTarget = PreviewContainer & { target: string }

export interface UserConfig {
  cmsRoute?: string
  cmsConfig: Exclude<CmsConfig, 'load_config_file'>
  previewStyles?: (string | { src: string; raw: boolean })[]
  previewContainer?: PreviewContainer | PreviewContainerWithTarget[]
}

export interface Config {
  config: CmsConfig
  previewStyleParams?: Parameters<CMS['registerPreviewStyle']>[]
  previewContainerParams?: PreviewContainerWithTarget[]
}
