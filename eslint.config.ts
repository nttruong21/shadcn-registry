import js from '@eslint/js'
import globals from 'globals'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import astro from 'eslint-plugin-astro'
import astroParser from 'astro-eslint-parser'
import prettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Ignores
  globalIgnores(['node_modules/', '.astro/', '.github/', '.vscode/', 'dist/', 'public/r/', 'package-lock.json']),

  // Markdown
  {
    files: ['**/*.{md,mdx}'],
    plugins: { markdown },
    extends: [markdown.configs.recommended]
  },

  // JSON
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: [json.configs.recommended]
  },

  // JS
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: [js.configs.recommended]
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: { globals: { ...globals.browser } }
  },

  // TS
  tseslint.configs.recommended,

  // React
  {
    settings: {
      react: {
        version: 'detect'
      }
    },
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { reactHooks, react },
    extends: [
      reactHooks.configs.flat['recommended-latest'],
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime']
    ]
  },

  // Astro
  {
    plugins: { astro },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      }
    },
    extends: [
      ...astro.configs.recommended.filter((c) => !c.files),
      ...astro.configs['jsx-a11y-strict'].filter((c) => !c.files)
    ],
    files: ['**/*.astro']
  },

  // Prettier
  prettier
])
