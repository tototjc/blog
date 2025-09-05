import type { Config } from 'prettier'

export default {
  plugins: ['prettier-plugin-astro'],
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
} satisfies Config
