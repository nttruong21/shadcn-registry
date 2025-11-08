// @ts-check
import { loadEnv } from 'vite'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField } from 'astro/config'

import starlight from '@astrojs/starlight'
import starlightThemeBlack from 'starlight-theme-black'

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV is not set.')
}

const { PUBLIC_SITE_URL, PUBLIC_GITHUB_REPO_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), '')

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({ context: 'server', access: 'public', min: 1, url: true }),
      PUBLIC_GITHUB_REPO_URL: envField.string({ context: 'server', access: 'public', min: 1, url: true }),
      PUBLIC_SHADCN_URL: envField.string({ context: 'server', access: 'public', min: 1, url: true })
    }
  },
  site: PUBLIC_SITE_URL,
  integrations: [
    starlight({
      title: 'NTT Shadcn Registry',
      head: [
        // Add ICO favicon fallback for Safari.
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            href: '/favicon.ico',
            type: 'image/vnd.microsoft.icon'
          }
        },
        // Add dark mode favicon.
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            href: '/favicon-512x512.png',
            media: '(prefers-color-scheme: dark)',
            type: 'image/png'
          }
        },
        // Add light mode favicon.
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            href: '/favicon-512x512.png',
            media: '(prefers-color-scheme: light)',
            type: 'image/png'
          }
        }
      ],
      logo: {
        dark: './src/assets/images/logo.png',
        light: './src/assets/images/logo.png',
        replacesTitle: true
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: PUBLIC_GITHUB_REPO_URL
        }
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'getting-started/introduction' },
            { label: 'Installation', slug: 'getting-started/installation' }
          ]
        },
        {
          label: 'Components',
          items: [
            { label: 'UI', autogenerate: { directory: 'components/ui' } },
            { label: 'Molecules', autogenerate: { directory: 'components/molecules' } },
            { label: 'Organisms', autogenerate: { directory: 'components/organisms' } }
          ]
        },
        
      ],
      customCss: ['./src/styles/global.css'],
      plugins: [
        starlightThemeBlack({
          navLinks: [
            {
              label: 'Docs',
              link: '/getting-started/introduction'
            },
            {
              label: 'Components',
              link: '/components'
            }
          ],
          footerText:
            'Built by [Nguyen The Truong](https://magnificent-kitsune-020c1b.netlify.app) for use with [Shadcn](https://ui.shadcn.com)'
        })
      ]
    }),
    react()
  ],
  vite: {
    // @ts-expect-error: Astro still Vite v6 while tailwindcss will pull in Vite v7 => types mismatch
    plugins: [tailwindcss()]
  }
})
