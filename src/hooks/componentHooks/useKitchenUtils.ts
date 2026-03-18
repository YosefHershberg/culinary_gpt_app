import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import useOptimisticMutation from '@/hooks/useOptimisticMutation'

import { toggleUserKitchenUtilAPI } from '@/services/kitchenUtils.service'
import type { KitchenUtil, KitchenUtils } from '@/lib/types'
import { KITCHEN_UTILS_QUERY_KEY } from '@/lib/queryKeys'

export type UseKitchenUtilsReturnType = {
    kitchenUtils: { [key: string]: boolean };
    toggleKitchenUtil: (util: KitchenUtil) => void;
}

const useKitchenUtils = (): UseKitchenUtilsReturnType => {
    const queryClient = useQueryClient()

    const addKitchenUtilMutation = useOptimisticMutation({
        queryKey: KITCHEN_UTILS_QUERY_KEY,
        mutation: (util: KitchenUtil) => toggleUserKitchenUtilAPI(util),
        optimisticUpdate: (util: KitchenUtil, previousCachedData: KitchenUtils) => {
            return { ...previousCachedData, [util]: !previousCachedData[util] }
        },
        errorMessage: "An error occurred while adding kitchen util.",
    })

    const kitchenUtils = queryClient.getQueryData<{ [key: string]: boolean }>(KITCHEN_UTILS_QUERY_KEY) || initKitchenUtils

    const toggleKitchenUtil = useCallback((util: KitchenUtil) => {
        addKitchenUtilMutation.mutate(util)
    }, [addKitchenUtilMutation])

    return {
        kitchenUtils,
        toggleKitchenUtil,
    }
}

export default useKitchenUtils

const initKitchenUtils: { [key: string]: boolean } = {
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
