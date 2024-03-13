import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ["https://cdn.sanity.io"]
  },
  output: "server",
  adapter: vercel(),
  integrations: [icon()]
});