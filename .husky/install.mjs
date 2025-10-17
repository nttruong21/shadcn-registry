// Skip Husky install in production and CI
if (import.meta.env.PROD || import.meta.env.CI === 'true') {
  import.meta.exit(0)
}
