'use client'

import { disableDraftMode } from './actions/disable-draft-mode'
import { useDraftModeEnvironment, useIsPresentationTool } from 'next-sanity/hooks'
import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { toast } from 'sonner'

const DisableDraftMode = () => {
  const isPresentationTool = useIsPresentationTool()
  const env = useDraftModeEnvironment()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    if (isPresentationTool === false) {
      const toastId = toast('Draft Mode Enabled', {
        id: 'draft-mode-toast',
        description: env === 'live' ? 'Content is live, refreshing automatically' : 'Refresh manually to see changes',
        duration: Infinity,
        action: {
          label: 'Disable',
          onClick: () =>
            startTransition(async () => {
              await disableDraftMode()
              startTransition(() => router.refresh())
            }),
        },
      })
      return () => {
        toast.dismiss(toastId)
      }
    }
  }, [env, router, isPresentationTool])

  useEffect(() => {
    if (pending) {
      const toastId = toast.loading('Disabling draft mode...')
      return () => {
        toast.dismiss(toastId)
      }
    }
  }, [pending])

  return null
}

export { DisableDraftMode }

