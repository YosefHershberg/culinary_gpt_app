import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import useUserIngredients from '@/hooks/componentHooks/useUserIngredients'
import { useQueryClient } from '@tanstack/react-query'

import { SortIngredientsOptions } from '@/lib/enums'
import type { Ingredient } from '@/lib/types'
import { INGREDIENTS_QUERY_KEY } from '@/lib/queryKeys'

type IngredientListContextType = {
    handleClicked: (ingredient: Ingredient) => void,
    userIngredientsSet: Set<string | number>,
    changeSortOption: (value: string) => void,
    sortOption: SortIngredientsOptions
}

export const IngredientListContext = createContext<IngredientListContextType>(null as any)

const IngredientListContextProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useQueryClient();
    const { addUserIngredient, deleteUserIngredient } = useUserIngredients();
    const [sortOption, setSortOptions] = useState<SortIngredientsOptions>(SortIngredientsOptions.Popularity)

    // Get userIngredients from queryClient
    const userIngredients = queryClient.getQueryData<Ingredient[]>(INGREDIENTS_QUERY_KEY) || [];

    // This is for the child UI Checkboxes so they can check if ingredient exists in user's ingredient list in O(1) time.
    const userIngredientsSet = useMemo(() => new Set(userIngredients.map(ingredient => ingredient.id)), [userIngredients]);

    const handleClicked = useCallback((ingredient: Ingredient) => {
        if (userIngredientsSet.has(ingredient.id)) {
            deleteUserIngredient(ingredient)
        } else {
            addUserIngredient(ingredient)
        }
    }, [userIngredientsSet, addUserIngredient, deleteUserIngredient])  

    const changeSortOption = useCallback((value: string) => {
        setSortOptions(value as SortIngredientsOptions)
    }, [setSortOptions])

    const value = useMemo(() => ({
        userIngredientsSet,
        handleClicked,
        changeSortOption,
        sortOption
    }), [userIngredientsSet, handleClicked, changeSortOption, sortOption])

    return (
        <IngredientListContext.Provider value={value}>
            {children}
        </IngredientListContext.Provider>
    )
}

export default IngredientListContextProvider

export const useIngredientList = () => {
    const context = useContext(IngredientListContext)
    if (context === undefined) {
        throw new Error('useIngredientList must be used within a IngredientListProvider')
    }
    return context
}