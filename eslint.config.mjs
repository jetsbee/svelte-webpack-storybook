import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import * as espree from 'espree';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...sveltePlugin.configs['flat/prettier'],
  eslintConfigPrettier,
  { languageOptions: { globals: globals.browser } },
  { files: ['**/*.{js,mjs,cjs,ts,svelte}'] },
  {
    files: ['**/*webpack*.js'],
    languageOptions: { globals: globals.node, sourceType: 'commonjs' },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.svelte', '*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: {
          ts: tseslint.parser,
          js: espree,
          typescript: tseslint.parser,
        },
      },
    },
  },
];
