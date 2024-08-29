import { useAuth } from '@/context/auth-provider'
import { getUserKitchenUtils } from '@/services/kitchenUtils.service'
import { useQuery } from '@tanstack/react-query'
import useOptAddKitchenUtil from './optimistic/useOptAddKitchenUtil'
import useOptDeleteKitchenUtil from './optimistic/useOptDeleteKitchenUtil'

const useKitchenUtils = () => {
    const { isSignedIn } = useAuth()

    const addKitchenUtilMutation = useOptAddKitchenUtil()
    const removeKitchenUtilMutation = useOptDeleteKitchenUtil()

    const { data: userKitchenUtils, isLoading: isLoadingUserUtils } = useQuery({
        queryKey: ['userKitchenUtils'],
        queryFn: () => getUserKitchenUtils(),
        enabled: !!isSignedIn,
        throwOnError: true
    })

    const addKitchenUtil = (util: string) => {
        console.log('adding kitchen util', util);
        if (userKitchenUtils) {
            addKitchenUtilMutation.mutate(util)
        }
    }

    const removeKitchenUtil = (util: string) => {
        console.log('removing kitchen util', util);
        if (userKitchenUtils) {
            removeKitchenUtilMutation.mutate(util)
        }
    }

    return {
        userKitchenUtils,
        isLoadingUserUtils,
        addKitchenUtil,
        removeKitchenUtil
    }
}

export default useKitchenUtils