import { createContext, useContext, useState } from 'react'

import { FilterOptions } from '@/lib/enums'
import { Ingredient } from '@/lib/types'

import { useUserData } from './user-data-context'

type IngredientListContextType = {
    handleClicked: (ingredient: Ingredient) => void,
    userIngredientsSet: Set<string | number>
    changeFilterOptions: (value: string) => void,
    filterOptions: FilterOptions
}

export const IngredientListContext = createContext<IngredientListContextType>(null as any)

const IngredientListContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { addUserIngredient, deleteUserIngredient, userIngredients } = useUserData()
    const [filterOptions, setFilterOptions] = useState<FilterOptions>(FilterOptions.Popularity)

    const handleClicked = (ingredient: Ingredient) => {
        if (userIngredients?.some(item => item.id === ingredient.id)) {
            deleteUserIngredient(ingredient)
        } else {
            addUserIngredient(ingredient)
        }
    }

    const changeFilterOptions = (value: string) => {
        setFilterOptions(value as FilterOptions)
    }

    return (
        <IngredientListContext.Provider value={{
            userIngredientsSet: new Set(userIngredients.map(ingredient => ingredient.id)),
            handleClicked,
            changeFilterOptions,
            filterOptions
        }}>
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