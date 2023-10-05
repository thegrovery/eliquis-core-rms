import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';
import AutoImport from 'astro-auto-import';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkSmartypants from 'remark-smartypants';
import { asideAutoImport, astroAsides } from './integrations/astro-asides';
import { astroCodeSnippets, codeSnippetAutoImport } from './integrations/astro-code-snippets';
import { sitemap } from './integrations/sitemap';
import { autolinkConfig } from './plugins/rehype-autolink-config';
import { rehypei18nAutolinkHeadings } from './plugins/rehype-i18n-autolink-headings';
import { rehypeTasklistEnhancer } from './plugins/rehype-tasklist-enhancer';
import { remarkFallbackLang } from './plugins/remark-fallback-lang';
import { theme } from './syntax-highlighting-theme';

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  site: 'https://grovery-core-toolkit-staging.netlify.app/',
  integrations: [AutoImport({
    imports: [asideAutoImport, codeSnippetAutoImport]
  }), preact({
    compat: true
  }), 
  sitemap(), 
  astroAsides(), 
  astroCodeSnippets(), 
  mdx(), 
  AstroPWA({
        mode: 'development',
        base: '/',
        scope: '/',
        includeAssets: ['favicon.svg'],
        registerType: 'autoUpdate',
        manifest: {
          name: 'Eliqus Field Force Navigator',
          short_name: 'FFN',
          theme_color: '#76004B',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          navigateFallback: '/offline',
          globDirectory: 'dist',
  		globPatterns: [
  			'**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico,html}',
  		],
        },
        devOptions: {
          enabled: true,
          navigateFallbackAllowlist: [/^\/offline/],
        },
      }),
  	prefetch({
  	      //prefetch options
	}),
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme
    },
    // Override with our own config
    smartypants: false,
    remarkPlugins: [[remarkSmartypants, {
      dashes: false
    }],
    // Add our custom plugin that marks links to fallback language pages
    remarkFallbackLang()],
    rehypePlugins: [rehypeSlug,
    // This adds links to headings
    [rehypeAutolinkHeadings, autolinkConfig],
    // Tweak GFM task list syntax
    rehypeTasklistEnhancer(),
    // Translates the autolink headings anchors
    rehypei18nAutolinkHeadings()]
  }
});