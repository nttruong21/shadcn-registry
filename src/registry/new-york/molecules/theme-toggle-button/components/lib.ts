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
