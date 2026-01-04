import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = S =>
  S.list()
    .title('Next.js Ecommerce Admin')
    .items([
      S.documentTypeListItem('category').title('Categories'),

      S.divider(),
      ...S.documentTypeListItems().filter(item => item.getId() && !['category'].includes(item.getId()!)),
    ])
