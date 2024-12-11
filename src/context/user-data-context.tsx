import React, { createContext, useContext } from 'react'

import { useAuth } from '@/context/auth-context'
import useKitchenUtils, { UseKitchenUtilsReturnType } from '@/hooks/useKitchenUtils'
import useUserIngredients, { UseUserIngredientsReturnType } from '@/hooks/useUserIngredients'

import LoadingPage from '@/pages/LoadingPage'

type UserDataState = UseKitchenUtilsReturnType & UseUserIngredientsReturnType

export const UserDataContext = createContext<UserDataState>(null as any)

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded } = useAuth()
  
  const userIngredientsServices = useUserIngredients()
  const userKitchenUtilsServices = useKitchenUtils()

  if (userIngredientsServices.isLoading || userKitchenUtilsServices.isLoading || !isLoaded) {
    return <LoadingPage />
  }

  return (
    <UserDataContext.Provider value={{
      ...userIngredientsServices,
      ...userKitchenUtilsServices
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