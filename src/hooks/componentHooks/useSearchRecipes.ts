import { useState } from 'react'
import useDebounce from '../useDebounce'

export type UseSearchRecipesResponse = {
    isSearchBarFocused: boolean,
    setIsSearchBarFocused: (value: boolean) => void,
    debouncedValue: string,
    searchValue: string,
    handleValueChange: (value: string) => void,
    isDebouncing: boolean
}

const useSearchRecipes = (initQuery = ''): UseSearchRecipesResponse => {
    const [searchValue, setSearchValue] = useState<string>(initQuery)
    const [isSearchBarFocused, setIsSearchBarFocused] = useState<boolean>(false)
    const { debouncedValue, isDebouncing } = useDebounce(searchValue, 500)

    const handleValueChange = (value: string) => {
        setSearchValue(value)
    }

    return {
        isSearchBarFocused,
        setIsSearchBarFocused,
        debouncedValue,
        searchValue,
        handleValueChange,
        isDebouncing,
    }
}

export default useSearchRecipes