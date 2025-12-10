import { type MotionValue, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import * as React from 'react'
import { cn } from '@/utils/ui'

// Tilt card
const TiltCardContext = React.createContext<{
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  scale: MotionValue<number>
} | null>(null)

interface TiltCardProps extends React.PropsWithChildren {
  className?: string
  tiltMaxAngle?: number
  tiltReverse?: boolean
  glareEnable?: boolean
  scale?: number
}

export const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  ({ children, className, tiltMaxAngle = 12, tiltReverse = false, scale = 1.05, ...props }, ref) => {
    // Hooks
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })
    const scaleValue = useSpring(1, { stiffness: 300, damping: 30 })

    const rotateX = useTransform(
      mouseYSpring,
      [-0.5, 0.5],
      tiltReverse ? [tiltMaxAngle, -tiltMaxAngle] : [-tiltMaxAngle, tiltMaxAngle]
    )
    const rotateY = useTransform(
      mouseXSpring,
      [-0.5, 0.5],
      tiltReverse ? [-tiltMaxAngle, tiltMaxAngle] : [tiltMaxAngle, -tiltMaxAngle]
    )

    // biome-ignore lint/style/noNonNullAssertion: ignore
    React.useImperativeHandle(ref, () => containerRef.current!)

    // Refs
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Methods
    const moveMouse = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const xPct = mouseX / width - 0.5
      const yPct = mouseY / height - 0.5

      x.set(xPct)
      y.set(yPct)
      scaleValue.set(scale)
    }

    const leaveMouse = () => {
      x.set(0)
      y.set(0)
      scaleValue.set(1)
    }

    // Template
    return (
      <TiltCardContext.Provider value={{ rotateX, rotateY, scale: scaleValue }}>
        {/** biome-ignore lint/a11y/noStaticElementInteractions: ignore */}
        <div
          ref={containerRef}
          onMouseMove={moveMouse}
          onMouseLeave={leaveMouse}
          className={cn('relative rounded-xl shadow-sm', className)}
          style={{ perspective: '1000px' }}
          {...props}
        >
          <div className='absolute inset-0 rounded-xl border' />
          {children}
        </div>
      </TiltCardContext.Provider>
    )
  }
)

// Tilt card content
interface TiltCardContentProps {
  children: React.ReactNode
  className?: string
}

export const TiltCardContent = React.forwardRef<HTMLDivElement, TiltCardContentProps>(
  ({ children, className, ...props }, ref) => {
    // Hooks
    const context = React.useContext(TiltCardContext)

    if (!context) {
      throw new Error('TiltCardContent must be used within TiltCard')
    }

    const { rotateX, rotateY, scale } = context

    // Template
    return (
      <motion.div
        ref={ref}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d'
        }}
        className={cn('relative overflow-hidden rounded-xl border bg-card text-card-foreground', className)}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
