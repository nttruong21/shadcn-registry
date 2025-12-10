import Youtube from '@tiptap/extension-youtube'
import {
  mergeAttributes,
  NodeViewWrapper,
  type ReactNodeViewProps,
  ReactNodeViewRenderer,
  useCurrentEditor
} from '@tiptap/react'
import { AlignLeft, ChevronDown, MoveHorizontal, Trash } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/utils/ui'
import { type Alignment, alignments, containerClassNamePerAlignment, isValidYoutubeUrl, minWidth } from './lib'

// [T] youtube attributes
type YoutubeAttributes = React.IframeHTMLAttributes<HTMLIFrameElement> & {
  alignment: Alignment
  containerStyle: React.CSSProperties
}

// [C] Width sizes
const WIDTH_SIZES: string[] = ['25%', '50%', '75%', '100%']

// [U] Get youtube embed url
export const getYoutubeEmbedUrl = (nocookie?: boolean, isPlaylist?: boolean) => {
  if (isPlaylist) {
    return 'https://www.youtube-nocookie.com/embed/videoseries?list='
  }
  return nocookie ? 'https://www.youtube-nocookie.com/embed/' : 'https://www.youtube.com/embed/'
}

// [U] Get embed url from youtube url
const getEmbedUrlFromYoutubeUrl = (options: {
  url: string
  allowFullscreen?: boolean
  autoplay?: boolean
  ccLanguage?: string
  ccLoadPolicy?: boolean
  controls?: boolean
  disableKBcontrols?: boolean
  enableIFrameApi?: boolean
  endTime?: number
  interfaceLanguage?: string
  ivLoadPolicy?: number
  loop?: boolean
  modestBranding?: boolean
  nocookie?: boolean
  origin?: string
  playlist?: string
  progressBarColor?: string
  startAt?: number
  rel?: number
}) => {
  const {
    url,
    allowFullscreen,
    autoplay,
    ccLanguage,
    ccLoadPolicy,
    controls,
    disableKBcontrols,
    enableIFrameApi,
    endTime,
    interfaceLanguage,
    ivLoadPolicy,
    loop,
    modestBranding,
    nocookie,
    origin,
    playlist,
    progressBarColor,
    startAt,
    rel
  } = options

  if (!isValidYoutubeUrl(url)) {
    return null
  }

  // If is already an embed url, return it
  if (url.includes('/embed/')) {
    return url
  }

  // If is a youtu.be url, get the id after the /
  if (url.includes('youtu.be')) {
    const id = url.split('/').pop()

    if (!id) {
      return null
    }
    return `${getYoutubeEmbedUrl(nocookie)}${id}`
  }

  const videoIdRegex = /(?:(v|list)=|shorts\/)([-\w]+)/gm
  const matches = videoIdRegex.exec(url)

  if (!matches || !matches[2]) {
    return null
  }

  let outputUrl = `${getYoutubeEmbedUrl(nocookie, matches[1] === 'list')}${matches[2]}`

  const params = []

  if (allowFullscreen === false) {
    params.push('fs=0')
  }

  if (autoplay) {
    params.push('autoplay=1')
  }

  if (ccLanguage) {
    params.push(`cc_lang_pref=${ccLanguage}`)
  }

  if (ccLoadPolicy) {
    params.push('cc_load_policy=1')
  }

  if (!controls) {
    params.push('controls=0')
  }

  if (disableKBcontrols) {
    params.push('disablekb=1')
  }

  if (enableIFrameApi) {
    params.push('enablejsapi=1')
  }

  if (endTime) {
    params.push(`end=${endTime}`)
  }

  if (interfaceLanguage) {
    params.push(`hl=${interfaceLanguage}`)
  }

  if (ivLoadPolicy) {
    params.push(`iv_load_policy=${ivLoadPolicy}`)
  }

  if (loop) {
    params.push('loop=1')
  }

  if (modestBranding) {
    params.push('modestbranding=1')
  }

  if (origin) {
    params.push(`origin=${origin}`)
  }

  if (playlist) {
    params.push(`playlist=${playlist}`)
  }

  if (startAt) {
    params.push(`start=${startAt}`)
  }

  if (progressBarColor) {
    params.push(`color=${progressBarColor}`)
  }

  if (rel !== undefined) {
    params.push(`rel=${rel}`)
  }

  if (params.length) {
    outputUrl += `${matches[1] === 'v' ? '?' : '&'}${params.join('&')}`
  }

  return outputUrl
}

// Component
const YoutubeComponent = (props: ReactNodeViewProps<HTMLImageElement>) => {
  // Props
  const { node, updateAttributes, deleteNode } = props
  const { alignment, containerStyle, ...youtubeAttributes } = node.attrs as YoutubeAttributes

  // Hooks
  const { editor } = useCurrentEditor()

  // Refs
  const containerRef = React.useRef<HTMLDivElement>(null)

  // States
  const [src] = React.useState(
    () =>
      getEmbedUrlFromYoutubeUrl({
        url: youtubeAttributes.src as string,
        nocookie: true
      }) ?? undefined
  )
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [isOpenPopover, setIsOpenPopover] = React.useState(false)

  // Methods
  // Handle load video
  const handleLoadVideo = () => {
    setIsLoaded(true)
  }

  // Handle change alignment
  const handleChangeAlignment = (alignment: Alignment) => {
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

  // Handle change width size
  const handleChangeWidthSize = (size: string) => {
    updateAttributes({
      containerStyle: {
        ...containerStyle,
        width: size
      }
    })
    editor?.commands.focus()
  }

  // Handle delete video
  const handleDeleteVideo = () => {
    deleteNode()
    editor?.commands.focus()
  }

  // Template
  return (
    <NodeViewWrapper data-drag-handle>
      <div ref={containerRef} className={cn('flex', containerClassNamePerAlignment[alignment])}>
        <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
          <PopoverTrigger
            className={cn('group relative aspect-video rounded-md border p-6 transition-all', {
              'border-primary': isOpenPopover,
              'pointer-events-auto opacity-100': isLoaded
            })}
            style={containerStyle}
          >
            {!isLoaded && <Skeleton className='pointer-events-none absolute inset-0 rounded-md' />}

            <iframe
              src={src}
              width={youtubeAttributes.width}
              height={youtubeAttributes.height}
              allowFullScreen={false}
              className='size-full rounded-md object-contain'
              title='custom-youtube-extension'
              onLoad={handleLoadVideo}
            />
          </PopoverTrigger>

          <PopoverContent className='space-y-4' side='top'>
            <div className='flex gap-2'>
              {/* Alignment */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline'>
                    <AlignLeft />
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  {alignments.map((alignmentOption) => (
                    <DropdownMenuItem
                      key={alignmentOption.value}
                      className={cn({
                        'bg-accent': alignment === alignmentOption.value
                      })}
                      onClick={() => handleChangeAlignment(alignmentOption.value)}
                    >
                      <alignmentOption.icon />
                      <span>{alignmentOption.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator orientation='vertical' className='h-10' />

              {/* Width size */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline'>
                    <MoveHorizontal />
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  {WIDTH_SIZES.map((size) => (
                    <DropdownMenuItem
                      key={size}
                      className={cn({
                        'bg-accent': containerStyle.width === size
                      })}
                      onClick={() => handleChangeWidthSize(size)}
                    >
                      {size}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator orientation='vertical' className='h-10' />

              {/* Trash */}
              <Button variant='outline' size='icon' onClick={handleDeleteVideo}>
                <Trash />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </NodeViewWrapper>
  )
}

// Extension
export const CustomYoutubeExtension = Youtube.extend({
  renderHTML({ HTMLAttributes }) {
    const { alignment, containerStyle, ...youtubeAttributes } = HTMLAttributes as YoutubeAttributes

    const embedUrl = getEmbedUrlFromYoutubeUrl({
      url: HTMLAttributes.src,
      allowFullscreen: this.options.allowFullscreen,
      autoplay: this.options.autoplay,
      ccLanguage: this.options.ccLanguage,
      ccLoadPolicy: this.options.ccLoadPolicy,
      controls: this.options.controls,
      disableKBcontrols: this.options.disableKBcontrols,
      enableIFrameApi: this.options.enableIFrameApi,
      endTime: this.options.endTime,
      interfaceLanguage: this.options.interfaceLanguage,
      ivLoadPolicy: this.options.ivLoadPolicy,
      loop: this.options.loop,
      modestBranding: this.options.modestBranding,
      nocookie: this.options.nocookie,
      origin: this.options.origin,
      playlist: this.options.playlist,
      progressBarColor: this.options.progressBarColor,
      startAt: HTMLAttributes.start || 0,
      rel: this.options.rel
    })

    if (embedUrl) {
      youtubeAttributes.src = embedUrl
    }

    return [
      'div',
      {
        class: cn('flex', containerClassNamePerAlignment[alignment])
      },
      [
        'div',
        {
          class: 'aspect-video',
          style: Object.entries(containerStyle)
            .map(([key, value]) => `${key}: ${value}`)
            .join(';')
        },
        [
          'iframe',
          {
            ...mergeAttributes(
              this.options.HTMLAttributes,
              {
                width: this.options.width,
                height: this.options.height,
                allowfullscreen: this.options.allowFullscreen,
                autoplay: this.options.autoplay,
                ccLanguage: this.options.ccLanguage,
                ccLoadPolicy: this.options.ccLoadPolicy,
                disableKBcontrols: this.options.disableKBcontrols,
                enableIFrameApi: this.options.enableIFrameApi,
                endTime: this.options.endTime,
                interfaceLanguage: this.options.interfaceLanguage,
                ivLoadPolicy: this.options.ivLoadPolicy,
                loop: this.options.loop,
                modestBranding: this.options.modestBranding,
                origin: this.options.origin,
                playlist: this.options.playlist,
                progressBarColor: this.options.progressBarColor,
                rel: this.options.rel
              },
              youtubeAttributes
            ),
            class: 'size-full rounded-md object-contain'
          }
        ]
      ]
    ]
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      alignment: {
        default: 'center'
      },
      containerStyle: {
        default: {
          width: `${minWidth}px`
        }
      }
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(YoutubeComponent)
  }
})

export default CustomYoutubeExtension
