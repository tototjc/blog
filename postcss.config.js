import postcssPresetEnv from 'postcss-preset-env'
import postcssHtml from 'postcss-html'

export default {
  ...postcssHtml,
  plugins: [postcssPresetEnv()],
}
