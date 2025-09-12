// suporte-frontend/eslint.config.mjs

import prettierConfig from 'eslint-config-prettier';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  
  // Configuração do React
  {
    files: ['**/*.{jsx,tsx}'],
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat['jsx-runtime'], // <-- ADICIONE ESTA LINHA
    settings: {
      react: {
        version: 'detect', // <-- ADICIONE ESTA CONFIGURAÇÃO
      },
    },
  },

  prettierConfig,
];