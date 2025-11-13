import Image from '@tiptap/extension-image'
import {
  mergeAttributes,
  NodeViewWrapper,
  type ReactNodeViewProps,
  ReactNodeViewRenderer,
  useCurrentEditor
} from '@tiptap/react'
import { ChevronDown, Trash } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/utils/ui'
import { ALIGNMENTS, type Alignment, CONTAINER_CLASS_NAME_PER_ALIGNMENT, MIN_WIDTH } from './lib'

// [T] Image attributes
type ImageAttributes = Pick<React.ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'height' | 'src' | 'title' | 'width'> & {
  alignment: Alignment
  containerStyle: React.CSSProperties
}

// [T] Resizing position
type ResizingPosition = 'left' | 'right'

// [C] Base resize handler class name
const BASE_RESIZE_HANDLER_CLASS_NAME =
  'invisible absolute top-0 bottom-0 cursor-ew-resize px-2 transition-[visibility_width] group-hover:visible before:absolute before:top-1/2 before:h-1/2 before:max-h-36 before:w-1 before:-translate-y-1/2 before:rounded-md before:bg-muted before:border-muted-foreground before:content-[""]'

// Component
const ImageComponent = (props: ReactNodeViewProps<HTMLImageElement>) => {
  // Props
  const { node, updateAttributes, deleteNode } = props
  const { alignment, containerStyle, ...imageAttributes } = node.attrs as ImageAttributes

  // Hooks
  const { editor } = useCurrentEditor()

  // Refs
  const containerRef = React.useRef<HTMLDivElement>(null)

  // States
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [isOpenPopover, setIsOpenPopover] = React.useState(false)

  // Methods
  const loadImage = () => {
    setIsLoaded(true)
  }

  const changeAlignment = (alignment: Alignment) => {
    // Update alignment
    updateAttributes({
      alignment
    })

    // Update width (full) if alignment is justify
    if (alignment === 'justify') {
      updateAttributes({
        width: containerRef.current?.clientWidth,
        containerStyle: {
          ...containerStyle,
          width: '100%'
        }
      })
    }

    // Focus editor
    editor?.commands.focus()
  }

  const downPointer = (pointerDownEvent: React.PointerEvent<HTMLDivElement>, position: ResizingPosition) => {
    pointerDownEvent.preventDefault()
    pointerDownEvent.stopPropagation()

    // Handle move pointer
    const handleMovePointer = (pointerMoveEvent: MouseEvent) => {
      pointerMoveEvent.preventDefault()
      pointerMoveEvent.stopPropagation()

      const containerWidth = containerRef.current?.clientWidth ?? 0
      const deltaX =
        (position === 'left'
          ? pointerDownEvent.clientX - pointerMoveEvent.clientX
          : pointerMoveEvent.clientX - pointerDownEvent.clientX) * 2
      const newWidth = Math.round(
        Math.max(MIN_WIDTH, Math.min(containerWidth, (imageAttributes.width as number) + deltaX))
      )

      updateAttributes({
        width: newWidth,
        containerStyle: {
          ...containerStyle,
          width: `${Math.round((newWidth * 100) / containerWidth)}%`
        }
      })
    }

    // Handle up pointer
    const handleUpPointer = (pointerUpEvent: MouseEvent) => {
      pointerUpEvent.preventDefault()
      pointerUpEvent.stopPropagation()

      editor?.commands.focus()

      document.removeEventListener('pointermove', handleMovePointer)
      document.removeEventListener('pointerup', handleUpPointer)
    }

    document.addEventListener('pointermove', handleMovePointer)
    document.addEventListener('pointerup', handleUpPointer)
  }

  const deleteImage = () => {
    deleteNode()
    editor?.commands.focus()
  }

  // Template
  return (
    <NodeViewWrapper data-drag-handle>
      <div ref={containerRef} className={cn('flex', CONTAINER_CLASS_NAME_PER_ALIGNMENT[alignment])}>
        <div className='group relative transition-all' style={containerStyle}>
          {!isLoaded && <Skeleton className='absolute inset-0 rounded-md' />}

          <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
            <PopoverTrigger>
              <img
                {...imageAttributes}
                alt='Alt'
                className={cn(
                  'peer pointer-events-none w-full object-contain opacity-0 outline-2 outline-transparent outline-offset-2 transition-all',
                  {
                    'outline-[inherit]': isOpenPopover,
                    'pointer-events-auto opacity-100': isLoaded
                  }
                )}
                onLoad={loadImage}
              />
            </PopoverTrigger>

            <PopoverContent className='space-y-4' side='top'>
              <div className='flex gap-2'>
                {/* Alignment */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline'>
                      <span>Align</span>
                      <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    {ALIGNMENTS.map((alignmentOption) => (
                      <DropdownMenuItem
                        key={alignmentOption.value}
                        className={cn({
                          'bg-accent': alignment === alignmentOption.value
                        })}
                        onClick={() => changeAlignment(alignmentOption.value)}
                      >
                        <alignmentOption.icon />
                        <span>{alignmentOption.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Separator orientation='vertical' className='h-10' />

                {/* Trash */}
                <Button variant='ghost' size='icon' onClick={deleteImage}>
                  <Trash />
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <div
            className={cn('left-1 before:left-1.5', BASE_RESIZE_HANDLER_CLASS_NAME)}
            onPointerDown={(e) => downPointer(e, 'left')}
          />

          <div
            className={cn('right-1 before:right-1.5', BASE_RESIZE_HANDLER_CLASS_NAME)}
            onPointerDown={(e) => downPointer(e, 'right')}
          />
        </div>
      </div>
    </NodeViewWrapper>
  )
}

// Extension
const CustomImageExtension = Image.extend({
  renderHTML({ HTMLAttributes }) {
    const { alignment, containerStyle, ...imageAttributes } = HTMLAttributes as ImageAttributes
    return [
      'div',
      {
        class: cn('flex', CONTAINER_CLASS_NAME_PER_ALIGNMENT[alignment])
      },
      [
        'div',
        {
          style: Object.entries(containerStyle)
            .map(([key, value]) => `${key}: ${value}`)
            .join(';')
        },
        [
          'img',
          {
            ...mergeAttributes(imageAttributes),
            class: 'w-full object-contain rounded-md'
          }
        ]
      ]
    ]
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: MIN_WIDTH
      },
      alignment: {
        default: 'center'
      },
      containerStyle: {
        default: {
          width: `${MIN_WIDTH}px`
        }
      }
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent)
  }
})

export default CustomImageExtension
