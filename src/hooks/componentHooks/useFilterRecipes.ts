import { useState } from 'react'

export type FilterOptions = 'recipes' | 'cocktails' | 'all'

export type UseFilterRecipesResponse = {
    currentFilter: FilterOptions
    handleFilterChange: (value: FilterOptions) => void
}

const useFilterRecipes = (): UseFilterRecipesResponse => {
    const [currentFilter, setCurrentFilter] = useState<FilterOptions>('all')

    const handleFilterChange = (value: FilterOptions) => {
        setCurrentFilter(value)
    }

    return {
        currentFilter,
        handleFilterChange,
    }
}

export default useFilterRecipes