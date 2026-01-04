'use client'

import { createContext, useContext, useOptimistic, useTransition, type TransitionStartFunction } from 'react'

type FilterContextValue = {
  filterOption?: string
  setFilterOption: (filterOption: string) => void
  isPending: boolean
  startTransition: TransitionStartFunction
}

interface Props {
  filterOption?: string
  children: React.ReactNode
}

const FilterContext = createContext<FilterContextValue | null>(null)

export const useFilterContext = () => {
  const value = useContext(FilterContext)
  if (!value) throw new Error('FilterContext is not found')
  return value
}

export const FilterProvider: React.FC<Props> = ({ filterOption, children }) => {
  const [isPending, startTransition] = useTransition()
  const [optimisticFilterOption, setOptimisticFilterOption] = useOptimistic(
    filterOption,
    (_state, newFilterOption: string) => {
      return newFilterOption
    }
  )

  return (
    <FilterContext.Provider
      value={{
        filterOption: optimisticFilterOption,
        setFilterOption: setOptimisticFilterOption,
        isPending,
        startTransition,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

