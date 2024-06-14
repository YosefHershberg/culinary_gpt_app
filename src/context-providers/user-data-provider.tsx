import { getUserIngredients, getUserKitchenUtils } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext } from 'react'
import { useAuth } from '@/context-providers/auth-provider'
import { useCookies } from 'react-cookie'
import { Ingredient } from '@/lib/types'
import LoadingPage from '@/pages/LoadingPage'
import useOptAddUserIngredient from '@/hooks/useOptAddUserIngredient'
import useOptRemoveUserIngredient from '@/hooks/useOptRemoveUserIngredient'
import useOptAddkitchenUtil from '@/hooks/useOptAddKitchenUtil'
import useOptRemoveKitchenUtil from '@/hooks/useRemoveKitchenUtil'

type UserDataState = {
  userIngredients: Ingredient[] //TODO: change to correct type
  kithchenUtils: { [key: string]: boolean } | null
  addUserIngredient: (ingredient: Ingredient) => void
  removeUserIngredient: (ingredient: Ingredient) => void
  addKithcenUtil: (util: string) => void
  removeKithcenUtil: (util: string) => void
}

export const UserDataContext = createContext<UserDataState>(undefined as any)

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useAuth()
  const [cookies] = useCookies()
  const addUserIngredientmutation = useOptAddUserIngredient()
  const removeUserIngredientMutation = useOptRemoveUserIngredient()
  const addKitchenUtil = useOptAddkitchenUtil()
  const removeKitchenUtil = useOptRemoveKitchenUtil()

  const { data: userIngredients, isLoading: isLoadingUserIngrdts } = useQuery({
    queryKey: ['userIngredients'],
    queryFn: () => getUserIngredients(cookies.__session),
    enabled: !!isSignedIn
  })  

  const { data: userKitchenUtils, isLoading: isLoadingUserUtils } = useQuery({
    queryKey: ['userKitchenUtils'],
    queryFn: () => getUserKitchenUtils(cookies.__session),
    enabled: !!isSignedIn
  })

  const addUserIngredient = (ingredient: Ingredient) => {
    console.log('adding ingredient', ingredient);
    if (userIngredients) {
      addUserIngredientmutation.mutate(ingredient)
    }
  }

  const removeUserIngredient = (ingredient: Ingredient) => {
    console.log('removing ingredient', ingredient);
    if (userIngredients) {
      removeUserIngredientMutation.mutate(ingredient)
    }
  }

  const addKithcenUtil = (util: string) => {
    console.log('adding kitchen util', util);
    if (userKitchenUtils) {
      addKitchenUtil.mutate(util)
    }
  }

  const removeKithcenUtil = (util: string) => {
    console.log('removing kitchen util', util);
    if (userKitchenUtils) {
      removeKitchenUtil.mutate(util)
    }
  }

  return (
    <UserDataContext.Provider value={{
      userIngredients: userIngredients || [],
      addUserIngredient,
      removeUserIngredient,
      kithchenUtils: userKitchenUtils || emptykitchenUtils,
      addKithcenUtil,
      removeKithcenUtil,
    }}>
      {(isLoadingUserUtils || isLoadingUserIngrdts) ? <LoadingPage /> : children}
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