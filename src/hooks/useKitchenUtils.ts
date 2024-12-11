import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/context/auth-context'
import { getUserKitchenUtils } from '@/services/kitchenUtils.service'

import { KitchenUtil } from '@/lib/types'
import useOptToggleKitchenUtil from './optimistic/useOptToggleKitchenUtil'

export type UseKitchenUtilsReturnType = {
    kitchenUtils: { [key: string]: boolean };
    isLoading: boolean;
    toggleKitchenUtil: (util: KitchenUtil) => void;
}

const useKitchenUtils = (): UseKitchenUtilsReturnType => {
    const { isSignedIn } = useAuth()

    const addKitchenUtilMutation = useOptToggleKitchenUtil()

    const { data: kitchenUtils, isLoading } = useQuery({
        queryKey: ['userKitchenUtils'],
        queryFn: () => getUserKitchenUtils(),
        enabled: !!isSignedIn,
        throwOnError: true
    })

    const toggleKitchenUtil = async (util: KitchenUtil) => {
        addKitchenUtilMutation.mutate(util)
    }

    return {
        kitchenUtils: kitchenUtils || initKitchenUtils,
        isLoading,
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