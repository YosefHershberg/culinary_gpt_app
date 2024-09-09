import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { useUserData } from '@/context/user-data-context';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';

import useHttpClient from '@/hooks/useHttpClient';
import { Ingredient } from '@/lib/types';
import IngredientListMenuDropdown from './IngredientListMenuDropdown';

const placeholders = [
    "Cocoa Powder",
    "Peanut Butter",
    "Canola oil",
    "Barbecue Sauce",
    "White wine",
];

//NOTE: Should I divide the logic into hook?

const IngredientSearchBar: React.FC = () => {
    const { addUserIngredient } = useUserData()

    const [searchValue, setSearchValue] = useState<string>('');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { data: results, isLoading, error, triggerHttpReq } = useHttpClient({
        endpoint: '/ingredients/search',
        method: 'GET',
        params: {
            query: searchValue
        }
    });

    useEffect(() => {
        if (results) setIsDropdownOpen(true)
    }, [results]);

    useEffect(() => {
        if (error) {
            setIsDropdownOpen(false);
            toast({
                variant: 'destructive',
                title: 'Oops! Something went wrong!',
                //@ts-ignore
                description: error.response?.data?.message || 'An error occurred while searching for ingredients.'
            })
        }
    }, [error]);

    useLayoutEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        triggerHttpReq()
    };

    const handleSelected = (ingredient: Ingredient) => {
        addUserIngredient(ingredient)
        setIsDropdownOpen(false);
    }

    return (
        <div className='max-w-[35rem] w-full mb-4 flex flex-col'>
            <div className='flex items-center gap-3'>
                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    value={searchValue}
                    setValue={setSearchValue}
                />
                <IngredientListMenuDropdown />
            </div>
            <DropdownMenu open={isDropdownOpen}>
                {/* <DropdownMenu open={true}> */}
                <DropdownMenuTrigger></DropdownMenuTrigger>
                {/* NOTE: NEED THIS ^^^ */}
                <DropdownMenuContent
                    className='max-w-[30rem] w-[95vw] dark:bg-zinc-700 max-h-[25rem] overflow-y-auto'
                    ref={dropdownRef}
                >
                    {results?.length === 0 && (
                        <div className='w-full flex flex-col gap-2 justify-center items-center h-20 text-primary'>
                            <p className='text-lg'>No results found :/</p>
                            <p>Try searching for somehting else</p>
                        </div>
                    )}
                    {results?.map((item: Ingredient) => (
                        <DropdownMenuItem
                            onSelect={() => handleSelected(item)}
                            key={item.id}
                            className='flex items-center justify-between h-10 px-3'
                        >
                            <p>{item.name}</p>

                            <span className='text-md text-zinc-400 italic'>
                                Click to add
                            </span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default IngredientSearchBar
