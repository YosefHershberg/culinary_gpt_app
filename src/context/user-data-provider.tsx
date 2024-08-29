import React, { createContext, useContext } from 'react'

import { useAuth } from '@/context/auth-provider'
import LoadingPage from '@/pages/LoadingPage'

import { Ingredient } from '@/lib/types'
import useKitchenUtils from '@/hooks/useKitchenUtils'
import useUserIngredients from '@/hooks/useUserIngredients'

type UserDataState = {
  userIngredients: Ingredient[]
  kitchenUtils: { [key: string]: boolean } | null
  addUserIngredient: (ingredient: Ingredient) => void
  deleteUserIngredient: (ingredient: Ingredient) => void
  addKitchenUtil: (util: string) => void
  removeKitchenUtil: (util: string) => void
}

export const UserDataContext = createContext<UserDataState>(null as any)

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded } = useAuth()

  const { isLoadingUserUtils, userKitchenUtils, addKitchenUtil, removeKitchenUtil } = useKitchenUtils()
  const { isLoadingUserIngrdts, userIngredients, addUserIngredient, deleteUserIngredient } = useUserIngredients()

  if (isLoadingUserIngrdts || isLoadingUserUtils || !isLoaded) {
    return <LoadingPage />
  }

  return (
    <UserDataContext.Provider value={{
      userIngredients: userIngredients || [],
      addUserIngredient,
      deleteUserIngredient,
      kitchenUtils: userKitchenUtils || emptykitchenUtils,
      addKitchenUtil: addKitchenUtil,
      removeKitchenUtil,
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

const emptykitchenUtils: { [key: string]: boolean } = {
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