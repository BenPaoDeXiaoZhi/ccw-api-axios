import { defineConfig } from "tsdown";
export default defineConfig({
  entry: ["src/index.ts"],
  format: {
    cjs: {},
    esm: {},
    iife: {
      deps: {
        onlyBundle: [/.*/],
        alwaysBundle: () => true,
        skipNodeModulesBundle: false,
        resolveDepSubpath: true,
        dts: {
          alwaysBundle: () => true,
        },
      },
      platform: "browser",
    },
  },
  clean: true,
  globalName: "ccwAxios",
  dts: true,
  outputOptions: {
    exports: "named",
  },
  minify: true,
});
