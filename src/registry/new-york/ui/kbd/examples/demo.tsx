import { Kbd, KbdGroup } from '@/components/ui/kbd'

// Component
export const KbdDemo = () => {
  // Template
  return (
    <div className='flex flex-col items-center gap-4'>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  )
}
