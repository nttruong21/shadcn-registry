import { Moon, Sun } from 'lucide-react'
import React from 'react'
import z from 'zod'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utils/ui'

// Theme toggle button
const THEME_SCHEMA = z.object({
  theme: z.union([z.literal('light'), z.literal('dark')])
})

type AnimationVariant = 'circle' | 'circle-blur' | 'gif' | 'polygon'

type StartPosition = 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type ThemeToggleButtonProps = Omit<ButtonProps, 'variant' | 'onClick'> & {
  themeLocalStorageKey?: string
  showLabel?: boolean
  variant?: AnimationVariant
  startPosition?: StartPosition
  url?: string // For gif variant
}

export const ThemeToggleButton = ({
  themeLocalStorageKey = 'theme',
  showLabel = false,
  variant = 'circle',
  startPosition = 'center',
  url,
  className,
  ...props
}: ThemeToggleButtonProps) => {
  // States
  const [theme, setTheme] = React.useState<z.output<typeof THEME_SCHEMA>['theme']>()

  // Methods
  const toggleTheme = () => {
    // Update theme
    document.startViewTransition(() => {
      const newTheme = theme === 'light' ? 'dark' : 'light'
      const isDark = newTheme === 'dark'

      setTheme(newTheme)
      document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    })

    // Inject animation styles for this specific transition
    const styleId = `theme-transition-${Date.now()}`
    const style = document.createElement('style')
    style.id = styleId

    // Generate animation CSS based on variant
    let css = ''
    const positions = {
      center: 'center',
      'top-left': 'top left',
      'top-right': 'top right',
      'bottom-left': 'bottom left',
      'bottom-right': 'bottom right'
    }

    if (variant === 'circle') {
      const cx = startPosition === 'center' ? '50' : startPosition.includes('left') ? '0' : '100'
      const cy = startPosition === 'center' ? '50' : startPosition.includes('top') ? '0' : '100'
      css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) { 
            animation: none;
          }
          ::view-transition-new(root) {
            animation: circle-expand 0.4s ease-out;
            transform-origin: ${positions[startPosition]};
          }
          @keyframes circle-expand {
            from {
              clip-path: circle(0% at ${cx}% ${cy}%);
            }
            to {
              clip-path: circle(150% at ${cx}% ${cy}%);
            }
          }
        }
      `
    } else if (variant === 'circle-blur') {
      const cx = startPosition === 'center' ? '50' : startPosition.includes('left') ? '0' : '100'
      const cy = startPosition === 'center' ? '50' : startPosition.includes('top') ? '0' : '100'
      css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) { 
            animation: none;
          }
          ::view-transition-new(root) {
            animation: circle-blur-expand 0.5s ease-out;
            transform-origin: ${positions[startPosition]};
            filter: blur(0);
          }
          @keyframes circle-blur-expand {
            from {
              clip-path: circle(0% at ${cx}% ${cy}%);
              filter: blur(4px);
            }
            to {
              clip-path: circle(150% at ${cx}% ${cy}%);
              filter: blur(0);
            }
          }
        }
      `
    } else if (variant === 'gif' && url) {
      css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) {
            animation: fade-out 0.4s ease-out;
          }
          ::view-transition-new(root) {
            animation: gif-reveal 2.5s cubic-bezier(0.4, 0, 0.2, 1);
            mask-image: url('${url}');
            mask-size: 0%;
            mask-repeat: no-repeat;
            mask-position: center;
          }
          @keyframes fade-out {
            to {
              opacity: 0;
            }
          }
          @keyframes gif-reveal {
            0% {
              mask-size: 0%;
            }
            20% {
              mask-size: 35%;
            }
            60% {
              mask-size: 35%;
            }
            100% {
              mask-size: 300%;
            }
          }
        }
      `
    } else if (variant === 'polygon') {
      css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) {
            animation: none;
          }
          ::view-transition-new(root) {
            animation: ${theme === 'light' ? 'wipe-in-dark' : 'wipe-in-light'} 0.4s ease-out;
          }
          @keyframes wipe-in-dark {
            from {
              clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
            }
            to {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
          @keyframes wipe-in-light {
            from {
              clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
            }
            to {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
        }
      `
    }

    if (css) {
      style.textContent = css
      document.head.appendChild(style)

      // Clean up animation styles after transition
      const timer = setTimeout(() => {
        const styleEl = document.getElementById(styleId)
        if (styleEl) {
          styleEl.remove()
        }
        clearTimeout(timer)
      }, 3000)
    }
  }

  return (
    <Button
      ref={() => {
        const themeReference = localStorage.getItem(themeLocalStorageKey)
        const { success, data } = THEME_SCHEMA.safeParse({
          theme: themeReference
        })

        if (success) {
          return setTheme(data.theme)
        }

        setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      }}
      variant='ghost'
      size={showLabel ? 'default' : 'icon'}
      onClick={toggleTheme}
      className={cn('relative overflow-hidden transition-all', className)}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      isLoading={!theme}
      {...props}
    >
      {theme ? theme === 'light' ? <Moon /> : <Sun /> : null}
      {showLabel && <span>{theme === 'light' ? 'Light' : 'Dark'}</span>}
    </Button>
  )
}

// [U] Observe theme (only use this util on client)
export const observeTheme = (key = 'theme') => {
  const getTheme = () => {
    const themeReference = localStorage.getItem(key)
    return themeReference ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  }

  const isDark = getTheme() === 'dark'
  document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')

  const observer = new MutationObserver(() => {
    const isDark =
      document.documentElement.classList.contains('dark') ||
      document.documentElement.getAttribute('data-theme') === 'dark'
    localStorage.setItem(key, isDark ? 'dark' : 'light')
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'data-theme']
  })

  return observer
}
