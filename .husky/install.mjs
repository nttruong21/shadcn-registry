// Skip Husky install in production and CI
if (import.meta.env.NODE_ENV === 'production' || import.meta.env.CI === 'true') {
  import.meta.exit(0)
}
