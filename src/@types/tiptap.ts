export interface FileAttributes {
  url: string
  name: string
  mime: string
  size: number
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    file: {
      insertFile: (options: FileAttributes) => ReturnType
    }
  }
}
