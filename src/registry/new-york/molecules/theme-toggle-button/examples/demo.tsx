import React from 'react'
import { observeTheme, ThemeToggleButton } from '@/components/molecules/theme-toggle-button'

const ThemeToggleButtonDemo = () => {
  // Effects
  React.useLayoutEffect(() => {
    const observer = observeTheme('starlight-theme')
    return () => observer.disconnect()
  }, [])

  return <ThemeToggleButton themeLocalStorageKey='starlight-theme' />
}

export default ThemeToggleButtonDemo
