import { RecipeWithImage as RecipeType } from '@/lib/types'
import { useLayoutEffect, useState } from 'react'

export type FilterOptions = 'recipes' | 'cocktails' | 'all'

type UseFilterRecipesResponse = {
    filteredRecipes: RecipeType[]
    handleFilterChange: (value: FilterOptions) => void
    currentFilter: FilterOptions
}

const useFilterRecipes = (recipes: RecipeType[]): UseFilterRecipesResponse => {

    const [filteredRecipes, setFilteredRecipes] = useState<RecipeType[]>([])
    const [currentFilter, setCurrentFilter] = useState<FilterOptions>('all')

    useLayoutEffect(() => {
        switch (currentFilter) {
            case 'all':
                setFilteredRecipes([...recipes].sort((a: RecipeType, b: RecipeType) =>
                    new Date(b.createdAt as Date).getTime() - new Date(a.createdAt as Date).getTime()))
                break
            case 'recipes':
                setFilteredRecipes([...recipes].filter((recipe: RecipeType) => recipe.recipe.type === 'recipe'))
                break
            case 'cocktails':
                setFilteredRecipes([...recipes].filter((recipe: RecipeType) => recipe.recipe.type === 'cocktail'))
                break
            default:
                break
        }
    }, [currentFilter, recipes])

    const handleFilterChange = (value: FilterOptions) => {
        setCurrentFilter(value)
    }

    return {
        filteredRecipes,
        handleFilterChange,
        currentFilter
    }
}

export default useFilterRecipes