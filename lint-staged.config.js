/** @type {import('lint-staged').Configuration} */

export default {
  '**/*.{ts,astro}': ['astro check'],
  '**/*.{js,ts,astro,md,mdx}': ['eslint', 'prettier --write'],
  '**/*.{css,astro}': ['stylelint', 'prettier --write'],
  '**/*.ts': [() => 'tsc --noEmit'],
  '**/*.json': ['prettier --write'],
}
