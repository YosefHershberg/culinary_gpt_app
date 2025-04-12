import { useQuery } from "@tanstack/react-query"
import { getUserSubscriptionAPI } from '@/services/user.service'

type UseFetchSubscriptionResponseType = {
  isSubscribed: boolean,
  isLoading: boolean
}

const useFetchSubscription = (): UseFetchSubscriptionResponseType => {
  const { data, isLoading } = useQuery({
    queryFn: () => getUserSubscriptionAPI(),
    queryKey: ['userSubscription'],
    throwOnError: true,
    refetchOnMount: true
  })

  return {
    isSubscribed: !!data,
    isLoading
  }
}

export default useFetchSubscription