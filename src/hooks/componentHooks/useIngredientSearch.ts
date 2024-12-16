import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import useHttpClient from '@/hooks/useHttpClient';
import { Ingredient, IngredientType } from '@/lib/types';
import { useUserData } from '@/context/user-data-context';

export const useIngredientSearch = (type: IngredientType) => {
    const { addUserIngredient, userIngredients } = useUserData();
    const [searchValue, setSearchValue] = useState<string>('');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { data: results, isLoading, error, triggerHttpReq } = useHttpClient({
        endpoint: '/ingredients/search',
        method: 'GET',
        params: { query: searchValue, type }
    });

    useEffect(() => {
        if (results) setIsDropdownOpen(true);
    }, [results]);

    useEffect(() => {
        if (error) {
            setIsDropdownOpen(false);
            toast({
                variant: 'destructive',
                title: 'Oops! Something went wrong!',
                //@ts-expect-error
                description: error.response?.data?.message || 'An error occurred while searching for ingredients.'
            });
        }
    }, [error]);

    useLayoutEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        triggerHttpReq();
    };

    const handleSelectIngredient = (ingredient: Ingredient) => {
        if (userIngredients.some((ing) => ing.id === ingredient.id)) {
            toast({
                title: 'Ingredient already added!',
                description: 'You have already added this ingredient.'
            });
            setIsDropdownOpen(false);
            return;
        }
        addUserIngredient(ingredient);
        toast({
            title: 'Ingredient added!',
            description: 'The ingredient has been added to your list.'
        });
        setIsDropdownOpen(false);
    };

    return {
        searchValue,
        setSearchValue,
        isDropdownOpen,
        setIsDropdownOpen,
        dropdownRef,
        results,
        isLoading,
        handleSubmit,
        handleSelectIngredient
    };
};
