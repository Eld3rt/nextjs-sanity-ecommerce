import { type QueryParams } from 'next-sanity'
import { draftMode } from 'next/headers'
import { client } from './client'

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
}: {
  query: QueryString
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}) {
  const { isEnabled } = await draftMode()
  return client.fetch(
    query,
    params,
    isEnabled
      ? {
          perspective: 'drafts',
        }
      : undefined
  )
}

