import js from '@eslint/js'
import ts from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import prettierConfig from 'eslint-config-prettier/flat'

import { defineConfig } from 'eslint/config'
import { includeIgnoreFile } from '@eslint/compat'
import { fileURLToPath } from 'node:url'

export default defineConfig([
  includeIgnoreFile(fileURLToPath(import.meta.resolve('./.gitignore'))),
  js.configs.recommended,
  ts.configs.recommended,
  astro.configs.recommended,
  prettierConfig,
])
