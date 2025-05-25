/** @type {import('lint-staged').Configuration} */

export default {
  '**/*.{js,ts,astro}': ['astro check', 'eslint'],
  '**/*.{css,astro}': ['stylelint'],
  '**/*.{js,ts,css,astro,json,md}': ['prettier --write'],
}
