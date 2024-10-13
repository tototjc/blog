import postcssPresetEnv from 'postcss-preset-env'
import postcssHtml from 'postcss-html'

export default {
  ...postcssHtml,
  plugins: [
    postcssPresetEnv({
      env: process.env.NODE_ENV,
      debug: process.env.NODE_ENV === 'development',
    }),
  ],
}
