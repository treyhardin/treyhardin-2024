import { defineConfig } from 'astro/config';
// import vercel from "@astrojs/vercel/serverless";
import vercel from "@astrojs/vercel/static";
import icon from "astro-icon";
import glsl from 'vite-plugin-glsl';

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ["https://cdn.sanity.io"]
  },
  output: "static",
  adapter: vercel(),
  integrations: [icon()],
  vite: {
    build: {
      rollupOptions: {
      },
    },
    plugins: [glsl()]
  },
});