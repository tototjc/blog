import type { AstroConfig } from 'astro'
import type { CmsConfig, CmsCollection, CmsCollectionFile } from 'decap-cms-core'
import type {
  UserCmsConfig,
  PreviewStyle,
  PreviewStyleParam,
  PreviewContainer,
  PreviewContainerWithTarget,
} from './type'

export const getPreviewContainerWithTarget = (
  items: (CmsCollection | CmsCollectionFile)[],
  previewContainer: PreviewContainer,
): PreviewContainerWithTarget[] => {
  return items.flatMap(item => {
    if ('files' in item && Array.isArray(item.files)) {
      return getPreviewContainerWithTarget(item.files, previewContainer) ?? []
    } else {
      const isMarkdownBody = item.fields?.some(field => field.widget === 'markdown' && field.name === 'body')
      const { tag, attr } = previewContainer
      return isMarkdownBody ? { target: item.name, tag, attr } : []
    }
  })
}

export const getCmsConfigWithDefaults = (userConfig: UserCmsConfig, astroConfig: AstroConfig): CmsConfig => {
  const { site, i18n } = astroConfig
  const defaultCmsConfig: Partial<CmsConfig> = {
    load_config_file: false,
    site_url: site,
    i18n: i18n && {
      structure: 'multiple_folders',
      locales: i18n.locales.map(locale => (typeof locale === 'string' ? locale : locale.path)),
      default_locale: i18n.defaultLocale,
    },
  }
  return {
    ...defaultCmsConfig,
    ...userConfig,
  }
}

export const normalizePreviewStyles = (styles: PreviewStyle[]): PreviewStyleParam[] => {
  return styles.map(style => (typeof style === 'string' ? [style] : [style.src, { raw: style.raw }]))
}
