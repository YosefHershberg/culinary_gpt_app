import { useQuery } from "@tanstack/react-query"
import { getUserSubscription } from "@/services/user.service"

const useIsSubscribed = () => {
    const { data, isLoading } = useQuery({
        queryFn: () => getUserSubscription(),
        queryKey: ['isSubscribed'],
        throwOnError: true,
    })

    return {
        isSubscribed: data?.subscriptionActive,
        isLoading
    }
}

export default useIsSubscribed