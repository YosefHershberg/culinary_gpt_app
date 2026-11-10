import React from 'react'

import { useSuspenseQueries } from '@tanstack/react-query'
import { getUserKitchenUtilsAPI } from '@/services/kitchenUtils.service'
import { KITCHEN_UTILS_QUERY_KEY } from '@/lib/queryKeys'
import { userIngredientsQueryOptions } from '@/lib/queryOptions'

// NOTE: This provider is rendered only if user is signed in.
export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useSuspenseQueries({
    queries: [
      userIngredientsQueryOptions,
      {
        queryKey: KITCHEN_UTILS_QUERY_KEY,
        queryFn: () => getUserKitchenUtilsAPI(),
      },
    ],
  })

  return <>{children}</>
}
