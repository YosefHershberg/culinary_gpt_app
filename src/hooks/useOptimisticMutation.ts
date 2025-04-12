import { toast } from "@/components/ui/use-toast"
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query"

type UseOptimisticMutationProps<TData, TResult, TCachedData = unknown> = {
    queryKey: QueryKey,
    mutation: (data: TData) => Promise<TResult>,
    optimisticUpdate: (data: TData, previousCachedData: TCachedData) => TCachedData,
    errorMessage?: string,
    onSuccess?: (data: TResult) => void,
    onError?: (error: Error) => void,
}

type MutationContext<TCachedData> = {
    previousData?: TCachedData;
}

const useOptimisticMutation = <TData, TResult, TCachedData = unknown>({
    queryKey,
    mutation,
    optimisticUpdate,
    errorMessage = "An error occurred.",
    onSuccess,
    onError
}: UseOptimisticMutationProps<TData, TResult, TCachedData>) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: mutation,
        onMutate: async (data: TData) => {
            await queryClient.cancelQueries({ queryKey })
            const previousData = queryClient.getQueryData<TCachedData>(queryKey)

            queryClient.setQueryData(queryKey, optimisticUpdate(data, previousData as TCachedData))
            return { previousData } as MutationContext<TCachedData>
        },
        onError: (_error: Error, _data: TData, context: MutationContext<TCachedData> | undefined) => {
            if (context?.previousData !== undefined) {
                queryClient.setQueryData(queryKey, context.previousData)
            }
            if (onError) {
                onError(_error)
            } else {
                toast({
                    variant: "destructive",
                    title: "Oops! Something went wrong!",
                    description: errorMessage,
                })
            }
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey }),
        onSuccess
    })
}

export default useOptimisticMutation