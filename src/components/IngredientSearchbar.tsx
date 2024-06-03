import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import useHttpClient from '@/hooks/useHttpClient';
import { Ingredient } from '@/lib/types';
import useOptAddUserIngredient from '@/hooks/useOptAddUserIngredient';
import { toast } from '@/components/ui/use-toast';

const placeholders = [
    "Whole Wheat Bread",
    "Tomato",
    "Canola oil",
    "Salt",
    "White wine",
];

//NOTE: Should I devide the logic into hook?

const IngredientSearchbar = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<any>()
    const addUserIngredientmutation = useOptAddUserIngredient()

    const { data: results, isLoading, error, triggerHttpReq } = useHttpClient({
        endpoint: '/search',
        method: 'GET',
        params: {
            query: searchValue
        }
    });

    useEffect(() => {
        if (results) {
            setIsDropdownOpen(true);
        }
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
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

    const handleSelected = (item: Ingredient) => {
        addUserIngredientmutation.mutate(item)
        setIsDropdownOpen(false);
    }

    return (
        <div className='max-w-[35rem] w-full mb-4 flex flex-col'>
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onSubmit={onSubmit}
                isLoading={isLoading}
                value={searchValue}
                setValue={setSearchValue}
            />
            <DropdownMenu open={isDropdownOpen}>
                <DropdownMenuTrigger></DropdownMenuTrigger>
                {/* NOTE: NEED THIS ^^^ */}
                <DropdownMenuContent
                    className='max-w-[30rem] w-[95vw] dark:bg-zinc-700 max-h-[25rem] overflow-y-auto'
                    ref={dropdownRef}
                >
                    {results?.map((item: Ingredient) => (
                        <DropdownMenuItem
                            onSelect={() => handleSelected(item)}
                            key={item.id}
                        >
                            {item.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default IngredientSearchbar