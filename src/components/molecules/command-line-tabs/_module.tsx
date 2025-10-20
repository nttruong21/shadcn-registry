// Core
import { useRef, useState } from 'react'
import { Check, Clipboard, Terminal, X } from 'lucide-react'

// App
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// Internal
import { type CommandLine } from './lib'

// Component
export const CommandLineTabs = ({ commandLines }: { commandLines: CommandLine[] }) => {
  // Refs
  const timeoutRef = useRef<NodeJS.Timeout>(undefined)

  // States
  const [selectedTab, setSelectedTab] = useState<string>(commandLines[0].packageManager)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'error' | 'done'>('idle')

  // Methods
  // Copy
  const copy = async () => {
    try {
      if (copyStatus !== 'idle') return

      const selectedCommandLine = commandLines.find((commandLine) => commandLine.packageManager === selectedTab)
      if (!selectedCommandLine) return

      await navigator.clipboard.writeText(selectedCommandLine.command)
      setCopyStatus('done')
    } catch {
      setCopyStatus('error')
    } finally {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setCopyStatus('idle')
      }, 2000)
    }
  }

  // Template
  return (
    <Card className='bg-code p-0'>
      <CardContent className='not-content p-0'>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className='gap-0'>
          <div className='border-input flex justify-between border-b px-3 py-1'>
            <div className='flex items-center gap-2'>
              <div className='bg-foreground/70 rounded-xs p-1'>
                <Terminal className='text-code size-3' />
              </div>

              <TabsList className='bg-code'>
                {commandLines.map((commandLine) => (
                  <TabsTrigger
                    key={commandLine.packageManager}
                    value={commandLine.packageManager}
                    className='data-[state=active]:!border-input !border-transparent'
                  >
                    {commandLine.packageManager}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button size='icon-sm' variant='ghost' className='text-muted-foreground' onClick={copy}>
                  {copyStatus === 'error' ? <X /> : copyStatus === 'done' ? <Check /> : <Clipboard />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p> {copyStatus === 'error' ? 'Error' : copyStatus === 'done' ? 'Copied' : 'Copy'}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {commandLines.map((commandLine) => (
            <TabsContent
              key={commandLine.packageManager}
              value={commandLine.packageManager}
              className='overflow-x-auto py-3'
            >
              <pre>
                <code className='text-muted-foreground px-3'>{commandLine.command}</code>
              </pre>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
