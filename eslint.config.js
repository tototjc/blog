import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginAstro from 'eslint-plugin-astro'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'

import { includeIgnoreFile } from '@eslint/compat'
import { fileURLToPath } from 'node:url'

/** @type {import('eslint').Linter.Config[]} */

export default [
  includeIgnoreFile(fileURLToPath(import.meta.resolve('./.gitignore'))),
  eslint.configs.recommended,
  ...tseslint.config(tseslint.configs.recommended, {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  }),
  ...pluginAstro.configs['flat/recommended'],
  {
    files: ['*.config.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  eslintConfigPrettier,
]
