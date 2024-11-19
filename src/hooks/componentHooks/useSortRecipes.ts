import { useLayoutEffect, useState } from "react"
import { RecipeWithImage as RecipeType } from '@/lib/types'

export type SortOptions = 'newest' | 'oldest' | 'a-z' | 'z-a'

type UseSortRecipesResponse = {
    sortedRecipes: RecipeType[]
    handleSortChange: (value: SortOptions) => void
    currentSort: SortOptions
}

const useSortRecipes = (recipes: RecipeType[]): UseSortRecipesResponse => {

    const [sortedRecipes, setSortedRecipes] = useState<RecipeType[]>([])
    const [currentSort, setCurrentSort] = useState<SortOptions>('oldest')

    useLayoutEffect(() => {
        switch (currentSort) {
            case 'newest':
                setSortedRecipes([...recipes].sort((a: RecipeType, b: RecipeType) =>
                    new Date(b.created_at as Date).getTime() - new Date(a.created_at as Date).getTime()))
                break
            case 'oldest':
                setSortedRecipes([...recipes].sort((a: RecipeType, b: RecipeType) =>
                    new Date(a.created_at as Date).getTime() - new Date(b.created_at as Date).getTime()))
                break
            case 'a-z':
                setSortedRecipes([...recipes].sort((a: RecipeType, b: RecipeType) =>
                    a.recipe.title.localeCompare(b.recipe.title)))
                break
            case 'z-a':
                setSortedRecipes([...recipes].sort((a: RecipeType, b: RecipeType) =>
                    b.recipe.title.localeCompare(a.recipe.title)))
                break
            default:
                break
        }
    }, [currentSort, recipes])

    const handleSortChange = (value: SortOptions) => {
        setCurrentSort(value)
    }

    return {
        sortedRecipes,
        handleSortChange,
        currentSort
    }
}

export default useSortRecipes