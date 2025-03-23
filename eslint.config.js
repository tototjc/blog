import js from '@eslint/js'
import ts from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import prettierConfig from 'eslint-config-prettier/flat'
import globals from 'globals'

import { defineConfig } from 'eslint/config'
import { includeIgnoreFile } from '@eslint/compat'
import { fileURLToPath } from 'node:url'

export default defineConfig([
  includeIgnoreFile(fileURLToPath(await import.meta.resolve('./.gitignore'))),
  js.configs.recommended,
  ts.configs.recommended,
  astro.configs.recommended,
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    files: ['*.config.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  prettierConfig,
])
