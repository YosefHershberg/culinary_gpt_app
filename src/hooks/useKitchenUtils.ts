import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/context/auth-context'
import { getUserKitchenUtils } from '@/services/kitchenUtils.service'

import { KitchenUtil } from '@/lib/types'
import useOptToggleKitchenUtil from './optimistic/useOptToggleKitchenUtil'

type UseKitchenUtilsReturnType = {
    userKitchenUtils: any;
    isLoadingUserUtils: boolean;
    toggleKitchenUtil: (util: KitchenUtil) => void;
}

const useKitchenUtils = (): UseKitchenUtilsReturnType => {
    const { isSignedIn } = useAuth()

    const addKitchenUtilMutation = useOptToggleKitchenUtil()

    const { data: userKitchenUtils, isLoading: isLoadingUserUtils } = useQuery({
        queryKey: ['userKitchenUtils'],
        queryFn: () => getUserKitchenUtils(),
        enabled: !!isSignedIn,
        throwOnError: true
    })

    const toggleKitchenUtil = async (util: KitchenUtil) => {
        addKitchenUtilMutation.mutate(util)
    }

    return {
        userKitchenUtils,
        isLoadingUserUtils,
        toggleKitchenUtil,
    }
}

export default useKitchenUtils