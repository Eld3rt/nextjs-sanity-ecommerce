import { Category } from '@/sanity.types'
import { cn } from '@/src/shared/lib'
import { CommandItem } from '@/src/shared/ui'
import { Check } from 'lucide-react'

interface Props {
  category: Category
  handleClick: (newValue: string) => void
  filterOption: string | undefined
}

const CategoryItem: React.FC<Props> = ({ category, handleClick, filterOption }) => {
  return (
    <CommandItem
      key={category._id}
      value={category.title}
      onSelect={() => {
        handleClick(category.slug.current)
      }}
    >
      {category.title}
      <Check className={cn('ml-auto', filterOption === category.slug.current ? 'opacity-100' : 'opacity-0')} />
    </CommandItem>
  )
}

export { CategoryItem }
