import type { ViteUserConfig } from 'astro'

import postcssHtml from 'postcss-html'
import postcssPresetEnv from 'postcss-preset-env'

export default {
  ...postcssHtml,
  plugins: [postcssPresetEnv()],
} satisfies NonNullable<ViteUserConfig['css']>['postcss']
