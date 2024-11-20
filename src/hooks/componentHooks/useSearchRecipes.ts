import { useEffect, useState } from 'react'
import useDebounce from '../useDebounce'
import { RecipeWithImage } from '@/lib/types'

type UseSearchRecipesResponse = {
    isSearchBarFocused: boolean,
    setIsSearchBarFocused: (value: boolean) => void,
    debouncedValue: string,
    searchValue: string,
    handleValueChange: (value: string) => void,
    foundRecipes: RecipeWithImage[],
    isDebouncing: boolean
}

const useSearchRecipes = (recipes: RecipeWithImage[]): UseSearchRecipesResponse => {
    const [isSearchBarFocused, setIsSearchBarFocused] = useState<boolean>(false)
    const [foundRecipes, setFoundRecipes] = useState<RecipeWithImage[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const { debouncedValue, isDebouncing } = useDebounce(searchValue, 500)

    useEffect(() => {
        if (debouncedValue !== '') {
            setFoundRecipes(recipes.filter(recipe =>
                recipe.recipe.title.toLowerCase().includes(debouncedValue.toLowerCase())
            ))
        } else {
            setFoundRecipes([])
        }
    }, [debouncedValue]);

    const handleValueChange = (value: string) => {
        setSearchValue(value)
    }

    return {
        isSearchBarFocused,
        setIsSearchBarFocused,
        debouncedValue,
        searchValue,
        handleValueChange,
        foundRecipes,
        isDebouncing,
    }
}

export default useSearchRecipes