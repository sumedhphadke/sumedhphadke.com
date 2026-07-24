import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://sumedhphadke.com',
  output: 'static',
  /* Every link this site writes is slashless — nav, blog index, RSS. Without
     this, canonical and sitemap emitted the slashed form instead, so the
     canonical URL pointed at something that redirected. One form, everywhere.
     Paired with html_handling: "drop-trailing-slash" in wrangler.jsonc. */
  trailingSlash: 'never',
  adapter: cloudflare(),
  integrations: [
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: false,
    },
  },
});
