import { useEffect } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'

import useOptToggleKitchenUtil from './optimistic/useOptToggleKitchenUtil'
import { getUserKitchenUtils } from '@/services/kitchenUtils.service'

import { KitchenUtil } from '@/lib/types'

export type UseKitchenUtilsReturnType = {
    kitchenUtils: { [key: string]: boolean };
    toggleKitchenUtil: (util: KitchenUtil) => void;
}

const useKitchenUtils = (): UseKitchenUtilsReturnType => {
    const addKitchenUtilMutation = useOptToggleKitchenUtil()

    const { data: kitchenUtils, error } = useSuspenseQuery({
        queryKey: ['userKitchenUtils'],
        queryFn: () => getUserKitchenUtils(),
    })

    useEffect(() => {
        if (error) throw error
    }, [error]);

    const toggleKitchenUtil = async (util: KitchenUtil) => {
        addKitchenUtilMutation.mutate(util)
    }

    return {
        kitchenUtils: kitchenUtils || initKitchenUtils,
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