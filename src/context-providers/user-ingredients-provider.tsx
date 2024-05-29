import { getUserIngredients } from '@/lib/api'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useLayoutEffect } from 'react'
import { useAuth } from '@/context-providers/auth-provider'
import { useCookies } from 'react-cookie'
import { Ingredient } from '@/lib/types'
import LoadingPage from '@/pages/LoadingPage'
import useOptAddUserIngredient from '@/hooks/useOptAddUserIngredient'
import useOptRemoveUserIngredient from '@/hooks/useOptRemoveUserIngredient'

type UserIngredientsState = {
  userIngredients: Ingredient[] //TODO: change to correct type
  addUserIngredient: (ingredient: Ingredient) => void
  removeUserIngredient: (ingredient: Ingredient) => void
  clearUserIngredients: () => void
}

export const UserIngredientsContext = createContext<UserIngredientsState>(undefined as any)

const UserIngredientsProvider = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useAuth()
  const [cookies] = useCookies()
  const queryClient = useQueryClient()
  const addUserIngredientmutation = useOptAddUserIngredient()
  const removeUserIngredientMutation = useOptRemoveUserIngredient()

  const { data: userIngredients, isLoading } = useQuery({
    queryKey: ['userIngredients'],
    queryFn: () => getUserIngredients(cookies.__session),
    enabled: !!isSignedIn
  })

  useLayoutEffect(() => {
    if (userIngredients) {
      const uniqueIngredients = userIngredients.filter((ingredient: Ingredient, index: number, self: Ingredient[]) => {
        return index === self.findIndex((i: Ingredient) => (
          i.id === ingredient.id
        ));
      });
      queryClient.setQueryData(['userIngredients'], uniqueIngredients);
    }
  }, [userIngredients, queryClient]);

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

  const clearUserIngredients = () => {
    queryClient.setQueryData(['userIngredients'], [])
  }

  return (
    <UserIngredientsContext.Provider value={{
      userIngredients: queryClient.getQueryData(['userIngredients']) || [],
      addUserIngredient,
      removeUserIngredient,
      clearUserIngredients
    }}>
      {isLoading ? <LoadingPage /> : children}
    </UserIngredientsContext.Provider>
  )
}

export default UserIngredientsProvider

export const useUserIngredients = () => {
  const context = useContext(UserIngredientsContext)

  if (context === undefined) {
    throw new Error('useUserIngredients must be used within a UserIngredientsProvider')
  }

  return context
}