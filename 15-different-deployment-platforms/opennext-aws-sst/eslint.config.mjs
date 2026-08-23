import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // sst.config.ts must open with a triple-slash reference to the types SST
    // generates under .sst/platform/, which @typescript-eslint flags. The
    // reference is required by SST, so the file is ignored here rather than
    // the rule being disabled for the whole project.
    "sst.config.ts",
    ".sst/**",
  ]),
]);

export default eslintConfig;
