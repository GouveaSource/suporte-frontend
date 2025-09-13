import nextPlugin from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ...js.configs.recommended,
  },
  ...tseslint.configs.recommended,
  {
    ...nextPlugin,
  },
  prettierConfig,
];