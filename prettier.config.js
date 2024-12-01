/** @type {import('prettier').Config} */
module.exports = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  tabWidth: 2,
  useTabs: false,
  bracketSameLine: false,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss", // If you're using Tailwind CSS
  ],
  importOrder: ["<THIRD_PARTY_MODULES>", "", "<BUILTIN_MODULES>", "", "^[./]"],
};
