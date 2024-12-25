import { RecipeWithImage } from '@/lib/types'
import { useLayoutEffect, useState } from 'react'

export type FilterOptions = 'recipes' | 'cocktails' | 'all'

type UseFilterRecipesResponse = {
    filteredRecipes: RecipeWithImage[]
    handleFilterChange: (value: FilterOptions) => void
    currentFilter: FilterOptions
}

const useFilterRecipes = (recipes: RecipeWithImage[]): UseFilterRecipesResponse => {

    const [filteredRecipes, setFilteredRecipes] = useState<RecipeWithImage[]>([])
    const [currentFilter, setCurrentFilter] = useState<FilterOptions>('all')

    useLayoutEffect(() => {
        switch (currentFilter) {
            case 'all':
                setFilteredRecipes([...recipes].sort((a: RecipeWithImage, b: RecipeWithImage) =>
                    new Date(b.createdAt as Date).getTime() - new Date(a.createdAt as Date).getTime()))
                break
            case 'recipes':
                setFilteredRecipes([...recipes].filter((recipe: RecipeWithImage) => recipe.recipe.type === 'recipe'))
                break
            case 'cocktails':
                setFilteredRecipes([...recipes].filter((recipe: RecipeWithImage) => recipe.recipe.type === 'cocktail'))
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