// @ts-check
import react from '@astrojs/react'
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

import starlight from '@astrojs/starlight'
import starlightThemeBlack from 'starlight-theme-black'

import { GITHUB_REPO_URL } from './src/lib/constants'

// https://astro.build/config
export default defineConfig({
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
          href: GITHUB_REPO_URL
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
            { label: 'Molecules', autogenerate: { directory: 'components/molecules' } }
          ]
        }
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
    plugins: [tailwindcss()]
  }
})
