import {
  type ChainedCommands,
  mergeAttributes,
  Node,
  NodeViewWrapper,
  type ReactNodeViewProps,
  ReactNodeViewRenderer,
  useCurrentEditor
} from '@tiptap/react'
import { Paperclip, Trash } from 'lucide-react'
import type React from 'react'
import type { FileAttributes } from '@/@types/tiptap'
import { getSizeText } from '@/components/molecules/file-upload'
import { Button } from '@/components/ui/button'

// Component
const FileComponent = (props: ReactNodeViewProps<HTMLAnchorElement>) => {
  const { node, deleteNode } = props
  const nodeAttrs = node.attrs as FileAttributes

  // Hooks
  const { editor } = useCurrentEditor()

  // Methods
  const deleteFile: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()

    deleteNode()
    editor?.commands.focus()
  }

  // Template
  return (
    <NodeViewWrapper>
      <a
        href={nodeAttrs.url}
        target='_blank'
        rel='noreferrer'
        className='flex w-full items-center gap-4 rounded-md border p-4 transition-colors duration-200 hover:bg-gray-200 hover:no-underline'
      >
        <Paperclip className='size-4' />

        <div className='grow space-y-2 overflow-hidden'>
          <div className='line-clamp-1'>{nodeAttrs.name}</div>
          <div>{getSizeText(nodeAttrs.size)}</div>
        </div>

        <Button variant='ghost' size='icon' onClick={deleteFile}>
          <Trash />
        </Button>
      </a>
    </NodeViewWrapper>
  )
}

// Extension
const FileExtension = Node.create({
  name: 'file',
  group: 'block',
  selectable: true,
  draggable: true,
  addOptions() {
    return {
      HTMLAttributes: {
        target: '_blank',
        rel: 'noreferrer'
      }
    }
  },
  addAttributes() {
    return {
      url: {
        default: null
      },
      name: {
        default: null
      },
      mime: {
        default: null
      },
      size: {
        default: 0
      }
    }
  },
  parseHTML() {
    return [
      {
        tag: 'a'
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    const { url, name, size } = HTMLAttributes as FileAttributes

    return [
      'a',
      mergeAttributes(this.options.HTMLAttributes, {
        href: url,
        class:
          'flex items-center gap-4 rounded-md border p-4 transition-colors duration-200 hover:bg-gray-200 hover:no-underline'
      }),
      [
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '24',
          height: '24',
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          class: 'lucide lucide-paperclip-icon lucide-paperclip size-4'
        },
        [
          'path',
          {
            d: 'm16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551'
          }
        ]
      ],
      [
        'div',
        {
          class: 'space-y-2'
        },
        ['div', name],
        ['div', getSizeText(size)]
      ]
    ]
  },
  // @ts-expect-error - tiptap custom command not in core type definitions
  addCommands() {
    return {
      insertFile:
        (options: FileAttributes) =>
        ({ commands }: { commands: ChainedCommands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              ...options
            }
          })
        }
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(FileComponent)
  }
})

export default FileExtension
