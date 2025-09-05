import type { Configuration } from 'lint-staged'

export default {
  '**/*.{js,ts,astro}': ['astro check', 'eslint --cache'],
  '**/*.{css,astro}': ['stylelint --cache'],
  '**/*.{js,ts,css,astro,json,md,yaml}': ['prettier --write  --cache'],
} satisfies Configuration
