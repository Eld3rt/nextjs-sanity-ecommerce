'use client'

import { Category } from '@/sanity.types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Button } from '@/shared/ui/button'
import { ChevronsUpDown } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from '@/shared/ui/command'
import { useFilterContext } from '@/src/features/product'
import { CategoryItem } from '../../../entities/category/ui/CategoryItem'

interface Props {
  categories: Category[]
}

const CategorySelector: React.FC<Props> = ({ categories }) => {
  const router = useRouter()
  const { filterOption, setFilterOption, startTransition } = useFilterContext()
  const [open, setOpen] = useState(false)

  const handleClick = (newValue: string) => {
    setOpen(false)
    startTransition(() => {
      setFilterOption(newValue)
      router.push(`?category=${newValue}`, { scroll: false })
    })
  }

  return (
    <div id="category-selector" className="py-5">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
            {filterOption
              ? categories.find(category => category.slug.current === filterOption)?.title
              : 'Filter by Category'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Search category..."
              className="h-9"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  const selectedCategory = categories.find(category =>
                    category.title.toLowerCase().includes(e.currentTarget.value.toLowerCase())
                  )
                  if (selectedCategory?.slug.current) {
                    handleClick(selectedCategory.slug.current)
                  }
                }
              }}
            />
            <CommandList>
              <CommandEmpty>Category not found.</CommandEmpty>
              <CommandGroup>
                {categories.map(category => (
                  <CategoryItem
                    key={category._id}
                    category={category}
                    handleClick={handleClick}
                    filterOption={filterOption}
                  />
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { CategorySelector }
