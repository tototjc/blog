import { defineConfig } from 'stylelint-define-config'

export default defineConfig({
  ignoreFiles: ['node_modules/**/*', 'dist/**/*', 'dev-dist/**/*', '.astro/**/*', 'public/css/**/*'],
  extends: ['stylelint-config-standard', 'stylelint-config-html', 'stylelint-prettier/recommended'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
})
