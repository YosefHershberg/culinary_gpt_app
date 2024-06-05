import { toast } from "@/components/ui/use-toast"
import { removeUserKitchenUtil } from "@/lib/api"
import { useQueryClient, useMutation } from "@tanstack/react-query"

const useOptRemoveKitchenUtil = () => {
    const queryClient = useQueryClient()

    const AddkitchenUtil = useMutation({
        mutationFn: (util: string) => removeUserKitchenUtil(util),

        onMutate: async (util: string) => {
            await queryClient.cancelQueries({ queryKey: ['userKitchenUtils']})
            const previousCachedData = queryClient.getQueryData<{ [key: string]: boolean }>(['userKitchenUtils'])
        
            if (previousCachedData) {
                queryClient.setQueryData(['userKitchenUtils'], {
                    ...previousCachedData,
                    [util]: false
                })
            }
        
            return { previousCachedData }
        },

        onError: (error: Error, _util: string, context: any) => {
            queryClient.setQueryData(['userKitchenUtils'], context?.previousCachedData)
            console.log(error);
            toast({
                variant: "destructive",
                title: "Oops! Something went wrong!",
                //@ts-expect-error
                description: error.response?.data?.message || "An error occurred while adding ingredient.",
            })
        },

        onSettled: () => queryClient.invalidateQueries({ queryKey: ['userKitchenUtils']})
    })

    return AddkitchenUtil
}

export default useOptRemoveKitchenUtil