import React, { createContext, useContext } from 'react'

import { useAuth } from '@/context/auth-context'
import useKitchenUtils from '@/hooks/useKitchenUtils'
import useUserIngredients from '@/hooks/useUserIngredients'

import { Ingredient, KitchenUtil, KitchenUtils } from '@/lib/types'
import LoadingPage from '@/pages/LoadingPage'

type UserDataState = {
  userIngredients: Ingredient[];
  kitchenUtils: KitchenUtils | null;
  addUserIngredient: (ingredient: Ingredient) => void;
  addCommonIngredients: () => void;
  deleteUserIngredient: (ingredient: Ingredient) => void;
  deleteAllUserIngredients: () => void;
  toggleKitchenUtil: (util: KitchenUtil) => void;
}

export const UserDataContext = createContext<UserDataState>(null as any)

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded } = useAuth()

  const { isLoadingUserUtils, userKitchenUtils, toggleKitchenUtil } = useKitchenUtils()
  const { isLoadingUserIngredients, userIngredients, addUserIngredient, deleteUserIngredient, deleteAllUserIngredients, addCommonIngredients } = useUserIngredients()

  if (isLoadingUserIngredients || isLoadingUserUtils || !isLoaded) {
    return <LoadingPage />
  }

  return (
    <UserDataContext.Provider value={{
      userIngredients: userIngredients || [],
      addUserIngredient,
      addCommonIngredients,
      deleteUserIngredient,
      deleteAllUserIngredients,
      kitchenUtils: userKitchenUtils || emptyKitchenUtils,
      toggleKitchenUtil,
    }}>
      {children}
    </UserDataContext.Provider>
  )
}

export const useUserData = () => {
  const context = useContext(UserDataContext)

  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider')
  }

  return context
}

const emptyKitchenUtils: { [key: string]: boolean } = {
  "Stove Top": false,
  "Oven": false,
  "Microwave": false,
  "Air Fryer": false,
  "Blender": false,
  "Food Processor": false,
  "Slow Cooker": false,
  "BBQ": false,
  "Grill": false
}