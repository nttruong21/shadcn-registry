import { motion } from 'motion/react'
import React from 'react'
import { cn } from '@/utils/ui'

// Highlighted text
interface HighlightedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  highlightColorClassName?: string
  markerColorClassName?: string
  opacity?: number
  animationDuration?: number
  animationDelay?: number
  animate?: boolean
  triggerOnView?: boolean
  repeat?: boolean
}

const MARKER_SIZE = 8
const LINE_HEIGHT = 25
const MARKER_WIDTH = 2
const MARKER_OFFSET_X = 8
const MARKER_OFFSET_Y = 4

export const HighlightedText = ({
  children,
  highlightColorClassName = 'bg-muted text-muted-foreground',
  markerColorClassName = 'bg-primary',
  opacity = 0.8,
  animationDuration = 0.6,
  animationDelay = 0,
  animate = true,
  triggerOnView = true,
  repeat = false,
  className,
  ...props
}: HighlightedTextProps) => {
  // Refs
  const textRef = React.useRef<HTMLDivElement>(null)
  const observerRef = React.useRef<IntersectionObserver | null>(null)

  // States
  const [isVisible, setIsVisible] = React.useState(!triggerOnView)

  const isShouldAnimate = animate && isVisible

  // Effects
  React.useEffect(() => {
    if (!triggerOnView || !textRef.current) return
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (!repeat && observerRef.current) observerRef.current.disconnect()
        } else if (repeat) setIsVisible(false)
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )
    observerRef.current.observe(textRef.current)
    return () => observerRef.current?.disconnect()
  }, [triggerOnView, repeat])

  // Template
  return (
    <div {...props}>
      <div className={cn('relative px-1.5 py-0.5', className)}>
        {/* Content */}
        <motion.div
          className={cn('rounded p-4', highlightColorClassName)}
          style={{
            opacity,
            boxDecorationBreak: 'clone',
            WebkitBoxDecorationBreak: 'clone'
          }}
          initial={{ opacity: 0 }}
          animate={isShouldAnimate ? { opacity } : { opacity: 0 }}
          transition={{
            duration: animationDuration,
            delay: animationDelay,
            ease: 'easeOut'
          }}
        >
          <div ref={textRef}>{children}</div>
        </motion.div>

        {/* Left marker */}
        <motion.span
          className='absolute'
          style={{ top: `-${MARKER_OFFSET_X}px`, left: `-${MARKER_OFFSET_Y}px` }}
          initial={{ opacity: 0, y: -5 }}
          animate={isShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
          transition={{
            duration: 0.3,
            delay: animationDelay + animationDuration * 0.8,
            ease: 'easeOut'
          }}
        >
          <span
            className={cn('block rounded-full', markerColorClassName)}
            style={{ width: `${MARKER_SIZE}px`, height: `${MARKER_SIZE}px` }}
          />
          <span
            className={cn('block', markerColorClassName)}
            style={{
              width: `${MARKER_WIDTH}px`,
              height: `${LINE_HEIGHT}px`,
              marginLeft: `${(MARKER_SIZE - 2) / 2}px`
            }}
          />
        </motion.span>

        {/* Right marker */}
        <motion.span
          className='absolute'
          style={{ bottom: `-${MARKER_OFFSET_X}px`, right: `-${MARKER_OFFSET_Y}px` }}
          initial={{ opacity: 0, y: 5 }}
          animate={isShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
          transition={{
            duration: 0.3,
            delay: animationDelay + animationDuration,
            ease: 'easeOut'
          }}
        >
          <span
            className={cn('block', markerColorClassName)}
            style={{
              width: `${MARKER_WIDTH}px`,
              height: `${LINE_HEIGHT}px`,
              marginLeft: `${(MARKER_SIZE - 2) / 2}px`
            }}
          />
          <span
            className={cn('block rounded-full', markerColorClassName)}
            style={{ width: `${MARKER_SIZE}px`, height: `${MARKER_SIZE}px` }}
          />
        </motion.span>
      </div>
    </div>
  )
}
