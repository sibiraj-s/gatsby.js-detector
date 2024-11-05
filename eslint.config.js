import pegasus from 'eslint-config-pegasus';

export default [
  pegasus.configs.default,
  pegasus.configs.node,
  pegasus.configs.browser,
  {
    languageOptions: {
      globals: {
        chrome: true,
      },
    },
  },
  {
    ignores: ['dist/**'],
  },
];
