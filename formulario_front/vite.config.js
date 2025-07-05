import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3001,
    strictPort: true,
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/assets/styles/variables.scss" as *;`,
      },
    },
  },
});
