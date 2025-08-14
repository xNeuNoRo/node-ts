const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");
const unicornPlugin = require("eslint-plugin-unicorn");
const securityPlugin = require("eslint-plugin-security");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
  // ✂ Ignorar carpetas que no queremos analizar
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "*.config.cjs",
      "build.mjs",
      "setup.mjs",
      "package.mjs",
    ],
  },

  // Configuración principal
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      unicorn: unicornPlugin,
      security: securityPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // reglas básicas
      "no-console": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      // orden de imports
      "import/order": [
        "warn",
        {
          groups: [
            ["builtin", "external"],
            ["internal"],
            ["parent", "sibling", "index"],
          ],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // prettier
      "prettier/prettier": ["warn"],
    },
    // Se pueden agregar "extends" si realmente quieres compatibilidad
    // con configuraciones externas, pero no es obligatorio
  },
];
