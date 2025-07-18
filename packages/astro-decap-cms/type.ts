import type { JSX } from 'react'
import { DecapCmsCore, type CmsConfig } from 'decap-cms-core'

export type UserCmsConfig = Omit<CmsConfig, 'load_config_file'>

export type PreviewStyle = string | { src: string; raw: boolean }

export type PreviewStyleParam = Parameters<typeof DecapCmsCore.registerPreviewStyle>

export type PreviewContainerElem<T extends keyof JSX.IntrinsicElements> = {
  tag: T
  attr?: JSX.IntrinsicElements[T]
}

export type PreviewContainer = PreviewContainerElem<keyof JSX.IntrinsicElements>

export type PreviewContainerWithTarget = PreviewContainer & { target: string }

export interface UserConfig {
  cmsRoute?: string
  cmsConfig: UserCmsConfig
  previewStyles?: PreviewStyle[]
  previewContainer?: PreviewContainer | PreviewContainerWithTarget[]
}

export interface Config {
  config: CmsConfig
  previewStyleParams?: PreviewStyleParam[]
  previewContainerParams?: PreviewContainerWithTarget[]
}
