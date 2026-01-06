'use client'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from '@/shared/config/sanity'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'
import { presentationTool } from 'sanity/presentation'

export default defineConfig({
  basePath: '/admin/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      previewUrl: {
        initial: process.env.NEXT_PUBLIC_BASE_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
})
