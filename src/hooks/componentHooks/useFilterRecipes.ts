import { RecipeWithImage as RecipeType } from '@/lib/types'
import { useLayoutEffect, useState } from 'react'

export type FilterOptions = 'creation-date' | 'name' | 'recipes' | 'cocktails'

type UseFilterRecipesResponse = {
    sortedRecipes: RecipeType[]
    handleFilterChange: (value: FilterOptions) => void
    currentFilter: FilterOptions
}

const useFilterRecipes = (recipes: RecipeType[]): UseFilterRecipesResponse => {

    const [sortedRecipes, setSortedRecipes] = useState<RecipeType[]>([])
    const [currentFilter, setCurrentFilter] = useState<FilterOptions>('creation-date')

    useLayoutEffect(() => {
        switch (currentFilter) {
            case 'creation-date':
                setSortedRecipes([...recipes].sort((a: RecipeType, b: RecipeType) =>
                    new Date(b.created_at as Date).getTime() - new Date(a.created_at as Date).getTime()))
                break
            case 'name':
                setSortedRecipes([...recipes].sort((a: RecipeType, b: RecipeType) => a.recipe.title.localeCompare(b.recipe.title)))
                break
            case 'recipes':
                setSortedRecipes([...recipes].filter((recipe: RecipeType) => recipe.recipe.type === 'recipe'))
                break
            case 'cocktails':
                setSortedRecipes([...recipes].filter((recipe: RecipeType) => recipe.recipe.type === 'cocktail'))
                break
            default:
                break
        }
    }, [currentFilter, recipes])

    const handleFilterChange = (value: FilterOptions) => {
        setCurrentFilter(value)
    }

    return {
        sortedRecipes,
        handleFilterChange,
        currentFilter
    }
}

export default useFilterRecipes