import { defineConfig, coverageConfigDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      include: ["src"],
      exclude: [
        ...coverageConfigDefaults.exclude,
        // types
        "**/*.dto.ts",
        "**/*.interface.ts",
        "**/*.types.ts",

        // shadcn components
        "src/components/ui/*.tsx"
      ],
      reporter: ["text", "json", "html", "lcov"],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
