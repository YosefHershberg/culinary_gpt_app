import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext } from 'react'
import { useAuth } from '@/context-providers/auth-provider'
import { useCookies } from 'react-cookie'

import LoadingPage from '@/pages/LoadingPage'

import useOptAddUserIngredient from '@/hooks/useOptAddUserIngredient'
import useOptDeleteUserIngredient from '@/hooks/useOptDeleteUserIngredient'
import useOptAddkitchenUtil from '@/hooks/useOptAddKitchenUtil'
import useOptDeleteKitchenUtil from '@/hooks/useDeleteKitchenUtil'

import { getUserIngredients, getUserKitchenUtils } from '@/lib/api'
import { Ingredient } from '@/lib/types'

type UserDataState = {
  userIngredients: Ingredient[] //TODO: change to correct type
  kithchenUtils: { [key: string]: boolean } | null
  addUserIngredient: (ingredient: Ingredient) => void
  deleteUserIngredient: (ingredient: Ingredient) => void
  addKithcenUtil: (util: string) => void
  removeKithcenUtil: (util: string) => void
}

export const UserDataContext = createContext<UserDataState>(undefined as any)

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useAuth()
  const [cookies] = useCookies()
  const addUserIngredientMutation = useOptAddUserIngredient()
  const deleteUserIngredientMutation = useOptDeleteUserIngredient()
  const addKitchenUtilMutation = useOptAddkitchenUtil()
  const removeKitchenUtilMutation = useOptDeleteKitchenUtil()

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
      addUserIngredientMutation.mutate(ingredient)
    }
  }

  const deleteUserIngredient = (ingredient: Ingredient) => {
    console.log('removing ingredient', ingredient);
    if (userIngredients) {
      deleteUserIngredientMutation.mutate(ingredient)
    }
  }

  const addKithcenUtil = (util: string) => {
    console.log('adding kitchen util', util);
    if (userKitchenUtils) {
      addKitchenUtilMutation.mutate(util)
    }
  }

  const removeKithcenUtil = (util: string) => {
    console.log('removing kitchen util', util);
    if (userKitchenUtils) {
      removeKitchenUtilMutation.mutate(util)
    }
  }

  return (
    <UserDataContext.Provider value={{
      userIngredients: userIngredients || [],
      addUserIngredient,
      deleteUserIngredient,
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