import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

// Toaster
export const Toaster = ({ theme = 'system', ...props }: ToasterProps) => {
  // Template
  return (
    <Sonner
      theme={theme}
      className='toaster group'
      icons={{
        success: <CircleCheckIcon className='size-4' />,
        info: <InfoIcon className='size-4' />,
        warning: <TriangleAlertIcon className='size-4' />,
        error: <OctagonXIcon className='size-4' />,
        loading: <Loader2Icon className='size-4 animate-spin' />
      }}
      toastOptions={{
        duration: 100000,
        classNames: {
          closeButton: '!cursor-default'
        }
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
          '--toast-close-button-start': 'auto',
          '--toast-close-button-end': '0',
          '--toast-close-button-transform': 'translate(35%, -35%)'
        } as React.CSSProperties
      }
      {...props}
    />
  )
}
