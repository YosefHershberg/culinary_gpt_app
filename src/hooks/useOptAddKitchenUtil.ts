import { useQueryClient, useMutation } from "@tanstack/react-query"
import { addUserKitchenUtil } from "@/services/kitchenUtils.service"

import { toast } from "@/components/ui/use-toast"

const useOptAddKitchenUtil = () => {
    const queryClient = useQueryClient()

    const addKitchenUtilMutation = useMutation({
        mutationFn: (util: string) => addUserKitchenUtil(util),

        onMutate: async (util: string) => {
            await queryClient.cancelQueries({ queryKey: ['userKitchenUtils'] })
            const previousCachedData = queryClient.getQueryData<{ [key: string]: boolean }>(['userKitchenUtils']) as { [key: string]: boolean }

            queryClient.setQueryData(['userKitchenUtils'], {...previousCachedData, [util]: true})

            return { previousCachedData }
        },

        onError: (error: Error, _util: string, context: any) => {
            queryClient.setQueryData(['userKitchenUtils'], context?.previousCachedData)
            console.log(error);
            toast({
                variant: "destructive",
                title: "Oops! Something went wrong!",
                // @ts-expect-error
                description: error.response?.data?.message || "An error occurred while adding ingredient.",
            })
        },

        onSettled: () => queryClient.invalidateQueries({ queryKey: ['userKitchenUtils'] })
    })

    return addKitchenUtilMutation
}

export default useOptAddKitchenUtil