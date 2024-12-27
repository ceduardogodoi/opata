import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    plugins: ["n"],
    rules: {
      "n/no-process-env": [
        "error",
        {
          allowedVariables: ["env"],
        },
      ],
    },
    overrides: [
      {
        files: [
          "./src/app/domain/environment-variables/entity/environment-variables.ts",
          "./src/app/env.ts",
        ],
        rules: {
          "n/no-process-env": "off",
        },
      },
    ],
  }),
];

export default eslintConfig;
