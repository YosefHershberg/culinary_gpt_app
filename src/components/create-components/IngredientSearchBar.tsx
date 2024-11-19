import React from 'react'

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { Ingredient, IngredientType } from '@/lib/types';
import IngredientListMenuDropdown from '../create-components/IngredientListMenuDropdown';
import { useIngredientSearch } from '@/hooks/componentHooks/useIngredientSearch';

//NOTE: Should I divide the logic into hook?

type IngredientSearchBarProps = {
    placeholders: string[];
    type: IngredientType;
}

const IngredientSearchBar: React.FC<IngredientSearchBarProps> = ({ placeholders, type }) => {
    const {
        searchValue,
        setSearchValue,
        isDropdownOpen,
        dropdownRef,
        results,
        isLoading,
        handleSubmit,
        handleSelectIngredient
    } = useIngredientSearch(type);

    return (
        <div className='max-w-[35rem] w-full mb-4 flex flex-col'>
            <div className='flex items-center gap-3'>
                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    value={searchValue}
                    setValue={setSearchValue}
                />
                <IngredientListMenuDropdown />
            </div>
            <DropdownMenu open={isDropdownOpen}>
                <DropdownMenuTrigger></DropdownMenuTrigger>
                <DropdownMenuContent
                    className='max-w-[30rem] w-[95vw] dark:bg-zinc-700 max-h-[25rem] overflow-y-auto'
                    ref={dropdownRef}
                >
                    {results?.length === 0 && (
                        <div className='w-full flex flex-col gap-2 justify-center items-center h-20 text-primary'>
                            <p className='text-lg'>No results found :/</p>
                            <p>Try searching for something else</p>
                        </div>
                    )}
                    {results?.map((item: Ingredient) => (
                        <DropdownMenuItem
                            onSelect={() => handleSelectIngredient(item)}
                            key={item.id}
                            className='flex items-center justify-between h-10 px-3'
                        >
                            <p>{item.name}</p>
                            <span className='text-md text-zinc-400 italic'>Click to add</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default IngredientSearchBar;
