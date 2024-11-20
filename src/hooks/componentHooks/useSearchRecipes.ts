import { useEffect, useState } from 'react'
import useDebounce from '../useDebounce'
import { RecipeWithImage } from '@/lib/types'

const useSearchRecipes = (recipes: RecipeWithImage[]) => {
    const [isSearchBarFocused, setIsSearchBarFocused] = useState<boolean>(false)
    const [foundRecipes, setFoundRecipes] = useState<RecipeWithImage[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const debouncedValue = useDebounce(searchValue, 500)

    useEffect(() => {
        if (debouncedValue !== '') {
            setFoundRecipes(recipes.filter(recipe =>
                recipe.recipe.title.toLowerCase().includes(debouncedValue.toLowerCase())
            ))
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
        foundRecipes
    }
}

export default useSearchRecipes