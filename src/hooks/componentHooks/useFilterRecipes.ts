import { FilterRecipesOptions } from '@/lib/enums';
import { useState } from 'react'

export type UseFilterRecipesResponse = {
    currentFilter: FilterRecipesOptions
    handleFilterChange: (value: FilterRecipesOptions) => void
}

const useFilterRecipes = (): UseFilterRecipesResponse => {
    const [currentFilter, setCurrentFilter] = useState<FilterRecipesOptions>(FilterRecipesOptions.All);

    const handleFilterChange = (value: FilterRecipesOptions) => {
        setCurrentFilter(value);
    }

    return {
        currentFilter,
        handleFilterChange,
    }
}

export default useFilterRecipes