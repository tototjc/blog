import * as pluginAstro from 'prettier-plugin-astro'

/** @type {import('prettier').Config} */

export default {
  plugins: [pluginAstro],
  singleQuote: true,
  semi: false,
  printWidth: 120,
  arrowParens: 'avoid',
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
