import { lazy, type PropsWithChildren } from 'react'

// Lib
export type ModuleProps = PropsWithChildren & { path: string; className?: string }

export const getComponent = (path: string) => {
  const [type, name, example] = path.split('/')
  return lazy(async () => {
    const module = await import(`../../../registry/new-york/${type}/${name}/examples/${example}.tsx`)
    const exportName =
      Object.keys(module).find((key) => typeof module[key] === 'function' || typeof module[key] === 'object') ?? name
    return {
      default: module.default || module[exportName]
    }
  })
}
