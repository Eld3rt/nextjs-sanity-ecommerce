import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/shared/config/sanity'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  stega: {
    enabled: true,
    studioUrl:
      process.env.NODE_ENV === 'production'
        ? `https://${process.env.BASE_URL}/admin/studio`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/admin/studio`,
  },
})

