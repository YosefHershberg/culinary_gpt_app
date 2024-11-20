import React, { useLayoutEffect, useState } from 'react'
import { Input } from '../ui/input'

type SearchRecipesBarProps = {
    setIsSearchBarFocused: (value: boolean) => void,
    handleValueChange: (value: string) => void,
    searchValue: string
}

const SearchRecipesBar: React.FC<SearchRecipesBarProps> = ({ setIsSearchBarFocused, handleValueChange, searchValue }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false)

    useLayoutEffect(() => {
        window.innerWidth < 640 && setIsSmallScreen(true)
    }, []);

    return (
        <>
            <Input
                value={searchValue}
                onChange={(e) => handleValueChange(e.target.value)}
                onBlur={isSmallScreen ? () => setIsSearchBarFocused(false) : () => { }}
                onFocus={isSmallScreen ? () => setIsSearchBarFocused(true) : () => { }}
                type="test"
                placeholder="Search for a recipe"
                className="flex-1"
            />
        </>

    )
}

export default SearchRecipesBar