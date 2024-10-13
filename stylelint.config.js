/** @type {import('stylelint').Config} */

export default {
  ignoreFiles: ['node_modules/**/*', 'dist/**/*', 'dev-dist/**/*', '.astro/**/*', 'public/css/**/*'],
  extends: ['stylelint-config-standard', 'stylelint-config-html', 'stylelint-prettier/recommended'],
}
