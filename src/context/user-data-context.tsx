import React from 'react'

import { useSuspenseQueries } from '@tanstack/react-query'
import { useAuth } from '@/context/auth-context'
import { getUserIngredientsAPI } from '@/services/ingredient.service'
import { getUserKitchenUtilsAPI } from '@/services/kitchenUtils.service'
import { INGREDIENTS_QUERY_KEY, KITCHEN_UTILS_QUERY_KEY } from '@/lib/queryKeys'

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <>{children}</>
  }

  return <UserDataFetcher>{children}</UserDataFetcher>
}

const UserDataFetcher: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useSuspenseQueries({
    queries: [
      {
        queryKey: INGREDIENTS_QUERY_KEY,
        queryFn: () => getUserIngredientsAPI(),
      },
      {
        queryKey: KITCHEN_UTILS_QUERY_KEY,
        queryFn: () => getUserKitchenUtilsAPI(),
      },
    ],
  })

  return <>{children}</>
}
