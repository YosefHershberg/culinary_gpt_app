import React, { useLayoutEffect, useState } from 'react'
import { Input } from '../ui/input'
import LoadingSpinner from '../ui/LoadingSpinner'

type SearchRecipesBarProps = {
    setIsSearchBarFocused: (value: boolean) => void,
    handleValueChange: (value: string) => void,
    searchValue: string,
    isDebouncing: boolean
}

const SearchRecipesBar: React.FC<SearchRecipesBarProps> = ({ setIsSearchBarFocused, handleValueChange, searchValue, isDebouncing }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false)

    useLayoutEffect(() => {
        window.innerWidth < 640 && setIsSmallScreen(true)
    }, []);

    return (
        <div className='flex-1 relative'>
            <Input
                value={searchValue}
                onChange={(e) => handleValueChange(e.target.value)}
                onBlur={isSmallScreen ? () => setIsSearchBarFocused(false) : () => { }}
                onFocus={isSmallScreen ? () => setIsSearchBarFocused(true) : () => { }}
                type="test"
                placeholder="Search for a recipe"
                className="w-full"
            />
            {isDebouncing && searchValue !== '' &&
                <div className="absolute right-0 top-0 bottom-0 flex items-center pr-2">
                    <LoadingSpinner className='size-5' />
                </div>
            }
        </div>

    )
}

export default SearchRecipesBar