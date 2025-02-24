import React, { createContext, useContext } from 'react'

import { useAuth } from '@/context/auth-context'
import useKitchenUtils, { UseKitchenUtilsReturnType } from '@/hooks/useKitchenUtils'
import useUserIngredients, { UseUserIngredientsReturnType } from '@/hooks/componentHooks/useUserIngredients'

type UserDataState = UseKitchenUtilsReturnType & UseUserIngredientsReturnType

export const UserDataContext = createContext<UserDataState>(null as any)

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <>{children}</>
  }

  const userIngredientsServices = useUserIngredients()
  const userKitchenUtilsServices = useKitchenUtils()

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