import * as TabsPrimitive from '@radix-ui/react-tabs'
import { motion } from 'motion/react'
import React from 'react'
import { cn } from '@/utils/ui'

interface TabsContextValue {
  value: string
  previousValue: string | null
  direction: number
  listRef: React.RefObject<HTMLDivElement | null>
  triggersRef: React.RefObject<Map<string, HTMLButtonElement>>
  registerTrigger: (value: string, element: HTMLButtonElement | null) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

const useTabsContext = () => {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error('useTabsContext must be used within Tabs')
  }
  return context
}

// Tabs
export const Tabs = ({
  className,
  defaultValue,
  value: controlledValue,
  onValueChange,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) => {
  // Refs
  const valuesRef = React.useRef<string[]>([])
  const listRef = React.useRef<HTMLDivElement>(null)
  const triggersRef = React.useRef<Map<string, HTMLButtonElement>>(new Map())

  // States
  const [internalValue, setInternalValue] = React.useState(defaultValue || '')
  const [previousValue, setPreviousValue] = React.useState<string | null>(null)
  const [direction, setDirection] = React.useState(0)

  const value = controlledValue !== undefined ? controlledValue : internalValue

  // Methods
  const changeValue = React.useCallback(
    (newValue: string) => {
      const currentIndex = valuesRef.current.indexOf(value)
      const newIndex = valuesRef.current.indexOf(newValue)
      setDirection(newIndex > currentIndex ? 1 : -1)
      setPreviousValue(value)
      setInternalValue(newValue)
      onValueChange?.(newValue)
    },
    [value, onValueChange]
  )

  const registerTrigger = React.useCallback((triggerValue: string, element: HTMLButtonElement | null) => {
    if (element) {
      triggersRef.current.set(triggerValue, element)
      if (!valuesRef.current.includes(triggerValue)) {
        valuesRef.current.push(triggerValue)
      }
    } else {
      triggersRef.current.delete(triggerValue)
      valuesRef.current = valuesRef.current.filter((v) => v !== triggerValue)
    }
  }, [])

  // Template
  return (
    <TabsContext value={{ value, previousValue, direction, triggersRef, listRef, registerTrigger }}>
      <TabsPrimitive.Root
        data-slot='tabs'
        className={cn('flex flex-col gap-2', className)}
        value={value}
        onValueChange={changeValue}
        {...props}
      />
    </TabsContext>
  )
}

// Tabs list
export const TabsList = ({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) => {
  // Hooks
  const { value, triggersRef, listRef } = useTabsContext()

  // States
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0, left: 0 })

  // Effects
  React.useLayoutEffect(() => {
    const updateDimensions = () => {
      const selectedButtonElement = triggersRef.current.get(value)
      const containerElement = listRef.current

      if (selectedButtonElement && containerElement) {
        const selectedButtonRect = selectedButtonElement.getBoundingClientRect()
        const containerRect = containerElement.getBoundingClientRect()

        setDimensions({
          width: selectedButtonRect.width,
          height: selectedButtonRect.height,
          left: selectedButtonRect.left - containerRect.left
        })
      }
    }

    requestAnimationFrame(updateDimensions)
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [value, triggersRef, listRef])

  // Template
  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot='tabs-list'
      className={cn(
        'first relative inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
        { '[&_button:first-child]:bg-primary': true },
        className
      )}
      {...props}
    >
      {dimensions.width > 0 && (
        <motion.div
          className='absolute rounded-md border bg-primary shadow-sm'
          initial={false}
          animate={{
            width: dimensions.width,
            left: dimensions.left,
            opacity: 1
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30
          }}
          style={{
            height: dimensions.height
          }}
        />
      )}
      {children}
    </TabsPrimitive.List>
  )
}

// Tabs trigger
export const TabsTrigger = ({ className, value, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) => {
  // Hooks
  const { registerTrigger } = useTabsContext()

  // Methods
  const register = React.useCallback(
    (element: HTMLButtonElement | null) => {
      registerTrigger(value, element)
    },
    [value, registerTrigger]
  )

  // Template
  return (
    <TabsPrimitive.Trigger
      ref={register}
      data-slot='tabs-trigger'
      value={value}
      className={cn(
        "z-10 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-2 py-1 font-medium text-muted-foreground text-sm transition-[color,box-shadow] focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-primary-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

// Tabs content
export const TabsContent = ({
  className,
  value,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) => {
  // Hooks
  const { direction } = useTabsContext()

  // Template
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      value={value}
      className={cn('relative flex-1 outline-none', className)}
      {...props}
    >
      <motion.div
        key={`tabs-content-${value}`}
        custom={direction}
        initial={{
          x: direction > 0 ? 80 : -80,
          opacity: 0,
          filter: 'blur(8px)'
        }}
        animate={{
          x: 0,
          opacity: 1,
          filter: 'blur(0px)'
        }}
        transition={{
          duration: 0.3,
          ease: [0.32, 0.72, 0, 1]
        }}
        className='w-full'
      >
        {children}
      </motion.div>
    </TabsPrimitive.Content>
  )
}
