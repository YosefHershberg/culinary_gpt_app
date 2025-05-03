import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useUserData } from './user-data-context'
import { useQueryClient } from '@tanstack/react-query'

import { SortIngredientsOptions } from '@/lib/enums'
import type { Ingredient } from '@/lib/types'
import { INGREDIENTS_QUERY_KEY } from '@/lib/queryKeys'

type IngredientListContextType = {
    handleClicked: (ingredient: Ingredient) => void,
    userIngredientsSet: Set<string | number>
    changeSortOption: (value: string) => void,
    sortOption: SortIngredientsOptions
}

export const IngredientListContext = createContext<IngredientListContextType>(null as any)

const IngredientListContextProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useQueryClient();
    const { addUserIngredient, deleteUserIngredient } = useUserData();
    const [sortOption, setSortOptions] = useState<SortIngredientsOptions>(SortIngredientsOptions.Popularity)

    // Get userIngredients from queryClient
    const userIngredients = queryClient.getQueryData<Ingredient[]>(INGREDIENTS_QUERY_KEY) || [];

    const handleClicked = useCallback((ingredient: Ingredient) => {
        if (userIngredients.some(item => item.id === ingredient.id)) {
            deleteUserIngredient(ingredient)
        } else {
            addUserIngredient(ingredient)
        }
    }, [userIngredients, addUserIngredient, deleteUserIngredient])  

    const changeSortOption = useCallback((value: string) => {
        setSortOptions(value as SortIngredientsOptions)
    }, [setSortOptions])

    const value = useMemo(() => ({
        userIngredientsSet: new Set(userIngredients.map(ingredient => ingredient.id)),
        handleClicked,
        changeSortOption,
        sortOption
    }), [userIngredients, handleClicked, changeSortOption, sortOption])

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