interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string
  readonly PUBLIC_GITHUB_REPO_URL: string
  readonly PUBLIC_SHADCN_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
