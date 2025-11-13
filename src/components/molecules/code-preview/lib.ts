import React from 'react'

// Lib
export type ModuleProps = React.PropsWithChildren & { path: string; className?: string }

// Create a cache to store component instances
const componentCache = new Map<string, ReturnType<typeof React.lazy>>()

export const getComponent = (path: string) => {
  // Check if component is already in cache
  if (componentCache.has(path)) {
    return componentCache.get(path)
  }

  const [type, name, example] = path.split('/')

  const component = React.lazy(async () => {
    const module = await import(`../../../registry/new-york/${type}/${name}/examples/${example}.tsx`)
    const exportName =
      Object.keys(module).find((key) => typeof module[key] === 'function' || typeof module[key] === 'object') ?? name
    return {
      default: module.default || module[exportName]
    }
  })

  // Store in cache
  componentCache.set(path, component)
  return component
}
