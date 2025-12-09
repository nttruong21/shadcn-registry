// @ts-check
import { loadEnv } from "vite";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeBlack from "starlight-theme-black";
import { visualizer } from "rollup-plugin-visualizer";

if (!process.env.NODE_ENV) {
  throw new Error("NODE_ENV is not set.");
}

const { PUBLIC_SITE_URL, PUBLIC_GITHUB_REPO_URL } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ""
);

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({
        context: "server",
        access: "public",
        min: 1,
        url: true,
      }),
      PUBLIC_GITHUB_REPO_URL: envField.string({
        context: "server",
        access: "public",
        min: 1,
        url: true,
      }),
      PUBLIC_SHADCN_URL: envField.string({
        context: "server",
        access: "public",
        min: 1,
        url: true,
      }),
    },
  },
  site: PUBLIC_SITE_URL,
  integrations: [
    starlight({
      title: "NTT Shadcn Registry",
      head: [
        // Add ICO favicon fallback for Safari.
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon.ico",
            type: "image/vnd.microsoft.icon",
          },
        },
        // Add dark mode favicon.
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon-32x32.png",
            media: "(prefers-color-scheme: dark)",
            type: "image/png",
          },
        },
        // Add light mode favicon.
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon-32x32.png",
            media: "(prefers-color-scheme: light)",
            type: "image/png",
          },
        },
      ],
      logo: {
        dark: "./src/assets/images/logo-dark.svg",
        light: "./src/assets/images/logo-light.svg",
        replacesTitle: true,
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: PUBLIC_GITHUB_REPO_URL,
        },
      ],  
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "getting-started/introduction" },
            { label: "Installation", slug: "getting-started/installation" },
          ],
        },
        {
          label: "Components",
          items: [
            { label: "UI", autogenerate: { directory: "components/ui" } },
            {
              label: "Molecules",
              autogenerate: { directory: "components/molecules" },
            },
            {
              label: "Organisms",
              autogenerate: { directory: "components/organisms" },
            },
          ],
        },
      ],
      customCss: ["./src/styles/global.css"],
      plugins: [
        starlightThemeBlack({
          navLinks: [
            {
              label: "Docs",
              link: "/getting-started/introduction",
            },
            {
              label: "Components",
              link: "/components",
            },
          ],
          footerText:
            "Built by [Nguyen The Truong](https://ntt-portfolio.vercel.app) for use with [Shadcn](https://ui.shadcn.com)",
        }),
      ],
    }),
    react(),
  ],
  vite: {
    plugins: [
      // @ts-expect-error: Astro still Vite v6 while tailwindcss will pull in Vite v7 => types mismatch
      tailwindcss(),
      visualizer({
        filename: "dist/stats.html",
        gzipSize: true,
      }),
    ],
    // build: {
    //   rollupOptions: {
    //     output: {
    //       manualChunks: (id) => {
    //         if (!id || !id.includes('node_modules')) return null;

    //         // pnpm / standard node_modules detection
    //         let pkg = id.split('node_modules/').pop()?.split('/')[0] ?? '';
    //         if (pkg === '.pnpm') {
    //           // Handle .pnpm/<pkg>@version/node_modules/<pkg>
    //           const match = id.match(/node_modules\/\.pnpm\/(?:@?[^/]+)@[^/]+\/node_modules\/(@?[^/]+)/);
    //           pkg = match ? match[1] : id.split('node_modules/').slice(-1)[0].split('/')[0];
    //         }

    //         // group major libraries
    //         if (['@tiptap/core', '@tiptap/starter-kit', '@tiptap/react', '@tiptap/extensions', 'prosemirror-view', 'prosemirror-state'].includes(pkg)) {
    //           return 'vendor-tiptap';
    //         }

    //         if (pkg === 'lucide-react') {
    //           return 'vendor-icons';
    //         }

    //         if (pkg.startsWith('lodash')) {
    //           return 'vendor-lodash';
    //         }

    //         if (['react', 'react-dom'].includes(pkg)) {
    //            return 'vendor-react';
    //         }

    //         const smallBundles = ['clsx', 'nanoid', 'tiny-invariant'];
    //         if (smallBundles.includes(pkg)) {
    //           return 'vendor-small';
    //         }

    //         // Default split per-package: let rollup decide
    //         return null
    //       }
    //     }
    //   }
    // },
    ssr: {
      // FIXME: Once starlight supports Zod 4 we can probably remove this.
      // Zod should normally be imported from astro, but I want my code to use its own zod version to reflect the version used in the shadcn components.
      noExternal: ["zod"],
    },
  },
});
